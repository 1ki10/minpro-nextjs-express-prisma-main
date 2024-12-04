import { useState } from 'react';
import { Event } from '@/types/event';
import { useDiscount } from '@/hooks/use-discount';
import { formatCurrency } from '@/lib/utils/currency';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BuyTicketProps {
    event: Event;
    onPurchase: (data: PurchaseTicketData) => void;
}

export interface PurchaseTicketData {
    eventId: string;
    quantity: number;
    buyerName: string;
    buyerEmail: string;
    totalPrice: number;
    discountApplied?: {
        id: string;
        type: string;
        percentage: number;
        amountSaved: number;
    };
}

export function BuyTicket({ event, onPurchase }: BuyTicketProps) {
    const [quantity, setQuantity] = useState(1);
    const [buyerName, setBuyerName] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
    const { isDiscountValid, calculateDiscount } = useDiscount();

    const currentDiscount = event.discounts?.find(discount => 
        isDiscountValid(discount)
    );

    const basePrice = event.price * quantity;
    const finalPrice = currentDiscount 
        ? calculateDiscount(basePrice, currentDiscount)
        : basePrice;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const purchaseData: PurchaseTicketData = {
            eventId: event.id,
            quantity,
            buyerName,
            buyerEmail,
            totalPrice: finalPrice,
            discountApplied: currentDiscount ? {
                id: currentDiscount.id,
                type: currentDiscount.type,
                percentage: currentDiscount.percentage,
                amountSaved: basePrice - finalPrice
            } : undefined
        };

        onPurchase(purchaseData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Tickets
                </label>
                <Input
                    type="number"
                    min={1}
                    max={event.availableSeats}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                </label>
                <Input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    required
                    className="w-full"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <Input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    required
                    className="w-full"
                />
            </div>

            <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>{formatCurrency(basePrice)}</span>
                </div>
                {currentDiscount && (
                    <div className="flex justify-between text-green-600 mb-2">
                        <span>Discount</span>
                        <span>-{formatCurrency(basePrice - finalPrice)}</span>
                    </div>
                )}
                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(finalPrice)}</span>
                </div>
            </div>

            <Button type="submit" className="w-full">
                Get Tickets
            </Button>
        </form>
    );
}