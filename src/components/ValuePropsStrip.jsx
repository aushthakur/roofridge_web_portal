import React from 'react';
import { ShieldCheck, Compass, Truck, Users } from 'lucide-react';

const PROPS = [
  {
    icon: ShieldCheck,
    stat: '50,000+',
    title: 'Verified Listings',
    desc: 'Strict 100-point physical verification & RERA title audit on every listing.',
  },
  {
    icon: Compass,
    stat: 'Turnkey',
    title: 'Civil & Interiors',
    desc: 'Architects, civil contractors & modular interior designers under one roof.',
  },
  {
    icon: Truck,
    stat: 'Factory',
    title: 'Wholesale Materials',
    desc: 'Direct manufacturer pricing for cement, steel, tiles & electricals.',
  },
  {
    icon: Users,
    stat: 'On-Demand',
    title: 'Skilled Workforce',
    desc: 'GPS-verified mistris, plumbers, electricians & shuttering crew.',
  },
];

export default function ValuePropsStrip() {
  return (
    <div className="trust-strip">
      <div className="rr-container">
        <div className="trust-strip-inner">
          {PROPS.map((p, i) => (
            <div key={i} className="trust-item">
              <div className="trust-icon">
                <p.icon size={20} />
              </div>
              <div className="trust-text">
                <strong>{p.stat} {p.title}</strong>
                <span>{p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
