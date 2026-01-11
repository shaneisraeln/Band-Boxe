import React, { useState, useEffect } from 'react';
import { database } from '../services/databaseService';
import { BookingRecord, ContactMessage } from '../types';
import { Package, MessageSquare, Clock, CheckCircle2, XCircle, Trash2 } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'contacts'>('bookings');

  useEffect(() => {
    setBookings(database.getAllBookings());
    setContacts(database.getAllContactMessages());
  }, []);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      database.clearDatabase();
      setBookings([]);
      setContacts([]);
    }
  };

  const getStatusColor = (status: BookingRecord['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Database Dashboard</h1>
            <p className="text-gray-500">View and manage orders and inquiries.</p>
          </div>
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 border border-red-100 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} /> Clear Database
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'bookings' ? 'bg-brand-red text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Package size={20} /> Bookings ({bookings.length})
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'contacts' ? 'bg-brand-red text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <MessageSquare size={20} /> Contact Inquiries ({contacts.length})
          </button>
        </div>

        {activeTab === 'bookings' ? (
          <div className="grid grid-cols-1 gap-6">
            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-20 text-center border border-gray-100">
                <Package size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-500 text-lg">No bookings found in the database.</p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-xs font-bold text-brand-red uppercase tracking-wider">Order #{booking.id.slice(-6)}</span>
                        <h3 className="text-xl font-bold text-gray-900">{booking.contact.name}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} /> {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-gray-600">
                        <span className="font-semibold">Type:</span> {booking.pickupType}
                      </div>
                      <div className="text-gray-600">
                        <span className="font-semibold">Items:</span> {booking.items.reduce((a, b) => a + b.quantity, 0)}
                      </div>
                      <div className="text-gray-900 font-bold">
                        Total: ₹{booking.total}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 text-xs space-y-2">
                       {booking.items.map((item, idx) => (
                         <div key={idx} className="flex justify-between">
                           <span>{item.quantity}x {item.name}</span>
                           <span>₹{item.price * item.quantity}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="lg:w-64 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8">
                    <div className="text-sm space-y-2 mb-4">
                      <p className="font-bold text-gray-900">Contact Details:</p>
                      <p className="text-gray-600">{booking.contact.phone}</p>
                      <p className="text-gray-600 truncate">{booking.contact.email}</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-gray-900">Address:</p>
                      <p className="text-gray-600 line-clamp-2">{booking.address}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl p-20 text-center border border-gray-100">
                <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-500 text-lg">No contact messages found.</p>
              </div>
            ) : (
              contacts.map((msg) => (
                <div key={msg.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-900">{msg.name}</h3>
                    <span className="text-[10px] text-gray-400 font-bold">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 italic flex-grow">"{msg.message}"</p>
                  <div className="border-t border-gray-50 pt-4 space-y-1">
                    <p className="text-xs font-bold text-brand-red">{msg.email}</p>
                    <p className="text-xs text-gray-500">{msg.phone}</p>
                    {msg.orderId && <p className="text-[10px] uppercase font-bold text-gray-400 mt-2">Re: Order {msg.orderId}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;