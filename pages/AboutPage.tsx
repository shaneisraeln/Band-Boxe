import React from 'react';
import { Target, MapPin, CheckCircle2 } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-[400px] flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1600" 
          alt="Clothes Rack" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">About BandBoxe</h1>
          <p className="text-xl md:text-2xl font-light text-red-100 tracking-wide">Caring for Your Garments Since 1950</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Welcome to BandBoxe <span className="text-brand-red">Dry Cleaners</span></h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to BandBoxe Dry Cleaners, your trusted partner in garment care. Established in 1950, we have proudly served the community of Coimbatore for over seven decades, specializing in the delicate art of dry cleaning, laundry, and specialized garment care.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our commitment to quality and customer satisfaction has made us a household name. We blend traditional fabric knowledge with modern cleaning technologies to ensure every thread is treated with respect.
            </p>
            
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 mt-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-red p-3 rounded-full text-white shrink-0">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-red mb-2">Our Mission</h3>
                  <p className="text-gray-700 text-sm">
                    Our mission is to provide exceptional garment cleaning and preservation services that exceed customer expectations, ensuring every item, from traditional wear to daily attire, receives the utmost care and professional attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
             <img 
              src="https://images.unsplash.com/photo-1545173168-9f1947eebb8f?auto=format&fit=crop&q=80&w=800"
              alt="Coimbatore Landmark"
              className="rounded-2xl shadow-2xl"
             />
             <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
               <p className="font-serif text-lg font-bold text-gray-900 mb-2">Serving Coimbatore</p>
               <p className="text-gray-500 text-sm">A legacy of trust woven into the fabric of the city since 1950.</p>
             </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-24 bg-gray-50 rounded-3xl p-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { title: 'Decades of Expertise', desc: 'Since 1950, unmatched knowledge in fabric care.' },
              { title: 'Professional Standards', desc: 'State-of-the-art technology and a skilled team.' },
              { title: 'Prompt Turnaround', desc: 'Reliable, efficient service times.' },
              { title: 'Reliability & Trust', desc: 'Building long-lasting relationships with integrity.' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                 <CheckCircle2 className="text-brand-red shrink-0" size={28} />
                 <div>
                   <h4 className="font-bold text-lg text-gray-900">{item.title}</h4>
                   <p className="text-gray-600">{item.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
           <div>
              <h2 className="text-3xl font-serif font-bold text-brand-red mb-6">Our Location & Contact</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900">Address:</h4>
                  <p className="text-gray-600">123 BandBoxe Lane, Coimbatore, Tamil Nadu, 641001, India.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Phone:</h4>
                  <p className="text-gray-600">+91 12345 67890</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email:</h4>
                  <p className="text-gray-600">info@bandboxe.com</p>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-serif font-bold text-brand-red mb-4">Our Commitment</h3>
                <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-brand-red pl-4">
                  We are committed to sustainable practices, using eco-friendly cleaning solutions whenever possible. Your garments are in safe hands with us, and we promise to treat them as if they were our own.
                </p>
              </div>
           </div>
           <div className="rounded-2xl overflow-hidden shadow-lg h-80">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.333246756855!2d76.958744315354!3d11.01362499216086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1652796123456!5m2!1sen!2sin" 
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
  );
};

export default AboutPage;