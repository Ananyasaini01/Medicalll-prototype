import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, Plus, AlertCircle, CheckCircle, Package, RefreshCw } from 'lucide-react';

export const ScheduledDeliveryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [scheduledList, setScheduledList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const [itemOrServiceName, setItemOrServiceName] = useState('Adult Briefs / Diapers (Large 30s)');
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('09:00 AM - 11:00 AM');
  const [deliveryAddress, setDeliveryAddress] = useState(user ? '742 Evergreen Terrace, Apt 4B' : '');
  const [contactNumber, setContactNumber] = useState(user ? user.phoneNumber || '' : '');
  const [notes, setNotes] = useState('Monthly scheduled adult care supply refill');
  const [isRecurring, setIsRecurring] = useState(true);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState('MONTHLY');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchScheduled = async () => {
    if (!user) return;
    setLoadingList(true);
    try {
      const res = await api.get('/scheduled-deliveries');
      setScheduledList(res.data || []);
    } catch (err) {
      console.warn('Could not fetch scheduled deliveries:', err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchScheduled();
  }, [user]);

  const presetItems = [
    'Adult Briefs / Diapers (Large 30s)',
    'Monthly Diabetic Care Kit (Strips & Lancets)',
    'Hygiene Bed Protectors (Underpads 20s)',
    'Senior Protein Recovery Shake (Case of 12)',
    'Blood Pressure & Maintenance Medication Pack',
    'Vitamin D3 & Calcium Senior Supplements'
  ];

  const timeSlots = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '02:00 PM - 04:00 PM',
    '05:00 PM - 07:00 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Please log in or register first to schedule a delivery.');
      navigate('/login?redirect=/scheduled-delivery');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/scheduled-deliveries', {
        itemOrServiceName,
        quantity,
        deliveryDate,
        preferredTimeSlot,
        deliveryAddress,
        contactNumber,
        notes,
        isRecurring,
        recurrenceFrequency: isRecurring ? recurrenceFrequency : null
      });
      setSuccessMsg(`Scheduled delivery created! Reference #${res.data.deliveryNumber}`);
      fetchScheduled();
    } catch (err) {
      console.error('Error creating scheduled delivery:', err);
      setError(err.response?.data?.message || 'Failed to schedule delivery. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-blue-800 text-white rounded-3xl p-6 sm:p-10 space-y-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white text-blue-800 rounded-2xl flex items-center justify-center font-black">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black">Scheduled Healthcare Deliveries</h1>
            <p className="text-blue-100 text-lg">Plan recurring medicines, adult care supplies, and recovery products for future dates.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-300 shadow-md space-y-6">
            <h2 className="text-2xl font-black text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
              <Plus className="w-6 h-6 text-blue-700" />
              <span>Schedule New Healthcare Delivery</span>
            </h2>

            {error && (
              <div className="p-4 bg-red-100 border-2 border-red-300 text-red-900 rounded-2xl font-bold flex items-center gap-2">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-4 bg-emerald-100 border-2 border-emerald-400 text-emerald-950 rounded-2xl font-bold flex items-center gap-2">
                <CheckCircle className="w-6 h-6 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="elder-label">Healthcare Product / Service</label>
                <select
                  value={itemOrServiceName}
                  onChange={(e) => setItemOrServiceName(e.target.value)}
                  className="elder-input font-bold"
                >
                  {presetItems.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="elder-label">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="elder-input font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="elder-label">Delivery Date</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="elder-input font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="elder-label">Preferred Time Slot</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setPreferredTimeSlot(slot)}
                      className={`p-3 rounded-xl font-bold border-2 text-base transition ${
                        preferredTimeSlot === slot
                          ? 'border-blue-700 bg-blue-50 text-blue-900'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="elder-label">Delivery Address</label>
                <textarea
                  rows="2"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="elder-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="elder-label">Contact Number</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="elder-input"
                  required
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-6 h-6 text-blue-700 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="recurring" className="font-bold text-slate-800 text-lg cursor-pointer flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-blue-700" />
                    Make this a recurring delivery
                  </label>
                </div>

                {isRecurring && (
                  <div className="pl-9 pt-1">
                    <label className="block text-sm font-bold text-slate-700 mb-1">Recurrence Interval</label>
                    <select
                      value={recurrenceFrequency}
                      onChange={(e) => setRecurrenceFrequency(e.target.value)}
                      className="elder-input py-2 text-base"
                    >
                      <option value="MONTHLY">Every Month (Monthly)</option>
                      <option value="BIWEEKLY">Every 2 Weeks (Bi-weekly)</option>
                      <option value="WEEKLY">Every Week (Weekly)</option>
                    </select>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="elder-btn bg-blue-700 hover:bg-blue-800 text-white font-black text-xl w-full py-4 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Creating Schedule...' : 'Schedule Delivery'}
              </button>

            </form>
          </div>
        </div>

        {/* Deliveries Display Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-300 shadow-md space-y-4">
            <h3 className="text-2xl font-black text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-700" />
              <span>Upcoming Scheduled Deliveries</span>
            </h3>

            {!user ? (
              <p className="text-slate-600 font-medium p-4 bg-slate-50 rounded-xl text-center">
                Log in to view your upcoming scheduled orders.
              </p>
            ) : loadingList ? (
              <p className="text-slate-600 text-center py-6">Loading schedules...</p>
            ) : scheduledList.length === 0 ? (
              <p className="text-slate-500 text-center py-6">No upcoming scheduled deliveries yet.</p>
            ) : (
              <div className="space-y-3">
                {scheduledList.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-black text-slate-900 text-lg">{item.itemOrServiceName}</span>
                      <span className="bg-blue-100 text-blue-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-slate-600 text-sm space-y-1">
                      <p className="flex items-center gap-1.5 font-semibold text-slate-800">
                        <Calendar className="w-4 h-4 text-blue-700" />
                        <span>Date: {item.deliveryDate} ({item.preferredTimeSlot})</span>
                      </p>
                      <p>Qty: {item.quantity} | Ref #{item.deliveryNumber}</p>
                      {item.isRecurring && (
                        <span className="inline-block text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
                          🔄 {item.recurrenceFrequency} Recurring
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ScheduledDeliveryPage;
