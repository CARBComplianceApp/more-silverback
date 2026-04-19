/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
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
  Send,
  Sparkles
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import SmsToolkit from './SmsToolkit';
import HotButton from './HotButton';
import AILab from './components/AILab';
import GillySecurity from './GillySecurity';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('silverback_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('silverback_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const [view, setView] = useState<'SILVERBACK' | 'RENTDMC' | 'TOOLKIT' | 'HOT_BUTTON' | 'ADMIN' | 'AI_LAB' | 'GILLY_SECURITY'>('SILVERBACK');
  const [data, setData] = useState(INITIAL_DATA);

  // Handle URL params for deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramView = params.get('appParams');
    if (paramView === 'intake') {
      setView('TOOLKIT');
    }
  }, []);

  const [dreadedTask, setDreadedTask] = useState('');
  const [isSlayed, setIsSlayed] = useState(false);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Generate Hero Image
  useEffect(() => {
    async function generateHero() {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image-preview',
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
        // Fallback static image if quota exceeded
        setHeroImage("https://images.unsplash.com/photo-1541845157-a5ec084c6af2?q=80&w=2000&auto=format&fit=crop");
      }
    }
    generateHero();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border px-6 md:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded bg-zinc-900 border border-white/5 shadow-inner">
                <span className="text-xl grayscale grayscale-100 brightness-150">🦍</span>
              </div>
              <div className="flex flex-col leading-[0.75] mt-1">
                <span className="font-display text-[22px] tracking-[0.2em] silver-gradient hover:brightness-125 transition-all uppercase">SILVERBACK</span>
                <span className="font-display text-[22px] tracking-[0.2em] silver-gradient hover:brightness-125 transition-all uppercase">AI</span>
              </div>
            </a>
          </div>

          <div className="brand-toggle hidden lg:flex items-stretch overflow-visible h-14 bg-black/20 rounded-none border border-white/5 p-0">
              <button 
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[70px] ${view === 'SILVERBACK' ? 'active-portal' : ''}`} 
                onClick={() => setView('SILVERBACK')}
              >
                <span className="text-[14px]">🦍</span>
                <span className="text-[8px] font-bold tracking-[2px]">PORTAL</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[70px] ${view === 'RENTDMC' ? 'active' : ''}`} 
                onClick={() => setView('RENTDMC')}
              >
                <span className="text-[10px] opacity-70">||</span>
                <span className="text-[8px] font-bold tracking-[1px]">RENT DMC</span>
                <span className="text-[10px] opacity-70">||</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[70px] ${view === 'TOOLKIT' ? 'active' : ''}`} 
                onClick={() => setView('TOOLKIT')}
              >
                <Zap size={14} className="text-orange-400" />
                <span className="text-[8px] font-bold tracking-[1px] text-center leading-[1.1]">INTAKE<br/>& AUDIT</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[70px] ${view === 'HOT_BUTTON' ? 'active' : ''}`} 
                onClick={() => setView('HOT_BUTTON')}
              >
                <div className="h-3.5" />
                <span className="text-[8px] font-bold tracking-[1px] text-center leading-[1.1]">HOT<br/>BUTTONS</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[70px] ${view === 'GILLY_SECURITY' ? 'active' : ''}`} 
                onClick={() => setView('GILLY_SECURITY')}
              >
                <Shield size={14} className="text-red-500" />
                <span className="text-[8px] font-bold tracking-[1px] text-center leading-[1.1]">GILLY<br/>SECURITY</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[70px] ${view === 'AI_LAB' ? 'active' : ''}`} 
                onClick={() => setView('AI_LAB')}
              >
                <Sparkles size={14} className="text-accent" />
                <span className="text-[8px] font-bold tracking-[1px] text-center leading-[1.1]">AI<br/>LAB</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[70px] ${view === 'ADMIN' ? 'active' : ''}`} 
                onClick={() => setView('ADMIN')}
              >
                <Lock size={14} className="opacity-60" />
                <span className="text-[8px] font-bold tracking-[1px]">ADMIN</span>
              </button>
            </div>

          <div className="flex items-center gap-4 md:gap-8">
            {view === 'SILVERBACK' && (
              <div className="hidden md:flex items-center gap-20 mr-12 text-[12px] font-mono tracking-[0.3em] uppercase text-dim">
                <a href="#products" className="hover:text-accent transition-colors">Products</a>
                <a href="#industries" className="hover:text-accent transition-colors">Industries</a>
              </div>
            )}

            {view === 'RENTDMC' && (
              <div className="hidden md:block font-mono text-[10px] tracking-widest text-dim uppercase">
                Dave Cowan | West Region
              </div>
            )}

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-card transition-colors text-dim"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              {view === 'SILVERBACK' && (
                <a 
                  href="#intake" 
                  className="hidden sm:block font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 bg-silver-gradient text-background font-medium transition-all hover:shadow-[0_0_26px_rgba(200,200,200,0.24)] hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}
                >
                  Free Discovery →
                </a>
              )}
            </div>

            <button className="md:hidden text-dim" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
              className="fixed inset-0 z-40 bg-background pt-24 px-8 md:hidden"
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
                  <button 
                    className={`text-left ${view === 'TOOLKIT' ? 'silver-gradient' : 'text-dim'}`}
                    onClick={() => { setView('TOOLKIT'); setIsMenuOpen(false); }}
                  >
                    ⚡ INTAKE & AUDIT
                  </button>
                  <button 
                    className={`text-left ${view === 'HOT_BUTTON' ? 'silver-gradient' : 'text-dim'}`}
                    onClick={() => { setView('HOT_BUTTON'); setIsMenuOpen(false); }}
                  >
                    🔥 HOT BUTTONS
                  </button>
                  <button 
                    className={`text-left ${view === 'GILLY_SECURITY' ? 'silver-gradient' : 'text-dim'}`}
                    onClick={() => { setView('GILLY_SECURITY'); setIsMenuOpen(false); }}
                  >
                    🛡️ GILLY SECURITY
                  </button>
                </div>
                <hr className="border-border" />
                <a href="#products" onClick={() => setIsMenuOpen(false)}>Products</a>
                <a href="#industries" onClick={() => setIsMenuOpen(false)}>Industries</a>
                <a href="#intake" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {view === 'GILLY_SECURITY' ? (
          <GillySecurity />
        ) : view === 'TOOLKIT' ? (
          <SmsToolkit initialTab="form" />
        ) : view === 'ADMIN' ? (
          <SmsToolkit isAdmin={true} initialTab="sms" />
        ) : view === 'AI_LAB' ? (
          <AILab />
        ) : view === 'HOT_BUTTON' ? (
          <HotButton />
        ) : view === 'SILVERBACK' ? (
          <>
            {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 pt-24 overflow-hidden" aria-labelledby="hero-heading">
        {/* Parallax Gradients */}
        <motion.div 
          style={{ y: y1, rotate: rotate1 }}
          className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-radial-[circle,rgba(0,240,255,0.04)_0%,transparent_62%] pointer-events-none z-0 animate-pulse" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-60px] left-[-60px] w-[400px] h-[400px] bg-radial-[circle,rgba(255,183,109,0.03)_0%,transparent_62%] pointer-events-none z-0" 
        />

        {/* Hero Image Component with Parallax */}
        {heroImage && (
          <motion.div 
            style={{ y: y2, scale: heroScale }}
            className="absolute right-[-10%] md:right-[5%] top-[10%] w-[300px] md:w-[600px] aspect-square rounded-full overflow-hidden opacity-30 blur-[1px] pointer-events-none z-0"
          >
            <img 
              src={heroImage} 
              alt="Friendly AI Interface" 
              className="w-full h-full object-cover grayscale-0 opacity-40 mix-blend-screen"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}

        <div className="max-w-[1000px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.4em] text-accent/60 uppercase mb-8"
          >
            <div className="w-7 h-[1px] bg-accent/30" />
            AI Partnering with Passionate Businesses
          </motion.div>
          
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-[clamp(42px,7vw,110px)] leading-[0.95] tracking-[1px] text-foreground uppercase"
          >
            <div className="w-full text-balance mb-4">BETTER DAYS.</div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-2 w-full">
              <span className="silver-gradient italic leading-[1.0] lg:text-[clamp(42px,7vw,110px)]">SMARTER BUSINESS.</span>
              
              <div className="hidden lg:block font-sans text-[13px] normal-case tracking-normal text-dim font-light max-w-[180px] leading-[1.6] pb-2 text-wrap text-right">
                Simplified, transparent AI systems starting with a <strong className="font-medium text-foreground">$500 discovery audit.</strong>
              </div>
            </div>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl font-medium text-foreground mt-10 max-w-[620px] leading-[1.6]"
          >
            We handle the repetitive tasks that drain your energy, so you can focus on <span className="hero-highlight">the work you actually love.</span>
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base text-dim font-light mt-4 max-w-[620px] leading-[1.6]"
          >
            We build practical, reliable AI solutions that reduce the daily chaos and help your business grow with clarity and confidence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 max-w-[500px]"
          >
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Phase 01 — The Problem
            </div>
            <h3 className="text-xl font-display uppercase tracking-widest mb-6">What keeps you up at night?</h3>
            <div className="relative group">
              <div className="relative overflow-visible">
                <input 
                  type="text"
                  placeholder="e.g. Invoicing errors, missed leads, manual reporting..."
                  className={`w-full bg-transparent border-b border-white/20 py-4 font-light text-xl md:text-2xl outline-none focus:border-accent transition-all pr-12 placeholder:text-dim/30 ${isSlayed ? 'text-dim italic' : 'text-foreground'}`}
                  value={dreadedTask}
                  onChange={(e) => { setDreadedTask(e.target.value); if(isSlayed) setIsSlayed(false); }}
                  onKeyPress={(e) => e.key === 'Enter' && dreadedTask && setIsSlayed(true)}
                />
                <AnimatePresence>
                  {isSlayed && (
                    <motion.div 
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <svg className="w-full h-full absolute top-0 left-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path 
                          d="M-5,60 Q50,40 105,55" 
                          stroke="#00F0FF" 
                          strokeWidth="4" 
                          fill="transparent"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          style={{ filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.8))' }}
                        />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button 
                onClick={() => dreadedTask && setIsSlayed(true)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-accent opacity-0 group-focus-within:opacity-100 transition-opacity"
              >
                <ArrowRight size={24} />
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {isSlayed && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="mt-6 p-4 bg-accent/5 border-l-2 border-accent backdrop-blur-sm"
                >
                  <p className="text-sm font-light italic silver-gradient flex items-center gap-3">
                    <Sparkles size={14} className="text-accent shrink-0" />
                    "Don't lose sleep over {dreadedTask.toLowerCase().split(' ')[0]}... we find the fix."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <button 
              onClick={() => setView('TOOLKIT')}
              className="inline-flex items-center gap-3 bg-silver-gradient text-background font-mono text-[11px] tracking-[2px] uppercase px-8 py-4 font-medium transition-all hover:shadow-[0_0_32px_rgba(200,200,200,0.26)] hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}
            >
              Take Free Initial Intake →
            </button>
            <a 
              href="#products" 
              className="inline-flex items-center gap-3 bg-transparent text-sm font-mono text-[11px] tracking-[2px] uppercase px-8 py-4 border border-border transition-all hover:border-accent hover:bg-card"
            >
              See Our Work
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-11 mt-14 pt-7 border-t border-border"
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
            <div key={i} className="font-display text-[17px] tracking-[4px] text-background px-8 flex items-center gap-4 border-r border-black/10">
              {text}
              <span className="text-[7px] opacity-25">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="pt-20">
        <div className="px-6 md:px-12 mb-10">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[4px] text-dim uppercase mb-3">
            <div className="w-5 h-[1px] bg-dimmer" />
            What We Build
          </div>
          <h2 className="font-display text-[clamp(38px,5vw,62px)] leading-none tracking-[2px] text-foreground">
            Real Products.<br /><span className="silver-gradient">Real Results.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-[2px] bg-card">
          {/* REAL ESTATE */}
          <div className="bg-card grid lg:grid-cols-2 min-h-[460px] relative overflow-hidden group hover:bg-background transition-colors">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-silver-gradient scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            <div className="p-9 flex items-center justify-center bg-background border-r border-border">
              <div className="w-full max-w-[340px] font-mono border border-border bg-[#0a0a0a] overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#111] border-b border-border">
                  <div className="w-2 h-2 rounded-full bg-[#f85149]" />
                  <div className="w-2 h-2 rounded-full bg-[#d29922]" />
                  <div className="w-2 h-2 rounded-full bg-[#3fb950]" />
                  <div className="text-[9px] text-[#444] tracking-[2px] uppercase mx-auto">Real Estate Intelligence</div>
                </div>
                <div className="p-4">
                  <div className="bg-[#0d0d0d] border border-border p-2 text-[8px] text-[#383838] tracking-widest mb-2">🔍 &nbsp;Search city, ZIP, or property type...</div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { n: '247', l: 'Active Listings' },
                      { n: '$1.2M', l: 'Avg Price' },
                      { n: '18%', l: 'Tax Savings' },
                      { n: '12', l: 'Markets' }
                    ].map((s, i) => (
                      <div key={i} className="bg-[#111] border border-border p-2">
                        <div className="text-sm font-medium silver-gradient">{s.n}</div>
                        <div className="text-[7px] text-[#444] uppercase tracking-widest mt-0.5">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  {[
                    { a: '4821 Oakridge Dr, Sacramento', s: 'Prop tax: $8,240/yr · 1031 eligible', p: '$849K', t: 'HOT' },
                    { a: '112 Harbor Ct, Stockton', s: 'Cash flow +$680/mo · Below market', p: '$415K', t: 'DEAL' }
                  ].map((r, i) => (
                    <div key={i} className="bg-[#0d0d0d] border border-border p-2 mb-2 flex justify-between items-center">
                      <div>
                        <div className="text-[10px] text-[#888]">{r.a}</div>
                        <div className="text-[8px] text-[#444] mt-0.5">{r.s}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-[#a0a0a0] font-medium">{r.p}</div>
                        <div className="text-[7px] px-1.5 py-0.5 bg-card text-[#606060] border border-border mt-0.5">{r.t}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[3px] text-dim uppercase mb-2">
                Real Estate Intelligence 
                <span className="px-2 py-0.5 bg-card text-sm border border-border">Live Demo</span>
              </div>
              <h3 className="font-display text-5xl tracking-[2px] text-foreground mb-2 leading-none uppercase">Real Estate<br />Module</h3>
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
              <a href="#intake" className="inline-flex items-center px-6 py-3 bg-silver-gradient text-background font-mono text-[10px] tracking-[2px] uppercase font-medium hover:shadow-[0_0_22px_rgba(200,200,200,0.22)] hover:-translate-y-0.5 w-fit">Get This Built →</a>
            </div>
          </div>

          {/* CONGRESSIONAL */}
          <div className="bg-card grid lg:grid-cols-2 min-h-[460px] relative overflow-hidden group hover:bg-background transition-colors lg:direction-rtl">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-silver-gradient scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            <div className="p-9 flex items-center justify-center bg-[#060809] border-l border-border lg:direction-ltr">
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
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[3px] text-dim uppercase mb-2">
                Congressional Intelligence 
                <span className="px-2 py-0.5 bg-card text-sm border border-border">Live Demo</span>
              </div>
              <h3 className="font-display text-5xl tracking-[2px] text-foreground mb-2 leading-none uppercase">Pc — Trade<br />Tracker</h3>
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
                <a href="#" className="inline-flex items-center px-6 py-3 bg-silver-gradient text-background font-mono text-[10px] tracking-[2px] uppercase font-medium hover:shadow-[0_0_22px_rgba(200,200,200,0.22)] hover:-translate-y-0.5 w-fit">View Live Demo →</a>
                <a href="#intake" className="inline-flex items-center px-6 py-3 bg-transparent text-sm font-mono text-[10px] tracking-[2px] uppercase border border-border hover:border-accent hover:bg-card transition-all">Get Pro Access</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section id="industries" className="py-20 px-6 md:px-12 bg-card relative z-10">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[4px] text-dim uppercase mb-3">
          <div className="w-5 h-[1px] bg-dimmer" />
          Industries We Serve
        </div>
        <h2 className="font-display text-[clamp(38px,5vw,62px)] leading-none tracking-[2px] text-foreground mb-0">
          If You Work In It,<br /><span className="silver-gradient">We Can Automate It.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-card mt-10">
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
            <div key={i} className="bg-background p-7 hover:bg-background transition-colors group relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-silver-gradient scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="text-3xl mb-3">{item.i}</div>
              <h3 className="font-display text-xl tracking-widest text-foreground mb-2 uppercase">{item.n}</h3>
              <p className="text-xs text-dim font-light leading-relaxed mb-3">{item.d}</p>
              <div className="font-mono text-[8px] text-dim tracking-widest uppercase mt-2">{item.f}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-6 md:px-12 bg-card border-t border-border relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-radial-[circle,rgba(180,180,180,0.05)_0%,transparent_65%] pointer-events-none" />
        
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-20 items-center">
          <div className="relative">
            <div className="w-full aspect-[4/5] bg-background border border-border relative overflow-hidden flex items-end">
              <div className="absolute inset-0 bg-radial-[ellipse_at_50%_30%,rgba(180,180,180,0.04)_0%,transparent_60%]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-display text-[160px] tracking-[-8px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] select-none">BG</div>
              </div>
              <div className="absolute inset-0">
                <div className="absolute top-0 left-[38%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute top-0 left-[52%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute top-0 left-[63%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              </div>
              <div className="relative z-10 w-full p-6 bg-gradient-to-t from-bg/95 to-transparent border-t border-border">
                <div className="font-display text-3xl tracking-widest silver-gradient uppercase">Bryan Gillis</div>
                <div className="font-mono text-[10px] tracking-widest text-dim uppercase mt-1">Founder · Silverback AI</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['Charlestown, MA', '$7M Flooring Co.', 'Marriott Hotels', 'Trinidad & Tobago', 'Napa, CA'].map((c, i) => (
                <div key={i} className="font-mono text-[9px] tracking-widest px-3 py-1.5 border border-border text-dim uppercase">{c}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[4px] text-dim uppercase mb-3">
              <div className="w-5 h-[1px] bg-[#2a2a2a]" />
              Why This Works
            </div>
            <h2 className="font-display text-[clamp(40px,5vw,66px)] leading-[0.95] tracking-[2px] text-foreground mb-7 uppercase">
              Most AI Agencies<br />Have Never Run<br /><span className="silver-gradient">A Real Business.</span>
            </h2>
            <div className="space-y-5 text-base font-light text-[#666] leading-[1.9]">
              <p>I grew up in Charlestown, Massachusetts — where you don't learn things in a classroom, you learn them by doing. That shaped everything.</p>
              <p>Before AI, I built a flooring company to <strong className="text-[#888] font-normal">$6–7 million in annual revenue</strong>. We laid floors in Marriott hotels, did custom residential work in Napa, and ran commercial projects across Trinidad and Tobago. I've done takeoffs by hand at midnight. I've chased invoices. I've hired and fired crews. I've watched jobs go sideways because of a spreadsheet error.</p>
              
              <div className="border-l-2 border-[#2a2a2a] px-7 py-5 my-7 relative bg-white/[0.015]">
                <div className="absolute top-[-1px] left-0 right-0 h-[1px] bg-silver-gradient opacity-25" />
                <p className="font-display text-[clamp(22px,2.5vw,30px)] tracking-widest text-foreground leading-[1.2] uppercase">I also know what it's like to go bankrupt when things break.</p>
              </div>

              <p>I built Silverback AI because I've lived inside the problems we solve. Every tool we build has a real failure behind it — a real job site, a real invoice, a real moment where the right automation would have changed everything. That's not something you learn from a tutorial. That's something you earn.</p>
            </div>
            <a href="#intake" className="inline-flex items-center gap-3 bg-silver-gradient text-background font-mono text-[11px] tracking-[2px] uppercase px-8 py-4 font-medium mt-9 transition-all hover:shadow-[0_0_18px_rgba(200,200,200,0.1)] hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}>Work With Someone Who Gets It →</a>
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section id="intake" className="py-20 px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[4px] text-dim uppercase mb-3">
              <div className="w-5 h-[1px] bg-dimmer" />
              Free Discovery
            </div>
            <h2 className="font-display text-[clamp(40px,5vw,66px)] leading-[0.95] tracking-[2px] text-foreground mb-4 uppercase">
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
                <div key={i} className="flex items-center gap-2.5 text-sm text-dim">
                  <div className="w-4.5 h-4.5 border border-dimmer bg-card flex items-center justify-center text-[9px] text-sm shrink-0">✓</div>
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-none border-border">
            {!formSubmitted ? (
              <form 
                aria-label="Intake Form"
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name') || '';
                  const email = formData.get('email') || '';
                  const task = dreadedTask || 'None selected';
                  const body = `Name: ${name}\nEmail: ${email}\nDreaded Task: ${task}`;
                  window.location.href = `mailto:fsu9913@gmail.com?subject=Silverback Intake Form Submission&body=${encodeURIComponent(body)}`;
                  setFormSubmitted(true); 
                }} 
                className="space-y-4"
              >
                <div className="border border-border p-5 md:p-6 bg-black/30 space-y-4" role="group" aria-labelledby="dreaded-task-label">
                  <div className="font-mono text-[9px] tracking-[3px] text-dim uppercase" aria-hidden="true">// 01</div>
                  <div id="dreaded-task-label" className="text-sm font-medium text-foreground leading-relaxed">What task do you dread most every week?</div>
                  <div className="space-y-1.5" role="radiogroup" aria-labelledby="dreaded-task-label">
                    {[
                      { l: 'A', t: 'Paperwork & Compliance', d: 'Forms, filings, reports — hours of zero value' },
                      { l: 'B', t: 'Scheduling & Follow-Ups', d: 'Chasing people, confirming things, constant reminders' },
                      { l: 'C', t: 'Spreadsheets & Data Entry', d: 'Same data in three places, copy-pasting all day' },
                      { l: 'D', t: 'Customer Follow-Up & Sales', d: 'Leads slipping through the cracks' }
                    ].map((o, i) => (
                      <button 
                        key={i} 
                        type="button" 
                        onClick={() => setDreadedTask(o.t)}
                        role="radio"
                        aria-checked={dreadedTask === o.t}
                        aria-label={`${o.t}: ${o.d}`}
                        className={`w-full flex items-start gap-3 border ${dreadedTask === o.t ? 'border-accent bg-accent/10' : 'border-border'} p-3 text-left hover:border-dimmer hover:bg-card transition-all group`}
                      >
                        <span className="font-display text-lg silver-gradient-2 leading-none" aria-hidden="true">{o.l}</span>
                        <div>
                          <div className="text-[13px] font-medium text-foreground uppercase tracking-wider">{o.t}</div>
                          <div className="text-[11px] text-dim font-light mt-0.5">{o.d}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border border-border p-5 md:p-6 bg-black/30 space-y-4" role="group" aria-labelledby="contact-info-label">
                  <div className="font-mono text-[9px] tracking-[3px] text-dim uppercase" aria-hidden="true">// 02</div>
                  <div id="contact-info-label" className="text-sm font-medium text-foreground leading-relaxed">Where do we reach you?</div>
                  <div>
                    <label htmlFor="intake-name" className="sr-only">Your name</label>
                    <input id="intake-name" name="name" type="text" placeholder="Your name *" required aria-required="true" className="w-full bg-transparent border-b border-border text-foreground font-light py-2.5 outline-none focus:border-accent transition-colors placeholder:text-dimmer" />
                  </div>
                  <div>
                    <label htmlFor="intake-email" className="sr-only">Email address</label>
                    <input id="intake-email" name="email" type="email" placeholder="Email *" required aria-required="true" className="w-full bg-transparent border-b border-border text-foreground font-light py-2.5 outline-none focus:border-accent transition-colors placeholder:text-dimmer" />
                  </div>
                </div>

                <button type="submit" aria-label="Submit Form and Send Email" className="w-full bg-silver-gradient text-background py-4 font-display text-xl tracking-[3px] uppercase hover:shadow-[0_0_32px_rgba(200,200,200,0.22)] hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}>
                  Submit — Let's Solve This →
                </button>
                <div className="font-mono text-[9px] text-dimmer text-center tracking-widest uppercase mt-2" aria-hidden="true">// No pitch · No spam · Bryan responds within 24 hours</div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-7 border border-border bg-white/[0.02]"
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
      <footer className="py-10 px-6 md:px-12 border-t border-border flex flex-wrap justify-between items-center gap-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="logo-hex w-7 h-7 flex items-center justify-center text-background font-bold text-sm">🦍</div>
          <div>
            <div className="font-display text-lg tracking-[4px] silver-gradient-2 uppercase">Silverback AI</div>
            <div className="font-mono text-[9px] text-dimmer tracking-widest uppercase mt-0.5">silverbackai.agent</div>
          </div>
        </div>
        <div className="font-display text-lg tracking-[3px] text-dimmer uppercase">What Keeps You Up At Night?</div>
        <div className="font-mono text-[9px] text-dimmer text-right uppercase tracking-widest leading-relaxed">
          Boston · Miami · Silicon Valley<br />
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
                <label className="text-red-400">Outstanding</label>
                <div className="value text-red-500">$4,200</div>
              </div>
            </header>

            <section className="table-container glow-shadow">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h3 className="font-display text-2xl tracking-widest uppercase silver-gradient">Tenant Ledger</h3>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-card border border-border text-[10px] font-mono uppercase tracking-widest text-dim">Filter: All Properties</div>
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
                          <button className="text-[10px] font-mono uppercase tracking-widest px-4 py-2 border border-border hover:bg-card hover:border-accent transition-all">
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
            <aside className="ai-assistant hidden xl:flex shadow-[0_0_40px_rgba(200,200,200,0.05)] border-accent/20">
              <div className="ai-header !p-3 flex items-center gap-3">
                <motion.div 
                  initial={{ y: 0 }}
                  animate={{ y: [-1.5, 1.5, -1.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex items-center justify-center w-12 h-12 rounded bg-black/10 shadow-inner border border-black/10"
                >
                  <span className="text-3xl drop-shadow-md">🦍</span>
                  <motion.div 
                    className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#10b981] border-[1.5px] border-[#a0a0a0] shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                    animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                <div className="flex flex-col">
                  <span className="font-display font-medium text-xl leading-none tracking-widest text-[#080808] uppercase">McGilla</span>
                  <span className="font-mono text-[9px] leading-none tracking-widest text-[#080808]/70 mt-1.5 uppercase">Silverback Intelligence</span>
                </div>
              </div>
              <div className="ai-chat-history relative">
                <div className="msg bot flex gap-2.5 items-start">
                  <motion.div 
                    className="w-6 h-6 rounded flex items-center justify-center shrink-0 border border-border bg-black/20 text-[10px]"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🦍
                  </motion.div>
                  <div className="pt-0.5">Dave, I see 3 units are past the 5-day grace period. Should I draft the notices?</div>
                </div>
                <div className="msg bot flex gap-2.5 items-start">
                  <motion.div 
                    className="w-6 h-6 rounded flex items-center justify-center shrink-0 border border-border bg-black/20 text-[10px]"
                    animate={{ rotate: [2, -2, 2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🦍
                  </motion.div>
                  <div className="pt-0.5">I've also analyzed the Ruby property expenses. You're over-budget on landscaping by 12%.</div>
                </div>
              </div>
              <div className="ai-input">
                <input type="text" placeholder="Ask McGilla..." className="placeholder:text-dimmer" />
                <button className="text-dim hover:text-accent transition-colors"><Send size={16} /></button>
              </div>
            </aside>
          </main>
        )}
      </div>
    </div>
  );
}
