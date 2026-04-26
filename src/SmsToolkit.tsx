import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SMS_TEXTS = {
  1: `Hey [NAME] 👋 Quick question — what's eating most of your time at work right now?\n\nReply with a letter:\n\nA) Paperwork, reports & forms\nB) Scheduling, follow-ups & reminders\nC) Spreadsheets & manual data entry\nD) Something else is killing me\n\n— Bryan @ Silverback AI (takes 5 sec to reply)`,
  2: `Got it — that's actually a really common one and 100% fixable with the right setup.\n\nIf that was just handled automatically, what would that actually change for you?\n\nA) More time with my family / kids\nB) Actually grow my business\nC) Less stress, better sleep honestly\nD) All three — I'm running on fumes\n\n— Bryan @ Silverback AI`,
  3: `Last question I promise 😄\n\nHow do you want to handle this?\n\n1) Just build it for me — I'll use it, you figure out the tech\n2) Show me how and I'll run with it\n3) Let's hop on a quick call, I have more going on\n\nEither way, I'll put together something specific for your situation. No pressure, no pitch.\n\n— Bryan @ Silverback AI`
};

const AUDIT_GUIDE = [
  {
    step: '01',
    title: 'Review Initial Pain',
    action: 'Look at their Q1 & Q2 answers.',
    goal: 'Identify if they value Time (Convenience/Family) or Growth (Investment/Finance).',
    tip: 'If they picked "Family", emphasize that AI buys them their weekends back.'
  },
  {
    step: '02',
    title: 'Validate the Stack',
    action: 'Confirm the tools from Step 4.',
    goal: 'See if we already have connectors (Zapier/Make) for their CRM/Email.',
    tip: 'If they use archaic software, emphasize our custom scraping/API capabilities.'
  },
  {
    step: '03',
    title: 'The Evidence Gap',
    action: 'Ask for a screen recording if they haven\'t provided one.',
    goal: 'Watch them struggle for 3 minutes. That is where the $500 value is proved.',
    tip: 'Tell them: "If I can see you do it once, I can make the AI do it forever."'
  },
  {
    step: '04',
    title: 'Set the ROI Goal',
    action: 'Ask: "What is 1 hour of your time worth?"',
    goal: 'Anchor the $500 audit cost against the 30-40 hours we will save them monthly.',
    tip: 'A $500 audit that saves 10 hours at $100/hr is a 20x ROI in the first month.'
  }
];

const TEMPLATES = [
  {
    ind: 'Solo Attorney / Law Firm',
    title: 'Family Law & Bankruptcy',
    pain: "They're drowning in intake forms, client follow-ups, and document prep — all manual.",
    msg: "Hey [NAME] — quick question for an attorney friend:\n\nWhat's taking the most time that isn't billable?\n\nA) Client intake & onboarding paperwork\nB) Following up on missing documents\nC) Drafting repetitive letters/forms\nD) Something worse — I'll tell you\n\n— Bryan @ Silverback AI"
  },
  {
    ind: 'Real Estate Agent / Investor',
    title: 'Real Estate',
    pain: "Too many listings, leads, and follow-ups to track manually.",
    msg: "Hey [NAME] — working with a few agents right now on something cool.\n\nWhere does most of your time go that isn't closing deals?\n\nA) Following up with leads who went cold\nB) Paperwork, disclosures & transaction docs\nC) Scheduling showings & managing calendar\nD) Something else — it's bad\n\n— Bryan @ Silverback AI"
  },
  {
    ind: 'Sales VP / Corporate',
    title: 'Corporate Sales Leadership',
    pain: "Weekly reports, pipeline updates, and team tracking eating nights and weekends.",
    msg: "Hey [NAME] — I know you're slammed, so quick one:\n\nWhat's stealing your Sunday nights?\n\nA) Building the weekly pipeline/forecast report\nB) Chasing reps for their updates\nC) Updating CRM with what should auto-update\nD) The board wants something new — again\n\nI automate exactly this stuff. Curious what yours looks like.\n\n— Bryan @ Silverback AI"
  },
  {
    ind: 'Contractor / Trades',
    title: 'Home Services & Contractors',
    pain: "Estimates, scheduling, invoicing — all manual and chaotic.",
    msg: "Hey [NAME] — quick question for a contractor I respect:\n\nWhat's taking you the most time that isn't actually doing the work?\n\nA) Writing up estimates and quotes\nB) Scheduling crews and customers\nC) Chasing invoices and following up on payments\nD) Something else is running me ragged\n\n— Bryan @ Silverback AI"
  },
  {
    ind: 'Teacher / Educator',
    title: 'School Teachers',
    pain: "Lesson planning, parent emails, grading admin — zero free time.",
    msg: "Hey [NAME] — I know teachers don't have 30 seconds to breathe, so fast one:\n\nWhat's eating your evenings and weekends most?\n\nA) Planning lessons and creating materials\nB) Parent emails and communication\nC) Grading, progress reports & paperwork\nD) All of it — it never ends\n\nThere's AI tools that can cut this in half. Wondering if it's something you'd want to explore.\n\n— Bryan @ Silverback AI"
  },
  {
    ind: 'Solopreneur / Small Business',
    title: 'Solo Business Owner',
    pain: "Wearing all the hats — there's no one to hand anything off to.",
    msg: "Hey [NAME] — running your own thing is no joke.\n\nWhat's the task you keep putting off because you hate doing it?\n\nA) Bookkeeping, receipts & expense tracking\nB) Social media and content\nC) Customer follow-up and outreach\nD) Administrative stuff that's not my job\n\nI build AI systems that handle exactly this. Takes 2 sec to reply 😄\n\n— Bryan @ Silverback AI"
  }
];

