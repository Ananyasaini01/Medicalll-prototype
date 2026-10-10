import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, AlertCircle, HeartPulse } from 'lucide-react';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({
        fullName,
        email,
        password,
        phoneNumber,
        emergencyContactName,
        emergencyContactPhone
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-blue-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <HeartPulse className="w-9 h-9 text-amber-300" />
        </div>
        <h1 className="text-3xl font-black text-slate-900">Create MediCall Account</h1>
        <p className="text-slate-600 text-lg">Simple registration for elderly users and caregivers.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border-2 border-red-400 text-red-900 rounded-2xl font-bold flex items-center gap-2">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border-2 border-slate-300 shadow-xl space-y-6">
        
        <div className="space-y-2">
          <label className="elder-label">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="elder-input font-bold"
            placeholder="e.g. Eleanor Vance"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="elder-label">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="elder-input font-bold"
            placeholder="e.g. eleanor@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="elder-label">Password (Min 6 characters)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="elder-input font-bold"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="elder-label">Phone / Mobile Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="elder-input font-bold"
            placeholder="e.g. +1-555-019-2834"
            required
          />
        </div>

        <div className="p-5 bg-amber-50 border-2 border-amber-200 rounded-2xl space-y-4">
          <h3 className="font-extrabold text-amber-900 text-lg">Emergency Contact Information (Optional)</h3>
          
          <div className="space-y-2">
            <label className="block font-bold text-slate-800 text-base">Caregiver / Relative Contact Name</label>
            <input
              type="text"
              value={emergencyContactName}
              onChange={(e) => setEmergencyContactName(e.target.value)}
              className="elder-input py-3 text-base"
              placeholder="e.g. Robert Vance (Son)"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-bold text-slate-800 text-base">Emergency Phone Number</label>
            <input
              type="tel"
              value={emergencyContactPhone}
              onChange={(e) => setEmergencyContactPhone(e.target.value)}
              className="elder-input py-3 text-base"
              placeholder="e.g. +1-555-987-6543"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="elder-btn bg-blue-700 hover:bg-blue-800 text-white font-black text-xl w-full py-4 shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Creating Account...' : 'Register Account'}
          <UserPlus className="w-6 h-6" />
        </button>

      </form>

      <div className="text-center text-lg text-slate-700">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-blue-700 hover:underline">
          Log in here
        </Link>
      </div>

    </div>
  );
};

export default RegisterPage;
