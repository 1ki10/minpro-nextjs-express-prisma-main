'use client';

import { useEffect } from 'react';
import { useEventFormStore } from '@/store/event-form/store';
import { BasicInfoForm } from './basic-info';
import { TicketForm } from './tickets';
import { DiscountForm } from './discounts';

interface Props {
  onComplete: () => void;
}

export function EventFormWrapper({ onComplete }: Props) {
  const store = useEventFormStore();

  useEffect(() => {
    useEventFormStore.persist.rehydrate();
  }, []);

  const handleStepComplete = async (data: any) => {
    try {
      switch (store.currentStep) {
        case 'basic':
          store.saveBasicInfo(data);
          store.setCurrentStep('tickets');
          break;
        case 'tickets':
          store.saveTickets(data);
          store.setCurrentStep('discounts');
          break;
        case 'discounts':
          store.saveDiscounts(data);
          onComplete();
          break;
      }
    } catch (error) {
      console.error('Error handling step completion:', error);
    }
  };

  return (
    <div className="space-y-6">
      {store.currentStep === 'basic' && (
        <BasicInfoForm 
          initialData={store.basic} 
          onSubmit={handleStepComplete} 
        />
      )}
      {store.currentStep === 'tickets' && (
        <TicketForm 
          initialData={store.tickets} 
          onSubmit={handleStepComplete} 
        />
      )}
      {store.currentStep === 'discounts' && (
        <DiscountForm 
          initialData={store.discounts} 
          onSubmit={handleStepComplete} 
        />
      )}
    </div>
  );
}