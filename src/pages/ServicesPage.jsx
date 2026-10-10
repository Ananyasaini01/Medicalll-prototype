import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Stethoscope, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const ServicesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900">Our Core Healthcare Services</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          MediCall provides three dedicated assistance pathways designed to keep you and your aging family members safe, supported, and well supplied.
        </p>
      </div>

      {/* Three Service Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Card 1: Quick Help */}
        <div className="bg-white rounded-3xl border-4 border-amber-400 p-8 shadow-lg flex flex-col justify-between space-y-8 hover:shadow-xl transition">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700">
              <Clock className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="bg-amber-100 text-amber-900 font-extrabold text-sm px-3 py-1 rounded-full uppercase tracking-wide">
                Target: 10–15 Minutes
              </span>
              <h2 className="text-3xl font-black text-slate-900">Quick Help</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                Healthcare-related assistance when you need it quickly.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-3">
              <h4 className="font-bold text-slate-800 text-lg">Categories Included:</h4>
              <ul className="space-y-2 text-slate-700 text-base">
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-amber-600 font-bold shrink-0" /> Urgent Medicines & OTC Remedies</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-amber-600 font-bold shrink-0" /> BP & Glucose Monitoring Devices</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-amber-600 font-bold shrink-0" /> Adult Emergency Care Essentials</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-amber-600 font-bold shrink-0" /> Baby & Mother Care Products</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-amber-600 font-bold shrink-0" /> Oral Hydration & Recovery Drinks</li>
              </ul>
            </div>
          </div>

          <Link to="/quick-help" className="elder-btn bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xl py-4">
            <span>Request Quick Help</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        {/* Card 2: Scheduled Delivery */}
        <div className="bg-white rounded-3xl border-4 border-blue-600 p-8 shadow-lg flex flex-col justify-between space-y-8 hover:shadow-xl transition">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700">
              <Calendar className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="bg-blue-100 text-blue-900 font-extrabold text-sm px-3 py-1 rounded-full uppercase tracking-wide">
                Future & Recurring
              </span>
              <h2 className="text-3xl font-black text-slate-900">Scheduled Delivery</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                Plan healthcare essentials for a future date and time.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-3">
              <h4 className="font-bold text-slate-800 text-lg">Key Items & Features:</h4>
              <ul className="space-y-2 text-slate-700 text-base">
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-blue-600 font-bold shrink-0" /> Monthly Prescription Medications</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-blue-600 font-bold shrink-0" /> High-Absorbency Adult Diapers & Briefs</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-blue-600 font-bold shrink-0" /> Senior Hygiene & Bed Protectors</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-blue-600 font-bold shrink-0" /> Nutritional Recovery Drinks</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-blue-600 font-bold shrink-0" /> Choice of Delivery Time Slots</li>
              </ul>
            </div>
          </div>

          <Link to="/scheduled-delivery" className="elder-btn bg-blue-700 hover:bg-blue-800 text-white font-black text-xl py-4">
            <span>Schedule a Delivery</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        {/* Card 3: Medical Equipment */}
        <div className="bg-white rounded-3xl border-4 border-teal-500 p-8 shadow-lg flex flex-col justify-between space-y-8 hover:shadow-xl transition">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-700">
              <Stethoscope className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="bg-teal-100 text-teal-900 font-extrabold text-sm px-3 py-1 rounded-full uppercase tracking-wide">
                Technician Assisted Setup
              </span>
              <h2 className="text-3xl font-black text-slate-900">Medical Equipment</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                Request and arrange medical equipment delivery.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-3">
              <h4 className="font-bold text-slate-800 text-lg">Equipment Available:</h4>
              <ul className="space-y-2 text-slate-700 text-base">
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-teal-600 font-bold shrink-0" /> Complete ICU Home Setup</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-teal-600 font-bold shrink-0" /> Ventilator & Respiratory Units</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-teal-600 font-bold shrink-0" /> Motorized Hospital Patient Beds</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-teal-600 font-bold shrink-0" /> 5L Medical Oxygen Concentrators</li>
                <li className="flex items-center gap-2.5"><Check className="w-5 h-5 text-teal-600 font-bold shrink-0" /> On-site Setup Technician Included</li>
              </ul>
            </div>
          </div>

          <Link to="/equipment" className="elder-btn bg-teal-700 hover:bg-teal-800 text-white font-black text-xl py-4">
            <span>Request Equipment</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

      </div>

      {/* Safety Notice */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-amber-700 shrink-0" />
          <p className="text-lg font-medium">
            <strong>All deliveries are tracked visually in real time.</strong> Need help filling out a form? Call 1-800-MEDICALL.
          </p>
        </div>
        <Link to="/track" className="elder-btn bg-slate-900 text-white hover:bg-slate-800 text-base shrink-0">
          Track Existing Request
        </Link>
      </div>

    </div>
  );
};

export default ServicesPage;
