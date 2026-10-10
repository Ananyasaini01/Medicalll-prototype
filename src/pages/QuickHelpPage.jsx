import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Clock, CheckCircle, AlertCircle, Plus, Minus, Send, PhoneCall } from 'lucide-react';

export const QuickHelpPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [categoryName, setCategoryName] = useState('Diagnostic & Monitoring');
  const [itemOrServiceName, setItemOrServiceName] = useState('Digital Blood Pressure Monitor');
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState(user ? '742 Evergreen Terrace, Apt 4B' : '');
  const [contactNumber, setContactNumber] = useState(user ? user.phoneNumber || '' : '');
  const [notes, setNotes] = useState('Ring doorbell twice. Elderly resident inside.');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Fetch categories and products from backend
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get('/services/categories?type=QUICK'),
          api.get('/services/products?type=QUICK')
        ]);
        if (catRes.data && catRes.data.length > 0) {
          setCategories(catRes.data);
        }
        if (prodRes.data && prodRes.data.length > 0) {
          setProducts(prodRes.data);
        }
      } catch (err) {
        console.warn('Backend API connection pending, using default preset options:', err);
      }
    };
    fetchData();
  }, []);

  const defaultCategories = [
    'Diagnostic & Monitoring',
    'Medicines',
    'Adult Emergency Care',
    'Baby & Mother Care',
    'Nutrition & Recovery',
    'Healthcare Essentials'
  ];

  const defaultItems = {
    'Diagnostic & Monitoring': ['Digital Blood Pressure Monitor', 'Fingertip Pulse Oximeter', 'Blood Glucose Meter Kit', 'Digital Clinical Thermometer'],
    'Medicines': ['Pain Relief Spray (Urgent)', 'Paracetamol 500mg (Pain/Fever)', 'Antacid Syrup', 'Wound Antiseptic Lotion'],
    'Adult Emergency Care': ['Emergency First Aid Bandage Pack', 'Sterile Gauze Roll Pack', 'Walking Cane / Mobility Support', 'Ice / Gel Heat Pack'],
    'Baby & Mother Care': ['Infant Formula Powder 400g', 'Baby Antiseptic Wipes', 'Mother Recovery Nutrition Drink'],
    'Nutrition & Recovery': ['Oral Rehydration Solution (ORS 5x)', 'High Protein Supplement Powder', 'Electrolyte Drink Packets'],
    'Healthcare Essentials': ['N95 Protective Face Masks (10x)', 'Hand Sanitizer Gel 500ml', 'Medical Gloves Box']
  };

  const currentItemList = defaultItems[categoryName] || ['General Emergency Healthcare Item'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!user) {
      setError('Please log in or register first to submit a request so we can send updates.');
      navigate('/login?redirect=/quick-help');
      return;
    }

    if (!deliveryAddress.trim()) {
      setError('Please enter delivery address.');
      return;
    }
    if (!contactNumber.trim()) {
      setError('Please enter contact telephone number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/requests', {
        categoryName,
        itemOrServiceName,
        quantity,
        deliveryAddress,
        contactNumber,
        notes
      });
      setSuccessMsg(`Request submitted successfully! Request ID: ${res.data.requestNumber}`);
      setTimeout(() => {
        navigate(`/track?id=${res.data.id}&type=QUICK`);
      }, 1500);
    } catch (err) {
      console.error('Error submitting quick request:', err);
      setError(err.response?.data?.message || 'Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="bg-amber-400 border-4 border-amber-500 rounded-3xl p-6 sm:p-8 text-slate-950 space-y-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-950 text-amber-400 rounded-2xl flex items-center justify-center font-black">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black">Quick Assistan Request</h1>
            <p className="text-slate-900 font-bold text-lg">Target Delivery: 10–15 Minutes (Where Available)</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border-2 border-red-400 text-red-900 rounded-2xl font-bold flex items-center gap-3 text-lg">
          <AlertCircle className="w-6 h-6 shrink-0 text-red-700" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-5 bg-emerald-100 border-2 border-emerald-500 text-emerald-950 rounded-2xl font-bold flex items-center gap-3 text-xl">
          <CheckCircle className="w-7 h-7 shrink-0 text-emerald-700" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Elderly-Friendly Simple Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-slate-300 shadow-lg space-y-8">
        
        {/* Step 1: Category */}
        <div className="space-y-3">
          <label className="elder-label text-xl">1. Select Healthcare Category</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {defaultCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategoryName(cat);
                  setItemOrServiceName(defaultItems[cat] ? defaultItems[cat][0] : '');
                }}
                className={`p-4 rounded-2xl text-left font-bold border-2 transition text-base sm:text-lg cursor-pointer ${
                  categoryName === cat
                    ? 'border-blue-700 bg-blue-50 text-blue-900 shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Item Selection */}
        <div className="space-y-3">
          <label className="elder-label text-xl">2. Select Item / Service Needed</label>
          <select
            value={itemOrServiceName}
            onChange={(e) => setItemOrServiceName(e.target.value)}
            className="elder-input font-bold text-lg cursor-pointer"
          >
            {currentItemList.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Step 3: Quantity Counter */}
        <div className="space-y-3">
          <label className="elder-label text-xl">3. Quantity Needed</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-14 h-14 bg-slate-200 hover:bg-slate-300 rounded-2xl flex items-center justify-center font-black text-2xl text-slate-800 cursor-pointer"
            >
              <Minus className="w-6 h-6" />
            </button>
            <span className="text-3xl font-black text-blue-900 w-16 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-14 h-14 bg-blue-700 hover:bg-blue-800 rounded-2xl flex items-center justify-center font-black text-2xl text-white cursor-pointer"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Step 4: Address */}
        <div className="space-y-3">
          <label className="elder-label text-xl">4. Delivery Address</label>
          <textarea
            rows="3"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="House/Apartment number, street, landmark, city"
            className="elder-input text-lg font-medium"
            required
          />
        </div>

        {/* Step 5: Contact Number */}
        <div className="space-y-3">
          <label className="elder-label text-xl">5. Telephone / Mobile Contact Number</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="e.g. +1 555-019-2834"
            className="elder-input text-lg font-medium"
            required
          />
        </div>

        {/* Step 6: Notes */}
        <div className="space-y-3">
          <label className="elder-label text-xl">6. Special Delivery Notes (Optional)</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Leave with security, door bell instructions, patient details"
            className="elder-input text-lg"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-200">
          <button
            type="submit"
            disabled={submitting}
            className="elder-btn bg-blue-700 hover:bg-blue-800 text-white font-black text-2xl w-full py-5 shadow-xl disabled:opacity-50 cursor-pointer"
          >
            {submitting ? 'Submitting Request...' : 'Confirm & Send Quick Request'}
            <Send className="w-7 h-7" />
          </button>
        </div>

      </form>

      {/* Helpline Prompt */}
      <div className="bg-slate-100 p-6 rounded-2xl border border-slate-300 text-center space-y-2">
        <p className="text-slate-700 font-bold text-lg">Prefer to speak to a human dispatcher?</p>
        <a href="tel:18006334225" className="inline-flex items-center gap-2 text-blue-800 font-black text-xl hover:underline">
          <PhoneCall className="w-6 h-6 text-amber-600" />
          Call MediCall Helpline: 1-800-MEDICALL
        </a>
      </div>

    </div>
  );
};

export default QuickHelpPage;
