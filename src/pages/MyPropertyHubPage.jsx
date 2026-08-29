import React, { useState } from 'react';
import { ShieldCheck, FileText, Download, Upload, Bell, Calendar, Lock, CheckCircle2 } from 'lucide-react';

export default function MyPropertyHubPage({ onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('locker');

  const documents = [
    { title: 'Registered Sale Deed (Original)', type: 'Legal Title', date: '14 Jan 2026', size: '4.2 MB', verified: true },
    { title: 'Encumbrance Certificate (EC)', type: 'RERA Compliance', date: '20 Feb 2026', size: '1.8 MB', verified: true },
    { title: 'Property Tax Payment Receipt 2026', type: 'Tax Record', date: '05 Mar 2026', size: '890 KB', verified: true },
    { title: 'SBI Home Loan Sanction Letter', type: 'Banking', date: '12 Apr 2026', size: '2.5 MB', verified: true }
  ];

  const reminders = [
    { title: 'Property Tax Installment Due', date: '15 Sep 2026', amount: '₹ 14,200', status: 'Pending' },
    { title: 'Quarterly AMC Plumbing Audit', date: '22 Sep 2026', amount: 'Included in AMC', status: 'Scheduled' }
  ];

  return (
    <div className="max-w-[1380px] mx-auto px-8 py-8 animate-fade font-sans">
      {/* Header Banner */}
      <div className="bg-[#0B192C] text-white rounded-2xl p-8 mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl text-white">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/40 inline-block mb-3">
            Personalized Property Dashboard
          </span>
          <h1 className="text-3xl font-bold font-heading mb-2 text-white">
            My Property Hub & Encrypted Digital Locker
          </h1>
          <p className="text-xs text-white opacity-95 leading-relaxed">
            Store sale deeds, registry agreements, tax receipts & loan NOCs in a 256-bit bank-grade digital vault with automated tax & service reminders.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 border-b border-slate-200 pb-4">
        <button 
          onClick={() => setActiveTab('locker')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'locker' ? 'bg-[#0B192C] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Document Vault Locker
        </button>
        <button 
          onClick={() => setActiveTab('reminders')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'reminders' ? 'bg-[#0B192C] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Tax & Payment Reminders
        </button>
      </div>

      {/* Locker View */}
      {activeTab === 'locker' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#0B192C] text-base font-heading">Encrypted Documents</h3>
              <button 
                onClick={() => alert("Upload dialog initialized. Select PDF/Image from local device.")}
                className="bg-[#0B192C] hover:bg-[#162B48] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all"
              >
                <Upload size={14} />
                <span>Upload New Document</span>
              </button>
            </div>

            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:border-[#0B192C] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0B192C] flex items-center justify-center font-bold">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#0B192C] text-xs font-heading">{doc.title}</h4>
                        {doc.verified && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                            <CheckCircle2 size={10} /> Verified
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{doc.type} • {doc.date} • {doc.size}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Downloading verified copy of ${doc.title}...`)}
                    className="p-2 text-slate-500 hover:text-[#0B192C] transition-colors"
                    title="Download Document"
                  >
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0B192C] text-white p-6 rounded-2xl border border-[#0B192C] shadow-xs h-fit space-y-4">
            <div className="flex items-center gap-2">
              <Lock size={20} className="text-white" />
              <h4 className="font-bold text-white text-sm font-heading">256-Bit Bank-Grade Security</h4>
            </div>
            <p className="text-xs text-white opacity-95 leading-relaxed">
              Your property documents are stored in encrypted cloud vaults with biometric & OTP authorization access only.
            </p>
          </div>
        </div>
      )}

      {/* Reminders View */}
      {activeTab === 'reminders' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-2xl">
          <h3 className="font-bold text-[#0B192C] text-base font-heading mb-4">Upcoming Due Dates & Maintenance</h3>

          <div className="space-y-3">
            {reminders.map((rem, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#0B192C] text-xs font-heading">{rem.title}</h4>
                  <span className="text-xs text-slate-500 block mt-0.5">Due Date: {rem.date}</span>
                </div>
                <div className="text-right">
                  <strong className="text-sm font-bold text-[#0B192C] block font-heading">{rem.amount}</strong>
                  <span className="text-[10px] font-bold bg-slate-100 text-[#0B192C] px-2 py-0.5 rounded inline-block mt-0.5">{rem.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