export default function SmsToolkit({ initialTab = 'sms', isAdmin = false }: { initialTab?: 'sms' | 'form' | 'templates' | 'guide', isAdmin?: boolean }) {
  const [activeTab, setActiveTab] = useState<'sms' | 'form' | 'templates' | 'guide'>(isAdmin ? 'guide' : 'form');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [formStep, setFormStep] = useState(1);
  const [formAnswers, setFormAnswers] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const totalSteps = 9;

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const selectChoice = (q: string, val: string) => {
    setFormAnswers({ ...formAnswers, [q]: val });
  };

  const getQ1Insight = () => {
    const val = formAnswers['q1'];
    if (val === 'A') return 'Paperwork is almost always 80%+ automatable. We can usually turn a 3-hour weekly task into a 5-minute review.';
    if (val === 'B') return 'Scheduling automation is one of the fastest wins — typically deployable in under a week with tools you may already have.';
    if (val === 'C') return 'Data entry is what AI was literally built to eliminate. This is our specialty.';
    if (val === 'D') return 'A good AI system can follow up with 500 leads the same way you would with 5. This is where revenue gets found.';
    if (val === 'E') return 'The "something else" people are often our best fits — unique problems lead to proprietary solutions nobody else has.';
    return '';
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-[1200px] mx-auto min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="logo-hex w-9 h-9 flex items-center justify-center text-background font-bold text-lg shadow-[0_0_16px_rgba(200,200,200,0.14)]">🦍</div>
          <span className="font-display text-2xl md:text-3xl tracking-[0.2em] silver-gradient uppercase">Silverback AI</span>
        </div>
        <div className="font-mono text-[12px] tracking-widest text-accent border border-[var(--color-accent)]/30 px-3 py-1.5 uppercase mt-4 md:mt-0">
          {isAdmin ? '// SMS Funnel Toolkit' : '// Initial Intake'}
        </div>
      </div>

      {/* TABS */}
      {isAdmin && (
        <div className="flex flex-wrap gap-1 mb-10 bg-card p-1 rounded w-fit border border-border overflow-hidden">
          {[
            { id: 'guide', label: 'Audit Guide' },
            { id: 'sms', label: 'SMS Funnel' },
            { id: 'form', label: 'Client Preview' },
            { id: 'templates', label: 'Industry Hooks' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-2.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-all rounded-sm duration-300 ${
                activeTab === tab.id 
                  ? 'bg-accent text-black font-extrabold shadow-md transform scale-[1.02]' 
                  : 'text-dim hover:text-foreground hover:bg-white/10 hover:shadow-sm'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {activeTab === tab.id && <span className="font-extrabold opacity-70 mr-2">►</span>}
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        
        {/* AUDIT GUIDE TAB */}
        {activeTab === 'guide' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10">
              <h2 className="font-display text-4xl tracking-widest uppercase mb-2">Discovery Audit Roadmap</h2>
              <p className="text-dim font-light text-sm max-w-2xl leading-relaxed">
                Internal guide for running high-conversion discovery calls. This helps you figure out what to get ready before presenting the $500 audit proposal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {AUDIT_GUIDE.map((g, i) => (
                <div key={i} className="bg-card border border-border p-8 relative overflow-hidden group">
                  <div className="absolute top-[-20px] right-[-10px] text-[80px] font-display text-border/40 group-hover:text-accent/10 transition-colors select-none pointer-events-none">{g.step}</div>
                  <div className="font-mono text-[12px] tracking-[0.3em] text-accent uppercase mb-4">// Step {g.step}</div>
                  <h3 className="font-display text-2xl tracking-widest uppercase mb-4 pr-12">{g.title}</h3>
                  <div className="space-y-4 relative z-10">
                    <div>
                      <span className="font-mono text-[11px] uppercase text-dim block mb-1">Primary Action:</span>
                      <p className="text-sm font-medium text-foreground leading-relaxed">{g.action}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] uppercase text-dim block mb-1">Our Goal:</span>
                      <p className="text-sm font-light text-dim leading-relaxed">{g.goal}</p>
                    </div>
                    <div className="bg-accent/5 border-l border-accent p-3 mt-4 italic text-[11px] text-accent font-light">
                      "Pro Tip: {g.tip}"
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-border p-8 text-center rounded-sm">
              <h4 className="font-display text-xl tracking-widest uppercase mb-4">Ready to Run the Intake?</h4>
              <p className="text-dim text-sm mb-6 max-w-lg mx-auto">Switch to the "Client Preview" tab to see exactly what the prospect sees during their onboarding flow.</p>
              <button 
                onClick={() => setActiveTab('form')}
                className="bg-accent text-black font-mono text-[11px] tracking-widest uppercase px-8 py-3 font-bold hover:bg-white transition-colors"
              >
                Launch Intake Flow →
              </button>
            </div>
          </motion.div>
        )}
        {/* SMS SEQUENCES TAB */}
        {activeTab === 'sms' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="mb-8">
              <h2 className="font-display text-4xl tracking-widest uppercase mb-2">SMS Outreach Sequence</h2>
              <p className="text-dim font-light text-sm max-w-2xl leading-relaxed">
                Three-text funnel. Copy, customize the name, and send. Each message builds on the last — tap A/B/C/D responses guide you to the right follow-up. Works from your phone in under 60 seconds.
              </p>
            </div>

            {/* MESSAGE 1 */}
            <div className="bg-card border border-border p-6 md:p-8 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent"></div>
              
              <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
                <div className="font-mono text-[11px] tracking-widest text-accent uppercase">// Text 01 — The Opener</div>
                <div className="font-mono text-[10px] text-dim border border-border px-3 py-1 uppercase">Send cold or warm</div>
              </div>

              <div className="bg-[#1a2a1a] dark:bg-[#0d1614] border border-green-500/20 rounded-tr-xl rounded-b-xl p-5 mb-5 text-[14px] md:text-[15px] leading-[1.8] text-foreground font-light relative whitespace-pre-wrap break-words">
                <div className="absolute -top-3 left-0 font-mono text-[9px] tracking-widest text-green-400 bg-card px-2">SILVERBACK AI</div>
                {SMS_TEXTS[1]}
              </div>

              <div className="flex gap-3 mb-8">
                <button 
                  onClick={() => copyText('sms1', SMS_TEXTS[1])}
                  className={`flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] tracking-widest uppercase font-bold transition-all ${copiedId === 'sms1' ? 'bg-green-500 text-black' : 'bg-accent text-black hover:bg-foreground hover:text-background'}`}
                >
                  {copiedId === 'sms1' ? '✓ Copied!' : '📋 Copy Text'}
                </button>
                <a 
                  href={`sms:?&body=${encodeURIComponent(SMS_TEXTS[1])}`}
                  className="flex items-center gap-2 px-5 py-2.5 border border-border text-dim font-mono text-[11px] tracking-widest uppercase transition-all hover:border-accent hover:text-accent"
                >
                  📱 Open in Messages
                </a>
              </div>

              {/* BRANCHES */}
              <div className="bg-black/20 border border-border p-6">
                <div className="font-mono text-[10px] tracking-widest text-dim uppercase mb-6">// How to respond based on their reply</div>
                <div className="space-y-4">
                  {[
                    { t: 'Reply A', d: 'Paperwork', r: 'Send Text 2A — reporting/forms angle. Ask about weekly reports, compliance docs, invoices.' },
                    { t: 'Reply B', d: 'Scheduling', r: 'Send Text 2B — calendar/CRM angle. Ask about follow-up reminders, appointment confirmations, no-shows.' },
                    { t: 'Reply C', d: 'Spreadsheets', r: "Send Text 2C — data entry angle. Ask if they're copy-pasting between systems or building reports manually." },
                    { t: 'Reply D', d: 'Something else', r: 'Send Text 2D — open discovery. Ask them to describe it in one sentence. This is your hottest lead — they have a specific problem.' }
                  ].map((b, i) => (
                    <div key={i} className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div>
                        <div className="font-mono text-[11px] text-accent py-0.5">{b.t} →</div>
                        <div className="text-[10px] text-dim">{b.d}</div>
                      </div>
                      <div className="text-[13px] text-foreground font-light leading-[1.6] opacity-80">{b.r}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 py-2">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent max-w-[100px]"></div>
              <div className="font-mono text-[10px] tracking-widest text-dim uppercase">After they reply</div>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent max-w-[100px]"></div>
            </div>

            {/* MESSAGE 2 */}
            <div className="bg-card border border-border p-6 md:p-8 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent"></div>
              
              <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
                <div className="font-mono text-[11px] tracking-widest text-accent uppercase">// Text 02 — Dig Into The Pain</div>
                <div className="font-mono text-[10px] text-dim border border-border px-3 py-1 uppercase">Send after they reply to Text 01</div>
              </div>

              <div className="bg-[#1a2a1a] dark:bg-[#0d1614] border border-green-500/20 rounded-tr-xl rounded-b-xl p-5 mb-5 text-[14px] md:text-[15px] leading-[1.8] text-foreground font-light relative whitespace-pre-wrap break-words">
                <div className="absolute -top-3 left-0 font-mono text-[9px] tracking-widest text-green-400 bg-card px-2">SILVERBACK AI</div>
                {SMS_TEXTS[2]}
              </div>

              <div className="flex gap-3 mb-6">
                <button 
                  onClick={() => copyText('sms2', SMS_TEXTS[2])}
                  className={`flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] tracking-widest uppercase font-bold transition-all ${copiedId === 'sms2' ? 'bg-green-500 text-black' : 'bg-accent text-black hover:bg-foreground hover:text-background'}`}
                >
                  {copiedId === 'sms2' ? '✓ Copied!' : '📋 Copy Text'}
                </button>
                <a 
                  href={`sms:?&body=${encodeURIComponent(SMS_TEXTS[2])}`}
                  className="flex items-center gap-2 px-5 py-2.5 border border-border text-dim font-mono text-[11px] tracking-widest uppercase transition-all hover:border-accent hover:text-accent"
                >
                  📱 Open in Messages
                </a>
              </div>

              <div className="bg-accent/5 border border-accent/20 p-5 mt-4">
                <div className="font-mono text-[10px] tracking-widest text-accent uppercase mb-2">// Why this question works</div>
                <div className="text-[13px] text-foreground font-light leading-[1.6] opacity-80">
                  You just shifted from their <em>problem</em> to their <em>why</em>. When they pick A (family/kids) you now know exactly what to say in your close. That's the dad who misses the game. That's your hook. Don't waste it.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 py-2">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent max-w-[100px]"></div>
              <div className="font-mono text-[10px] tracking-widest text-dim uppercase">After they reply</div>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent max-w-[100px]"></div>
            </div>

            {/* MESSAGE 3 */}
            <div className="bg-card border border-border p-6 md:p-8 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent"></div>
              
              <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
                <div className="font-mono text-[11px] tracking-widest text-accent uppercase">// Text 03 — Qualify & Close</div>
                <div className="font-mono text-[10px] text-dim border border-border px-3 py-1 uppercase">Final qualifying step</div>
              </div>

              <div className="bg-[#1a2a1a] dark:bg-[#0d1614] border border-green-500/20 rounded-tr-xl rounded-b-xl p-5 mb-5 text-[14px] md:text-[15px] leading-[1.8] text-foreground font-light relative whitespace-pre-wrap break-words">
                <div className="absolute -top-3 left-0 font-mono text-[9px] tracking-widest text-green-400 bg-card px-2">SILVERBACK AI</div>
                {SMS_TEXTS[3]}
              </div>

              <div className="flex gap-3 mb-8">
                <button 
                  onClick={() => copyText('sms3', SMS_TEXTS[3])}
                  className={`flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] tracking-widest uppercase font-bold transition-all ${copiedId === 'sms3' ? 'bg-green-500 text-black' : 'bg-accent text-black hover:bg-foreground hover:text-background'}`}
                >
                  {copiedId === 'sms3' ? '✓ Copied!' : '📋 Copy Text'}
                </button>
                <a 
                  href={`sms:?&body=${encodeURIComponent(SMS_TEXTS[3])}`}
                  className="flex items-center gap-2 px-5 py-2.5 border border-border text-dim font-mono text-[11px] tracking-widest uppercase transition-all hover:border-accent hover:text-accent"
                >
                  📱 Open in Messages
                </a>
              </div>

              {/* BRANCHES */}
              <div className="bg-black/20 border border-border p-6">
                <div className="font-mono text-[10px] tracking-widest text-dim uppercase mb-6">// Close based on their answer</div>
                <div className="space-y-4">
                  {[
                    { t: 'Reply 1', d: 'Done-for-you', r: '"Perfect, that\'s exactly what we do. Give me 48 hours and I\'ll send you a custom proposal. What\'s your email?" → Quote $500-1500/mo retainer.' },
                    { t: 'Reply 2', d: 'Guided setup', r: '"Love it. I\'ll build the foundation and walk you through it — usually takes one 90-min session. I\'ll send a calendar link." → Quote $250-500 one-time.' },
                    { t: 'Reply 3', d: 'Call', r: 'This is your highest-value lead. They have complexity. Reply immediately: "Absolutely. What\'s a good 20 min window this week?" → Quote by scope after call.' }
                  ].map((b, i) => (
                    <div key={i} className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div>
                        <div className="font-mono text-[11px] text-accent py-0.5">{b.t} →</div>
                        <div className="text-[10px] text-dim">{b.d}</div>
                      </div>
                      <div className="text-[13px] text-foreground font-light leading-[1.6] opacity-80">{b.r}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {/* GUIDED FORM TAB */}
        {activeTab === 'form' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10">
              <h2 className="font-display text-4xl tracking-widest uppercase mb-2">Guided Intake Form</h2>
              <p className="text-dim font-light text-sm max-w-2xl leading-relaxed">
                Multiple choice with optional text. Every answer shapes the next question. Embed this or send as a link. Works on mobile in under 3 minutes.
              </p>
            </div>

            {/* NARRATIVE SECTION */}
            <div className="bg-accent/5 border border-accent/20 p-6 mb-8">
              <h3 className="font-display text-lg tracking-widest uppercase mb-2 silver-gradient">List any other time killers and maybe how you receive something that makes it harder on you.</h3>
              <p className="text-dim text-[13px] font-light leading-relaxed mb-4">
                We automate the manual work that kills your productivity. By centralizing your workflows into custom-built AI systems, our partners typically save <strong className="text-foreground">10–20 hours a week</strong> on tasks that used to require manual oversight. It's not just about speed; it's about reclaiming your time for high-value growth.
              </p>
              <div className="flex gap-4 items-center">
                 <div className="p-2 border border-accent/20 text-xs">🚀</div>
                 <div className="text-[10px] text-accent font-mono uppercase tracking-widest">Typical ROI: 10 hrs saved / week</div>
              </div>
            </div>

            {!formSubmitted ? (
              <div className="max-w-3xl">
                {/* Progress bar */}
                <div className="flex gap-2 items-center mb-10">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 flex-1 rounded transition-colors ${i + 1 < formStep ? 'bg-accent' : i + 1 === formStep ? 'bg-accent/50 animate-pulse' : 'bg-[var(--color-border)]'}`}
                    />
                  ))}
                  <span className="font-mono text-[11px] tracking-widest text-dim uppercase ml-3 whitespace-nowrap">
                    Step {formStep} of {totalSteps}
                  </span>
                </div>

                {/* STEPS */}
                {formStep === 1 && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border p-8 md:p-12">
                    <div className="font-mono text-[10px] tracking-widest text-accent uppercase mb-3">// Question 01 — The Problem</div>
                    <h3 className="font-display text-4xl tracking-widest mb-2 leading-none uppercase">What's Eating Your Time Every Single Week?</h3>
                    <p className="text-[13px] text-dim font-light italic mb-8">Pick the one that makes you cringe most. You can add detail below.</p>
                    
                    <div className="space-y-3 mb-6">
                      {[
                        { l: 'A', t: 'Paperwork, Reporting & Compliance Docs', d: 'Forms, reports, invoices, filings — stuff that takes hours every week and feels like zero value' },
                        { l: 'B', t: 'Scheduling, Follow-Ups & Reminders', d: 'Chasing people down, confirming appointments, remembering who needs what and when' },
                        { l: 'C', t: 'Spreadsheets & Manual Data Entry', d: 'Copy-pasting between systems, building reports by hand, updating the same data in 3 places' },
                        { l: 'D', t: 'Customer Communication & Sales Follow-Through', d: 'Leads falling through cracks, inconsistent responses, no system for staying in touch' },
                        { l: 'E', t: 'Something Else Is Killing Me', d: "I'll describe it below — it doesn't fit neatly into any of these" }
                      ].map(opt => (
                        <button 
                          key={opt.l}
                          className={`w-full text-left p-4 md:p-5 flex items-start gap-4 transition-all border ${formAnswers['q1'] === opt.l ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/40 bg-transparent'}`}
                          onClick={() => selectChoice('q1', opt.l)}
                        >
                          <div className="font-display text-2xl text-accent leading-none pt-0.5">{opt.l}</div>
                          <div>
                            <div className="text-[15px] font-medium text-foreground mb-1 leading-snug">{opt.t}</div>
                            <div className="text-[12px] text-dim font-light leading-relaxed">{opt.d}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {formAnswers['q1'] === 'E' && (
                      <input 
                        type="text" 
                        placeholder="Describe it in one sentence..." 
                        className="w-full bg-black/20 border-b border-border text-sm px-3 py-3 outline-none focus:border-accent transition-all mb-6 font-light"
                      />
                    )}

                    {formAnswers['q1'] && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-accent/5 border border-accent/20 p-5 mb-8">
                        <div className="font-mono text-[10px] tracking-widest text-accent uppercase mb-2">// You picked it — here's why that matters</div>
                        <div className="text-[13px] text-foreground font-light leading-[1.6]">
                          {getQ1Insight()}
                        </div>
                      </motion.div>
                    )}

                    <div className="mt-8">
                      <button 
                        onClick={() => setFormStep(2)}
                        disabled={!formAnswers['q1']}
                        className="bg-accent text-black font-display text-2xl tracking-widest uppercase px-12 py-4 transition-all hover:bg-white hover:-translate-y-1 active:translate-y-0 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(0,255,255,0.1)]"
                      >
                        Let's Go →
                      </button>
                    </div>
                  </motion.div>
                )}

                {formStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border p-8 md:p-12">
                    <div className="font-mono text-[10px] tracking-widest text-accent uppercase mb-3">// Question 02 — The Why</div>
                    <h3 className="font-display text-4xl tracking-widest mb-2 leading-none uppercase">If that task just "Disappeared", what would that change for you?</h3>
                    <p className="text-[13px] text-dim font-light italic mb-8">This is the heart of why we do this. Pick your biggest driver.</p>
                    
                    <div className="space-y-3 mb-8">
                      {[
                        { l: 'A', t: 'More Time With Family', d: 'Actually being present for dinners, games, and weekends without the phantom phone buzz.' },
                        { l: 'B', t: 'Focus on Growth & Revenue', d: 'Handling high-level strategy instead of cleaning up messy data and admin fire drills.' },
                        { l: 'C', t: 'Massive Stress Reduction', d: 'Knowing the system is running correctly without you having to double-check every detail.' },
                        { l: 'D', t: 'Something Else entirely', d: 'I have a specific goal I\'m trying to reach.' }
                      ].map(opt => (
                        <button 
                          key={opt.l}
                          className={`w-full text-left p-5 flex items-start gap-4 transition-all border ${formAnswers['q2'] === opt.l ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/40 bg-transparent'}`}
                          onClick={() => selectChoice('q2', opt.l)}
                        >
                          <div className="font-display text-2xl text-accent leading-none pt-0.5">{opt.l}</div>
                          <div>
                            <div className="text-[15px] font-medium text-foreground mb-1">{opt.t}</div>
                            <div className="text-[12px] text-dim font-light">{opt.d}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setFormStep(1)} className="bg-transparent border border-border text-dim font-mono text-[11px] tracking-widest uppercase px-8 py-4 hover:text-white">Back</button>
                      <button 
                        onClick={() => setFormStep(3)}
                        disabled={!formAnswers['q2']}
                        className="bg-accent text-black font-display text-2xl tracking-widest uppercase px-12 py-4 hover:bg-white disabled:opacity-30"
                      >
                        Next →
                      </button>
                    </div>
                  </motion.div>
                )}

                {formStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border p-8 md:p-12">
                    <div className="font-mono text-[10px] tracking-widest text-accent uppercase mb-3">// Question 03 — The Stack</div>
                    <h3 className="font-display text-4xl tracking-widest mb-2 leading-none uppercase">What Tech Are We Talking To?</h3>
                    <p className="text-[13px] text-dim font-light italic mb-8">List the main software tools involved in this repetitive task (e.g. Salesforce, Excel, Gmail, Quickbooks).</p>
                    
                    <textarea 
                      className="w-full bg-black/20 border border-border rounded p-4 outline-none focus:border-accent text-sm min-h-[120px] mb-8 font-light"
                      placeholder="List tools here..."
                      onChange={(e) => setFormAnswers({...formAnswers, q3: e.target.value})}
                      value={formAnswers['q3'] || ''}
                    />

                    <div className="flex gap-4">
                      <button onClick={() => setFormStep(2)} className="bg-transparent border border-border text-dim font-mono text-[11px] tracking-widest uppercase px-8 py-4 hover:text-white">Back</button>
                      <button 
                        onClick={() => setFormStep(4)}
                        disabled={!formAnswers['q3']}
                        className="bg-accent text-black font-display text-2xl tracking-widest uppercase px-12 py-4 hover:bg-white disabled:opacity-30"
                      >
                        Next →
                      </button>
                    </div>
                  </motion.div>
                )}

                {formStep === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border p-8 md:p-12">
                    <div className="font-mono text-[10px] tracking-widest text-accent uppercase mb-3">// Preparation Guide — Next Steps</div>
                    <h2 className="font-display text-5xl tracking-widest mb-6 leading-[0.9] uppercase italic silver-gradient">The $500 Discovery Audit</h2>
                    <p className="text-[15px] text-foreground font-light mb-8 leading-relaxed italic border-l-2 border-accent/40 pl-6">
                      "To get the most out of our audit, we need to see exactly where the gears are grinding. This step prepares you for the deep dive."
                    </p>
                    
                    <div className="space-y-6 mb-10">
                      <div className="flex gap-4 p-4 bg-black/30 border border-border/50">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">1</div>
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Record a "Loom" (Video)</h4>
                          <p className="text-xs text-dim font-light">Record yourself doing the task for just 3 minutes. Don't worry about being perfect—we need to see the "ugly" manual parts.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-4 bg-black/30 border border-border/50">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">2</div>
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Gather Login Access</h4>
                          <p className="text-xs text-dim font-light">Have temporary login credentials ready for the tools you listed in the previous step. We work in a secure Sandbox first.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setFormStep(3)} className="bg-transparent border border-border text-dim font-mono text-[11px] tracking-widest uppercase px-8 py-4 hover:text-white">Back</button>
                      <button 
                        onClick={() => setFormStep(5)}
                        className="bg-accent text-black font-display text-2xl tracking-widest uppercase px-12 py-4 hover:bg-white"
                      >
                        I'm Ready →
                      </button>
                    </div>
                  </motion.div>
                )}

                {formStep === 5 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border p-8 md:p-12">
                    <div className="font-mono text-[10px] tracking-widest text-accent uppercase mb-3">// Question 05 — The Volume</div>
                    <h3 className="font-display text-4xl tracking-widest mb-2 leading-none uppercase">How many times a month does this happen?</h3>
                    <p className="text-[13px] text-dim font-light italic mb-8">This helps us calculate the ROI on your potential automation.</p>
                    
                    <div className="space-y-3 mb-8">
                      {[
                        { val: '1-10', t: 'Occasional (1-10 times/mo)', d: 'Low volume but high stress/complexity.' },
                        { val: '10-50', t: 'Frequent (10-50 times/mo)', d: 'Consistently eating several hours every week.' },
                        { val: '50-200', t: 'Heavy (50-200 times/mo)', d: 'A major operational bottleneck involving multiple people.' },
                        { val: '200+', t: 'Enterprise (200+ times/mo)', d: 'Massive scale that requires high-performance infrastructure.' }
                      ].map(opt => (
                        <button 
                          key={opt.val}
                          className={`w-full text-left p-5 flex items-start gap-4 transition-all border ${formAnswers['q5'] === opt.val ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/40 bg-transparent'}`}
                          onClick={() => selectChoice('q5', opt.val)}
                        >
                          <div>
                            <div className="text-[15px] font-medium text-foreground mb-1">{opt.t}</div>
                            <div className="text-[12px] text-dim font-light">{opt.d}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setFormStep(4)} className="bg-transparent border border-border text-dim font-mono text-[11px] tracking-widest uppercase px-8 py-4 hover:text-white">Back</button>
                      <button 
                        onClick={() => setFormStep(6)}
                        disabled={!formAnswers['q5']}
                        className="bg-accent text-black font-display text-2xl tracking-widest uppercase px-12 py-4 hover:bg-white disabled:opacity-30"
                      >
                        Next →
                      </button>
                    </div>
                  </motion.div>
                )}

                {formStep === 6 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border p-8 md:p-12">
                    <div className="font-mono text-[10px] tracking-widest text-accent uppercase mb-3">// Question 06 — ROI Target</div>
                    <h3 className="font-display text-4xl tracking-widest mb-2 leading-none uppercase">What's your primary goal for this system?</h3>
                    <p className="text-[13px] text-dim font-light italic mb-8">What metric tells you the $500 audit was the best money you ever spent?</p>
                    
                    <div className="space-y-3 mb-8">
                       {[
                         'Saving at least 10 hours a week',
                         'Zero errors / Perfection in reporting',
                         'Scaling to 5x volume without hiring',
                         'Better customer experience / Faster response'
                       ].map((goal, i) => (
                         <button 
                          key={i}
                          className={`w-full text-left p-4 border transition-all ${formAnswers['q6'] === goal ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/40'}`}
                          onClick={() => selectChoice('q6', goal)}
                         >
                           <span className="text-[14px] font-light">{goal}</span>
                         </button>
                       ))}
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setFormStep(5)} className="bg-transparent border border-border text-dim font-mono text-[11px] tracking-widest uppercase px-8 py-4 hover:text-white">Back</button>
                      <button 
                        onClick={() => setFormStep(7)}
                        disabled={!formAnswers['q6']}
                        className="bg-accent text-black font-display text-2xl tracking-widest uppercase px-12 py-4 hover:bg-white disabled:opacity-30"
                      >
                        Final Step →
                      </button>
                    </div>
                  </motion.div>
                )}

                {formStep === 7 && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border p-8 md:p-12">
                    <div className="font-mono text-[10px] tracking-widest text-accent uppercase mb-3">// Last Step — Discovery Gateway</div>
                    <h3 className="font-display text-4xl tracking-widest mb-3 leading-none uppercase">Where Should We Send Your Custom Audit Plan?</h3>
                    <p className="text-[13px] text-dim font-light italic mb-8">We'll put together something specific to what you told us — no generic pitch.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block font-mono text-[10px] tracking-widest text-dim uppercase mb-2">First Name *</label>
                        <input type="text" placeholder="Bryan" className="w-full bg-transparent border-b border-border p-3 outline-none focus:border-accent text-sm" />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] tracking-widest text-dim uppercase mb-2">Last Name</label>
                        <input type="text" placeholder="Gillis" className="w-full bg-transparent border-b border-border p-3 outline-none focus:border-accent text-sm" />
                      </div>
                    </div>
                    <div className="mb-5">
                      <label className="block font-mono text-[10px] tracking-widest text-dim uppercase mb-2">Email Address *</label>
                      <input type="email" placeholder="you@yourcompany.com" className="w-full bg-transparent border-b border-border p-3 outline-none focus:border-accent text-sm" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                      <div>
                        <label className="block font-mono text-[10px] tracking-widest text-dim uppercase mb-2">Phone (Optional)</label>
                        <input type="tel" placeholder="916-555-0100" className="w-full bg-transparent border-b border-border p-3 outline-none focus:border-accent text-sm" />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] tracking-widest text-dim uppercase mb-2">Industry</label>
                        <input type="text" placeholder="Construction, Legal, Real Estate..." className="w-full bg-transparent border-b border-border p-3 outline-none focus:border-accent text-sm" />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setFormStep(6)}
                        className="bg-transparent border border-border text-dim font-mono text-[11px] tracking-widest uppercase px-8 py-4 transition-colors hover:text-foreground hover:border-white/30"
                      >
                         ← Back
                      </button>
                      <button 
                        onClick={() => setFormSubmitted(true)}
                        className="bg-accent text-black font-display text-2xl tracking-widest uppercase px-12 py-4 transition-colors hover:bg-white shadow-[0_0_20px_rgba(0,255,150,0.15)]"
                      >
                        Submit Audit Request →
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 px-8 border border-border bg-accent/5 max-w-3xl">
                <div className="text-6xl mb-6">🦍</div>
                <h3 className="font-display text-5xl tracking-widest text-accent uppercase mb-4">We've Got You.</h3>
                <p className="text-[15px] text-foreground font-light leading-[1.8] max-w-lg mx-auto opacity-80 mb-8">
                  Your answers are in. We'll review everything you told us and reach out within 24 hours with a specific plan built around your actual situation — not a generic pitch.<br/><br/>In the meantime, go do something you actually want to do.
                </p>
                <div className="font-mono text-[10px] tracking-widest text-dim uppercase">// Response within 24 hours · No spam · Silverback AI</div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === 'templates' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10">
              <h2 className="font-display text-4xl tracking-widest uppercase mb-2">Industry-Specific Openers</h2>
              <p className="text-dim font-light text-sm max-w-2xl leading-relaxed">
                Personalized SMS openers for specific industries. Lead with their world, not yours. Tap the copy button and customize the name.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {TEMPLATES.map((tmpl, i) => (
                <div key={i} className="bg-card border border-border p-8 hover:border-accent/30 transition-colors">
                  <div className="font-mono text-[10px] tracking-widest text-accent uppercase mb-3">// {tmpl.ind}</div>
                  <h3 className="font-display text-2xl tracking-widest uppercase mb-3">{tmpl.title}</h3>
                  <p className="text-[13px] text-dim font-light italic leading-relaxed mb-5">
                    "{tmpl.pain}"
                  </p>
                  <div className="bg-black/20 border-l-2 border-accent p-4 text-[13px] text-foreground font-light leading-[1.7] whitespace-pre-wrap break-words mb-5 opacity-80">
                    {tmpl.msg}
                  </div>
                  <button 
                    onClick={() => copyText(`tmpl${i}`, tmpl.msg)}
                    className={`flex items-center gap-2 px-5 py-2 font-mono text-[10px] tracking-widest uppercase font-bold transition-all border ${copiedId === `tmpl${i}` ? 'bg-green-500 border-green-500 text-black' : 'bg-transparent border-border text-accent hover:border-accent'}`}
                  >
                    {copiedId === `tmpl${i}` ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
