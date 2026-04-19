import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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

  const activeData = HOT_BUTTONS.find(b => b.id === activeTab);

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

        <h2 className="font-display text-3xl tracking-[3px] uppercase mb-8">The 12 Core Motivators</h2>

        {/* Interactive Motivator Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          
          {/* Sidebar Tabs */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
            {HOT_BUTTONS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveTab(btn.id)}
                className={`text-left px-5 py-3.5 font-mono text-[11px] tracking-widest uppercase transition-all whitespace-nowrap lg:whitespace-normal border ${
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
          <div className="bg-card border border-border p-8 md:p-12 relative min-h-[400px]">
             {/* Large faded text graphic */}
             <div className="absolute right-4 bottom-4 font-display text-[150px] leading-none text-border opacity-30 select-none pointer-events-none overflow-hidden">
               {activeData?.name}
             </div>

             <AnimatePresence mode="wait">
               {activeData && (
                 <motion.div
                   key={activeData.id}
                   initial={{ opacity: 0, x: 10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -10 }}
                   transition={{ duration: 0.3 }}
                   className="relative z-10"
                 >
                   <h3 className="font-display text-4xl tracking-[2px] uppercase mb-4">{activeData.name}</h3>
                   <p className="text-lg font-light text-foreground mb-10 pb-6 border-b border-border">
                     {activeData.desc}
                   </p>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
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

                   <div className="bg-background border border-border p-6 rounded-sm">
                     <h4 className="font-mono text-[10px] tracking-[0.2em] text-foreground uppercase mb-4 opacity-70">
                       // How AI removes their barriers
                     </h4>
                     <p className="text-foreground leading-relaxed">
                       {activeData.aiSolution}
                     </p>
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
