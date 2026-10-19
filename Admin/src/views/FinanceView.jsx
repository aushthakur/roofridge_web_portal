import React, { useState, useEffect } from 'react';
import adminApi from '../services/api';
import { Landmark, ShieldCheck, FileCheck, CheckCircle2, Clock, User, Phone, FileText } from 'lucide-react';

export default function FinanceView() {
  const [financeData, setFinanceData] = useState({ loans: [], legal: [] });
  const [loading, setLoading] = useState(true);

  const fetchFinanceRequests = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get('/finance/all');
      setFinanceData(res.data || { loans: [], legal: [] });
    } catch (err) {
      console.warn('Could not fetch all finance requests:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceRequests();
  }, []);

  const sampleLoanPartners = [
    { name: 'HDFC Bank', rate: '8.45%', maxLtv: '80%', leadsProcessed: 42, activeCases: 12 },
    { name: 'State Bank of India', rate: '8.40%', maxLtv: '85%', leadsProcessed: 38, activeCases: 9 },
    { name: 'ICICI Bank', rate: '8.50%', maxLtv: '80%', leadsProcessed: 27, activeCases: 6 },
    { name: 'Axis Bank', rate: '8.60%', maxLtv: '80%', leadsProcessed: 19, activeCases: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Partner Banks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sampleLoanPartners.map((bank) => (
          <div key={bank.name} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">{bank.name}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {bank.rate}
              </span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Max LTV:</span>
                <span className="font-semibold text-slate-700">{bank.maxLtv}</span>
              </div>
              <div className="flex justify-between">
                <span>Leads Processed:</span>
                <span className="font-semibold text-slate-700">{bank.leadsProcessed}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Cases:</span>
                <span className="font-semibold text-blue-600">{bank.activeCases}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Loan Applications & Legal Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Loan Applications */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Landmark size={16} className="text-blue-600" />
              Home Loan Applications
            </h3>
            <span className="text-xs text-slate-500 font-semibold">{financeData.loans?.length || 0} active</span>
          </div>
          <div className="p-4 divide-y divide-slate-100">
            {loading ? (
              <div className="text-center py-6 text-slate-400 text-xs">Loading applications...</div>
            ) : financeData.loans?.length > 0 ? (
              financeData.loans.map((loan) => (
                <div key={loan._id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{loan.applicantName || 'Applicant'}</div>
                    <div className="text-slate-500 text-[11px]">
                      {loan.employmentType || 'Salaried'} • ₹{Number(loan.loanAmountRequired || 0).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-700">
                    {loan.status || 'applied'}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                No home loan applications in queue.
              </div>
            )}
          </div>
        </div>

        {/* Legal Consultations */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileCheck size={16} className="text-indigo-600" />
              Legal & RERA Consultations
            </h3>
            <span className="text-xs text-slate-500 font-semibold">{financeData.legal?.length || 0} active</span>
          </div>
          <div className="p-4 divide-y divide-slate-100">
            {loading ? (
              <div className="text-center py-6 text-slate-400 text-xs">Loading requests...</div>
            ) : financeData.legal?.length > 0 ? (
              financeData.legal.map((item) => (
                <div key={item._id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{item.clientName || 'Client'}</div>
                    <div className="text-slate-500 text-[11px] max-w-xs truncate">
                      {item.serviceType}: {item.propertyDetails}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-100 text-indigo-700">
                    {item.status || 'requested'}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                No legal consultation requests in queue.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compliance & DPDP Act 2023 status card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Regulatory Compliance & Data Protection (DPDP Act 2023)
            </h3>
            <p className="text-xs text-slate-500">
              Compliance status verified per Blueprint VOL-20 Legal & Compliance standards
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" />
              UP RERA License Verification
            </div>
            <p className="text-slate-500 text-[11px]">
              Automated RERA registration number regex check and state registry validation enabled.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" />
              Customer Consent Records
            </div>
            <p className="text-slate-500 text-[11px]">
              Explicit consent logged with timestamp and IP address prior to partner lead dispatch.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" />
              Escrow & Transaction Auditing
            </div>
            <p className="text-slate-500 text-[11px]">
              Razorpay sandbox transaction tokens mapped with double-entry ledger records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
