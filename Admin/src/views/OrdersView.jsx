import React, { useState, useEffect } from 'react';
import adminApi from '../services/api';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';

export default function OrdersView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get('/materials/orders');
      setOrders(res.data || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await adminApi.put(`/materials/orders/${orderId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Failed to update order status: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Materials Marketplace Orders</h3>
          <span className="text-xs text-slate-500">{orders.length} total orders</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Order #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items Summary</th>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3 text-right">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      {ord.orderNumber}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{ord.customerName}</div>
                      <div className="text-[10px] text-slate-400">{ord.customerPhone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">
                        {ord.items?.length || 0} Products
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1 max-w-xs">
                        {ord.items?.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {ord.shippingAddress?.city || 'Noida'}, {ord.shippingAddress?.pincode}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      ₹{Number(ord.totalAmount).toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          ord.paymentStatus === 'paid'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {ord.paymentStatus || 'pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <select
                        disabled={updatingId === ord._id}
                        value={ord.status || 'placed'}
                        onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                        className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-800 outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="placed">Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    No material store orders recorded yet.
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
