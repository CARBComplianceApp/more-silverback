import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Activity, 
  Globe, 
  Key, 
  Fingerprint, 
  Search,
  Zap,
  ArrowRight,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function GillySecurity() {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [threatLevel, setThreatLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('low');

  const runScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setThreatLevel('medium');
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 bg-[#050505] text-[#e0e0e0] font-sans selection:bg-red-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-600/20 p-2 rounded border border-red-500/30">
                <ShieldAlert className="text-red-500" size={24} />
              </div>
              <span className="font-mono text-xs tracking-[0.4em] uppercase text-red-500/70 select-none">// Threat Containment Protocol</span>
            </div>
            <h1 className="font-display text-4xl md:text-7xl tracking-widest uppercase leading-none mb-4">
              GILLY <span className="text-red-600 italic">SECURITY</span>
            </h1>
            <p className="text-dim max-w-xl text-lg font-light leading-relaxed">
              Advanced neural-mesh protection for small business assets. We monitor the dark web so you don't have to.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-4 bg-zinc-900/80 border border-white/5 py-4 px-6 rounded-none backdrop-blur-md">
              <Activity className="text-green-500 animate-pulse" size={20} />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-dim tracking-widest uppercase">System Status</span>
                <span className="text-sm font-bold uppercase tracking-wider text-green-400">Normal Operations</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-zinc-900/80 border border-white/5 py-4 px-6 rounded-none backdrop-blur-md">
              <Eye className="text-blue-500" size={20} />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-dim tracking-widest uppercase">Real-time Watch</span>
                <span className="text-sm font-bold uppercase tracking-wider">2,481 Nodes Logged</span>
              </div>
            </div>
          </div>
        </header>

        {/* SCANNER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-zinc-900/50 border border-white/5 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Terminal size={120} />
            </div>

            <div className="relative z-10">
              <h2 className="font-display text-2xl tracking-widest uppercase mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Vulnerability Assessment
              </h2>

              <div className="space-y-8 mb-12">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-mono text-xs tracking-widest uppercase text-dim">Overall Surface Integrity</span>
                    <span className="font-display text-3xl">{scanProgress}%</span>
                  </div>
                  <div className="h-2 bg-white/5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-red-600" 
                      initial={{ width: 0 }}
                      animate={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'DNS Cloaking', status: 'Active', color: 'text-green-500' },
                    { label: 'WAF Managed', status: 'Shielded', color: 'text-blue-500' },
                    { label: 'Dark Web Monitor', status: 'Scanning', color: 'text-yellow-500' },
                    { label: 'Endpoint Relay', status: 'Secure', color: 'text-green-500' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-black/30 border border-white/5">
                      <span className="text-xs font-mono uppercase tracking-widest text-dim">{item.label}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${item.color}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={runScan}
                disabled={isScanning}
                className={`w-full py-6 font-display text-2xl tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-4 ${isScanning ? 'bg-white/5 text-dim cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 shadow-[0_0_40px_rgba(220,38,38,0.2)]'}`}
              >
                {isScanning ? (
                  <>
                    <Loader size={24} className="animate-spin" />
                    Analyzing Neural Path...
                  </>
                ) : (
                  <>
                    Initialize Deep Scan <Search size={22} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* THREAT CARD */}
          <div className="bg-zinc-900 border border-white/5 p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="text-yellow-500" size={20} />
              <span className="font-mono text-xs tracking-widest uppercase">Live Threat Feed</span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto mb-8 pr-2 custom-scrollbar">
              {[
                { time: '15:21:06', event: 'Unauthorized Login Attempt', loc: 'IP 185.220.101.4', level: 'high' },
                { time: '15:18:42', event: 'DDoS Mitigation Blocked', loc: 'TCP Port 80', level: 'low' },
                { time: '15:12:11', event: 'Global File Integrity Check', loc: 'Root S3', level: 'low' },
                { time: '14:55:30', event: 'Brute Force Alert: API-KEY', loc: 'Public Endpoint', level: 'critical' },
                { time: '14:32:19', event: 'SSH Connection Closed', loc: 'Internal Node 4', level: 'low' }
              ].map((log, i) => (
                <div key={i} className="bg-black/40 border-l-2 border-white/10 p-4 hover:border-red-500/50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-dim">{log.time}</span>
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${log.level === 'critical' ? 'bg-red-600 text-white' : log.level === 'high' ? 'bg-orange-600/20 text-orange-400' : 'bg-zinc-800 text-zinc-500'}`}>
                      {log.level}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-1 line-clamp-1">{log.event}</div>
                  <div className="text-[10px] font-mono text-dim truncate">{log.loc}</div>
                </div>
              ))}
            </div>

            <div className="bg-black/50 border border-white/5 p-4 rounded-none">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-dim">Protection Status</span>
                <span className="text-[10px] font-bold text-accent uppercase">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-white/5 flex gap-1">
                  <div className="flex-1 bg-accent" />
                  <div className="flex-1 bg-accent" />
                  <div className="flex-1 bg-accent" />
                  <div className="flex-1 bg-accent/30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BENTO GRID OF CORE SERVICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Lock className="text-dim" size={20} />} 
            title="Zero Trust Access" 
            desc="Identity-first security protocols for all micro-services."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-dim" size={20} />} 
            title="Sovereign Shield" 
            desc="AI-driven threat hunting that evolves as you grow."
          />
          <FeatureCard 
            icon={<Cpu className="text-dim" size={20} />} 
            title="Neural Defense" 
            desc="Edge computing protection for distributed endpoints."
          />
          <FeatureCard 
            icon={<Search className="text-dim" size={20} />} 
            title="Compliance OCR" 
            desc="Automated auditing for HIPAA, GDPR, and data laws."
          />
        </div>

        <div className="mt-20 border-t border-white/5 pt-12 text-center">
          <h3 className="font-display text-2xl tracking-[0.3em] uppercase mb-10">Trusted Architecture</h3>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale transition-all hover:grayscale-0">
             <span className="font-display text-4xl tracking-widest italic silver-gradient">KUBERNETES</span>
             <span className="font-display text-4xl tracking-widest italic silver-gradient">CLOUDFLARE</span>
             <span className="font-display text-4xl tracking-widest italic silver-gradient">GOOGLE CLOUD</span>
             <span className="font-display text-4xl tracking-widest italic silver-gradient">HASHICORP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-zinc-900/30 border border-white/5 p-6 hover:border-white/20 transition-all group">
      <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">{icon}</div>
      <h3 className="font-display text-xl tracking-widest uppercase mb-3">{title}</h3>
      <p className="text-dim text-xs font-light leading-relaxed">{desc}</p>
      <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
        <ChevronRight size={16} className="text-accent" />
      </div>
    </div>
  );
}

function Loader({ size, className }: { size: number, className?: string }) {
  return (
    <motion.div 
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <Cpu size={size} />
    </motion.div>
  );
}
