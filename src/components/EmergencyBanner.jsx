import React from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';

export const EmergencyBanner = () => {
  return (
    <div className="bg-red-700 text-white text-base md:text-lg font-medium px-4 py-3 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 shrink-0 text-amber-300" />
          <span>
            <strong>IMPORTANT SAFETY NOTICE:</strong> MediCall does NOT replace emergency medical services or ambulances.
          </span>
        </div>
        <div className="flex items-center gap-2 font-bold bg-red-800 px-3 py-1 rounded-lg shrink-0">
          <PhoneCall className="w-5 h-5 text-amber-300" />
          <span>Life-Threatening Emergency? Call 112 / 911 Immediately</span>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;
