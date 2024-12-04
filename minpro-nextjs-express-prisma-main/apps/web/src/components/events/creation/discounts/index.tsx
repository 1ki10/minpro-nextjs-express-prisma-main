'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateDiscount } from './date-discount';
import { Button } from '@/components/ui/button';
import { useEventFormStore } from '@/store/event-form/store';

const discountSchema = z.object({
earlyBird: z.object({
  enabled: z.boolean(),
  percentage: z.number().min(0).max(100).optional(),
  endDate: z.string().optional()
}),
lastMinute: z.object({
  enabled: z.boolean(), 
  percentage: z.number().min(0).max(100).optional(),
  startDate: z.string().optional()
})
});

export type DiscountFormData = z.infer<typeof discountSchema>;

interface DiscountFormProps {
initialData?: Partial<DiscountFormData>;
onSubmit: (data: DiscountFormData) => void;
}

export function DiscountForm({ initialData = {}, onSubmit }: DiscountFormProps) {
const saveDiscounts = useEventFormStore(state => state.saveDiscounts);

const {
  register,
  handleSubmit,
  watch,
  formState: { errors, isSubmitting }
} = useForm<DiscountFormData>({
  resolver: zodResolver(discountSchema),
  defaultValues: {
    earlyBird: {
      enabled: initialData.earlyBird?.enabled || false,
      percentage: initialData.earlyBird?.percentage || 0,
      endDate: initialData.earlyBird?.endDate || ''
    },
    lastMinute: {
      enabled: initialData.lastMinute?.enabled || false,
      percentage: initialData.lastMinute?.percentage || 0,
      startDate: initialData.lastMinute?.startDate || ''
    }
  }
});

const handleFormSubmit = (data: DiscountFormData) => {
  saveDiscounts(data); // Simpan ke store saat form disubmit
  onSubmit(data);
};

return (
  <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-medium mb-4">Promotional Discounts</h3>
      
      <div className="space-y-6">
        <DateDiscount
          type="earlyBird"
          title="Early Bird Discount"
          description="Reward early registrations with special pricing" 
          register={register}
          errors={{
            enabled: errors.earlyBird?.enabled?.message,
            percentage: errors.earlyBird?.percentage?.message,
            endDate: errors.earlyBird?.endDate?.message
          }}
        />

        <div className="border-t pt-6">
          <DateDiscount
            type="lastMinute"
            title="Last Minute Discount"
            description="Fill remaining seats with last-minute offers"
            register={register} 
            errors={{
              enabled: errors.lastMinute?.enabled?.message,
              percentage: errors.lastMinute?.percentage?.message,
              startDate: errors.lastMinute?.startDate?.message
            }}
          />
        </div>
      </div>
    </div>

    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium mb-2">Discount Guidelines</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>• Early bird discounts typically range from 20-30%</li>
        <li>• Consider your profit margins when setting discounts</li>
        <li>• Use time-limited offers to create urgency</li>
        <li>• You can modify discounts later if needed</li>
      </ul>
    </div>

    <div className="flex justify-end">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        Review Event Details
      </Button>
    </div>
  </form>
);
}

export type { DateDiscountProps } from './date-discount';
export { DateDiscount } from './date-discount';