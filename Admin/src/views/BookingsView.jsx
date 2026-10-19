import React, { useState, useEffect } from 'react';
import adminApi from '../services/api';
import { CalendarCheck, Phone, Clock, Search, CheckCircle2 } from 'lucide-react';

export default function BookingsView() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get(`/bookings?status=${statusFilter}`);
      setBookings(res.data || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await adminApi.put(`/bookings/${id}/status`, { status: newStatus });
      fetchBookings();
    } catch (err) {
      alert('Failed to update booking: ' + err.message);
    }
  };

  return (
    <div className="space-y-5">
      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          {['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Booking #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date & Slot</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings.map((bkg) => (
                  <tr key={bkg._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      {bkg.bookingNumber}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{bkg.customerName}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Phone size={10} /> {bkg.customerPhone}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{bkg.serviceName}</div>
                      <div className="text-[10px] text-slate-400 capitalize">
                        {bkg.serviceCategory}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-800">
                        {new Date(bkg.scheduledDate).toLocaleDateString()}
                      </div>
                      <div className="text-[10px] text-slate-400">{bkg.timeSlot}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                      {bkg.address?.locality || bkg.address?.city || 'Noida'}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      ₹{bkg.totalAmount || 0}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <select
                        value={bkg.status}
                        onChange={(e) => handleStatusUpdate(bkg._id, e.target.value)}
                        className={`text-[10px] font-bold uppercase rounded-lg px-2 py-1 outline-none border border-slate-200 cursor-pointer ${
                          bkg.status === 'confirmed'
                            ? 'bg-blue-50 text-blue-700'
                            : bkg.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : bkg.status === 'in_progress'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    No bookings recorded matching filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
