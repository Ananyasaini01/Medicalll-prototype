import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertCircle, HeartPulse } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('eleanor@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(redirect);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-blue-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <HeartPulse className="w-9 h-9 text-amber-300" />
        </div>
        <h1 className="text-3xl font-black text-slate-900">Log In to MediCall</h1>
        <p className="text-slate-600 text-lg">Access your healthcare requests and scheduled deliveries.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border-2 border-red-400 text-red-900 rounded-2xl font-bold flex items-center gap-2">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border-2 border-slate-300 shadow-xl space-y-6">
        
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
          <label className="elder-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="elder-input font-bold"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="elder-btn bg-blue-700 hover:bg-blue-800 text-white font-black text-xl w-full py-4 shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Logging In...' : 'Log In'}
          <LogIn className="w-6 h-6" />
        </button>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm space-y-1">
          <strong className="block text-slate-800 font-bold">Demo Login Accounts:</strong>
          <p className="text-slate-600">User: <code>eleanor@example.com</code> / <code>password123</code></p>
          <p className="text-slate-600">Admin: <code>admin@medicall.com</code> / <code>admin123</code></p>
        </div>

      </form>

      <div className="text-center text-lg text-slate-700">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-blue-700 hover:underline">
          Register here
        </Link>
      </div>

    </div>
  );
};

export default LoginPage;
