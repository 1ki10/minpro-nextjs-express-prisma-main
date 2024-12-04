import type { BasicInfo, TicketInfo, DiscountInfo } from '@/types/event';

export function validateBasicInfo(data: BasicInfo): BasicInfo {
 if (!data.title?.trim()) throw new Error('Judul harus diisi');
 if (!data.date) throw new Error('Tanggal harus diisi');
 if (!data.time) throw new Error('Waktu harus diisi');
 if (!data.location) throw new Error('Lokasi harus diisi');
 
 if (data.location.type === 'physical') {
   if (!data.location.city) throw new Error('Kota harus diisi');
   if (!data.location.venue) throw new Error('Venue harus diisi');
 } else {
   if (!data.location.platform) throw new Error('Platform harus diisi');
 }
 return data;
}

export function validateTickets(data: TicketInfo): TicketInfo {
 if (data.type === 'paid' && (!data.price || data.price <= 0)) {
   throw new Error('Harga tiket harus lebih dari 0');
 }
 if (!data.totalSeats || data.totalSeats < 1) {
   throw new Error('Jumlah kursi minimal 1');
 }
 if (data.ticketLimit && data.ticketLimit > data.totalSeats) {
   throw new Error('Batas tiket tidak boleh melebihi total kursi');
 }
 return data;
}

export function validateDiscounts(data: DiscountInfo): DiscountInfo {
 if (data.earlyBird?.enabled) {
   if (!data.earlyBird.percentage || data.earlyBird.percentage <= 0) {
     throw new Error('Persentase early bird harus lebih dari 0');
   }
   if (!data.earlyBird.endDate) {
     throw new Error('Tanggal berakhir early bird harus diisi');
   }
 }
 if (data.lastMinute?.enabled) {
   if (!data.lastMinute.percentage || data.lastMinute.percentage <= 0) {
     throw new Error('Persentase last minute harus lebih dari 0');
   }
   if (!data.lastMinute.startDate) {
     throw new Error('Tanggal mulai last minute harus diisi');
   }
 }
 return data;
}