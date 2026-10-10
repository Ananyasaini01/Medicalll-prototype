import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, PhoneCall, Mail, MapPin, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-12 pb-8 border-t-4 border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand & Purpose */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-2xl font-black text-white">Medi<span className="text-blue-400">Call</span></span>
          </div>
          <p className="text-slate-300 text-base leading-relaxed">
            Reliable healthcare assistance and supply delivery for senior citizens, adults living alone, and families when loved ones live away.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm bg-slate-800 p-2.5 rounded-lg border border-slate-700">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span>Verified Healthcare Assistance Service</span>
          </div>
        </div>

        {/* Column 2: Core Services */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-blue-500 pb-2 inline-block">Core Services</h4>
          <ul className="space-y-2.5 text-base">
            <li><Link to="/quick-help" className="hover:text-amber-300 transition">⚡ Quick Help (10-15 Min)</Link></li>
            <li><Link to="/scheduled-delivery" className="hover:text-amber-300 transition">📅 Scheduled Medicine Delivery</Link></li>
            <li><Link to="/equipment" className="hover:text-amber-300 transition">🩺 ICU & Medical Equipment</Link></li>
            <li><Link to="/track" className="hover:text-amber-300 transition">🔍 Request Tracking & Status</Link></li>
            <li><Link to="/services" className="hover:text-amber-300 transition">📋 Full Service Catalog</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact & Support */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-blue-500 pb-2 inline-block">Contact & Support</h4>
          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-3 text-amber-300 font-bold">
              <PhoneCall className="w-5 h-5" />
              <span>Helpline: 1-800-MEDICALL</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>support@medicall.org</span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
              <span>MediCall Healthcare Services Inc., 100 Health Way, Suite 400</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Safety Position */}
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3">
          <h4 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            <span>Safety Disclaimer</span>
          </h4>
          <p className="text-slate-300 text-sm leading-normal">
            MediCall facilitates healthcare product delivery, scheduled supplies, and medical equipment setup. It is not an ambulance service. For life-threatening emergencies, call local emergency services immediately.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} MediCall Healthcare Assistance Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
