import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartPulse, Clock, Calendar, Stethoscope, User, LogOut, ShieldCheck, Menu, X, Search } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b-2 border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-md group-hover:bg-blue-800 transition">
              <HeartPulse className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Medi<span className="text-blue-700">Call</span></span>
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">Healthcare Assistance</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-semibold text-slate-700">
            <Link 
              to="/services" 
              className={`px-4 py-2 rounded-xl text-lg flex items-center gap-2 transition ${isActive('/services') ? 'bg-blue-50 text-blue-800 font-bold' : 'hover:bg-slate-100 text-slate-800'}`}
            >
              Services
            </Link>
            
            <Link 
              to="/quick-help" 
              className={`px-4 py-2 rounded-xl text-lg flex items-center gap-2 transition ${isActive('/quick-help') ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-slate-100 text-slate-800'}`}
            >
              <Clock className="w-5 h-5 text-amber-600" />
              Quick Help
            </Link>

            <Link 
              to="/scheduled-delivery" 
              className={`px-4 py-2 rounded-xl text-lg flex items-center gap-2 transition ${isActive('/scheduled-delivery') ? 'bg-blue-50 text-blue-800 font-bold' : 'hover:bg-slate-100 text-slate-800'}`}
            >
              <Calendar className="w-5 h-5 text-blue-600" />
              Scheduled
            </Link>

            <Link 
              to="/equipment" 
              className={`px-4 py-2 rounded-xl text-lg flex items-center gap-2 transition ${isActive('/equipment') ? 'bg-teal-50 text-teal-800 font-bold' : 'hover:bg-slate-100 text-slate-800'}`}
            >
              <Stethoscope className="w-5 h-5 text-teal-600" />
              Equipment
            </Link>

            <Link 
              to="/track" 
              className={`px-4 py-2 rounded-xl text-lg flex items-center gap-2 transition ${isActive('/track') ? 'bg-indigo-50 text-indigo-800 font-bold' : 'hover:bg-slate-100 text-slate-800'}`}
            >
              <Search className="w-5 h-5 text-indigo-600" />
              Track Status
            </Link>

            {isAdmin && (
              <Link 
                to="/admin" 
                className={`px-4 py-2 rounded-xl text-lg flex items-center gap-2 transition ${isActive('/admin') ? 'bg-purple-100 text-purple-900 font-bold' : 'hover:bg-purple-50 text-purple-700 font-medium'}`}
              >
                <ShieldCheck className="w-5 h-5 text-purple-600" />
                Admin Portal
              </Link>
            )}
          </nav>

          {/* User Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl border border-slate-300 text-base"
                >
                  <User className="w-5 h-5 text-blue-700" />
                  <span>{user.fullName ? user.fullName.split(' ')[0] : 'Account'}</span>
                </Link>

                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold px-3 py-2.5 rounded-xl border border-red-200 text-base cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="px-5 py-2.5 rounded-xl text-lg font-bold text-blue-800 hover:bg-blue-50 transition"
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2.5 rounded-xl text-lg font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-50 border-t-2 border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <Link 
            to="/services" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 rounded-xl text-xl font-bold text-slate-800 hover:bg-slate-200"
          >
            Services Catalog
          </Link>
          <Link 
            to="/quick-help" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 rounded-xl text-xl font-bold bg-amber-100 text-amber-900"
          >
            ⚡ Quick Help (10-15 min)
          </Link>
          <Link 
            to="/scheduled-delivery" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 rounded-xl text-xl font-bold text-slate-800 hover:bg-slate-200"
          >
            📅 Scheduled Delivery
          </Link>
          <Link 
            to="/equipment" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 rounded-xl text-xl font-bold text-slate-800 hover:bg-slate-200"
          >
            🩺 Medical Equipment
          </Link>
          <Link 
            to="/track" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 rounded-xl text-xl font-bold text-indigo-900 bg-indigo-50"
          >
            🔍 Track Status
          </Link>

          {isAdmin && (
            <Link 
              to="/admin" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 rounded-xl text-xl font-bold text-purple-900 bg-purple-100"
            >
              🛡️ Admin Portal
            </Link>
          )}

          <div className="pt-4 border-t border-slate-300">
            {user ? (
              <div className="space-y-3">
                <Link 
                  to="/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-3 px-4 rounded-xl text-xl font-bold bg-blue-100 text-blue-900"
                >
                  My Dashboard ({user.fullName})
                </Link>
                <button 
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full text-center py-3 px-4 rounded-xl text-xl font-bold bg-red-100 text-red-800"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 rounded-xl text-xl font-bold border-2 border-blue-700 text-blue-800"
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 rounded-xl text-xl font-bold bg-blue-700 text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
