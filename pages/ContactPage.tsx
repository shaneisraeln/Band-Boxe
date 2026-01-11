import React, { useState } from 'react';
import { MapPin, Phone, Mail, Loader2, CheckCircle } from 'lucide-react';
import { database } from '../services/databaseService';
import { ContactMessage } from '../types';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderId: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate database delay
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: 'MSG-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      database.saveContactMessage(newMessage);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', orderId: '', message: '' });
      
      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-brand-red to-red-900 py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
        <p className="text-red-100 text-lg">Specialized Dry Wash for Your Finest Garments.</p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 -mt-8 mb-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white rounded-xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-serif font-bold text-brand-red mb-8 text-center border-b pb-4">Get in Touch</h2>
            
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle size={64} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Received!</h3>
                <p className="text-gray-600">Thank you for reaching out. We will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-brand-red font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red outline-none" 
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red outline-none" 
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red outline-none" 
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order ID (Optional)</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red outline-none" 
                      placeholder="If applicable"
                      value={formData.orderId}
                      onChange={e => setFormData({...formData, orderId: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-red outline-none h-40 resize-none" 
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-brand-red text-white py-4 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                >
                  {status === 'loading' && <Loader2 className="animate-spin" size={20} />}
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="lg:w-96 flex flex-col gap-8">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="font-serif font-bold text-brand-red text-xl mb-6 border-l-4 border-brand-red pl-3">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-full shadow-sm text-brand-red"><MapPin size={20} /></div>
                  <div>
                    <p className="font-medium text-gray-900">123, Silk Saree Lane,</p>
                    <p className="text-gray-600 text-sm">T. Nagar, Chennai, India - 600017</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-full shadow-sm text-brand-red"><Phone size={20} /></div>
                  <p className="text-gray-700 font-medium">+91 98765 43210</p>
                </div>
                 <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-full shadow-sm text-brand-red"><Mail size={20} /></div>
                  <p className="text-gray-700 font-medium">contact@bandboxe.in</p>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden h-64 lg:h-auto min-h-[250px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6874493394875!2d80.2354!3d13.0401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526655c66d2179%3A0x600c43c7b2a0c4f3!2sT.%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1652796123456!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;