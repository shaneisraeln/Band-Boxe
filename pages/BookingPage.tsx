import React, { useState } from 'react';
import { Minus, Plus, Calendar, Truck, Store, Check, CreditCard, Wallet, Banknote, Loader2 } from 'lucide-react';
import { ServiceItem, BookingState, BookingRecord } from '../types';
import { database } from '../services/databaseService';
import { useNavigate } from 'react-router-dom';

const SERVICES: ServiceItem[] = [
  { id: '1', name: 'Silk Saree Dry Wash', price: 350, image: 'https://cdn-icons-png.flaticon.com/512/3226/3226591.png' },
  { id: '2', name: 'Blazer & Coat Suit', price: 500, image: 'https://cdn-icons-png.flaticon.com/512/599/599388.png' },
  { id: '3', name: 'Traditional Garments', price: 400, image: 'https://cdn-icons-png.flaticon.com/512/9376/9376993.png', minPrice: true },
  { id: '4', name: 'Starched Clothes', price: 150, image: 'https://cdn-icons-png.flaticon.com/512/2853/2853488.png', minPrice: true },
  { id: '5', name: 'Leather & Suede', price: 600, image: 'https://cdn-icons-png.flaticon.com/512/2806/2806050.png' },
  { id: '6', name: 'Wedding Attire', price: 800, image: 'https://cdn-icons-png.flaticon.com/512/9525/9525148.png' },
];

const INITIAL_STATE: BookingState = {
  step: 1,
  items: [],
  date: '',
  timeSlot: '10:00 AM - 12:00 PM',
  pickupType: 'pickup',
  address: '',
  contact: { name: '', email: '', phone: '', instructions: '' },
  paymentMethod: 'cod'
};

