import { Request, Response, NextFunction } from 'express';

interface Discount {
  percentage: number;
  startDate: string;
  endDate?: string;
  description?: string;
}

// Generic validation error response
const validationError = (res: Response, errors: string[]) => {
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors
  });
};

// Helper functions
const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

const isValidTime = (timeString: string): boolean => {
  return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString);
};

const isValidPercentage = (value: number): boolean => {
  return !isNaN(value) && value >= 0 && value <= 100;
};

// Event validation middleware
export const validateEventInput = (req: Request, res: Response, next: NextFunction) => {
  const errors: string[] = [];
  const { 
    title, 
    date, 
    time, 
    location, 
    description,
    price, 
    seats,
    category,
    discounts 
  } = req.body;

  // Required fields validation
  if (!title?.trim()) errors.push('Title is required');
  if (!date) errors.push('Date is required');
  if (!time) errors.push('Time is required');
  if (!location?.trim()) errors.push('Location is required');
  
  // Optional fields basic type validation
  if (description && typeof description !== 'string') {
    errors.push('Description must be a string');
  }

  if (category && typeof category !== 'string') {
    errors.push('Category must be a string');
  }

  // Date and time validation
  if (date && !isValidDate(date)) {
    errors.push('Invalid date format. Use YYYY-MM-DD format');
  }

  if (time && !isValidTime(time)) {
    errors.push('Invalid time format. Use HH:mm format');
  }

  // Numeric fields validation
  if (price !== undefined) {
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0) {
      errors.push('Price must be a valid non-negative number');
    }
  }

  if (seats !== undefined) {
    const numSeats = Number(seats);
    if (isNaN(numSeats) || numSeats < 1 || !Number.isInteger(numSeats)) {
      errors.push('Seats must be a valid positive integer');
    }
  }

  // Discounts validation
  if (discounts) {
    if (!Array.isArray(discounts)) {
      errors.push('Discounts must be an array');
    } else {
      discounts.forEach((discount: Discount, index) => {
        // Required discount fields
        if (!discount.percentage) {
          errors.push(`Discount percentage is required at index ${index}`);
        }
        if (!discount.startDate) {
          errors.push(`Discount start date is required at index ${index}`);
        }

        // Validate percentage
        if (discount.percentage && !isValidPercentage(Number(discount.percentage))) {
          errors.push(`Invalid discount percentage at index ${index}. Must be between 0 and 100`);
        }

        // Validate dates
        if (discount.startDate && !isValidDate(discount.startDate)) {
          errors.push(`Invalid discount start date at index ${index}. Use YYYY-MM-DD format`);
        }
        if (discount.endDate && !isValidDate(discount.endDate)) {
          errors.push(`Invalid discount end date at index ${index}. Use YYYY-MM-DD format`);
        }

        // Validate date range if both dates are present
        if (discount.startDate && discount.endDate) {
          const start = new Date(discount.startDate);
          const end = new Date(discount.endDate);
          if (start > end) {
            errors.push(`Discount end date must be after start date at index ${index}`);
          }
        }

        // Validate optional description
        if (discount.description && typeof discount.description !== 'string') {
          errors.push(`Discount description must be a string at index ${index}`);
        }
      });
    }
  }

  if (errors.length > 0) {
    return validationError(res, errors);
  }

  next();
};