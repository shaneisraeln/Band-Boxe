import { BookingRecord, ContactMessage } from '../types';

const STORAGE_KEYS = {
  BOOKINGS: 'bandboxe_bookings',
  CONTACTS: 'bandboxe_contacts',
};

export const database = {
  // Bookings Methods
  saveBooking: (booking: BookingRecord): void => {
    const existing = database.getAllBookings();
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([booking, ...existing]));
  },

  getAllBookings: (): BookingRecord[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  },

  updateBookingStatus: (id: string, status: BookingRecord['status']): void => {
    const bookings = database.getAllBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  },

  // Contact Methods
  saveContactMessage: (message: ContactMessage): void => {
    const existing = database.getAllContactMessages();
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify([message, ...existing]));
  },

  getAllContactMessages: (): ContactMessage[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    return data ? JSON.parse(data) : [];
  },

  // Utils
  clearDatabase: (): void => {
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.CONTACTS);
  }
};