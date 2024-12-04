export interface BaseDiscount {
    id: string;
    type: string;
    enabled: boolean;
    percentage: number;
}

// Tipe untuk diskon Early Bird
export interface EarlyBirdDiscount extends BaseDiscount {
    type: 'earlyBird';
    endDate: string;
}

// Tipe untuk diskon Last Minute
export interface LastMinuteDiscount extends BaseDiscount {
    type: 'lastMinute';
    startDate: string;
}

// Tipe gabungan untuk semua jenis diskon
export type Discount = EarlyBirdDiscount | LastMinuteDiscount;

// Interface untuk status validasi diskon
export interface DiscountValidation {
    isValid: boolean;
    message?: string;
}

// Interface untuk diskon yang telah diaplikasikan
export interface AppliedDiscount {
    discountId: string;
    type: 'earlyBird' | 'lastMinute';
    percentage: number;
    amountSaved: number;
}