const BookingPage: React.FC = () => {
  const [booking, setBooking] = useState<BookingState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateQuantity = (service: ServiceItem, delta: number) => {
    setBooking(prev => {
      const existing = prev.items.find(i => i.id === service.id);
      let newItems = [...prev.items];

      if (existing) {
        if (existing.quantity + delta <= 0) {
          newItems = newItems.filter(i => i.id !== service.id);
        } else {
          newItems = newItems.map(i => i.id === service.id ? { ...i, quantity: i.quantity + delta } : i);
        }
      } else if (delta > 0) {
        newItems.push({ ...service, quantity: 1 });
      }

      return { ...prev, items: newItems };
    });
  };

  const getQuantity = (id: string) => booking.items.find(i => i.id === id)?.quantity || 0;
  
  const subtotal = booking.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal;

  const nextStep = () => {
    if (booking.step < 3) setBooking(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const prevStep = () => {
    if (booking.step > 1) setBooking(prev => ({ ...prev, step: prev.step - 1 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database delay
    setTimeout(() => {
      const newRecord: BookingRecord = {
        id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        items: booking.items,
        date: booking.date,
        timeSlot: booking.timeSlot,
        pickupType: booking.pickupType,
        address: booking.address,
        contact: booking.contact,
        paymentMethod: booking.paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString(),
        total: total,
      };

      database.saveBooking(newRecord);
      setIsSubmitting(false);
      alert(`Booking Confirmed! Order ID: ${newRecord.id}`);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8">
        
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">BandBoxe Booking</h1>

        {/* Stepper */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-wrap gap-4 items-center justify-between overflow-x-auto">
          {['Service Selection', 'Date & Time', 'Details & Payment'].map((label, idx) => {
            const stepNum = idx + 1;
            const active = booking.step >= stepNum;
            const current = booking.step === stepNum;
            return (
              <div key={idx} className={`flex items-center gap-2 whitespace-nowrap ${current ? 'text-brand-red font-bold' : active ? 'text-gray-900' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${active ? 'bg-brand-red text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {stepNum}
                </div>
                <span>{label}</span>
                {idx < 2 && <span className="text-gray-300 mx-2">{'>'}</span>}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {booking.step === 1 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-xl font-bold mb-2">Step 1. Select Services</h2>
                <p className="text-gray-500 mb-8">Select the services to add to your cart.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES.map(service => (
                    <div key={service.id} className={`border rounded-xl p-6 flex flex-col items-center text-center transition-all ${getQuantity(service.id) > 0 ? 'border-brand-red bg-red-50' : 'border-gray-200 hover:border-red-200'}`}>
                      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <img src={service.image} alt={service.name} className="w-12 h-12 object-contain" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{service.minPrice ? 'from ' : ''}₹{service.price}{!service.minPrice && '/pc'}</p>
                      <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-2 py-1">
                        <button onClick={() => updateQuantity(service, -1)} className="p-1 hover:bg-gray-100 rounded text-gray-600"><Minus size={16} /></button>
                        <span className="w-6 font-medium">{getQuantity(service.id)}</span>
                        <button onClick={() => updateQuantity(service, 1)} className="p-1 hover:bg-gray-100 rounded text-gray-600"><Plus size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {booking.step === 2 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-xl font-bold mb-2">Step 2. Schedule Pickup/Drop-off</h2>
                <p className="text-gray-500 mb-8">Choose a convenient time for us to collect your garments.</p>
                <div className="flex gap-4 mb-8">
                  <button onClick={() => setBooking(p => ({ ...p, pickupType: 'pickup' }))} className={`flex-1 py-3 px-6 rounded-lg border flex items-center justify-center gap-2 font-medium transition-all ${booking.pickupType === 'pickup' ? 'border-brand-red bg-red-50 text-brand-red' : 'border-gray-200 text-gray-600'}`}><Truck size={20} /> Pickup</button>
                  <button onClick={() => setBooking(p => ({ ...p, pickupType: 'dropoff' }))} className={`flex-1 py-3 px-6 rounded-lg border flex items-center justify-center gap-2 font-medium transition-all ${booking.pickupType === 'dropoff' ? 'border-brand-red bg-red-50 text-brand-red' : 'border-gray-200 text-gray-600'}`}><Store size={20} /> Drop-off</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                      <div className="relative">
                        <input type="date" className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-brand-red outline-none" value={booking.date} onChange={e => setBooking(p => ({ ...p, date: e.target.value }))} />
                        <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
                      <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red outline-none bg-white" value={booking.timeSlot} onChange={e => setBooking(p => ({ ...p, timeSlot: e.target.value }))}>
                        <option>10:00 AM - 12:00 PM</option>
                        <option>12:00 PM - 02:00 PM</option>
                        <option>02:00 PM - 04:00 PM</option>
                        <option>04:00 PM - 06:00 PM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input type="text" placeholder="Enter address" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red outline-none mb-3" value={booking.address} onChange={e => setBooking(p => ({ ...p, address: e.target.value }))} />
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-xl overflow-hidden h-64 lg:h-auto relative">
                     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.333246756855!2d76.958744315354!3d11.01362499216086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1652796123456!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" className="absolute inset-0"></iframe>
                  </div>
                </div>
              </div>
            )}

             {booking.step === 3 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-xl font-bold mb-2">Step 3. Customer Details</h2>
                <p className="text-gray-500 mb-8">Please provide your contact details for the order.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red outline-none" value={booking.contact.name} onChange={e => setBooking(p => ({ ...p, contact: { ...p.contact, name: e.target.value } }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red outline-none" value={booking.contact.phone} onChange={e => setBooking(p => ({ ...p, contact: { ...p.contact, phone: e.target.value } }))} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red outline-none" value={booking.contact.email} onChange={e => setBooking(p => ({ ...p, contact: { ...p.contact, email: e.target.value } }))} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                    <textarea className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red outline-none h-32 resize-none" placeholder="E.g., Stains on the saree pallu..." value={booking.contact.instructions} onChange={e => setBooking(p => ({ ...p, contact: { ...p.contact, instructions: e.target.value } }))}></textarea>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-8 mt-8">
                   <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Options</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <button onClick={() => setBooking(p => ({ ...p, paymentMethod: 'card' }))} className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${booking.paymentMethod === 'card' ? 'border-brand-red bg-red-50 text-brand-red ring-1 ring-brand-red' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}><CreditCard size={24} /><span className="font-medium text-sm">Credit/Debit Card</span></button>
                      <button onClick={() => setBooking(p => ({ ...p, paymentMethod: 'upi' }))} className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${booking.paymentMethod === 'upi' ? 'border-brand-red bg-red-50 text-brand-red ring-1 ring-brand-red' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}><Wallet size={24} /><span className="font-medium text-sm">UPI / Wallet</span></button>
                      <button onClick={() => setBooking(p => ({ ...p, paymentMethod: 'cod' }))} className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${booking.paymentMethod === 'cod' ? 'border-brand-red bg-red-50 text-brand-red ring-1 ring-brand-red' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}><Banknote size={24} /><span className="font-medium text-sm">Cash on Delivery</span></button>
                   </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
               {booking.step > 1 ? (<button onClick={prevStep} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Back</button>) : <div></div>}
               {booking.step < 3 && (<button onClick={nextStep} disabled={booking.items.length === 0} className="px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed">Continue</button>)}
            </div>
          </div>

          <div className="lg:w-96">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-serif font-bold text-xl mb-6 border-b pb-4">Booking Summary</h3>
              {booking.items.length === 0 ? (<p className="text-gray-400 text-center py-8">Your cart is empty.</p>) : (
                <div className="space-y-4 mb-6">
                  {booking.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-gray-900">{item.quantity}x</span>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
              {booking.items.length > 0 && (
                <>
                  <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2"><span>Total Estimate</span><span>₹{total}</span></div>
                  </div>
                  <button 
                    onClick={booking.step === 3 ? handleSubmit : nextStep} 
                    disabled={isSubmitting}
                    className="w-full bg-brand-red text-white py-4 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 size={20} className="animate-spin" />}
                    {booking.step === 3 ? 'Confirm Order' : 'Next Step'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;