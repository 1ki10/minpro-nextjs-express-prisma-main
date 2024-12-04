import { useState, useCallback } from 'react';
import { Discount, AppliedDiscount } from '@/types/discount';

export function useDiscount() {
    const isDiscountValid = useCallback((discount: Discount): boolean => {
        if (!discount.enabled) return false;

        const now = new Date();

        if (discount.type === 'lastMinute' && discount.startDate) {
            const startDate = new Date(discount.startDate);
            if (startDate > now) return false;
        }

        if (discount.type === 'earlyBird' && discount.endDate) {
            const endDate = new Date(discount.endDate);
            if (endDate < now) return false;
        }

        return true;
    }, []);

    const calculateDiscount = useCallback((price: number, discount: Discount): number => {
        if (!isDiscountValid(discount)) return price;
        
        const discountAmount = (price * discount.percentage) / 100;
        return Math.round(price - discountAmount);
    }, [isDiscountValid]);

    return {
        isDiscountValid,
        calculateDiscount
    };
}