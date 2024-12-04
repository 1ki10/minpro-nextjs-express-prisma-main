'use client';

import { UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Calendar, Percent } from 'lucide-react';

export interface DateDiscountProps {
  type: 'earlyBird' | 'lastMinute';
  title: string;
  description: string;
  register: UseFormRegister<any>;
  errors?: {
    enabled?: string;
    percentage?: string;
    startDate?: string;
    endDate?: string;
  };
}

export function DateDiscount({
  type,
  title,
  description,
  register,
  errors
}: DateDiscountProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <Switch
          {...register(`${type}.enabled`)}
        />
      </div>

      <div className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Discount Percentage */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Discount Percentage
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                min="0"
                max="100"
                className="pl-10"
                placeholder="Enter percentage"
                {...register(`${type}.percentage`, {
                  setValueAs: (value: string) => 
                    value ? parseInt(value, 10) : undefined
                })}
                error={errors?.percentage}
              />
            </div>
            {errors?.percentage && (
              <p className="text-sm text-red-500">{errors.percentage}</p>
            )}
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {type === 'earlyBird' ? 'End Date' : 'Start Date'}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                className="pl-10"
                {...register(
                  `${type}.${type === 'earlyBird' ? 'endDate' : 'startDate'}`
                )}
                error={errors?.[type === 'earlyBird' ? 'endDate' : 'startDate']}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            {errors?.[type === 'earlyBird' ? 'endDate' : 'startDate'] && (
              <p className="text-sm text-red-500">
                {errors[type === 'earlyBird' ? 'endDate' : 'startDate']}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}