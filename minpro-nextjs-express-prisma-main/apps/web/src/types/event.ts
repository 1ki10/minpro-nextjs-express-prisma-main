import { Discount } from './discount';

// Review interfaces
export interface Review {
 id: string;
 eventId: string;
 userId: string;
 userName: string;
 rating: number;
 feedback: string;
 createdAt: string;
}

export interface CreateReviewData {
 eventId: string; 
 rating: number;
 feedback: string;
}

export interface ReviewsResponse {
 reviews: Review[];
 total: number;
 page: number;
 limit: number;
 totalPages: number;
}

// Main Event interface
export interface Event {
 id: string;
 title: string;
 description: string;
 date: string;
 time: string;
 location: string;
 category: string;
 price: number;
 isFree: boolean;
 seats: number;
 availableSeats: number;
 image?: string;
 organizerId: string;
 createdAt: string;
 updatedAt: string;
 discounts?: Discount[];
 
 // Review related fields
 averageRating?: number;
 totalReviews?: number;
 reviews?: Review[];
}

// Event filters interface
export interface EventFilters {
 search?: string;
 category?: string;
 location?: string;
 startDate?: string;
 endDate?: string;
 priceRange?: {
   min: number;
   max: number;
 };
 isFree?: boolean;
 
 // Review filters
 minRating?: number;
 hasReviews?: boolean;
}

// API response interface
export interface EventsResponse {
 events: Event[];
 total: number;
 page: number;
 limit: number;
 totalPages: number;
}

// Location interfaces
export interface LocationPhysical {
 type: 'physical';
 city: string;
 venue: string;
}

export interface LocationOnline {
 type: 'online';
 platform: string;
}

export type Location = LocationPhysical | LocationOnline;

// Form interfaces
export interface BasicInfo {
 title: string;
 description: string;
 date: string;
 time: string;
 location: Location;
}

export interface TicketInfo {
 type: 'free' | 'paid';
 price?: number;
 totalSeats: number;
 ticketLimit?: number;
}

export interface DiscountInfo {
 earlyBird?: {
   enabled: boolean;
   percentage?: number;
   endDate?: string;
 };
 lastMinute?: {
   enabled: boolean;
   percentage?: number;
   startDate?: string;
 };
}

export interface FormData {
 basic: BasicInfo;
 tickets: TicketInfo;
 discounts: DiscountInfo;
}

// Purchase interfaces
export interface PurchaseTicketData {
 eventId: string;
 quantity: number;
 buyerName: string;
 buyerEmail: string;
 totalPrice: number;
 discountApplied?: {
   type: 'earlyBird' | 'lastMinute';
   percentage: number;
   amount: number;
 };
}

export interface PurchaseResponse {
 ticketId: string;
 eventId: string;
 purchaseDate: string;
 quantity: number;
 totalPrice: number;
 discountApplied?: {
   type: string;
   percentage: number;
   amount: number;
 };
 status: 'pending' | 'confirmed' | 'cancelled';
}


export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  locationType: 'physical' | 'online';
  category: string;
  isFree: boolean;
  price: number;
  seats: number;
  availableSeats: number;
  ticketLimit: number | null;
  discounts?: {
    earlyBird?: {
      percentage: number;
      endDate: string;
    } | null;
    lastMinute?: {
      percentage: number;
      startDate: string;
    } | null;
  };
  status?: 'draft' | 'published';
}