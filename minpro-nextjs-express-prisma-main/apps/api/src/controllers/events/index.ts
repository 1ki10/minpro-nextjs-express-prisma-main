import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { Prisma } from '@prisma/client';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}


const createEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      locationType = 'physical',
      category = 'general',
      isFree = false,
      price = 0,
      seats,
      ticketLimit,
      discounts,
    } = req.body;

    const eventData: Prisma.EventCreateInput = {
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      location: location.trim(),
      locationType,
      category,
      isFree,
      price: isFree ? 0 : Number(price),
      seats: Number(seats),
      availableSeats: Number(seats),
      ticketLimit: ticketLimit ? Number(ticketLimit) : null,
      // Fix untuk JsonValue type
      discounts: discounts ? Prisma.JsonNull : Prisma.DbNull,
      status: 'draft',
      organizer: {
        connect: {
          id: req.user?.id || 'org-001'
        }
      }
    };

    const event = await prisma.event.create({
      data: eventData,
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    return res.status(201).json({
      success: true,
      data: event,
      message: 'Event created successfully'
    });

  } catch (error: any) {
    console.error('Error creating event:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'An event with this title already exists'
      });
    }
    
    if (error.code === 'P2003') {
      return res.status(400).json({
        success: false,
        message: 'Invalid organizer ID'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to create event. Please try again later.'
    });
  }
};

// Export semua function yang dibutuhkan router
export {
  createEvent
};