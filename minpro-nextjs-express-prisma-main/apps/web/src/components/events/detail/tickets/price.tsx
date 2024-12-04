import { Event } from '@/types/event';
import { useDiscount } from '@/hooks/use-discount';
import { formatCurrency } from '@/lib/utils/currency';

interface TicketPriceProps {
    event: Event;
}

export function TicketPrice({ event }: TicketPriceProps) {
    const { isDiscountValid, calculateDiscount } = useDiscount();

    const currentDiscount = event.discounts?.find(discount => 
        isDiscountValid(discount)
    );

    const finalPrice = currentDiscount 
        ? calculateDiscount(event.price, currentDiscount)
        : event.price;

    return (
        <div className="space-y-2">
            {event.isFree ? (
                <div className="text-2xl font-bold text-green-600">Free</div>
            ) : (
                <>
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">
                            {formatCurrency(finalPrice)}
                        </div>
                        {currentDiscount && (
                            <div className="text-lg text-gray-500 line-through">
                                {formatCurrency(event.price)}
                            </div>
                        )}
                    </div>

                    {currentDiscount && (
                        <div className="text-sm text-green-600">
                            {currentDiscount.percentage}% off
                            {currentDiscount.type === 'earlyBird' && ' - Early Bird Price'}
                            {currentDiscount.type === 'lastMinute' && ' - Last Minute Deal'}
                        </div>
                    )}
                </>
            )}

            <div className="text-sm text-gray-600">
                {event.availableSeats} tickets remaining
            </div>
        </div>
    );
}