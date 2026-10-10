import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { User, Clock, Calendar, Stethoscope, PhoneCall, ShieldCheck, MapPin, Plus, ArrowRight } from 'lucide-react';

export const UserDashboardPage = () => {
  const { user } = useAuth();

  const [quickRequests, setQuickRequests] = useState([]);
  const [scheduledList, setScheduledList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [qRes, sRes, eRes] = await Promise.all([
          api.get('/requests').catch(() => ({ data: [] })),
          api.get('/scheduled-deliveries').catch(() => ({ data: [] })),
          api.get('/equipment-requests').catch(() => ({ data: [] }))
        ]);
        setQuickRequests(qRes.data || []);
        setScheduledList(sRes.data || []);
        setEquipmentList(eRes.data || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAllData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-3xl font-black text-slate-900">Please Log In to View Dashboard</h2>
        <Link to="/login" className="elder-btn bg-blue-700 text-white inline-flex px-8 py-3">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* User Header Profile Card */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center font-black text-amber-300 text-2xl border-2 border-blue-500">
              {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black">{user.fullName}</h1>
              <p className="text-blue-200 text-lg font-medium">{user.email} | {user.phoneNumber}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1 shrink-0 text-left sm:text-right">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">Emergency Contact</span>
          <p className="font-extrabold text-white text-lg">{user.emergencyContactName || 'Robert Vance (Son)'}</p>
          <p className="text-emerald-300 font-bold text-base flex items-center gap-1 justify-start sm:justify-end">
            <PhoneCall className="w-4 h-4" /> {user.emergencyContactPhone || '+1-555-987-6543'}
          </p>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/quick-help" className="p-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xl flex items-center justify-between shadow-md transition">
          <span>⚡ New Quick Assistance</span>
          <ArrowRight className="w-6 h-6" />
        </Link>
        <Link to="/scheduled-delivery" className="p-6 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-xl flex items-center justify-between shadow-md transition">
          <span>📅 New Scheduled Order</span>
          <ArrowRight className="w-6 h-6" />
        </Link>
        <Link to="/equipment" className="p-6 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xl flex items-center justify-between shadow-md transition">
          <span>🩺 Request Equipment</span>
          <ArrowRight className="w-6 h-6" />
        </Link>
      </div>

      {/* THREE CATEGORY LISTINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1. Quick Requests */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-300 shadow-md space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-6 h-6 text-amber-600" /> Quick Help
            </h3>
            <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full text-xs">
              {quickRequests.length} Total
            </span>
          </div>

          {loading ? (
            <p className="text-slate-500 py-4">Loading requests...</p>
          ) : quickRequests.length === 0 ? (
            <p className="text-slate-500 py-4">No quick requests submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {quickRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-slate-900 text-base">{req.itemOrServiceName}</span>
                    <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded">
                      {req.status}
                    </span>
                  </div>
                  <div className="text-slate-600 text-xs space-y-1">
                    <p>Ref #{req.requestNumber} | Qty: {req.quantity}</p>
                    <Link to={`/track?id=${req.id}&type=QUICK`} className="text-blue-700 hover:underline font-bold block pt-1">
                      🔍 Track Status →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. Scheduled Deliveries */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-300 shadow-md space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-700" /> Scheduled
            </h3>
            <span className="bg-blue-100 text-blue-900 font-bold px-2.5 py-1 rounded-full text-xs">
              {scheduledList.length} Total
            </span>
          </div>

          {loading ? (
            <p className="text-slate-500 py-4">Loading scheduled...</p>
          ) : scheduledList.length === 0 ? (
            <p className="text-slate-500 py-4">No scheduled deliveries yet.</p>
          ) : (
            <div className="space-y-3">
              {scheduledList.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-slate-900 text-base">{item.itemOrServiceName}</span>
                    <span className="bg-blue-100 text-blue-900 text-xs font-bold px-2 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>
                  <div className="text-slate-600 text-xs space-y-1">
                    <p>Date: {item.deliveryDate} ({item.preferredTimeSlot})</p>
                    <Link to={`/track?id=${item.id}&type=SCHEDULED`} className="text-blue-700 hover:underline font-bold block pt-1">
                      🔍 Track Status →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Medical Equipment */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-300 shadow-md space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-teal-700" /> Equipment
            </h3>
            <span className="bg-teal-100 text-teal-900 font-bold px-2.5 py-1 rounded-full text-xs">
              {equipmentList.length} Total
            </span>
          </div>

          {loading ? (
            <p className="text-slate-500 py-4">Loading equipment...</p>
          ) : equipmentList.length === 0 ? (
            <p className="text-slate-500 py-4">No equipment requests submitted.</p>
          ) : (
            <div className="space-y-3">
              {equipmentList.map((eq) => (
                <div key={eq.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-slate-900 text-base">{eq.equipmentName}</span>
                    <span className="bg-teal-100 text-teal-900 text-xs font-bold px-2 py-0.5 rounded">
                      {eq.status}
                    </span>
                  </div>
                  <div className="text-slate-600 text-xs space-y-1">
                    <p>Ref #{eq.requestNumber} | Qty: {eq.quantity}</p>
                    <Link to={`/track?id=${eq.id}&type=EQUIPMENT`} className="text-blue-700 hover:underline font-bold block pt-1">
                      🔍 Track Status →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default UserDashboardPage;
