export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  minPrice?: boolean;
}

export interface CartItem extends ServiceItem {
  quantity: number;
}

export interface BookingState {
  step: number;
  items: CartItem[];
  date: string;
  timeSlot: string;
  pickupType: 'pickup' | 'dropoff';
  address: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    instructions: string;
  };
  paymentMethod: 'card' | 'upi' | 'cod';
}

export interface BookingRecord extends Omit<BookingState, 'step'> {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  total: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderId?: string;
  message: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image: string;
  role?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}