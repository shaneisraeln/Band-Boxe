import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Plus, Minus } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya S.',
    text: 'My silk saree looks brand new after their service. Highly recommend for traditional wear.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    role: 'Regular Customer'
  },
  {
    id: '2',
    name: 'Rahul K.',
    text: 'Perfectly cleaned my blazer for a wedding. Excellent service and timely delivery.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    role: 'Business Professional'
  },
   {
    id: '3',
    name: 'Anjali M.',
    text: 'They did an amazing job with my starched cotton sarees and classical garments.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    role: 'Teacher'
  }
];

const faqs = [
  {
    question: "How do I schedule a pickup?",
    answer: "You can easily schedule a pickup through our 'Book a Pickup' page. Select your services, choose a convenient date and time slot, and enter your address. Our valet will be at your doorstep."
  },
  {
    question: "What is the turnaround time for dry cleaning?",
    answer: "Our standard turnaround time is 3-4 days. However, for express service (24 hours), please contact us directly or mention it in the special instructions. Additional charges may apply."
  },
  {
    question: "Do you guarantee stain removal?",
    answer: "We use industry-leading stain removal techniques. While we can remove most stains, some set-in stains (especially old ones or those treated with heat) may not be completely removable without damaging the fabric. We will advise you upon inspection."
  },
  {
    question: "Is there a minimum order value for pickup?",
    answer: "Yes, the minimum order value for free pickup and delivery is ₹500. For orders below this amount, a small convenience fee of ₹50 may apply."
  },
  {
    question: "How do you handle expensive silk sarees?",
    answer: "Silk sarees are our specialty. We use a gentle, organic solvent cleaning process that preserves the zari and fabric luster. Each saree is individually inspected and hand-finished."
  }
];

const HomePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-brand-cream min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        {/* Background Mandala Effect */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-no-repeat bg-contain opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/4" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23b91c1c' d='M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z'/%3E%3C/svg%3E")` }}>
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image (Moved to Left) */}
            <div className="lg:w-1/2 w-full relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="relative z-10 bg-white p-2 rounded-lg shadow-2xl rotate-1">
                   <img 
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=2070" 
                    alt="Professional Garment Care" 
                    className="w-full h-[300px] lg:h-[400px] object-cover rounded-md"
                  />
                </div>
                {/* Decorative elements behind image */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-gold/30 rounded-lg -z-0"></div>
              </div>
            </div>

            {/* Content (Moved to Right) */}
            <div className="lg:w-1/2 z-10">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-6">
                India's Trusted <br />
                <span className="text-brand-red">Specialist</span> in <br />
                Garment Care
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-lg">
                Expert Dry Cleaning for Silk Sarees, Blazers, Suits, and Traditional Attire. Preserving Heritage, Ensuring Freshness.
              </p>
              <Link 
                to="/booking" 
                className="inline-block bg-brand-red text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-red-800 transition-colors shadow-xl shadow-red-200"
              >
                Book a Pickup
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Red Stats Banner */}
      <div className="bg-brand-red text-white py-12 relative z-20 shadow-xl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-red-800/50">
            <div className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-1">5K+</h3>
              <p className="text-red-100 text-sm md:text-base font-light">Happy Customers</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-1">99%</h3>
              <p className="text-red-100 text-sm md:text-base font-light">Satisfaction</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-1">24/7</h3>
              <p className="text-red-100 text-sm md:text-base font-light">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Services Section */}
      <section className="py-20 bg-brand-cream relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (Vertical Card) - Span 5 */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-orange-50 h-full flex flex-col hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 lg:h-80 w-full overflow-hidden rounded-[1.5rem] mb-6 group">
                  <img 
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800" 
                    alt="Silk Saree" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="px-4 pb-4 flex-1 flex flex-col">
                  <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                    Silk Saree & <br/>Traditional Wear Care
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Delicate handling and expert cleaning for your precious silks, lehengas, and embroidered garments. Color protection and fabric restoration.
                  </p>
                  <div className="mt-auto">
                    <Link to="/services" className="bg-brand-red text-white px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 hover:bg-red-800 transition-colors">
                      Explore Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Span 7 */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              {/* Top: Blazers Card */}
              <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 hover:shadow-xl transition-all duration-300">
                <div className="flex-1">
                  <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                    Blazers, Suits & <br/>Formal Wear
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Sharp creases and impeccable cleaning for coats, suits, and starched clothes. Perfect for professional and ceremonial occasions.
                  </p>
                  <Link to="/services" className="bg-brand-red text-white px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 hover:bg-red-800 transition-colors">
                      Explore Services
                  </Link>
                </div>
                <div className="w-full md:w-48 h-56 rounded-2xl overflow-hidden shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1594938298603-c8148c47e356?auto=format&fit=crop&q=80&w=400" 
                    alt="Suits" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bottom: Split Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                
                {/* Red Stats Card */}
                <div className="bg-gradient-to-br from-brand-red to-red-900 rounded-[2rem] p-8 text-white flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
                   <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                   <div className="relative z-10 grid grid-cols-3 gap-2 w-full divide-x divide-red-400/30">
                      <div>
                        <span className="block text-2xl font-bold font-serif">5K+</span>
                        <span className="text-[10px] uppercase opacity-80">Happy<br/>Customers</span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold font-serif">99%</span>
                        <span className="text-[10px] uppercase opacity-80">Satisfaction</span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold font-serif">24/7</span>
                        <span className="text-[10px] uppercase opacity-80">Support</span>
                      </div>
                   </div>
                </div>

                {/* Mini Testimonials Card */}
                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 flex flex-col justify-between shadow-sm">
                  <h4 className="font-serif font-bold text-lg text-gray-900 mb-4">What Our Customers Say</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <img src={testimonials[0].image} className="w-10 h-10 rounded-full object-cover" alt="" />
                      <div>
                        <p className="text-xs text-gray-600 italic line-clamp-2">"{testimonials[0].text}"</p>
                        <p className="text-xs font-bold text-gray-900 mt-1">{testimonials[0].name}</p>
                      </div>
                    </div>
                     <div className="flex gap-3 items-start border-t border-gray-100 pt-3">
                      <img src={testimonials[1].image} className="w-10 h-10 rounded-full object-cover" alt="" />
                      <div>
                        <p className="text-xs text-gray-600 italic line-clamp-2">"{testimonials[1].text}"</p>
                         <p className="text-xs font-bold text-gray-900 mt-1">{testimonials[1].name}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Expanded Testimonials Section */}
      <section className="py-20 bg-[#FDF8F0] border-t border-gray-200/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900">More Testimonials on Our Specialized Care</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-xl border border-gray-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                 <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
                 <div>
                   <h5 className="font-bold text-gray-900 text-lg mb-1">{t.name}</h5>
                   <p className="text-gray-600 text-sm leading-relaxed mb-2">{t.text}</p>
                   <div className="flex gap-0.5">
                     {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />)}
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white" id="faq">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
             <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about our services, pricing, and care.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0">
                <button
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className={`text-lg font-medium font-serif ${openFaq === index ? 'text-brand-red' : 'text-gray-900 group-hover:text-brand-red'} transition-colors`}>
                    {faq.question}
                  </span>
                  <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-brand-red' : 'text-gray-400'}`}>
                    {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-600 leading-relaxed pr-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;