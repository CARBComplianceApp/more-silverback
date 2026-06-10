import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Copy, Check } from 'lucide-react';

const HOT_BUTTONS = [
  {
    id: 'convenience',
    name: 'Convenience',
    desc: 'Goes to great lengths to set up procedures that make things easy in the long term.',
    wants: 'Logical, simple solutions. Saving time & energy is main priority.',
    avoids: 'Talking too much, Complicated products, forms or processes.',
    aiSolution: 'AI automates repetitive workflows and streamlines data entry, eliminating wasted time and drastically reducing operational friction.'
  },
  {
    id: 'culture',
    name: 'Culture',
    desc: 'Makes decisions to meet cultural guidelines, honoring heritage or groups they identify with.',
    wants: 'To honor their heritage or those they identify with. Wants others to acknowledge this importance.',
    avoids: 'Brushing over those comments or minimizing their beliefs.',
    aiSolution: 'AI helps scale community-building and personalization, allowing authentic cultural values to be represented consistently across all outreach.'
  },
  {
    id: 'ego',
    name: 'Ego',
    desc: 'Feels it is all about them. Doesn\'t care what anyone thinks and focuses on their own happiness.',
    wants: 'To make themselves happy. They don\'t need external validation.',
    avoids: 'Disagreeing about anything. Comparing to others.',
    aiSolution: 'AI acts as a tireless executive assistant, executing commands flawlessly and letting them focus purely on high-level decision making.'
  },
  {
    id: 'prestige',
    name: 'Prestige',
    desc: 'It\'s all about keeping up with the Jones\'. Goes to any length to seem successful and get people to like them.',
    wants: 'To be admired. Needs validation that others think like them.',
    avoids: 'Embarrassing them in any way or confrontation.',
    aiSolution: 'AI enables hyper-professional, perfectly-timed client interactions that project massive authority and a premium brand image at all times.'
  },
  {
    id: 'family',
    name: 'Family',
    desc: 'Wants nothing more than the picket fence and home sweet home to the exclusion of everything else.',
    wants: 'To care for and spend time with their family.',
    avoids: 'Taking time or resources from the family.',
    aiSolution: 'AI handles the late-night emails, weekend quotes, and mundane admin tasks so you can turn off the phone and go be with your kids.'
  },
  {
    id: 'finance',
    name: 'Finance',
    desc: 'Has short term money concerns. Strongly focused on budgets and keeping the lights on.',
    wants: 'To make ends meet – needs to be able to justify spending every penny.',
    avoids: 'Speaking in just cost; get to the emotional reasons.',
    aiSolution: 'AI drastically reduces headcount needs, catches lost revenue from missed leads, and immediately improves the monthly bottom line.'
  },
  {
    id: 'investment',
    name: 'Investment',
    desc: 'Sees long term financial gain. Willing to sacrifice short term comfort for the future.',
    wants: 'To see growth in all aspects of their lives.',
    avoids: 'Talking about short term gain. Talking in generalities.',
    aiSolution: 'AI builds scalable infrastructure that compounds over years. It is an asset that appreciates and handles 10x volume without breaking.'
  },
  {
    id: 'love',
    name: 'Love',
    desc: 'Wants everyone to be happy. Looks for win-win long after others give up.',
    wants: 'Everyone to be happy.',
    avoids: 'Confrontation. You will catch more flies with honey.',
    aiSolution: 'AI guarantees every customer gets a warm, empathetic response instantly, ensuring no client or team member ever feels ignored.'
  },
  {
    id: 'recreation',
    name: 'Recreation',
    desc: 'All about fun. Often sacrifices better job for less stress, more personal time, or toys.',
    wants: 'Every interaction to be fun.',
    avoids: 'Bogging them down with serious subjects or details.',
    aiSolution: 'AI manages the boring, tedious backend of the business so you can spend your weekends on the boat instead of doing paperwork.'
  },
  {
    id: 'security',
    name: 'Security',
    desc: 'Needs to feel their feet firmly planted financially, physically, and emotionally.',
    wants: 'No surprises. To feel that everything is under control at all times.',
    avoids: 'Surprises, new situations.',
    aiSolution: 'AI provides perfectly consistent systems that never sleep, never quit, and completely eliminate human error and unpredictability.'
  },
  {
    id: 'privacy',
    name: 'Privacy',
    desc: 'Appears introverted. Withholds feelings and doesn\'t share personal information until comfortable.',
    wants: 'Interaction with boundaries.',
    avoids: 'Intrusive questions.',
    aiSolution: 'AI allows you to automate client qualification and onboarding without requiring exhausting face-to-face networking or constant phone calls.'
  },
  {
    id: 'sex',
    name: 'Sex',
    desc: 'Needs instant gratification. Wants everything to be easy, fun, and now.',
    wants: 'Everything NOW. Keep it fun!',
    avoids: 'Justifying, too much information.',
    aiSolution: 'AI gives instant results, immediately converting leads into booked appointments without waiting or long processing times.'
  }
];

