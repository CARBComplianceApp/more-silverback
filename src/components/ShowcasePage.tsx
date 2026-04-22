import React from 'react';
import { motion } from 'motion/react';
import { Search, TrendingUp, Shield, Zap, Sparkles, LayoutGrid, ArrowLeft } from 'lucide-react';

interface ShowcasePageProps {
  onBack: () => void;
  onSelectTool: (view: string) => void;
}

export default function ShowcasePage({ onBack, onSelectTool }: ShowcasePageProps) {
  const tools = [
    { 
      id: 'PC_INVESTMENTS', 
      name: 'PC Investments', 
      desc: 'High-precision capital management & political trade tracking.',
      icon: <TrendingUp className="text-green-500" />,
      tag: 'FINANCE'
    },
    { 
      id: 'GILLY_SECURITY', 
      name: 'Gilly Security', 
      desc: 'Distributed node verification & private key architecture.',
      icon: <Shield className="text-red-500" />,
      tag: 'SECURITY'
    },
    { 
      id: 'AI_LAB', 
      name: 'AI Lab', 
      desc: 'Experimental neural designs & image generation studio.',
      icon: <Sparkles className="text-accent" />,
      tag: 'R&D'
    },
    { 
      id: 'HOT_BUTTON', 
      name: 'Hot Buttons', 
      desc: 'One-click operational automation for service businesses.',
      icon: <LayoutGrid className="text-orange-400" />,
      tag: 'OPS'
    },
    { 
      id: 'RENTDMC', 
      name: 'Rent DMC', 
      desc: 'Tenant ledger intelligence & automated notice generation.',
      icon: <LayoutGrid className="text-blue-400" />,
      tag: 'REAL ESTATE'
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-dim hover:text-accent font-mono text-[10px] tracking-widest uppercase mb-12 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Problem Solver
        </button>

        <div className="flex items-center gap-3 font-mono text-[12px] tracking-[4px] text-dim uppercase mb-3">
          <div className="w-5 h-[1px] bg-dimmer" />
          Client Solutions Hub
        </div>
        <h2 className="font-display text-[clamp(38px,5vw,62px)] leading-none tracking-[2px] text-foreground mb-12 uppercase">
          Specialized<br /><span className="silver-gradient">Strategic Tools.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, i) => (
            <motion.div 
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelectTool(tool.id)}
              className="bg-card border border-border p-8 hover:border-accent group cursor-pointer transition-all hover:bg-white/[0.02]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-black/20 border border-border rounded group-hover:border-accent/30 transition-colors text-2xl">
                  {tool.icon}
                </div>
                <span className="font-mono text-[11px] tracking-widest border border-border px-2 py-1 text-dimmer group-hover:border-accent/20 group-hover:text-accent transition-colors">
                  {tool.tag}
                </span>
              </div>
              <h3 className="font-display text-xl tracking-widest text-foreground mb-3 uppercase group-hover:silver-gradient transition-all">
                {tool.name}
              </h3>
              <p className="text-xs text-dim font-light leading-relaxed mb-8">
                {tool.desc}
              </p>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-accent uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Enter Tool <Zap size={10} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
