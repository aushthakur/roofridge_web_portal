import React, { useState, useEffect } from 'react';
import adminApi from '../services/api';
import { Sliders, Plus, Image as ImageIcon, ExternalLink } from 'lucide-react';

export default function CMSView() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCtaText, setNewCtaText] = useState('Explore Now');
  const [newCtaLink, setNewCtaLink] = useState('/properties');
  const [creating, setCreating] = useState(false);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get('/cms/banners');
      setBanners(res.data || []);
    } catch (err) {
      console.error('Failed to fetch banners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleCreateBanner = async (e) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;

    try {
      setCreating(true);
      await adminApi.post('/cms/banners', {
        title: newTitle,
        subtitle: newSubtitle,
        imageUrl: newImageUrl,
        ctaText: newCtaText,
        ctaLink: newCtaLink,
        placement: 'home_hero',
      });
      setNewTitle('');
      setNewSubtitle('');
      setNewImageUrl('');
      fetchBanners();
    } catch (err) {
      alert('Failed to create banner: ' + err.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Banner Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Plus size={16} className="text-[#FF5722]" />
          Create New Homepage Hero Banner
        </h3>

        <form onSubmit={handleCreateBanner} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Banner Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Noida Expressway Mega Property Fest 2026"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#FF5722]"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Subtitle / Description</label>
            <input
              type="text"
              placeholder="e.g. Exclusive zero-brokerage deals with guaranteed possession"
              value={newSubtitle}
              onChange={(e) => setNewSubtitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#FF5722]"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Image URL</label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/photo-..."
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#FF5722]"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-slate-600 font-bold mb-1">Button Text</label>
              <input
                type="text"
                value={newCtaText}
                onChange={(e) => setNewCtaText(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#FF5722]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-slate-600 font-bold mb-1">Link Target</label>
              <input
                type="text"
                value={newCtaLink}
                onChange={(e) => setNewCtaLink(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#FF5722]"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={creating}
              className="px-5 py-2 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-lg font-bold text-xs shadow-xs transition cursor-pointer"
            >
              {creating ? 'Publishing...' : 'Publish Banner'}
            </button>
          </div>
        </form>
      </div>

      {/* Active Banners Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Active Website Banners</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col"
            >
              <img src={b.imageUrl} alt="" className="w-full h-36 object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#FF5722] uppercase tracking-wider">
                    {b.placement}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">{b.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{b.subtitle}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Action: {b.ctaText}</span>
                  <span className="text-slate-400 font-mono text-[10px]">{b.ctaLink}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
