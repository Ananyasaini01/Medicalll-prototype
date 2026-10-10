import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Stethoscope, CheckCircle, AlertCircle, Wrench, ShieldCheck, PhoneCall, Calendar } from 'lucide-react';

export const MedicalEquipmentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [equipmentName, setEquipmentName] = useState('5L Oxygen Concentrator');
  const [requirementDetails, setRequirementDetails] = useState('Requires home oxygen flow support for post-discharge recovery');
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState(user ? '742 Evergreen Terrace, Apt 4B' : '');
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('02:00 PM');
  const [contactNumber, setContactNumber] = useState(user ? user.phoneNumber || '' : '');
  const [notes, setNotes] = useState('Please ensure technician assistance for initial bed/oxygen assembly');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const equipmentCategories = [
    {
      name: 'ICU Setup & Life Support',
      desc: 'Complete ICU room configuration, ventilator support, patient monitors.',
      items: ['Portable Mechanical Ventilator', 'Multi-Para Patient Monitor', 'ICU Emergency Suction Machine']
    },
    {
      name: 'Medical Beds & Mattresses',
      desc: 'Motorized hospital beds, manual 3-function beds, anti-bedsore air mattresses.',
      items: ['Motorized ICU Patient Bed', 'Manual 3-Function Hospital Bed', 'Air Mattress Anti-Bedsore Kit']
    },
    {
      name: 'Oxygen & Respiratory Care',
      desc: '5L & 10L oxygen concentrators, oxygen cylinders, CPAP / BiPAP machines.',
      items: ['5L Oxygen Concentrator', '10L High Flow Oxygen Unit', 'BiPAP Respiratory Care Unit']
    },
    {
      name: 'Mobility & Patient Lift Support',
      desc: 'Wheelchairs, patient hoists, IV poles, walker supports.',
      items: ['Reclining Wheelchair with Commode', 'Hydraulic Patient Lift Chair', 'Stainless Steel IV Drip Stand']
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Please log in or register first to request medical equipment.');
      navigate('/login?redirect=/equipment');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/equipment-requests', {
        equipmentName,
        requirementDetails,
        quantity,
        deliveryAddress,
        preferredDate,
        preferredTime,
        contactNumber,
        notes
      });
      setSuccessMsg(`Medical equipment request created! Request ID: ${res.data.requestNumber}`);
      setTimeout(() => {
        navigate(`/track?id=${res.data.id}&type=EQUIPMENT`);
      }, 1500);
    } catch (err) {
      console.error('Error creating equipment request:', err);
      setError(err.response?.data?.message || 'Failed to submit equipment request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-teal-800 text-white rounded-3xl p-6 sm:p-10 space-y-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white text-teal-800 rounded-2xl flex items-center justify-center font-black">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black">Dedicated Medical Equipment Service</h1>
            <p className="text-teal-100 text-lg">Hospital beds, ICU setup, oxygen concentrators, and ventilators with technician installation.</p>
          </div>
        </div>
      </div>

      {/* Equipment Categories Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Equipment Categories Available</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {equipmentCategories.map((cat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xl font-extrabold text-teal-900">{cat.name}</h3>
              <p className="text-slate-600 text-base">{cat.desc}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {cat.items.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setEquipmentName(item)}
                    className={`text-sm font-bold px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                      equipmentName === item
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-teal-50 text-teal-900 border-teal-200 hover:bg-teal-100'
                    }`}
                  >
                    + Select: {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Form */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-slate-300 shadow-xl space-y-6">
        <h2 className="text-2xl font-black text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
          <Wrench className="w-6 h-6 text-teal-700" />
          <span>Equipment Request & Setup Form</span>
        </h2>

        {error && (
          <div className="p-4 bg-red-100 border-2 border-red-300 text-red-900 rounded-2xl font-bold flex items-center gap-2">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-5 bg-emerald-100 border-2 border-emerald-400 text-emerald-950 rounded-2xl font-bold flex items-center gap-2 text-xl">
            <CheckCircle className="w-7 h-7 shrink-0 text-emerald-700" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="elder-label text-xl">Selected Medical Equipment</label>
            <input
              type="text"
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              className="elder-input font-bold"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="elder-label text-xl">Requirement Details / Clinical Context</label>
            <textarea
              rows="3"
              value={requirementDetails}
              onChange={(e) => setRequirementDetails(e.target.value)}
              placeholder="Describe condition, post-surgery recovery, ICU needs, room measurements..."
              className="elder-input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <label className="elder-label">Preferred Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="elder-input font-bold"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="elder-label">Preferred Time</label>
              <input
                type="text"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="elder-input font-bold"
                placeholder="e.g. 02:00 PM"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="elder-label text-xl">Delivery Address</label>
            <textarea
              rows="2"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="elder-input"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="elder-label text-xl">Contact Telephone Number</label>
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="elder-input"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="elder-label text-xl">Technician & Access Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Elevator availability, technician entry instructions..."
              className="elder-input"
            />
          </div>

          <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-teal-700 shrink-0 mt-0.5" />
            <p className="text-teal-900 text-base font-medium">
              <strong>Technician Verification:</strong> All heavy equipment delivery includes a verified medical equipment technician to handle assembly, safety check, and demonstration.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="elder-btn bg-teal-700 hover:bg-teal-800 text-white font-black text-2xl w-full py-4 shadow-xl disabled:opacity-50 cursor-pointer"
          >
            {submitting ? 'Submitting Equipment Request...' : 'Confirm & Request Equipment'}
          </button>

        </form>
      </div>

    </div>
  );
};

export default MedicalEquipmentPage;
