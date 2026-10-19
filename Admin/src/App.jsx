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
      <div className="min-h-screen bg-gradient-to-br from-[#0866F5] via-[#0645B8] to-[#04338A] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-blue-100 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0866F5] to-blue-400 text-white flex items-center justify-center font-black text-xl mx-auto shadow-lg shadow-blue-500/25">
              RR
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              ROOF RIDGE ADMIN PORTAL
            </h1>
            <p className="text-xs text-slate-500">
              Platform Administration &amp; Moderation Control Room
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 font-bold mb-1">
                Admin Mobile Number
              </label>
              <div className="flex border border-slate-200 rounded-lg overflow-hidden focus-within:border-[#0866F5]">
                <span className="px-3 py-2 bg-slate-50 text-slate-500 font-bold border-r border-slate-200">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 outline-none text-slate-800 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">
                Security OTP
              </label>
              <input
                type="password"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none font-mono text-center text-sm font-bold tracking-widest focus:border-[#0866F5]"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Development master passkey: <span className="font-bold text-slate-700">1234</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 bg-[#0866F5] hover:bg-[#0653CA] text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In to Control Center'}{' '}
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
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
