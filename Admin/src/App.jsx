import React, { useState, useEffect } from 'react';
import adminApi from './services/api';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewView from './views/OverviewView';
import PropertiesView from './views/PropertiesView';
import LeadsView from './views/LeadsView';
import PartnersView from './views/PartnersView';
import BookingsView from './views/BookingsView';
import OrdersView from './views/OrdersView';
import FinanceView from './views/FinanceView';
import AuditLogsView from './views/AuditLogsView';
import CMSView from './views/CMSView';
import { Lock, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('rr_admin_token') || '');
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [overviewData, setOverviewData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Login form state
  const [phone, setPhone] = useState('9999999999');
  const [otp, setOtp] = useState('1234');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const fetchOverview = async () => {
    try {
      setIsRefreshing(true);
      const res = await adminApi.get('/admin/overview');
      setOverviewData(res.data);
    } catch (err) {
      console.error('Failed to sync admin metrics:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const handleAuthExpired = () => {
      setToken('');
      setAdminUser(null);
      setLoginError('Your session has expired. Please log in again.');
    };
    window.addEventListener('admin_auth_expired', handleAuthExpired);

    if (token) {
      // Validate session and fetch overview
      fetchOverview();
      const storedUser = localStorage.getItem('rr_admin_user');
      if (storedUser) {
        try {
          setAdminUser(JSON.parse(storedUser));
        } catch (e) {}
      }
    }

    return () => {
      window.removeEventListener('admin_auth_expired', handleAuthExpired);
    };
  }, [token]);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await adminApi.post('/auth/verify-otp', {
        phone: phone.trim(),
        otp: otp.trim(),
      });

      const userToken = res.data?.token;
      const user = res.data?.user;

      if (!userToken) {
        throw new Error('Authentication token missing from response');
      }

      localStorage.setItem('rr_admin_token', userToken);
      localStorage.setItem('rr_admin_user', JSON.stringify(user));
      setToken(userToken);
      setAdminUser(user);
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rr_admin_token');
    localStorage.removeItem('rr_admin_user');
    setToken('');
    setAdminUser(null);
  };

  // If unauthenticated, show modern Admin Login Screen
  if (!token) {
    return (
      <div className="min-h-screen bg-[#091122] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Subtle executive background accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-slate-200/80 relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <img
              src="/RRlogo_transparent.png"
              alt="RoofRidge"
              className="h-10 w-auto mx-auto object-contain"
            />
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#0866F5] border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0866F5] animate-pulse"></span>
                Executive Admin Portal
              </div>
              <p className="text-xs text-slate-500 mt-1.5 font-medium">
                Operations, Moderation &amp; Platform Control Center
              </p>
            </div>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Admin Mobile Number
              </label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#0866F5] focus-within:ring-2 focus-within:ring-blue-500/20 transition">
                <span className="px-3.5 py-2.5 bg-slate-50 text-slate-500 font-bold border-r border-slate-200 flex items-center">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 outline-none text-slate-800 font-semibold"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Security Passkey / OTP
              </label>
              <input
                type="password"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none font-mono text-center text-sm font-bold tracking-widest focus:border-[#0866F5] focus:ring-2 focus:ring-blue-500/20 transition"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center justify-between">
                <span>Development passkey: <span className="font-bold text-slate-700">1234</span></span>
                <span className="text-emerald-600 font-medium">Ready</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 bg-[#0866F5] hover:bg-[#0653CA] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In to Control Center'}{' '}
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck size={14} /> 256-Bit SSL Encrypted
            </span>
            <button
              onClick={() => {
                setPhone('9999999999');
                setOtp('1234');
                setTimeout(() => handleLogin(null), 100);
              }}
              className="text-[#0866F5] font-bold hover:underline cursor-pointer"
            >
              One-Click Demo Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active View Title Mapping
  const titles = {
    overview: 'Executive Dashboard & Live Platform Metrics',
    properties: 'Property Listing Moderation Desk',
    leads: 'CRM Lead Management & Routing Workspace',
    partners: 'Partner KYC & B2B Onboarding Desk',
    bookings: 'Home Services & Maintenance Fulfillment',
    orders: 'Materials Store Order Operations',
    finance: 'Loans, Mortgages & Legal Compliance Desk',
    cms: 'Marketing Banners & Website Content',
    'audit-logs': 'Immutable Compliance & Security Audit Trail',
  };

  const counts = {
    pendingProperties: overviewData?.metrics?.pendingProperties || 0,
    totalLeads: overviewData?.metrics?.totalLeads || 0,
    totalBookings: overviewData?.metrics?.totalBookings || 0,
    totalOrders: overviewData?.metrics?.totalOrders || 0,
    pendingPartners: 0,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800">
      {/* Collapsible / Fixed Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={counts}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={titles[activeTab] || 'Admin Center'}
          onRefresh={fetchOverview}
          isRefreshing={isRefreshing}
          adminUser={adminUser}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewView
              data={overviewData}
              setActiveTab={setActiveTab}
              onRefresh={fetchOverview}
            />
          )}

          {activeTab === 'properties' && <PropertiesView onPropertyModerated={fetchOverview} />}

          {activeTab === 'leads' && <LeadsView />}

          {activeTab === 'partners' && <PartnersView />}

          {activeTab === 'bookings' && <BookingsView />}

          {activeTab === 'orders' && <OrdersView />}

          {activeTab === 'finance' && <FinanceView />}

          {activeTab === 'cms' && <CMSView />}

          {activeTab === 'audit-logs' && <AuditLogsView />}
        </main>
      </div>
    </div>
  );
}