export default function HotButton() {
  const [activeTab, setActiveTab] = useState(HOT_BUTTONS[0].id);
  const [pitchLoading, setPitchLoading] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const activeData = HOT_BUTTONS.find(b => b.id === activeTab);

  const simulatePitchGeneration = (name: string) => {
    setPitchLoading(true);
    setGeneratedPitch(null);
    setCopied(false);
    
    setTimeout(() => {
      setPitchLoading(false);
      const pitches: Record<string, string> = {
        convenience: "Tired of manual copy-paste chores? We will hook up automated triggers that replace 10 hours of spreadsheet admin with a simple button click. Save your energy for what matters.",
        culture: "Hello! We've custom-built an AI localization pipeline that automatically structures support outreach to preserve your team's unique cultural values across every language.",
        ego: "Flawless hands-off execution. Stay focused exclusively on high-level decisions while our background AI handles 100% of the administrative grind without asking questions.",
        prestige: "Bespoke high-end communication suites. Our elegant AI engine ensures that every quote proposal and automatic invoice projects absolute elite branding and pristine design first.",
        family: "Get home in time for family dinners. We deploy a tireless automatic assistant that answers 90%+ of quote requests in under 30 seconds so you can turn off your phone on the weekend.",
        finance: "Slash operational overhead instantly. Reclaim missed off-shift leads and reduce manual support costs using precise, pre-programmed AI responders from day one.",
        investment: "Build compounding digital systems. Our CRM pipelines scale with your business-appreciating assets that manage 10x lead volumes without breaking or requiring extra staff.",
        love: "Empathetic, instant connection. Our automatic response triage guarantees that every customer feels cared for with highly polite, instant, and warm answers.",
        recreation: "Let's automate the boring stuff so you can head out to the pool. Our automated recipes handle report exports and invoicing behind the scenes while you relax.",
        security: "Rock-solid compliance and safety. We set up isolated code actions that run with perfect accuracy, locking down error rates to zero and keeping client databases secure.",
        privacy: "Qualify your leads completely in private background buffers. Stop dealing with noisy cold calls or public lists—keep your records secure and quiet in isolated modules.",
        sex: 'Frictionless instant gratification. Bring in ready-to-pay prospects using automatic scheduling tools that book clients in under 30 seconds. Fast, flawless, and modern.'
      };
      setGeneratedPitch(pitches[activeTab] || `Custom outreach copy designed specifically for ${name} target audiences.`);
    }, 1200);
  };

  const copyToClipboard = () => {
    if (!generatedPitch) return;
    navigator.clipboard.writeText(generatedPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial-[circle,rgba(0,240,255,0.03)_0%,transparent_70%] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header section based on book cover */}
        <div className="border-b border-border pb-10 mb-12">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-dim uppercase mb-6">
            <div className="w-5 h-[1px] bg-dimmer" />
            Source Material // Book Overview
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(40px,7vw,90px)] leading-[0.9] tracking-[2px] uppercase mb-6"
          >
            Hot Button <span className="silver-gradient italic">Motivation</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-light max-w-3xl leading-[1.6]"
          >
            <p className="mb-2">Increase Sales, Improve Relationships and Understand WHY people do the things they do!</p>
            <p className="text-dim text-sm font-mono tracking-widest uppercase">By Michelle Glover</p>
          </motion.div>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 mb-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-6 text-dim font-light leading-relaxed">
            <p>
              A University of Michigan study determined there are twelve factors that psychologically drive people. 
              The psychological drivers are labeled as Hot Buttons. Each of us falls into one of these core categories.
            </p>
            <p className="text-foreground font-medium p-6 border-l-2 border-accent bg-card/50">
              "Whatever their hot button, we can solve some of the barriers to getting more of what motivates them using AI automation."
            </p>
            <p>
              Every transaction and interaction is fueled by an underlying psychological motive. Whether someone wants to save time (Convenience), show off success (Prestige), or ensure their kids are safe (Family)—identifying this driver changes exactly how you present a solution.
            </p>
          </motion.div>
        </div>

        <h2 className="font-display text-2xl tracking-[3px] uppercase mb-6">The 12 Core Motivators</h2>

        {/* Mobile Tactile Selector Dropdown (Touch Targets >= 44px) - Sized perfectly for mobile responsive viewports */}
        <div className="block lg:hidden mb-6">
          <label htmlFor="motivator-select" className="block text-[10px] font-mono uppercase tracking-widest text-accent mb-2">
            // Select Motivator Profile:
          </label>
          <select
            id="motivator-select"
            value={activeTab}
            onChange={(e) => {
              setActiveTab(e.target.value);
              setGeneratedPitch(null);
            }}
            className="w-full bg-card border border-border p-4 text-sm font-mono tracking-widest uppercase text-foreground outline-none focus:border-accent min-h-[44px] cursor-pointer"
          >
            {HOT_BUTTONS.map((btn) => (
              <option key={btn.id} value={btn.id}>
                {btn.name}
              </option>
            ))}
          </select>
        </div>

        {/* Interactive Motivator Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          
          {/* Sidebar Tabs - Hidden on Mobile to prioritize Touch Select Dropdown */}
          <div className="hidden lg:flex flex-col gap-2">
            {HOT_BUTTONS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  setActiveTab(btn.id);
                  setGeneratedPitch(null);
                }}
                className={`text-left px-5 py-4 font-mono text-[11px] tracking-widest uppercase transition-all border min-h-[44px] ${
                  activeTab === btn.id 
                  ? 'bg-accent text-background font-bold border-accent shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                  : 'bg-card border-border text-dim hover:text-foreground hover:border-dim'
                }`}
              >
                {btn.name}
              </button>
            ))}
          </div>

          {/* Content Pane */}
          <div className="bg-card border border-border p-6 md:p-12 relative min-h-[440px] flex flex-col justify-between">
             {/* Large faded text graphic */}
             <div className="absolute right-4 bottom-4 font-display text-[70px] sm:text-[150px] leading-none text-border opacity-[0.04] sm:opacity-[0.08] select-none pointer-events-none overflow-hidden uppercase">
               {activeData?.name}
             </div>

             <AnimatePresence mode="wait">
                {activeData && (
                  <motion.div
                    key={activeData.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex-grow"
                  >
                    <h3 className="font-display text-3xl sm:text-4xl tracking-[2px] uppercase mb-4 text-foreground">{activeData.name}</h3>
                    <p className="text-base sm:text-lg font-light text-foreground/90 mb-8 pb-6 border-b border-border leading-relaxed font-sans">
                      {activeData.desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <h4 className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full"/> What They Want
                        </h4>
                        <p className="font-light text-sm text-dim leading-relaxed">{activeData.wants}</p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-mono text-[10px] tracking-[0.2em] text-red-400 uppercase flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full"/> Things to Avoid
                        </h4>
                        <p className="font-light text-sm text-dim leading-relaxed">{activeData.avoids}</p>
                      </div>
                    </div>

                    <div className="bg-background border border-border p-6 rounded-sm mb-8">
                      <h4 className="font-mono text-[10px] tracking-[0.2em] text-foreground uppercase mb-3 opacity-70">
                        // How AI removes their barriers
                      </h4>
                      <p className="text-sm text-foreground/95 leading-relaxed font-sans">
                        {activeData.aiSolution}
                      </p>
                    </div>

                    {/* DYNAMIC COPYWRITING EXPERT GENERATOR */}
                    <div className="border-t border-border pt-6 mt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <h4 className="font-display text-sm tracking-widest uppercase mb-1 flex items-center gap-2 text-foreground">
                            <Sparkles size={14} className="text-accent animate-spin" />
                            AI Motivated Pitch Generator
                          </h4>
                          <p className="text-xs text-dim font-light">Draft unique customer sales outreach copy targeting the {activeData.name} profile drivers.</p>
                        </div>
                        <button
                          onClick={() => simulatePitchGeneration(activeData.name)}
                          aria-label={`Generate sales pitch targeting ${activeData.name} drivers`}
                          aria-busy={pitchLoading}
                          disabled={pitchLoading}
                          className="font-mono text-[10px] font-bold uppercase tracking-widest border border-accent text-accent px-4 py-2.5 bg-accent/5 hover:bg-accent hover:text-background active:scale-95 transition-all self-start sm:self-center shrink-0 min-h-[44px]"
                        >
                          {pitchLoading ? 'Drafting Neural Prose...' : 'Draft Sales Pitch'}
                        </button>
                      </div>

                      <AnimatePresence mode="wait">
                        {generatedPitch && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="bg-accent/5 border border-accent/20 p-4 rounded-sm relative group animate-pulse"
                          >
                            <p className="text-xs font-mono text-accent mb-2 uppercase tracking-widest">// Outreach Pitch:</p>
                            <p className="text-sm font-sans text-foreground italic leading-relaxed pr-8">
                              "{generatedPitch}"
                            </p>
                            <button
                              onClick={copyToClipboard}
                              aria-label="Copy outreach pitch text to clipboard"
                              className="absolute right-4 top-4 p-2.5 bg-background border border-border hover:border-accent text-dim hover:text-accent rounded-sm transition-all min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                            >
                              {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
