import type { FormData, CreateEventData } from '@/types/event';

export function formatEventPayload(formData: FormData): CreateEventData {
  const location = formData.basic.location.type === 'physical'
    ? `${formData.basic.location.city}, ${formData.basic.location.venue}`
    : `Online via ${formData.basic.location.platform}`;

  const earlyBird = formData.discounts?.earlyBird?.enabled && formData.discounts.earlyBird?.percentage && formData.discounts.earlyBird?.endDate
    ? {
        percentage: Number(formData.discounts.earlyBird.percentage),
        endDate: formData.discounts.earlyBird.endDate
      }
    : null;

  const lastMinute = formData.discounts?.lastMinute?.enabled && formData.discounts.lastMinute?.percentage && formData.discounts.lastMinute?.startDate
    ? {
        percentage: Number(formData.discounts.lastMinute.percentage),
        startDate: formData.discounts.lastMinute.startDate
      }
    : null;

  return {
    title: formData.basic.title.trim(),
    description: formData.basic.description.trim(),
    date: formData.basic.date,
    time: formData.basic.time,
    location,
    locationType: formData.basic.location.type,
    category: 'general',
    isFree: formData.tickets.type === 'free',
    price: formData.tickets.type === 'paid' ? Number(formData.tickets.price) : 0,
    seats: Number(formData.tickets.totalSeats),
    availableSeats: Number(formData.tickets.totalSeats),
    ticketLimit: formData.tickets.ticketLimit ? Number(formData.tickets.ticketLimit) : null,
    discounts: { earlyBird, lastMinute },
    status: 'draft' as const
  };
}