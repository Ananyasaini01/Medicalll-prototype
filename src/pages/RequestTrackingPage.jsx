import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Search, Clock, CheckCircle2, User, MapPin, Calendar, Phone, AlertCircle, RefreshCw } from 'lucide-react';

export const RequestTrackingPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const initialId = searchParams.get('id') || '';
  const initialType = searchParams.get('type') || 'QUICK';

  const [requestId, setRequestId] = useState(initialId);
  const [serviceType, setServiceType] = useState(initialType);
  
  const [requestDetails, setRequestDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentRequests, setRecentRequests] = useState([]);

  const quickSteps = ['PENDING', 'ACCEPTED', 'PROVIDER_ASSIGNED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const equipmentSteps = ['REQUESTED', 'VERIFIED', 'EQUIPMENT_ASSIGNED', 'DISPATCHED', 'DELIVERED', 'SERVICE_COMPLETED'];
  const scheduledSteps = ['SCHEDULED', 'CONFIRMED', 'OUT_FOR_DELIVERY', 'DELIVERED'];

  useEffect(() => {
    if (initialId) {
      fetchRequest(initialId, initialType);
    }
    if (user) {
      fetchUserRequests();
    }
  }, [initialId, initialType, user]);

  const fetchUserRequests = async () => {
    try {
      const [qRes, eRes, sRes] = await Promise.all([
        api.get('/requests').catch(() => ({ data: [] })),
        api.get('/equipment-requests').catch(() => ({ data: [] })),
        api.get('/scheduled-deliveries').catch(() => ({ data: [] }))
      ]);

      const combined = [
        ...(qRes.data || []).map(r => ({ ...r, type: 'QUICK', displayTitle: r.itemOrServiceName, num: r.requestNumber })),
        ...(eRes.data || []).map(r => ({ ...r, type: 'EQUIPMENT', displayTitle: r.equipmentName, num: r.requestNumber })),
        ...(sRes.data || []).map(r => ({ ...r, type: 'SCHEDULED', displayTitle: r.itemOrServiceName, num: r.deliveryNumber }))
      ];
      setRecentRequests(combined);
    } catch (err) {
      console.warn('Could not fetch user requests:', err);
    }
  };

  const fetchRequest = async (idToFetch, typeToFetch) => {
    if (!idToFetch) return;
    setLoading(true);
    setError('');
    setRequestDetails(null);

    let endpoint = '/requests';
    if (typeToFetch === 'EQUIPMENT') endpoint = '/equipment-requests';
    if (typeToFetch === 'SCHEDULED') endpoint = '/scheduled-deliveries';

    try {
      const res = await api.get(`${endpoint}/${idToFetch}`);
      setRequestDetails({ ...res.data, serviceType: typeToFetch });
    } catch (err) {
      console.error('Error fetching tracking info:', err);
      setError('Request not found or unauthorized to view. Please check ID or log in.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (requestId) {
      fetchRequest(requestId, serviceType);
    }
  };

  const getTimelineSteps = (type) => {
    if (type === 'EQUIPMENT') return equipmentSteps;
    if (type === 'SCHEDULED') return scheduledSteps;
    return quickSteps;
  };

  const currentSteps = requestDetails ? getTimelineSteps(requestDetails.serviceType) : [];
  const currentStatusIndex = requestDetails ? currentSteps.indexOf(requestDetails.status) : -1;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-slate-900">Request Status & Visual Tracking</h1>
        <p className="text-slate-600 text-xl max-w-2xl mx-auto">
          Enter your Request ID to track live delivery, assigned provider, and estimated arrival time.
        </p>
      </div>

      {/* Search Bar Form */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-3xl border-2 border-slate-300 shadow-md space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-4 space-y-1">
            <label className="elder-label text-base">Service Type</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="elder-input py-3 font-bold"
            >
              <option value="QUICK">⚡ quick</option>
              <option value="SCHEDULED">📅 Scheduled Delivery</option>
              <option value="EQUIPMENT">🩺 Medical Equipment</option>
            </select>
          </div>

          <div className="sm:col-span-5 space-y-1">
            <label className="elder-label text-base">Request ID (Numeric ID)</label>
            <input
              type="text"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              placeholder="e.g. 1, 2 or MCQ-..."
              className="elder-input py-3 font-bold"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="elder-btn bg-blue-700 hover:bg-blue-800 text-white font-bold w-full py-3.5 shadow-md cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>Track Request</span>
            </button>
          </div>
        </div>
      </form>

      {/* Recent User Requests Selection List */}
      {user && recentRequests.length > 0 && !requestDetails && (
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-300 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center justify-between">
            <span>Select From Your Recent Requests</span>
            <button onClick={fetchUserRequests} className="text-blue-700 hover:text-blue-900 text-sm font-semibold flex items-center gap-1">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentRequests.map((req) => (
              <button
                key={`${req.type}-${req.id}`}
                onClick={() => {
                  setRequestId(req.id);
                  setServiceType(req.type);
                  fetchRequest(req.id, req.type);
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 text-left space-y-1 shadow-sm transition cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-blue-900 text-base">{req.displayTitle}</span>
                  <span className="text-xs bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded">
                    {req.type}
                  </span>
                </div>
                <div className="text-slate-600 text-sm flex justify-between items-center">
                  <span>Ref #{req.num || req.id}</span>
                  <span className="font-bold text-amber-700">{req.status}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xl font-bold text-slate-700">Retrieving tracking timeline...</p>
        </div>
      )}

      {error && (
        <div className="p-6 bg-red-100 border-2 border-red-400 text-red-900 rounded-3xl font-bold flex items-center gap-4 text-xl">
          <AlertCircle className="w-8 h-8 shrink-0 text-red-700" />
          <span>{error}</span>
        </div>
      )}

      {/* TRACKING TIMELINE DISPLAY */}
      {requestDetails && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-slate-300 shadow-xl space-y-10">
          
          {/* Header Card */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-blue-400 font-bold uppercase tracking-wider text-sm">{requestDetails.serviceType} ASSISTANCE</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {requestDetails.itemOrServiceName || requestDetails.equipmentName}
              </h2>
              <p className="text-slate-300 text-base">Request Ref: <strong>#{requestDetails.requestNumber || requestDetails.deliveryNumber || requestDetails.id}</strong></p>
            </div>
            <div className="bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xl shrink-0">
              STATUS: {requestDetails.status}
            </div>
          </div>

          {/* VISUAL TIMELINE */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 border-b pb-2">Status Timeline</h3>
            <div className="relative">
              
              {/* Progress Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-2 bg-slate-200 -translate-y-1/2 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                {currentSteps.map((step, idx) => {
                  const isCompleted = idx <= currentStatusIndex;
                  const isCurrent = idx === currentStatusIndex;

                  return (
                    <div 
                      key={step}
                      className={`p-4 rounded-2xl text-center space-y-2 border-2 transition ${
                        isCurrent
                          ? 'bg-blue-700 text-white border-blue-900 shadow-lg scale-105'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold'
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-black text-lg ${
                        isCurrent ? 'bg-amber-300 text-slate-950' : isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                      }`}>
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      <div className="text-sm sm:text-base font-extrabold uppercase tracking-tight">
                        {step.replace(/_/g, ' ')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Details Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-700" /> Delivery Address
              </h4>
              <p className="text-slate-800 text-lg font-medium">{requestDetails.deliveryAddress}</p>
              <p className="text-slate-600 flex items-center gap-2 text-base">
                <Phone className="w-4 h-4 text-blue-700" /> Contact: {requestDetails.contactNumber}
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-blue-700" /> Dispatcher / Assigned Staff
              </h4>
              <p className="text-slate-800 text-lg font-bold">
                {requestDetails.assignedProvider || requestDetails.assignedTechnician || 'MediCall Care Dispatch Team'}
              </p>
              <p className="text-slate-600 flex items-center gap-2 text-base">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Estimated Target: {requestDetails.estimatedTimeMinutes ? `${requestDetails.estimatedTimeMinutes} mins` : 'On Schedule'}</span>
              </p>
            </div>

          </div>

          {requestDetails.notes && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-slate-800">
              <strong className="block text-amber-900 mb-1">Special Delivery Notes:</strong>
              <p className="text-base">{requestDetails.notes}</p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default RequestTrackingPage;
