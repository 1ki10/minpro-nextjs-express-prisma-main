'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useEventFormStore } from '@/store/event-form/store';
import { EventFormWrapper } from '@/components/events/creation/form-wrapper';
import { ConfirmCreateDialog } from '@/components/ui/dialog/confirm-create';
import { createEvent } from '@/services/event/create';

export default function CreateEventPage() {
  const router = useRouter();
  const store = useEventFormStore();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleCreateEvent = async () => {
    try {
      store.setFormStatus({ isSubmitting: true });
      
      const formData = store.getFormData();
      const response = await createEvent(formData);

      if (response.success) {
        toast.success('Event berhasil dibuat!');
        store.resetForm();
        router.push('/events');
        return;
      }

      throw new Error(response.message || 'Gagal membuat event');
    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(error.message || 'Gagal membuat event');
    } finally {
      store.setFormStatus({ isSubmitting: false });
      setIsConfirmOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <EventFormWrapper onComplete={() => setIsConfirmOpen(true)} />
      
      <ConfirmCreateDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleCreateEvent}
        eventData={store.getFormData()}
        isSubmitting={store.formStatus.isSubmitting}
      />
    </div>
  );
}