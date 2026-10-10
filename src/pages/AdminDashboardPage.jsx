import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { ShieldCheck, Users, Clock, Calendar, Stethoscope, CheckCircle, RefreshCw } from 'lucide-react';

export const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('QUICK'); // QUICK, SCHEDULED, EQUIPMENT, USERS

  const [quickRequests, setQuickRequests] = useState([]);
  const [scheduledDeliveries, setScheduledDeliveries] = useState([]);
  const [equipmentRequests, setEquipmentRequests] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [updatingId, setUpdatingId] = useState(null);
  const [assignedProvider, setAssignedProvider] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [qRes, sRes, eRes, uRes] = await Promise.all([
        api.get('/admin/requests').catch(() => ({ data: [] })),
        api.get('/admin/scheduled-deliveries').catch(() => ({ data: [] })),
        api.get('/admin/equipment-requests').catch(() => ({ data: [] })),
        api.get('/admin/users').catch(() => ({ data: [] }))
      ]);

      setQuickRequests(qRes.data || []);
      setScheduledDeliveries(sRes.data || []);
      setEquipmentRequests(eRes.data || []);
      setUsersList(uRes.data || []);
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleUpdateStatus = async (id, type, newStatus) => {
    setUpdatingId(id);
    let url = `/admin/requests/${id}/status`;
    if (type === 'SCHEDULED') url = `/admin/scheduled-deliveries/${id}/status`;
    if (type === 'EQUIPMENT') url = `/admin/equipment-requests/${id}/status`;

    try {
      await api.put(url, {
        status: newStatus,
        assignedProviderOrTechnician: assignedProvider || 'MediCall Dispatch Partner #1'
      });
      fetchAdminData();
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Error updating status: ' + (err.response?.data?.message || err.message));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Banner Header */}
      <div className="bg-purple-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl border-2 border-purple-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-700 rounded-2xl flex items-center justify-center font-black">
            <ShieldCheck className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <h1 className="text-3xl font-black">MediCall Admin Operations Portal</h1>
            <p className="text-purple-200 text-lg">Manage users, quick requests, scheduled deliveries, and equipment status updates.</p>
          </div>
        </div>

        <button
          onClick={fetchAdminData}
          className="elder-btn bg-purple-700 hover:bg-purple-600 text-white text-base py-2.5 px-5 shrink-0"
        >
          <RefreshCw className="w-5 h-5" /> Refresh Data
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('QUICK')}
          className={`px-5 py-3 rounded-2xl font-black text-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'QUICK' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Clock className="w-5 h-5" /> Quick Requests ({quickRequests.length})
        </button>

        <button
          onClick={() => setActiveTab('SCHEDULED')}
          className={`px-5 py-3 rounded-2xl font-black text-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'SCHEDULED' ? 'bg-blue-700 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Calendar className="w-5 h-5" /> Scheduled Deliveries ({scheduledDeliveries.length})
        </button>

        <button
          onClick={() => setActiveTab('EQUIPMENT')}
          className={`px-5 py-3 rounded-2xl font-black text-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'EQUIPMENT' ? 'bg-teal-700 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Stethoscope className="w-5 h-5" /> Equipment Requests ({equipmentRequests.length})
        </button>

        <button
          onClick={() => setActiveTab('USERS')}
          className={`px-5 py-3 rounded-2xl font-black text-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'USERS' ? 'bg-purple-800 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Users className="w-5 h-5" /> Registered Users ({usersList.length})
        </button>
      </div>

      {/* Provider Assignment Field */}
      {(activeTab === 'QUICK' || activeTab === 'EQUIPMENT') && (
        <div className="p-4 bg-slate-100 rounded-2xl border border-slate-300 flex flex-col sm:flex-row items-center gap-4">
          <label className="font-bold text-slate-800 text-base shrink-0">Assign Delivery Partner / Technician:</label>
          <input
            type="text"
            value={assignedProvider}
            onChange={(e) => setAssignedProvider(e.target.value)}
            placeholder="e.g. Courier #402 (John Doe) / BioMed Technician Team B"
            className="elder-input py-2 text-base bg-white"
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-purple-700 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xl font-bold text-slate-700">Loading admin operations database...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border-2 border-slate-300 overflow-hidden shadow-lg">
          
          {/* TAB 1: QUICK REQUESTS TABLE */}
          {activeTab === 'QUICK' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-base">
                    <th className="p-4">Ref #</th>
                    <th className="p-4">User</th>
                    <th className="p-4">Item / Category</th>
                    <th className="p-4">Delivery Address & Phone</th>
                    <th className="p-4">Current Status</th>
                    <th className="p-4">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-base">
                  {quickRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-blue-900">#{req.requestNumber}</td>
                      <td className="p-4 font-semibold text-slate-900">{req.user ? req.user.fullName : 'Guest'}</td>
                      <td className="p-4">
                        <strong className="block text-slate-900">{req.itemOrServiceName}</strong>
                        <span className="text-sm text-slate-500">{req.categoryName} (Qty: {req.quantity})</span>
                      </td>
                      <td className="p-4">
                        <p className="text-slate-800 text-sm font-medium">{req.deliveryAddress}</p>
                        <p className="text-slate-600 text-xs font-bold">Tel: {req.contactNumber}</p>
                      </td>
                      <td className="p-4 font-extrabold text-amber-800">
                        <span className="bg-amber-100 px-3 py-1 rounded-full text-xs font-bold">
                          {req.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={req.status}
                          disabled={updatingId === req.id}
                          onChange={(e) => handleUpdateStatus(req.id, 'QUICK', e.target.value)}
                          className="elder-input py-2 text-sm font-bold bg-white"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="ACCEPTED">ACCEPTED</option>
                          <option value="PROVIDER_ASSIGNED">PROVIDER ASSIGNED</option>
                          <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: SCHEDULED DELIVERIES TABLE */}
          {activeTab === 'SCHEDULED' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-base">
                    <th className="p-4">Delivery #</th>
                    <th className="p-4">User</th>
                    <th className="p-4">Item & Qty</th>
                    <th className="p-4">Target Date & Time</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-base">
                  {scheduledDeliveries.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-blue-900">#{item.deliveryNumber}</td>
                      <td className="p-4 font-semibold text-slate-900">{item.user ? item.user.fullName : 'Guest'}</td>
                      <td className="p-4 font-bold text-slate-900">{item.itemOrServiceName} (Qty: {item.quantity})</td>
                      <td className="p-4">
                        <p className="font-bold text-blue-800">{item.deliveryDate}</p>
                        <p className="text-xs text-slate-600">{item.preferredTimeSlot}</p>
                      </td>
                      <td className="p-4 font-extrabold text-blue-900">
                        <span className="bg-blue-100 px-3 py-1 rounded-full text-xs font-bold">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={item.status}
                          disabled={updatingId === item.id}
                          onChange={(e) => handleUpdateStatus(item.id, 'SCHEDULED', e.target.value)}
                          className="elder-input py-2 text-sm font-bold bg-white"
                        >
                          <option value="SCHEDULED">SCHEDULED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: EQUIPMENT REQUESTS TABLE */}
          {activeTab === 'EQUIPMENT' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-base">
                    <th className="p-4">Ref #</th>
                    <th className="p-4">User</th>
                    <th className="p-4">Equipment Name</th>
                    <th className="p-4">Requirement / Address</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Update Equipment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-base">
                  {equipmentRequests.map((eq) => (
                    <tr key={eq.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-teal-900">#{eq.requestNumber}</td>
                      <td className="p-4 font-semibold text-slate-900">{eq.user ? eq.user.fullName : 'Guest'}</td>
                      <td className="p-4 font-bold text-slate-900">{eq.equipmentName} (Qty: {eq.quantity})</td>
                      <td className="p-4 text-sm">
                        <p className="text-slate-800">{eq.requirementDetails}</p>
                        <p className="text-slate-500 font-bold">{eq.deliveryAddress}</p>
                      </td>
                      <td className="p-4 font-extrabold text-teal-900">
                        <span className="bg-teal-100 px-3 py-1 rounded-full text-xs font-bold">
                          {eq.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={eq.status}
                          disabled={updatingId === eq.id}
                          onChange={(e) => handleUpdateStatus(eq.id, 'EQUIPMENT', e.target.value)}
                          className="elder-input py-2 text-sm font-bold bg-white"
                        >
                          <option value="REQUESTED">REQUESTED</option>
                          <option value="VERIFIED">VERIFIED</option>
                          <option value="EQUIPMENT_ASSIGNED">EQUIPMENT ASSIGNED</option>
                          <option value="DISPATCHED">DISPATCHED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="SERVICE_COMPLETED">SERVICE COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: USERS LIST */}
          {activeTab === 'USERS' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-base">
                    <th className="p-4">User ID</th>
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone Number</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Emergency Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-base">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-slate-600">#{u.id}</td>
                      <td className="p-4 font-bold text-slate-900">{u.fullName}</td>
                      <td className="p-4 text-slate-700">{u.email}</td>
                      <td className="p-4 font-medium text-slate-800">{u.phoneNumber}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                          u.role === 'ROLE_ADMIN' ? 'bg-purple-200 text-purple-900' : 'bg-slate-200 text-slate-800'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-700">
                        {u.emergencyContactName ? `${u.emergencyContactName} (${u.emergencyContactPhone})` : 'None specified'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default AdminDashboardPage;
