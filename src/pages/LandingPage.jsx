import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  Stethoscope, 
  ShieldCheck, 
  HeartHandshake, 
  PhoneCall, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Package,
  Users,
  Activity,
  ChevronDown
} from 'lucide-react';

export const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How fast is MediCall Quick Assistance?",
      a: "Where operationally available, MediCall aims to deliver urgent healthcare supplies and emergency assistance items within approximately 10 to 15 minutes."
    },
    {
      q: "Who is MediCall primarily designed for?",
      a: "MediCall is tailored for senior citizens, adults living alone, elderly couples, and family members or caregivers who live far away and need to arrange healthcare support for their loved ones."
    },
    {
      q: "Does MediCall replace emergency ambulance services?",
      a: "No. MediCall focuses on healthcare assistance, medical product delivery, scheduled supplies, and medical equipment setup. For life-threatening medical emergencies, please immediately dial 112 / 911 or contact local ambulance services."
    },
    {
      q: "Can I schedule recurring monthly medicine deliveries?",
      a: "Yes! Our Scheduled Delivery service allows you to plan essential medicines, adult care products, and recovery nutrition for exact future dates and times with optional recurring frequency."
    },
    {
      q: "Is technician assistance included with Medical Equipment delivery?",
      a: "Yes. For heavy medical equipment such as hospital beds, oxygen concentrators, and ventilators, trained medical equipment support professionals assist with initial delivery and installation."
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-700/80 border border-blue-400/40 text-amber-300 font-bold px-4 py-2 rounded-full text-base sm:text-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Dedicated Healthcare Assistance Service</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              MEDiCALLL — Healthcare Help, When You Need It.
            </h1>

            <p className="text-xl sm:text-2xl text-blue-100 font-medium leading-relaxed max-w-2xl">
              Reliable healthcare assistance for you and your loved ones, even when family isn't nearby.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
              <Link 
                to="/quick-help" 
                className="elder-btn bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-lg text-xl py-4 px-8 transform transition hover:-translate-y-0.5"
              >
                <Clock className="w-6 h-6 text-slate-950" />
                <span>Get Help Now</span>
              </Link>

              <Link 
                to="/scheduled-delivery" 
                className="elder-btn bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-xl py-4 px-6 border-2 border-white shadow-md"
              >
                <Calendar className="w-6 h-6 text-blue-700" />
                <span>Schedule a Delivery</span>
              </Link>

              <Link 
                to="/equipment" 
                className="elder-btn bg-blue-700/60 hover:bg-blue-600/80 text-white font-extrabold text-xl py-4 px-6 border border-blue-400/40"
              >
                <Stethoscope className="w-6 h-6 text-teal-300" />
                <span>Medical Equipment</span>
              </Link>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-4 text-center border-t border-blue-700/60 max-w-lg mx-auto lg:mx-0 text-blue-100">
              <div>
                <span className="block text-2xl font-black text-amber-300">10-15 Min</span>
                <span className="text-xs sm:text-sm font-semibold text-blue-200">Target Quick Help</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-emerald-400">100% Verified</span>
                <span className="text-xs sm:text-sm font-semibold text-blue-200">Assistance Staff</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-blue-300">24/7 Support</span>
                <span className="text-xs sm:text-sm font-semibold text-blue-200">Helpline Available</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl text-slate-900 max-w-md w-full bg-white">
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <HeartHandshake className="w-7 h-7 text-blue-700" />
                <span>Caregiver Quick Request</span>
              </h3>
              <p className="text-slate-600 text-base mb-6">
                Arranging support for elderly parents or living alone? Request quick delivery or support in seconds.
              </p>
              
              <div className="space-y-4">
                <Link to="/quick-help" className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl text-lg shadow-sm">
                  ⚡ Request Immediate Delivery
                </Link>
                <Link to="/scheduled-delivery" className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-4 rounded-xl text-lg border border-slate-300">
                  📅 Plan Monthly Supplies
                </Link>
                <Link to="/equipment" className="block w-full text-center bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold py-3.5 px-4 rounded-xl text-lg border border-teal-200">
                  🩺 Order Medical Beds & ICU Setup
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW MEDICALL WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">How MediCall Works</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Designed for simplicity and ease of use, especially for senior citizens and family members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm text-center space-y-4 relative">
            <div className="w-16 h-16 bg-blue-100 text-blue-800 font-black text-2xl rounded-2xl flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Choose Service</h3>
            <p className="text-slate-600 text-lg">
              Select Quick Assistance, Scheduled Delivery, or Medical Equipment based on your current need.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm text-center space-y-4 relative">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 font-black text-2xl rounded-2xl flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Enter Details</h3>
            <p className="text-slate-600 text-lg">
              Provide quantity, delivery address, and contact number in large, senior-friendly simple forms.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm text-center space-y-4 relative">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 font-black text-2xl rounded-2xl flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Track & Receive</h3>
            <p className="text-slate-600 text-lg">
              Follow real-time progress on your tracking timeline while our verified provider completes your request.
            </p>
          </div>
        </div>
      </section>

      {/* THREE CORE SERVICES OVERVIEW */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-blue-700 font-bold uppercase tracking-wider text-sm">Three Pillars of Support</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Comprehensive Healthcare Assistance</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Instant Delivery */}
            <div className="bg-white rounded-3xl p-8 border-2 border-amber-300 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700">
                  <Clock className="w-8 h-8" />
                </div>
                <div className="inline-block bg-amber-100 text-amber-900 text-sm font-bold px-3 py-1 rounded-full">
                  Target: 10–15 Minutes
                </div>
                <h3 className="text-2xl font-black text-slate-900">Instant Delivery</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Urgent healthcare items, medicines, diagnostic monitors, baby/mother care, and adult emergency supplies delivered rapidly.
                </p>
                <ul className="space-y-2 text-slate-700 text-base">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-amber-600" /> Urgent Medicines & OTC</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-amber-600" /> BP Monitors & Oximeters</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-amber-600" /> Adult Emergency Care Supplies</li>
                </ul>
              </div>
              <Link to="/quick-help" className="elder-btn bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold w-full">
                Get Quick Help Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Scheduled Delivery */}
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-300 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="inline-block bg-blue-100 text-blue-900 text-sm font-bold px-3 py-1 rounded-full">
                  Future & Recurring
                </div>
                <h3 className="text-2xl font-black text-slate-900">Scheduled Delivery</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Plan recurring maintenance medications, adult briefs, health drinks, and recovery supplies for convenient future delivery.
                </p>
                <ul className="space-y-2 text-slate-700 text-base">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-600" /> Monthly Prescription Refills</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-600" /> Adult Diapers & Hygiene Packs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-600" /> Recovery Nutrition Supplements</li>
                </ul>
              </div>
              <Link to="/scheduled-delivery" className="elder-btn bg-blue-700 hover:bg-blue-800 text-white font-bold w-full">
                Schedule Delivery <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Medical Equipment */}
            <div className="bg-white rounded-3xl p-8 border-2 border-teal-300 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-700">
                  <Stethoscope className="w-8 h-8" />
                </div>
                <div className="inline-block bg-teal-100 text-teal-900 text-sm font-bold px-3 py-1 rounded-full">
                  Technician Installation
                </div>
                <h3 className="text-2xl font-black text-slate-900">Medical Equipment</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Arrange hospital beds, oxygen concentrators, ventilators, and ICU equipment with complete setup at home.
                </p>
                <ul className="space-y-2 text-slate-700 text-base">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600" /> Motorized Hospital Beds</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600" /> 5L Medical Oxygen Concentrators</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-600" /> ICU Ventilator & Support Setup</li>
                </ul>
              </div>
              <Link to="/equipment" className="elder-btn bg-teal-700 hover:bg-teal-800 text-white font-bold w-full">
                Request Equipment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* WHY MEDICALL / SAFETY & TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 font-bold px-4 py-1.5 rounded-full text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>Built on Trust & Safety</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Why Elderly Couples & Distant Family Choose MediCall
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            When an adult child lives in another city or country, managing everyday medical supplies or urgent healthcare needs for aging parents can be stressful. MediCall bridges the distance with verified, reliable healthcare assistance.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">✓</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Elderly-Friendly Touchpoint</h4>
                <p className="text-slate-600">Large readable typography, minimal steps, high contrast, and direct support phone line.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">✓</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Transparent Visual Tracking</h4>
                <p className="text-slate-600">Know exactly when assistance is accepted, assigned, out for delivery, and completed.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">✓</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Dedicated Equipment Technicians</h4>
                <p className="text-slate-600">Heavy equipment includes professional technician assistance for safe installation.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-8 sm:p-10 rounded-3xl space-y-6 shadow-xl">
          <h3 className="text-3xl font-black text-white">Safety Commitment</h3>
          <p className="text-blue-100 text-lg leading-relaxed">
            MediCall operates with strict healthcare protocols. We do not compromise on product quality, verified handling, or emergency safety positioning.
          </p>

          <div className="p-5 bg-white/10 rounded-2xl border border-white/20 space-y-3">
            <h4 className="text-xl font-bold text-amber-300 flex items-center gap-2">
              <PhoneCall className="w-5 h-5" /> 24/7 Helpline Support
            </h4>
            <p className="text-sm text-slate-200">
              Our team is ready to assist elderly users via direct telephone assistance if online ordering requires guidance.
            </p>
          </div>

          <div className="pt-2">
            <Link to="/quick-help" className="elder-btn bg-amber-400 hover:bg-amber-300 text-slate-950 font-black w-full text-center">
              Request Healthcare Assistance Now
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-blue-700" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-slate-600 text-lg">Clear answers to common questions about MediCall services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between font-bold text-xl text-slate-900 hover:bg-slate-50 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-6 h-6 text-blue-700 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-slate-700 text-lg leading-relaxed border-t border-slate-100 pt-4 bg-slate-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-700 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black">Need Help Right Now?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Our assistance dispatchers are available to ensure you or your elderly family members receive prompt support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/quick-help" className="elder-btn bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xl py-4 px-8">
              Submit Quick Request
            </Link>
            <a href="tel:18006334225" className="elder-btn bg-white hover:bg-slate-100 text-blue-950 font-extrabold text-xl py-4 px-8">
              Call 1-800-MEDICALL
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
