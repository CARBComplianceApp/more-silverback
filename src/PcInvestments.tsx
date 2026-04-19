import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  PieChart, 
  Briefcase, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  Globe, 
  Lock, 
  Cpu,
  Zap,
  ChevronRight,
  ShieldCheck,
  Users
} from 'lucide-react';

export default function PcInvestments() {
  const [activeSegment, setActiveSegment] = useState('EQUITY');

  const stats = [
    { label: 'Total AUM', value: '$842.5M', change: '+12.4%', up: true },
    { label: 'Active Portfolios', value: '1,248', change: '+3.2%', up: true },
    { label: 'Risk Exposure', value: 'Low-Med', change: '-2.1%', up: true },
    { label: 'Alpha Yield', value: '18.2%', change: '+0.5%', up: true },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 bg-background text-foreground font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
             <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-dim">Alpha Strategy v4.2</span>
          </div>
          <h1 className="font-display text-4xl md:text-7xl tracking-widest uppercase mb-4 silver-gradient">
            PC <span className="italic">INVESTMENTS</span>
          </h1>
          <p className="text-dim max-w-2xl text-lg font-light leading-relaxed">
            High-precision capital management powered by Silverback AI neural models. 
            Automated wealth preservation and opportunistic growth and acquisition.
          </p>
        </header>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card border border-border p-6 rounded-none backdrop-blur-md hover:border-accent/40 transition-colors group">
              <div className="text-[10px] uppercase tracking-[0.2em] text-dimmer mb-2">{stat.label}</div>
              <div className="text-2xl font-display uppercase tracking-wider mb-2 group-hover:text-accent transition-colors">{stat.value}</div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change} <span className="text-dim/50 ml-1">vs LTM</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-900/40 border border-white/5 p-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Briefcase size={120} />
               </div>
               
               <div className="relative z-10">
                 <div className="flex items-center justify-between mb-8">
                   <h2 className="font-display text-2xl tracking-widest uppercase flex items-center gap-3">
                     <PieChart className="text-accent" size={20} />
                     Asset Allocation
                   </h2>
                   <div className="flex gap-2">
                     {['MARKETS', 'EQUITY', 'RE'].map(seg => (
                       <button 
                         key={seg}
                         onClick={() => setActiveSegment(seg)}
                         className={`px-3 py-1 text-[10px] font-mono tracking-widest border transition-all ${activeSegment === seg ? 'border-accent text-accent' : 'border-white/10 text-dim hover:text-foreground'}`}
                       >
                         {seg}
                       </button>
                     ))}
                   </div>
                 </div>

                 <div className="h-[300px] flex items-end gap-2 mb-8">
                    {[45, 78, 52, 91, 63, 84, 45, 96, 72, 88].map((v, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${v}%` }}
                        className="flex-1 bg-gradient-to-t from-accent/5 to-accent/40 border-t border-accent/60 relative group"
                      >
                         <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity" />
                      </motion.div>
                    ))}
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-black/40 border border-white/5">
                       <span className="text-[10px] font-mono tracking-[0.2em] text-dimmer block mb-2 uppercase">Neural Prediction</span>
                       <p className="text-sm font-light leading-relaxed">
                         Proprietary models indicate a <span className="text-accent">+4.2% bullish shift</span> in industrial acquisition targets over the next 18 days.
                       </p>
                    </div>
                    <div className="p-4 bg-black/40 border border-white/5">
                       <span className="text-[10px] font-mono tracking-[0.2em] text-dimmer block mb-2 uppercase">Risk Multiplier</span>
                       <p className="text-sm font-light leading-relaxed">
                         Current volatility remains within <span className="silver-gradient italic font-medium">Safe Havens</span> of the Silverback Alpha Index.
                       </p>
                    </div>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 bg-zinc-900/40 border border-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="text-accent" size={18} />
                    <h3 className="font-display text-lg tracking-widest uppercase">Live Pulse</h3>
                  </div>
                  <div className="space-y-4">
                     {[
                       { label: 'S&P 500', val: '5,142.12', ch: '+0.8%' },
                       { label: 'NASDAQ', val: '16,211.50', ch: '+1.2%' },
                       { label: 'BTC/USD', val: '68,241.00', ch: '-0.3%' },
                     ].map((item, i) => (
                       <div key={i} className="flex justify-between items-center py-2 border-b border-border/50">
                         <span className="text-xs font-light text-dim uppercase tracking-widest">{item.label}</span>
                         <div className="text-right">
                            <div className="text-sm font-display tracking-widest">{item.val}</div>
                            <div className={`text-[9px] ${item.ch.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{item.ch}</div>
                         </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="p-8 bg-black/40 border border-accent/20 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg tracking-widest uppercase mb-4">Investment Portal</h3>
                    <p className="text-xs text-dim leading-relaxed mb-6">
                      Access exclusive acquisition opportunities pre-vetted by our M&A neural branch.
                    </p>
                  </div>
                  <button className="w-full py-3 bg-silver-gradient text-background font-mono text-[10px] tracking-[0.3em] uppercase font-bold hover:brightness-110 transition-all">
                    Enter Portal <ChevronRight size={12} className="inline ml-1" />
                  </button>
               </div>
            </div>
          </div>

          <div className="space-y-6">
              <div className="bg-zinc-900 border border-border p-8">
               <h3 className="font-display text-lg tracking-widest uppercase mb-8 pb-4 border-b border-border flex items-center gap-2">
                 <Users size={18} className="text-accent" />
                 Strategic Tracking
               </h3>
               <div className="space-y-6">
                  <p className="text-[10px] font-mono text-dimmer uppercase tracking-widest mb-4">Neural Mirroring: Political Benchmarks</p>
                  {[
                    { entity: 'Pelosi Tracker', ticker: 'PANW / NVDA', action: 'BUY', status: 'Inflow', color: 'text-green-500' },
                    { entity: 'Senate Ledger', ticker: 'V / MA', action: 'HOLD', status: 'Neutral', color: 'text-dim' },
                    { entity: 'House Oversight', ticker: 'LMT / RTX', action: 'EXIT', status: 'Outflow', color: 'text-red-500' },
                  ].map((track, i) => (
                    <div key={i} className="p-3 bg-black/40 border border-white/5 hover:border-accent/30 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider">{track.entity}</span>
                        <span className={`text-[9px] font-mono font-bold ${track.color}`}>{track.action}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-dim">{track.ticker}</span>
                        <span className="text-[9px] uppercase tracking-widest text-dimmer">{track.status}</span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-accent/5 border border-dashed border-accent/20 text-[10px] text-dim leading-relaxed italic">
                    "AI mimics high-conviction political trades via publicly disclosed filings with 24h lag."
                  </div>
               </div>
             </div>

             <div className="bg-zinc-900 border border-border p-8">
               <h3 className="font-display text-lg tracking-widest uppercase mb-8 pb-4 border-b border-border">News Feed</h3>
               <div className="space-y-8">
                  {[
                    { date: 'APR 19', title: 'Silverback acquires 12% stake in Gilly Security hardware division.', category: 'M&A' },
                    { date: 'APR 18', title: 'Federal Reserve maintaining rates signals stability for capital markets.', category: 'MACRO' },
                    { date: 'APR 16', title: 'Neural Model v4.2 training complete; 18% improvement in forecast accuracy.', category: 'TECH' },
                  ].map((news, i) => (
                    <div key={i} className="group">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-accent/10 text-accent rounded-sm uppercase tracking-widest">{news.category}</span>
                        <span className="text-[9px] font-mono text-dimmer tracking-widest">{news.date}</span>
                      </div>
                      <h4 className="text-sm leading-relaxed font-light group-hover:text-accent transition-colors cursor-pointer line-clamp-2">{news.title}</h4>
                    </div>
                  ))}
               </div>
             </div>

             <div className="bg-accent/5 border border-accent/20 p-8 flex flex-col items-center text-center">
                <ShieldCheck className="text-accent mb-4" size={40} />
                <h3 className="font-display text-xl tracking-widest uppercase mb-3">Institutional Grade</h3>
                <p className="text-xs text-dim leading-relaxed mb-6">
                  Every transaction is secured by Gilly Private Key architecture and verified across 12 distributed nodes.
                </p>
                <div className="p-4 bg-background border border-border w-full flex items-center justify-between backdrop-blur-md">
                   <span className="font-mono text-[10px] tracking-widest text-dimmer uppercase">Network</span>
                   <span className="text-[10px] font-bold text-accent uppercase tracking-widest animate-pulse">Encrypted</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
