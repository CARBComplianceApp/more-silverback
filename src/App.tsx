/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Cpu, 
  ChevronRight, 
  Globe, 
  Lock, 
  ArrowRight,
  Twitter,
  Github,
  Linkedin,
  Menu,
  X,
  Check,
  Search,
  Scale,
  Home,
  Hammer,
  Truck,
  Stethoscope,
  TrendingUp,
  Sun,
  Moon,
  Send
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// This is the "Silverback Brain" — The data Dave needs
const INITIAL_DATA = [
  { unit: '101', tenant: 'Bill Burr', rent: 1695, status: 'late', prop: 'Ruby' },
  { unit: '102', tenant: 'Amy Poehler', rent: 2495, status: 'paid', prop: 'Ruby' },
  { unit: '201', tenant: 'Ben Affleck', rent: 2750, status: 'paid', prop: 'SF' },
  { unit: '305', tenant: 'Matt Damon', rent: 3100, status: 'late', prop: 'SF' },
  { unit: '412', tenant: 'Casey Affleck', rent: 1850, status: 'paid', prop: 'Ruby' },
];

export default function App() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState<'SILVERBACK' | 'RENTDMC'>('SILVERBACK');
  const [data, setData] = useState(INITIAL_DATA);

  // Generate Hero Image
  useEffect(() => {
    async function generateHero() {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A majestic, wise, and kind-looking silverback gorilla. His expression is peaceful and protective, not aggressive. Subtle, elegant glowing blue neural patterns trace through his silver fur, blending nature and technology. Soft cinematic lighting, deep forest background with hints of digital data streams. High resolution, professional branding, empathetic and strong presence.',
              },
            ],
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            setHeroImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Failed to generate hero image:", error);
      }
    }
    generateHero();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-[var(--theme-bg)] text-[var(--theme-txt)] min-h-screen relative overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--theme-card)]/80 backdrop-blur-xl border-b border-[var(--theme-border)] px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-3 group">
              <div className="logo-hex w-9 h-9 flex items-center justify-center text-bg font-bold text-lg shadow-[0_0_16px_rgba(200,200,200,0.14)]">
                🦍
              </div>
              <span className="font-display text-2xl tracking-[0.2em] silver-gradient uppercase hidden sm:inline">Silverback AI</span>
            </a>

            <div className="brand-toggle hidden lg:flex">
              <button 
                className={view === 'SILVERBACK' ? 'active' : ''} 
                onClick={() => setView('SILVERBACK')}
              >
                🦍 PORTAL
              </button>
              <button 
                className={view === 'RENTDMC' ? 'active' : ''} 
                onClick={() => setView('RENTDMC')}
              >
                || RENT DMC ||
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            {view === 'SILVERBACK' && (
              <div className="hidden md:flex items-center gap-2">
                {['Products', 'Industries', 'Contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    className="font-mono text-[10px] tracking-[0.2em] text-[var(--theme-dim)] uppercase px-4 py-2 hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}

            {view === 'RENTDMC' && (
              <div className="hidden md:block font-mono text-[10px] tracking-widest text-[var(--theme-dim)] uppercase">
                Dave Cowan | West Region
              </div>
            )}

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-white/5 transition-colors text-[var(--theme-dim)]"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              {view === 'SILVERBACK' && (
                <a 
                  href="#intake" 
                  className="hidden sm:block font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 bg-silver-gradient text-bg font-medium transition-all hover:shadow-[0_0_26px_rgba(200,200,200,0.24)] hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}
                >
                  Free Discovery →
                </a>
              )}
            </div>

            <button className="md:hidden text-[var(--theme-dim)]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-40 bg-[var(--theme-bg)] pt-24 px-8 md:hidden"
            >
              <div className="flex flex-col gap-8 text-2xl font-display font-bold uppercase tracking-widest">
                <div className="flex flex-col gap-4 mb-4">
                  <button 
                    className={`text-left ${view === 'SILVERBACK' ? 'silver-gradient' : 'text-dim'}`}
                    onClick={() => { setView('SILVERBACK'); setIsMenuOpen(false); }}
                  >
                    🦍 SILVERBACK PORTAL
                  </button>
                  <button 
                    className={`text-left ${view === 'RENTDMC' ? 'silver-gradient' : 'text-dim'}`}
                    onClick={() => { setView('RENTDMC'); setIsMenuOpen(false); }}
                  >
                    || RENT DMC DASHBOARD ||
                  </button>
                </div>
                <hr className="border-white/5" />
                <a href="#products" onClick={() => setIsMenuOpen(false)}>Products</a>
                <a href="#industries" onClick={() => setIsMenuOpen(false)}>Industries</a>
                <a href="#intake" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {view === 'SILVERBACK' ? (
          <>
            {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 pt-24 overflow-hidden">
        {/* Gradients */}
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-radial-[circle,rgba(170,170,170,0.07)_0%,transparent_62%] pointer-events-none z-0 animate-pulse" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[400px] h-[400px] bg-radial-[circle,rgba(100,100,100,0.05)_0%,transparent_62%] pointer-events-none z-0" />

        <div className="max-w-[900px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.4em] text-sd uppercase mb-6"
          >
            <div className="w-7 h-[1px] bg-dimmer" />
            AI Automation Agency · Any Industry · Any Business
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-[clamp(70px,11vw,150px)] leading-[0.9] tracking-[2px] text-white uppercase"
          >
            What Keeps<br />You Up<br />
            <span className="silver-gradient italic">At Night?</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg font-light text-dim mt-7 max-w-[540px] leading-[1.85]"
          >
            We find what's stealing your time, your energy, and your evenings — then <strong className="text-sm font-normal">build AI that makes it disappear</strong>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a 
              href="#intake" 
              className="inline-flex items-center gap-3 bg-silver-gradient text-bg font-mono text-[11px] tracking-[2px] uppercase px-8 py-4 font-medium transition-all hover:shadow-[0_0_32px_rgba(200,200,200,0.26)] hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}
            >
              Tell Us Your Problem →
            </a>
            <a 
              href="#products" 
              className="inline-flex items-center gap-3 bg-transparent text-sm font-mono text-[11px] tracking-[2px] uppercase px-8 py-4 border border-white/10 transition-all hover:border-sd hover:bg-white/5"
            >
              See Our Work
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-11 mt-14 pt-7 border-t border-white/5"
          >
            {[
              { val: '24H', label: 'Response' },
              { val: 'FREE', label: 'Discovery' },
              { val: '100%', label: 'Custom Built' },
              { val: '∞', label: 'Industries' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display text-3xl silver-gradient-2">{stat.val}</div>
                <div className="font-mono text-[9px] tracking-[2px] text-dimmer uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-silver-gradient py-4 overflow-hidden" style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}>
        <div className="flex whitespace-nowrap animate-[scroll_28s_linear_infinite]">
          {Array(4).fill([
            'What Keeps You Up At Night', 'We Have The Solution', 'Real Estate', 'Law Firms', 'Flooring', 'Congressional Trades', 'Home Remodeling', 'Any Industry', 'Deployed Fast'
          ]).flat().map((text, i) => (
            <div key={i} className="font-display text-[17px] tracking-[4px] text-bg px-8 flex items-center gap-4 border-r border-black/10">
              {text}
              <span className="text-[7px] opacity-25">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="pt-20">
        <div className="px-6 md:px-12 mb-10">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[4px] text-sd uppercase mb-3">
            <div className="w-5 h-[1px] bg-dimmer" />
            What We Build
          </div>
          <h2 className="font-display text-[clamp(38px,5vw,62px)] leading-none tracking-[2px] text-white">
            Real Products.<br /><span className="silver-gradient">Real Results.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-[2px] bg-white/5">
          {/* REAL ESTATE */}
          <div className="bg-s1 grid lg:grid-cols-2 min-h-[460px] relative overflow-hidden group hover:bg-s2 transition-colors">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-silver-gradient scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            <div className="p-9 flex items-center justify-center bg-bg border-r border-white/5">
              <div className="w-full max-w-[340px] font-mono border border-white/10 bg-[#0a0a0a] overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#111] border-b border-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#f85149]" />
                  <div className="w-2 h-2 rounded-full bg-[#d29922]" />
                  <div className="w-2 h-2 rounded-full bg-[#3fb950]" />
                  <div className="text-[9px] text-[#444] tracking-[2px] uppercase mx-auto">Real Estate Intelligence</div>
                </div>
                <div className="p-4">
                  <div className="bg-[#0d0d0d] border border-white/5 p-2 text-[8px] text-[#383838] tracking-widest mb-2">🔍 &nbsp;Search city, ZIP, or property type...</div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { n: '247', l: 'Active Listings' },
                      { n: '$1.2M', l: 'Avg Price' },
                      { n: '18%', l: 'Tax Savings' },
                      { n: '12', l: 'Markets' }
                    ].map((s, i) => (
                      <div key={i} className="bg-[#111] border border-white/5 p-2">
                        <div className="text-sm font-medium silver-gradient">{s.n}</div>
                        <div className="text-[7px] text-[#444] uppercase tracking-widest mt-0.5">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  {[
                    { a: '4821 Oakridge Dr, Sacramento', s: 'Prop tax: $8,240/yr · 1031 eligible', p: '$849K', t: 'HOT' },
                    { a: '112 Harbor Ct, Stockton', s: 'Cash flow +$680/mo · Below market', p: '$415K', t: 'DEAL' }
                  ].map((r, i) => (
                    <div key={i} className="bg-[#0d0d0d] border border-white/5 p-2 mb-2 flex justify-between items-center">
                      <div>
                        <div className="text-[10px] text-[#888]">{r.a}</div>
                        <div className="text-[8px] text-[#444] mt-0.5">{r.s}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-[#a0a0a0] font-medium">{r.p}</div>
                        <div className="text-[7px] px-1.5 py-0.5 bg-white/5 text-[#606060] border border-white/10 mt-0.5">{r.t}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[3px] text-sd uppercase mb-2">
                Real Estate Intelligence 
                <span className="px-2 py-0.5 bg-white/5 text-sm border border-white/10">Live Demo</span>
              </div>
              <h3 className="font-display text-5xl tracking-[2px] text-white mb-2 leading-none uppercase">Real Estate<br />Module</h3>
              <p className="text-sm text-dim font-light leading-[1.8] mb-7 max-w-[420px]">
                An investor intelligence dashboard tracking listings, tax exposure, cash flow, and market signals across any city you want to target.
              </p>
              <div className="space-y-3 mb-7">
                {[
                  { i: '💰', t: 'Automatic Tax Estimates', d: 'Property tax, 1031 eligibility, depreciation flags on every listing — no more manual lookups' },
                  { i: '🗺️', t: 'Custom City Targeting', d: 'Add any market — Sacramento, Stockton, Elk Grove, Bay Area. Your dashboard, your territory.' }
                ].map((b, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-lg shrink-0 mt-0.5">{b.i}</span>
                    <div>
                      <strong className="block text-[13px] font-medium text-sl">{b.t}</strong>
                      <span className="text-xs text-dim font-light">{b.d}</span>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#intake" className="inline-flex items-center px-6 py-3 bg-silver-gradient text-bg font-mono text-[10px] tracking-[2px] uppercase font-medium hover:shadow-[0_0_22px_rgba(200,200,200,0.22)] hover:-translate-y-0.5 w-fit">Get This Built →</a>
            </div>
          </div>

          {/* CONGRESSIONAL */}
          <div className="bg-s1 grid lg:grid-cols-2 min-h-[460px] relative overflow-hidden group hover:bg-s2 transition-colors lg:direction-rtl">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-silver-gradient scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            <div className="p-9 flex items-center justify-center bg-[#060809] border-l border-white/5 lg:direction-ltr">
              <div className="w-full max-w-[340px] font-mono border border-[#151d1a] bg-[#060809] overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#0d1117] border-b border-[#161b22]">
                  <span className="text-sm font-semibold text-[#e6edf3] tracking-tighter">P<em className="not-italic text-[#3fb950]">c</em></span>
                  <span className="text-[8px] text-[#3fb950] tracking-[2px] ml-auto">● LIVE</span>
                </div>
                <div className="bg-[#d29922]/10 border-l-2 border-[#d29922] p-2.5 m-2.5 text-[9px] text-[#d29922] tracking-tight">⚡ CLUSTER: 9 members bought NVDA this week — AI bill vote pending</div>
                {[
                  { n: 'Pelosi, N.', s: 'NVDA', b: '▲ BUY', a: '$500K–$1M', c: 'text-[#3fb950]' },
                  { n: 'Crenshaw, D.', s: 'LMT', b: '▲ BUY', a: '$250K–$500K', c: 'text-[#3fb950]' },
                  { n: 'Tuberville, T.', s: 'CVX', b: '▼ SELL', a: '$100K–$250K', c: 'text-[#f85149]' },
                  { n: 'Warner, M.', s: 'MSFT', b: '▲ BUY', a: '$1M–$5M', c: 'text-[#3fb950]' }
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-center px-2.5 py-2 border-b border-[#0d1117] text-[9px]">
                    <span className="text-[#8b949e]">{r.n}</span>
                    <span className="text-[#58a6ff] font-semibold">{r.s}</span>
                    <span className={`${r.c} font-semibold text-[8px]`}>{r.b}</span>
                    <span className="text-[#8b949e] text-[8px]">{r.a}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-12 flex flex-col justify-center lg:direction-ltr">
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[3px] text-sd uppercase mb-2">
                Congressional Intelligence 
                <span className="px-2 py-0.5 bg-white/5 text-sm border border-white/10">Live Demo</span>
              </div>
              <h3 className="font-display text-5xl tracking-[2px] text-white mb-2 leading-none uppercase">Pc — Trade<br />Tracker</h3>
              <p className="text-sm text-dim font-light leading-[1.8] mb-7 max-w-[420px]">
                Every stock trade by every U.S. Senator and Congress member — all 535 of them — tracked from public STOCK Act filings. Free to browse. Pro gets alerts.
              </p>
              <div className="space-y-3 mb-7">
                {[
                  { i: '🔥', t: 'Cluster Alerts', d: '3+ members buy the same stock before a vote — that\'s the signal that matters' },
                  { i: '📡', t: 'Free Government Data', d: 'congress.gov STOCK Act API — $0 data cost, fully public, fully legal' }
                ].map((b, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-lg shrink-0 mt-0.5">{b.i}</span>
                    <div>
                      <strong className="block text-[13px] font-medium text-sl">{b.t}</strong>
                      <span className="text-xs text-dim font-light">{b.d}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <a href="#" className="inline-flex items-center px-6 py-3 bg-silver-gradient text-bg font-mono text-[10px] tracking-[2px] uppercase font-medium hover:shadow-[0_0_22px_rgba(200,200,200,0.22)] hover:-translate-y-0.5 w-fit">View Live Demo →</a>
                <a href="#intake" className="inline-flex items-center px-6 py-3 bg-transparent text-sm font-mono text-[10px] tracking-[2px] uppercase border border-white/10 hover:border-sd hover:bg-white/5 transition-all">Get Pro Access</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section id="industries" className="py-20 px-6 md:px-12 bg-s1 relative z-10">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[4px] text-sd uppercase mb-3">
          <div className="w-5 h-[1px] bg-dimmer" />
          Industries We Serve
        </div>
        <h2 className="font-display text-[clamp(38px,5vw,62px)] leading-none tracking-[2px] text-white mb-0">
          If You Work In It,<br /><span className="silver-gradient">We Can Automate It.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/5 mt-10">
          {[
            { i: '⚖️', n: 'Law Firms', d: 'Intake forms, document assembly, client follow-up, billing summaries — eliminate the admin that buries attorneys.', f: 'Smart Intake · Doc Gen · Client Portal' },
            { i: '🏠', n: 'Real Estate', d: 'Investor dashboards, listing alerts, tax analysis, cash flow calculators, and lead capture — any market, any niche.', f: 'Market Intel · Tax Calc · Lead Capture' },
            { i: '🪵', n: 'Flooring & Tile', d: 'Takeoff calculators, bilingual quotes, supplier order lists, and homeowner estimate tools.', f: 'Takeoff · Spanish · Quote Gen' },
            { i: '🔧', n: 'Home Services', d: 'HVAC, plumbing, electrical, roofing — estimate calculators, booking forms, automated follow-up.', f: 'Estimate · Booking · Follow-Up' },
            { i: '🚛', n: 'Trucking & Fleet', d: 'Compliance tracking, CARB testing reminders, route optimization, driver document management.', f: 'Compliance · CARB · Scheduling' },
            { i: '🏗️', n: 'Construction', d: 'Bid calculators, subcontractor tracking, project timelines, and homeowner remodel estimators.', f: 'Bid Calc · Lead Gen · Tracking' },
            { i: '🏥', n: 'Medical & Dental', d: 'Patient intake, insurance pre-screening, appointment reminders, treatment plan summaries.', f: 'Intake · Insurance · Scheduling' },
            { i: '📈', n: 'Finance & Investing', d: 'Portfolio dashboards, congressional trade trackers, market alerts, and client reporting.', f: 'Trade Tracking · Alerts · Reports' }
          ].map((item, i) => (
            <div key={i} className="bg-bg p-7 hover:bg-s2 transition-colors group relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-silver-gradient scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="text-3xl mb-3">{item.i}</div>
              <h3 className="font-display text-xl tracking-widest text-white mb-2 uppercase">{item.n}</h3>
              <p className="text-xs text-dim font-light leading-relaxed mb-3">{item.d}</p>
              <div className="font-mono text-[8px] text-sd tracking-widest uppercase mt-2">{item.f}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-6 md:px-12 bg-s1 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-radial-[circle,rgba(180,180,180,0.05)_0%,transparent_65%] pointer-events-none" />
        
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-20 items-center">
          <div className="relative">
            <div className="w-full aspect-[4/5] bg-s2 border border-white/10 relative overflow-hidden flex items-end">
              <div className="absolute inset-0 bg-radial-[ellipse_at_50%_30%,rgba(180,180,180,0.04)_0%,transparent_60%]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-display text-[160px] tracking-[-8px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] select-none">BG</div>
              </div>
              <div className="absolute inset-0">
                <div className="absolute top-0 left-[38%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute top-0 left-[52%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute top-0 left-[63%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              </div>
              <div className="relative z-10 w-full p-6 bg-gradient-to-t from-bg/95 to-transparent border-t border-white/5">
                <div className="font-display text-3xl tracking-widest silver-gradient uppercase">Bryan Gillis</div>
                <div className="font-mono text-[10px] tracking-widest text-dim uppercase mt-1">Founder · Silverback AI</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['Charlestown, MA', '$7M Flooring Co.', 'Marriott Hotels', 'Trinidad & Tobago', 'Napa, CA'].map((c, i) => (
                <div key={i} className="font-mono text-[9px] tracking-widest px-3 py-1.5 border border-white/5 text-dim uppercase">{c}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[4px] text-dim uppercase mb-3">
              <div className="w-5 h-[1px] bg-[#2a2a2a]" />
              Why This Works
            </div>
            <h2 className="font-display text-[clamp(40px,5vw,66px)] leading-[0.95] tracking-[2px] text-white mb-7 uppercase">
              Most AI Agencies<br />Have Never Run<br /><span className="silver-gradient">A Real Business.</span>
            </h2>
            <div className="space-y-5 text-base font-light text-[#666] leading-[1.9]">
              <p>I grew up in Charlestown, Massachusetts — where you don't learn things in a classroom, you learn them by doing. That shaped everything.</p>
              <p>Before AI, I built a flooring company to <strong className="text-[#888] font-normal">$6–7 million in annual revenue</strong>. We laid floors in Marriott hotels, did custom residential work in Napa, and ran commercial projects across Trinidad and Tobago. I've done takeoffs by hand at midnight. I've chased invoices. I've hired and fired crews. I've watched jobs go sideways because of a spreadsheet error.</p>
              
              <div className="border-l-2 border-[#2a2a2a] px-7 py-5 my-7 relative bg-white/[0.015]">
                <div className="absolute top-[-1px] left-0 right-0 h-[1px] bg-silver-gradient opacity-25" />
                <p className="font-display text-[clamp(22px,2.5vw,30px)] tracking-widest text-white leading-[1.2] uppercase">I also know what it's like to go bankrupt when things break.</p>
              </div>

              <p>I built Silverback AI because I've lived inside the problems we solve. Every tool we build has a real failure behind it — a real job site, a real invoice, a real moment where the right automation would have changed everything. That's not something you learn from a tutorial. That's something you earn.</p>
            </div>
            <a href="#intake" className="inline-flex items-center gap-3 bg-silver-gradient text-bg font-mono text-[11px] tracking-[2px] uppercase px-8 py-4 font-medium mt-9 transition-all hover:shadow-[0_0_18px_rgba(200,200,200,0.1)] hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}>Work With Someone Who Gets It →</a>
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section id="intake" className="py-20 px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[4px] text-sd uppercase mb-3">
              <div className="w-5 h-[1px] bg-dimmer" />
              Free Discovery
            </div>
            <h2 className="font-display text-[clamp(40px,5vw,66px)] leading-[0.95] tracking-[2px] text-white mb-4 uppercase">
              Tell Us<br /><span className="silver-gradient">The Problem.</span>
            </h2>
            <p className="text-sm text-dim font-light leading-[1.85] mb-6">Five questions. Four minutes. We find exactly what's costing you time — and build something that fixes it.</p>
            <div className="space-y-2.5">
              {[
                'Completely free · zero obligation',
                'Any industry, any business size',
                'Bryan responds within 24 hours',
                'Custom plan — not a generic pitch'
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-sd">
                  <div className="w-4.5 h-4.5 border border-dimmer bg-white/5 flex items-center justify-center text-[9px] text-sm shrink-0">✓</div>
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-none border-white/5">
            {!formSubmitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4">
                <div className="border border-white/5 p-5 md:p-6 bg-black/30 space-y-4">
                  <div className="font-mono text-[9px] tracking-[3px] text-sd uppercase">// 01</div>
                  <div className="text-sm font-medium text-white leading-relaxed">What task do you dread most every week?</div>
                  <div className="space-y-1.5">
                    {[
                      { l: 'A', t: 'Paperwork & Compliance', d: 'Forms, filings, reports — hours of zero value' },
                      { l: 'B', t: 'Scheduling & Follow-Ups', d: 'Chasing people, confirming things, constant reminders' },
                      { l: 'C', t: 'Spreadsheets & Data Entry', d: 'Same data in three places, copy-pasting all day' },
                      { l: 'D', t: 'Customer Follow-Up & Sales', d: 'Leads slipping through the cracks' }
                    ].map((o, i) => (
                      <button key={i} type="button" className="w-full flex items-start gap-3 border border-white/5 p-3 text-left hover:border-dimmer hover:bg-white/5 transition-all group">
                        <span className="font-display text-lg silver-gradient-2 leading-none">{o.l}</span>
                        <div>
                          <div className="text-[13px] font-medium text-white uppercase tracking-wider">{o.t}</div>
                          <div className="text-[11px] text-dim font-light mt-0.5">{o.d}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border border-white/5 p-5 md:p-6 bg-black/30 space-y-4">
                  <div className="font-mono text-[9px] tracking-[3px] text-sd uppercase">// 02</div>
                  <div className="text-sm font-medium text-white leading-relaxed">Where do we reach you?</div>
                  <input type="text" placeholder="Your name *" required className="w-full bg-transparent border-b border-white/10 text-white font-light py-2.5 outline-none focus:border-sd transition-colors placeholder:text-dimmer" />
                  <input type="email" placeholder="Email *" required className="w-full bg-transparent border-b border-white/10 text-white font-light py-2.5 outline-none focus:border-sd transition-colors placeholder:text-dimmer" />
                </div>

                <button type="submit" className="w-full bg-silver-gradient text-bg py-4 font-display text-xl tracking-[3px] uppercase hover:shadow-[0_0_32px_rgba(200,200,200,0.22)] hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}>
                  Submit — Let's Solve This →
                </button>
                <div className="font-mono text-[9px] text-dimmer text-center tracking-widest uppercase mt-2">// No pitch · No spam · Bryan responds within 24 hours</div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-7 border border-white/10 bg-white/[0.02]"
              >
                <div className="text-5xl mb-4">🦍</div>
                <h3 className="font-display text-4xl tracking-widest silver-gradient uppercase mb-3">We've Got You.</h3>
                <p className="text-sm text-dim leading-relaxed">Your answers are in. Bryan reviews everything personally and reaches out within 24 hours with a specific plan — not a generic pitch.<br /><br />Go do something you actually want to do.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 border-t border-white/5 flex flex-wrap justify-between items-center gap-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="logo-hex w-7 h-7 flex items-center justify-center text-bg font-bold text-sm">🦍</div>
          <div>
            <div className="font-display text-lg tracking-[4px] silver-gradient-2 uppercase">Silverback AI</div>
            <div className="font-mono text-[9px] text-dimmer tracking-widest uppercase mt-0.5">silverbackai.agent</div>
          </div>
        </div>
        <div className="font-display text-lg tracking-[3px] text-dimmer uppercase">What Keeps You Up At Night?</div>
        <div className="font-mono text-[9px] text-dimmer text-right uppercase tracking-widest leading-relaxed">
          © 2025 Silverback AI<br />
          <a href="mailto:bryan@silverbackai.com" className="hover:text-dim transition-colors">bryan@silverbackai.com</a>
        </div>
      </footer>
          </>
        ) : (
          <main className="dashboard px-6 md:px-12 pt-28 pb-20 max-w-7xl mx-auto">
            <header className="stats-grid">
              <div className="stat-card group hover:border-accent transition-colors">
                <label>Total Collected</label>
                <div className="value">$42,950</div>
              </div>
              <div className="stat-card group hover:border-red-500/50 transition-colors">
                <label className="text-red-500/70">Outstanding</label>
                <div className="value text-red-500">$4,200</div>
              </div>
            </header>

            <section className="table-container glow-shadow">
              <div className="p-6 border-b border-[var(--theme-border)] flex justify-between items-center">
                <h3 className="font-display text-2xl tracking-widest uppercase silver-gradient">Tenant Ledger</h3>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-dim">Filter: All Properties</div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Unit</th>
                      <th>Tenant</th>
                      <th>Status</th>
                      <th>Rent</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="font-mono text-accent">{item.unit}</td>
                        <td className="font-medium">{item.tenant}</td>
                        <td>
                          <span className={`badge ${item.status} ${isDarkMode ? 'chip-glow' : ''}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="font-mono">${item.rent.toLocaleString()}</td>
                        <td>
                          <button className="text-[10px] font-mono uppercase tracking-widest px-4 py-2 border border-white/10 hover:bg-white/5 hover:border-accent transition-all">
                            GENERATE NOTICE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* AI Assistant Sidebar */}
            <aside className="ai-assistant hidden xl:flex animate-float">
              <div className="ai-header">SILVERBACK INTELLIGENCE</div>
              <div className="ai-chat-history">
                <div className="msg bot">
                  Dave, I see 3 units are past the 5-day grace period. Should I draft the notices?
                </div>
                <div className="msg bot">
                  I've also analyzed the Ruby property expenses. You're over-budget on landscaping by 12%.
                </div>
              </div>
              <div className="ai-input">
                <input type="text" placeholder="Ask Silverback AI..." />
                <button><Send size={16} /></button>
              </div>
            </aside>
          </main>
        )}
      </div>
    </div>
  );
}
