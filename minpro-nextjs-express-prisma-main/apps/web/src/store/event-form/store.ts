import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FormData, BasicInfo, TicketInfo, DiscountInfo } from '@/types/event';

interface EventFormState {
  basic: BasicInfo;
  tickets: TicketInfo;
  discounts: DiscountInfo;
  currentStep: 'basic' | 'tickets' | 'discounts';
  formStatus: {
    isSubmitting: boolean;
    isLoading: boolean;
    error: string | null;
  };
  saveBasicInfo: (data: BasicInfo) => void;
  saveTickets: (data: TicketInfo) => void;
  saveDiscounts: (data: DiscountInfo) => void;
  setCurrentStep: (step: EventFormState['currentStep']) => void;
  setFormStatus: (status: Partial<EventFormState['formStatus']>) => void;
  resetForm: () => void;
  getFormData: () => FormData;
}

const initialState = {
  basic: {
    title: '',
    description: '',
    date: '',
    time: '',
    location: {
      type: 'physical' as const,
      city: '',
      venue: ''
    },
    image: undefined
  },
  tickets: {
    type: 'paid' as const,
    price: 0,
    totalSeats: 0,
    ticketLimit: 1
  },
  discounts: {
    earlyBird: {
      enabled: false,
      percentage: 0,
      endDate: ''
    },
    lastMinute: {
      enabled: false,
      percentage: 0,
      startDate: ''
    }
  },
  currentStep: 'basic' as const,
  formStatus: {
    isSubmitting: false,
    isLoading: false,
    error: null
  }
};

export const useEventFormStore = create<EventFormState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      saveBasicInfo: (data) => set((state) => ({
        ...state,
        basic: { ...state.basic, ...data }
      })),

      saveTickets: (data) => set((state) => ({
        ...state,
        tickets: { ...state.tickets, ...data }
      })),

      saveDiscounts: (data) => set((state) => ({
        ...state,
        discounts: { ...state.discounts, ...data }
      })),

      setCurrentStep: (step) => set({ currentStep: step }),

      setFormStatus: (status) => set((state) => ({
        ...state,
        formStatus: { ...state.formStatus, ...status }
      })),

      resetForm: () => set(initialState),

      getFormData: () => ({
        basic: get().basic,
        tickets: get().tickets,
        discounts: get().discounts
      })
    }),
    {
      name: 'event-form',
      partialize: (state) => ({
        basic: state.basic,
        tickets: state.tickets,
        discounts: state.discounts,
        currentStep: state.currentStep
      })
    }
  )
);