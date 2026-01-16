import { BookingRecord, ContactMessage } from '../types';

const STORAGE_KEYS = {
  BOOKINGS: 'bandboxe_bookings',
  CONTACTS: 'bandboxe_contacts',
};

// Input validation and sanitization
const sanitizeString = (input: string): string => {
  return input.replace(/[<>]/g, '').trim();
};

const validateBooking = (booking: BookingRecord): boolean => {
  return !!(
    booking.id &&
    booking.contact.name &&
    booking.contact.email &&
    booking.contact.phone &&
    booking.items.length > 0 &&
    booking.date &&
    booking.timeSlot
  );
};

const validateContactMessage = (message: ContactMessage): boolean => {
  return !!(
    message.id &&
    message.name &&
    message.email &&
    message.phone &&
    message.message
  );
};

export const database = {
  // Bookings Methods
  saveBooking: (booking: BookingRecord): boolean => {
    try {
      if (!validateBooking(booking)) {
        console.error('Invalid booking data');
        return false;
      }

      // Sanitize booking data
      const sanitizedBooking: BookingRecord = {
        ...booking,
        contact: {
          ...booking.contact,
          name: sanitizeString(booking.contact.name),
          email: sanitizeString(booking.contact.email),
          phone: sanitizeString(booking.contact.phone),
          instructions: sanitizeString(booking.contact.instructions),
        },
        address: sanitizeString(booking.address),
      };

      const existing = database.getAllBookings();
      
      // Limit storage to prevent abuse (max 100 bookings)
      const limitedBookings = existing.slice(0, 99);
      
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([sanitizedBooking, ...limitedBookings]));
      return true;
    } catch (error) {
      console.error('Error saving booking:', error);
      return false;
    }
  },

  getAllBookings: (): BookingRecord[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error retrieving bookings:', error);
      return [];
    }
  },

  updateBookingStatus: (id: string, status: BookingRecord['status']): boolean => {
    try {
      if (!id || !status) return false;
      
      const bookings = database.getAllBookings();
      const updated = bookings.map(b => b.id === sanitizeString(id) ? { ...b, status } : b);
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Error updating booking status:', error);
      return false;
    }
  },

  // Contact Methods
  saveContactMessage: (message: ContactMessage): boolean => {
    try {
      if (!validateContactMessage(message)) {
        console.error('Invalid contact message data');
        return false;
      }

      // Sanitize contact message data
      const sanitizedMessage: ContactMessage = {
        ...message,
        name: sanitizeString(message.name),
        email: sanitizeString(message.email),
        phone: sanitizeString(message.phone),
        message: sanitizeString(message.message),
        orderId: message.orderId ? sanitizeString(message.orderId) : undefined,
      };

      const existing = database.getAllContactMessages();
      
      // Limit storage to prevent abuse (max 50 messages)
      const limitedMessages = existing.slice(0, 49);
      
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify([sanitizedMessage, ...limitedMessages]));
      return true;
    } catch (error) {
      console.error('Error saving contact message:', error);
      return false;
    }
  },

  getAllContactMessages: (): ContactMessage[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error retrieving contact messages:', error);
      return [];
    }
  },

  // Utils
  clearDatabase: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
      localStorage.removeItem(STORAGE_KEYS.CONTACTS);
    } catch (error) {
      console.error('Error clearing database:', error);
    }
  }
};