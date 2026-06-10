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
  ChevronDown,
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
  Sparkles,
  Languages
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { translations, Language } from './translations';
import { useFeatureFlags } from './lib/featureFlags';
import SmsToolkit from './SmsToolkit';
import HotButton from './HotButton';
import AILab from './components/AILab';
import GillySecurity from './GillySecurity';
import PcInvestments from './PcInvestments';
import ShowcasePage from './components/ShowcasePage';
import OrozcoLandscaping from './OrozcoLandscaping';
import SilverbackLogo from './components/SilverbackLogo';
import PricingTable from './components/PricingTable';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// This is the "Silverback Brain" — The data Dave needs
const INITIAL_DATA = [
  { unit: '101', tenant: 'Bill Burr', rent: 1695, status: 'late', prop: 'Ruby' },
  { unit: '102', tenant: 'Amy Poehler', rent: 2495, status: 'paid', prop: 'Ruby' },
  { unit: '201', tenant: 'Ben Affleck', rent: 2750, status: 'paid', prop: 'SF' },
  { unit: '305', tenant: 'Matt Damon', rent: 3100, status: 'late', prop: 'SF' },
  { unit: '412', tenant: 'Casey Affleck', rent: 1850, status: 'paid', prop: 'Ruby' },
];

const REAL_ESTATE_DATA = [
  { a: '4821 Oakridge Dr, Sacramento', s: 'Prop tax: $8,240/yr · 1031 eligible', p: '$849K', t: 'HOT' },
  { a: '112 Harbor Ct, Stockton', s: 'Cash flow +$680/mo · Below market', p: '$415K', t: 'DEAL' },
  { a: '7721 Greenhaven Dr, Elk Grove', s: 'New construction · Dual HVAC', p: '$920K', t: 'NEW' },
  { a: '305 Main St, Bay Area', s: 'High demand · Appreciation play', p: '$1.4M', t: 'HOT' },
];

const CONGRESS_DATA = [
  { n: 'Pelosi, N.', s: 'NVDA', b: '▲ BUY', a: '$500K–$1M', c: 'text-[#3fb950]' },
  { n: 'Crenshaw, D.', s: 'LMT', b: '▲ BUY', a: '$250K–$500K', c: 'text-[#3fb950]' },
  { n: 'Tuberville, T.', s: 'CVX', b: '▼ SELL', a: '$100K–$250K', c: 'text-[#f85149]' },
  { n: 'Warner, M.', s: 'MSFT', b: '▲ BUY', a: '$1M–$5M', c: 'text-[#3fb950]' },
  { n: 'Scott, R.', s: 'JPM', b: '▲ BUY', a: '$250K–$500K', c: 'text-[#3fb950]' },
  { n: 'Lummis, C.', s: 'BTC', b: '▲ BUY', a: '$50K–$100K', c: 'text-[#3fb950]' },
];

const getSurveySteps = (lang: Language, t: any) => [
  {
    id: 1,
    name: lang === 'EN' ? 'Core Bottleneck' : 'Obstáculo Principal',
    q: t.intake.q1,
    description: lang === 'EN' ? 'Choose the primary operational drag in your business.' : 'Elija la principal carga operativa en su negocio.',
    options: t.intake.options.map((o: any) => ({ t: o.t, d: o.d, l: o.l }))
  },
  {
    id: 2,
    name: lang === 'EN' ? 'Weekly Time Waste' : 'Tiempo Desperdiciado',
    q: lang === 'EN' ? 'Roughly how many hours per week does this drag waste?' : '¿Aproximadamente cuántas horas a la semana representa este obstáculo?',
    description: lang === 'EN' ? 'Estimate the weekly time drain on your team.' : 'Estime el tiempo semanal perdido por su equipo.',
    options: [
      { l: 'A', t: lang === 'EN' ? '2 to 5 hours' : '2 a 5 horas', d: lang === 'EN' ? 'Minor weekly friction and administrative leaks' : 'Fricción semanal menor y fugas administrativas' },
      { l: 'B', t: lang === 'EN' ? '5 to 10 hours' : '5 a 10 horas', d: lang === 'EN' ? 'A sizable team bottleneck that slows growth' : 'Un obstáculo importante para el equipo que frena el crecimiento' },
      { l: 'C', t: lang === 'EN' ? '10 to 20 hours' : '10 a 20 horas', d: lang === 'EN' ? 'Major time drain, missing weekend & family dinners' : 'Gran pérdida de tiempo, sacrificando fines de semana y cenas familiares' },
      { l: 'D', t: lang === 'EN' ? '20+ hours' : 'Más de 20 horas', d: lang === 'EN' ? 'Full operational crisis requiring immediate automation' : 'Crisis operativa total que requiere automatización inmediata' }
    ]
  },
  {
    id: 3,
    name: lang === 'EN' ? 'Existing Software' : 'Software Existente',
    q: lang === 'EN' ? 'What software stack or tools does your team run on?' : '¿Con qué programas o herramientas trabaja tu equipo?',
    description: lang === 'EN' ? 'Select your primary operational platform.' : 'Seleccione su plataforma operativa principal.',
    options: [
      { l: 'A', t: lang === 'EN' ? 'Spreadsheets & Email' : 'Hojas de Cálculo y Email', d: lang === 'EN' ? 'Excel, Google Sheets, manual work' : 'Excel, Google Sheets, trabajo manual' },
      { l: 'B', t: lang === 'EN' ? 'Dedicated Industry CRM' : 'CRM de la Industria', d: lang === 'EN' ? 'BuilderTrend, ServiceTitan, Salesforce, etc.' : 'BuilderTrend, ServiceTitan, Salesforce, etc.' },
      { l: 'C', t: lang === 'EN' ? 'QuickBooks & Billing Tools' : 'QuickBooks y Herramientas de Pago', d: lang === 'EN' ? 'Invoice chasing, manual payment tracking' : 'Persecución de facturas, seguimiento manual de pagos' },
      { l: 'D', t: lang === 'EN' ? 'Disconnected Chaos' : 'Caos Desconectado', d: lang === 'EN' ? 'A fragmented mix of loose desktop files' : 'Una mezcla fragmentada de archivos de escritorio sueltos' }
    ]
  },
  {
    id: 4,
    name: lang === 'EN' ? 'AI Motivation' : 'Motivación de IA',
    q: lang === 'EN' ? 'What is your primary motivation for introducing AI automation?' : '¿Cuál es su principal motivación para adoptar la automatización con IA?',
    description: lang === 'EN' ? 'Identify the core psychological motivator.' : 'Identifique el motivador psicológico principal.',
    options: [
      { l: 'A', t: lang === 'EN' ? 'Family & Freedom' : 'Familia y Libertad', d: lang === 'EN' ? 'Get home for dinner, enjoy weekends' : 'Llegar a casa para cenar, disfrutar los fines de semana' },
      { l: 'B', t: lang === 'EN' ? 'Finance & Margin' : 'Finanzas y Margen', d: lang === 'EN' ? 'Lower overhead, higher throughput margins' : 'Menos gastos generales, mayores márgenes de rendimiento' },
      { l: 'C', t: lang === 'EN' ? 'Convenience & Flow' : 'Conveniencia y Flujo', d: lang === 'EN' ? 'Logical systems that run silently 24/7' : 'Sistemas lógicos que funcionan en silencio las 24 horas, los 7 días de la semana' },
      { l: 'D', t: lang === 'EN' ? 'Prestige & Zero Mistakes' : 'Prestigio y Cero Errores', d: lang === 'EN' ? 'Elite customer experience with perfect compliance' : 'Experiencia de cliente de élite con cumplimiento perfecto' }
    ]
  },
  {
    id: 5,
    name: lang === 'EN' ? 'Business Scale' : 'Escala de Negocio',
    q: lang === 'EN' ? 'What is the scale / revenue size of your business?' : '¿Cuál es la escala / tamaño de ingresos de su empresa?',
    description: lang === 'EN' ? 'Aligns scope and custom plan architectures.' : 'Alinea los alcances y arquitectura de los planes.',
    options: [
      { l: 'A', t: lang === 'EN' ? 'Boutique or Solo' : 'Boutique o Independiente', d: lang === 'EN' ? 'Solo founder or under 5 team members' : 'Fundador independiente o menos de 5 miembros' },
      { l: 'B', t: lang === 'EN' ? 'Growing Mid-Market' : 'Mercado Medio en Crecimiento', d: lang === 'EN' ? '$1M to $5M in annual business volume' : '$1M a $5M de volumen de negocio anual' },
      { l: 'C', t: lang === 'EN' ? 'High-Scale Enterprise' : 'Gran Empresa de Alta Escala', d: lang === 'EN' ? '$5M to $20M+ operations' : '$5M a $20M+ de operaciones' },
      { l: 'D', t: lang === 'EN' ? 'Startup / Explorer' : 'Startup / Explorador', d: lang === 'EN' ? 'Just starting or validating new systems' : 'Recién comenzando o validando nuevos sistemas' }
    ]
  }
];

export default function App() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { flags } = useFeatureFlags();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('silverback_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('silverback_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const [view, setView] = useState<'SILVERBACK' | 'RENTDMC' | 'TOOLKIT' | 'HOT_BUTTON' | 'ADMIN' | 'AI_LAB' | 'GILLY_SECURITY' | 'PC_INVESTMENTS' | 'SHOWCASE' | 'OROZCO_LANDSCAPING'>('SILVERBACK');
  const [lang, setLang] = useState<Language>('EN');
  const t = translations[lang];
  const [data, setData] = useState(INITIAL_DATA);
  const [reSearch, setReSearch] = useState('');
  const [congressSearch, setCongressSearch] = useState('');

  // Handle URL params for deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramView = params.get('appParams');
    if (paramView === 'intake') {
      setView('TOOLKIT');
    }
  }, []);

  const [dreadedTask, setDreadedTask] = useState(() => {
    return localStorage.getItem('silverback_dreaded_task') || '';
  });
  const [isSlayed, setIsSlayed] = useState(() => {
    return localStorage.getItem('silverback_is_slayed') === 'true';
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  
  // Interactive submission and notifications state for expert support CTAs
  const [submissionStatus, setSubmissionStatus] = useState<Record<string, 'idle' | 'loading' | 'success'>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [surveyStep, setSurveyStep] = useState(() => {
    const saved = localStorage.getItem('silverback_survey_step');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('silverback_survey_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [clientName, setClientName] = useState(() => {
    return localStorage.getItem('silverback_client_name') || '';
  });
  const [clientEmail, setClientEmail] = useState(() => {
    return localStorage.getItem('silverback_client_email') || '';
  });
  const [announcementText, setAnnouncementText] = useState('');

  // Local storage synchronization effects for state persistence
  useEffect(() => {
    localStorage.setItem('silverback_dreaded_task', dreadedTask);
  }, [dreadedTask]);

  useEffect(() => {
    localStorage.setItem('silverback_is_slayed', String(isSlayed));
  }, [isSlayed]);

  useEffect(() => {
    localStorage.setItem('silverback_survey_step', String(surveyStep));
  }, [surveyStep]);

  useEffect(() => {
    localStorage.setItem('silverback_survey_answers', JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  useEffect(() => {
    localStorage.setItem('silverback_client_name', clientName);
  }, [clientName]);

  useEffect(() => {
    localStorage.setItem('silverback_client_email', clientEmail);
  }, [clientEmail]);

  const surveySteps = getSurveySteps(lang, t);

  useEffect(() => {
    if (surveyStep <= 5) {
      const step = surveySteps[surveyStep - 1];
      if (step) {
        setAnnouncementText(lang === 'EN' 
          ? `Question ${surveyStep} of 6: ${step.name}. ${step.q}` 
          : `Pregunta ${surveyStep} de 6: ${step.name}. ${step.q}`
        );
      }
    } else if (surveyStep === 6) {
      setAnnouncementText(lang === 'EN'
        ? `Question 6 of 6: Contact details. ${t.intake.q2}`
        : `Pregunta 6 de 6: Datos de contacto. ${t.intake.q2}`
      );
    }
  }, [surveyStep, lang]);

  const handleChipAction = (title: string, desc: string) => {
    setSubmissionStatus(prev => ({ ...prev, [title]: 'loading' }));
    
    setTimeout(() => {
      setSubmissionStatus(prev => ({ ...prev, [title]: 'success' }));
      setSuccessMessage(desc);
      
      if (title === 'Email Support') {
        window.location.href = 'mailto:bryan@silverbackai.agency?subject=Silverback%20AI%2520Expert%2520Request';
      }
      
      setTimeout(() => {
        setSubmissionStatus(prev => ({ ...prev, [title]: 'idle' }));
        setSuccessMessage(null);
      }, 4000);
    }, 1500);
  };

  const handleChoosePlan = (planType: 'STANDARD' | 'ENTERPRISE') => {
    const scaleAnswer = planType === 'STANDARD'
      ? (lang === 'EN' ? 'Growing Mid-Market' : 'Mercado Medio en Crecimiento')
      : (lang === 'EN' ? 'High-Scale Enterprise' : 'Gran Empresa de Alta Escala');
    
    const hoursAnswer = planType === 'STANDARD'
      ? (lang === 'EN' ? '5 to 10 hours' : '5 a 10 horas')
      : (lang === 'EN' ? '20+ hours' : 'Más de 20 horas');

    setSelectedAnswers(prev => ({
      ...prev,
      2: hoursAnswer,
      5: scaleAnswer
    }));

    if (!dreadedTask) {
      setDreadedTask(planType === 'STANDARD' 
        ? (lang === 'EN' ? 'Late night client quote replies' : 'Respuestas de cotizaciones a clientes a altas horas de la noche')
        : (lang === 'EN' ? 'Tedious field team scheduling/routing' : 'Programación/enrutamiento tedioso del equipo de campo')
      );
      setIsSlayed(true);
    }

    const intakeSec = document.getElementById('intake');
    if (intakeSec) {
      intakeSec.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Static Hero Image to avoid rate limits
  useEffect(() => {
    // using a relevant placeholder photo of a teacher/instructor setting or a gorilla
    setHeroImage("https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2000");
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border px-6 md:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8 lg:gap-12">
            <a href="#" className="flex items-center gap-4 group shrink-0">
              <SilverbackLogo size="lg" className="border-accent/40 group-hover:scale-105 duration-300 transition-transform" />
              <div className="flex flex-col leading-[0.75] mt-1">
                <span className="font-display text-[24px] md:text-[32px] tracking-[0.2em] silver-gradient hover:brightness-125 transition-all uppercase">SILVERBACK</span>
                <span className="font-display text-[24px] md:text-[32px] tracking-[0.2em] silver-gradient hover:brightness-125 transition-all uppercase">AI</span>
              </div>
            </a>

            <div className="brand-toggle hidden lg:flex items-stretch overflow-visible h-14 md:h-16 bg-black/20 rounded-none border border-white/5 p-0 divide-x divide-white/5 shrink-0" role="tablist" aria-label="Application View Hub">
                {flags.enable_silverback && (
                  <button 
                    className={`flex flex-col items-center justify-center gap-1.5 min-w-[90px] md:min-w-[100px] hover:bg-white/5 transition-all px-2 ${view === 'SILVERBACK' ? 'active-portal bg-white/10' : ''}`} 
                    onClick={() => setView('SILVERBACK')}
                    role="tab"
                    aria-selected={view === 'SILVERBACK'}
                    aria-label="Switch portal view to Silverback AI Problem Solver"
                  >
                    <SilverbackLogo size="sm" className="bg-transparent border-none p-0 shadow-none w-5 h-5 md:w-6 md:h-6" />
                    <div className="text-[9px] md:text-[10px] font-bold tracking-[2px] whitespace-pre-line text-center leading-tight">{t.nav.problemSolver}</div>
                  </button>
                )}
                {flags.enable_showcase && (
                  <button 
                    className={`flex flex-col items-center justify-center gap-0.5 min-w-[90px] md:min-w-[100px] hover:bg-white/5 transition-all px-2 ${view === 'SHOWCASE' ? 'active-portal bg-white/10' : ''}`} 
                    onClick={() => setView('SHOWCASE')}
                    role="tab"
                    aria-selected={view === 'SHOWCASE'}
                    aria-label="Switch portal view to Client Solutions Showcase"
                  >
                    <div className="text-[16px] md:text-[18px]">⚡</div>
                    <div className="text-[9px] md:text-[10px] font-bold tracking-[2px] whitespace-pre-line text-center leading-tight">{t.nav.clientTools}</div>
                  </button>
                )}
                {flags.enable_rentdmc && (
                  <button 
                    className={`flex flex-col items-center justify-center gap-0.5 min-w-[70px] md:min-w-[80px] hover:bg-white/5 transition-all px-2 ${view === 'RENTDMC' ? 'active-portal bg-white/10' : ''}`} 
                    onClick={() => setView('RENTDMC')}
                    role="tab"
                    aria-selected={view === 'RENTDMC'}
                    aria-label="Switch portal view to Rent DMC Real Estate Intelligence Ledger"
                  >
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[1px]">{t.nav.rentDmc}</span>
                  </button>
                )}
                {flags.enable_toolkit && (
                  <button 
                    className={`flex flex-col items-center justify-center gap-0.5 min-w-[90px] md:min-w-[100px] hover:bg-white/5 transition-all px-2 ${view === 'TOOLKIT' ? 'active-portal bg-white/10' : ''}`} 
                    onClick={() => setView('TOOLKIT')}
                    role="tab"
                    aria-selected={view === 'TOOLKIT'}
                    aria-label="Switch portal view to SMS Campaign Toolkit"
                  >
                    <Zap size={14} className="text-orange-400 md:w-4 md:h-4" />
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[1px] text-center leading-[1.1] whitespace-pre-line">{t.nav.requestAudit}</span>
                  </button>
                )}
                {flags.enable_admin && (
                  <button 
                    className={`flex flex-col items-center justify-center gap-0.5 min-w-[70px] md:min-w-[80px] hover:bg-white/5 transition-all px-2 ${view === 'ADMIN' ? 'active-portal bg-white/10' : ''}`} 
                    onClick={() => setView('ADMIN')}
                    role="tab"
                    aria-selected={view === 'ADMIN'}
                    aria-label="Switch portal view to Secure Admin System Controls"
                  >
                    <Lock size={14} className="opacity-60 md:w-4 md:h-4" />
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[1px]">{t.nav.admin}</span>
                  </button>
                )}
              </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8 shrink-0">
            {view === 'SILVERBACK' && (
              <div className="hidden md:flex items-center gap-20 mr-12 text-[12px] font-mono tracking-[0.3em] uppercase text-dim">
                <a href="#intake" className="hover:text-accent transition-colors" aria-label="Scroll immediately to Discovery Audit Questionnaire">{t.nav.questionnaire}</a>
                <button onClick={() => setView('SHOWCASE')} className="hover:text-accent transition-colors" aria-label="Review our specialized Client Tools and Solutions Catalog">{lang === 'EN' ? 'Client Tools' : 'Herramientas'}</button>
              </div>
            )}

            {view === 'RENTDMC' && (
              <div className="hidden md:block font-mono text-[10px] tracking-widest text-dim uppercase">
                Dave Cowan | West Region
              </div>
            )}

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setLang(lang === 'EN' ? 'ES' : 'EN')}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-card transition-colors text-dim font-mono text-[10px] tracking-widest"
                title={lang === 'EN' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
                aria-label={lang === 'EN' ? 'Switch application language to Spanish' : 'Cambiar el idioma de la aplicación al inglés'}
              >
                <Languages size={18} />
                <span className="hidden xs:inline">{lang}</span>
              </button>

              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-card transition-colors text-dim"
                aria-label={isDarkMode ? "Active dark mode: click to switch to light interface mode" : "Active light mode: click to switch to dark interface mode"}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              {view === 'SILVERBACK' && (
                <a 
                  href="#intake" 
                  className="hidden sm:block font-mono text-[12px] tracking-[0.2em] uppercase px-6 py-3 bg-silver-gradient text-background font-medium transition-all hover:shadow-[0_0_26px_rgba(200,200,200,0.24)] hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}
                  aria-label="Submit an application for a professional $500 Discovery Audit"
                >
                  {t.nav.requestAuditBtn}
                </a>
              )}
            </div>

            <button 
              className="md:hidden text-dim" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
            >
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
                  {flags.enable_silverback && (
                    <button 
                      className={`text-left ${view === 'SILVERBACK' ? 'silver-gradient' : 'text-dim'} text-4xl`}
                      onClick={() => { setView('SILVERBACK'); setIsMenuOpen(false); }}
                    >
                      🦍 {t.nav.problemSolver.replace('\n', ' ')}
                    </button>
                  )}
                  {flags.enable_showcase && (
                    <button 
                      className={`text-left ${view === 'SHOWCASE' ? 'silver-gradient' : 'text-dim'} text-4xl`}
                      onClick={() => { setView('SHOWCASE'); setIsMenuOpen(false); }}
                    >
                      ⚡ {t.nav.clientTools.replace('\n', ' ')}
                    </button>
                  )}
                  {flags.enable_rentdmc && (
                    <button 
                      className={`text-left ${view === 'RENTDMC' ? 'silver-gradient' : 'text-dim'} text-4xl`}
                      onClick={() => { setView('RENTDMC'); setIsMenuOpen(false); }}
                    >
                      || {t.nav.rentDmc} ||
                    </button>
                  )}
                  {flags.enable_toolkit && (
                    <button 
                      className={`text-left ${view === 'TOOLKIT' ? 'silver-gradient' : 'text-dim'} text-4xl`}
                      onClick={() => { setView('TOOLKIT'); setIsMenuOpen(false); }}
                    >
                      ⚡ {t.nav.requestAudit.replace('\n', ' ')}
                    </button>
                  )}
                  {flags.enable_admin && (
                    <button 
                      className={`text-left ${view === 'ADMIN' ? 'silver-gradient' : 'text-dim'} text-4xl`}
                      onClick={() => { setView('ADMIN'); setIsMenuOpen(false); }}
                    >
                      🔒 {t.nav.admin}
                    </button>
                  )}
                </div>
                <hr className="border-border" />
                <a href="#intake" onClick={() => setIsMenuOpen(false)} className="text-3xl silver-gradient">{t.nav.questionnaire}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {view === 'OROZCO_LANDSCAPING' ? (
          <OrozcoLandscaping onBack={() => setView('SHOWCASE')} />
        ) : view === 'GILLY_SECURITY' ? (
          <GillySecurity />
        ) : view === 'PC_INVESTMENTS' ? (
          <PcInvestments />
        ) : view === 'TOOLKIT' ? (
          <SmsToolkit initialTab="form" />
        ) : view === 'ADMIN' ? (
          <SmsToolkit isAdmin={true} initialTab="sms" />
        ) : view === 'AI_LAB' ? (
          <AILab user={{} as any} />
        ) : view === 'HOT_BUTTON' ? (
          <HotButton />
        ) : view === 'SHOWCASE' ? (
          <ShowcasePage onBack={() => setView('SILVERBACK')} onSelectTool={(v: any) => setView(v)} />
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
            className="absolute right-[-10%] md:right-[5%] top-[5%] w-[400px] md:w-[900px] aspect-square rounded-full overflow-hidden opacity-30 blur-[1px] pointer-events-none z-0"
          >
            <img 
              src={heroImage} 
              alt="Friendly AI Interface" 
              className="w-full h-full object-cover grayscale-0 opacity-40 mix-blend-screen"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}

        <div className="max-w-[1000px] relative z-10 pt-24 pb-12">
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-[clamp(42px,7vw,110px)] leading-[0.95] tracking-[1px] text-foreground"
          >
            <div className="w-full text-balance mb-4 uppercase">{t.hero.title1}</div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-4 w-full">
              <span className="silver-gradient normal-case text-[clamp(28px,4vw,64px)] tracking-normal italic leading-[1.1] max-w-[800px]">{t.hero.title2}</span>
              
              <div className="hidden lg:block font-sans text-base lg:text-lg normal-case tracking-normal text-dim font-light max-w-[240px] leading-[1.6] pb-2 text-wrap text-right">
                {lang === 'EN' ? 'Simplified, transparent AI systems starting with a' : 'Sistemas de IA simplificados y transparentes que comienzan con una'} <strong className="font-medium text-foreground">{lang === 'EN' ? '$500 discovery audit.' : 'auditoría de descubrimiento de $500.'}</strong>
              </div>
            </div>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl font-medium text-foreground mt-10 max-w-[620px] leading-[1.6]"
          >
            {t.hero.repTasks} <span className="hero-highlight">{t.hero.actuallyLove}</span>
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base text-dim font-light mt-4 max-w-[620px] leading-[1.6]"
          >
            {t.hero.reliable}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 max-w-[500px]"
          >
            {/* Dynamic Success Notice Toast */}
            <AnimatePresence>
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-accent/10 border border-accent/20 text-accent font-mono text-[11px] uppercase tracking-widest mb-6 flex items-center justify-between shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                    {successMessage}
                  </span>
                  <button onClick={() => setSuccessMessage(null)} className="text-dim hover:text-foreground text-xs p-1">✕</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MODULE CHIPS */}
            <div className="flex flex-wrap gap-3 mb-8" role="group" aria-label="Expert Contact Actions">
               {[
                 { t: 'Talk to Expert', c: 'border-accent/40 text-accent hover:bg-accent/10 bg-accent/5', ariaLabel: 'Request an immediate consultation text and call session with our head AI systems architect, Bryan Gillis', desc: 'Expert connection requested! Bryan will call or text you shortly.' },
                 { t: 'Email Support', c: 'border-border text-dim hover:border-accent hover:text-accent bg-card/40', ariaLabel: 'Compose a professional support inquiry email to Silverback systems security and automation support', desc: 'Preparing request... Opening your local mailing client.' },
                 { t: 'Chat McGilla', c: 'border-border text-dim hover:border-accent hover:text-accent bg-card/40', ariaLabel: 'Open live interactive chat session with McGilla the AI systems mascot', desc: 'Activating real-time neural handshake... Starting chatbot.' }
               ].map((chip) => {
                 const status = submissionStatus[chip.t] || 'idle';
                 const isBusy = status === 'loading';
                 const isSuccess = status === 'success';
                 return (
                   <button 
                     key={chip.t} 
                     onClick={() => handleChipAction(chip.t, chip.desc)}
                     aria-label={isSuccess ? `${chip.t} request successful. ${chip.desc}` : chip.ariaLabel}
                     aria-busy={isBusy}
                     disabled={isBusy}
                     className={`relative flex items-center gap-3 border px-6 py-3.5 font-mono text-[12px] font-bold uppercase tracking-widest transition-all rounded-sm active:scale-95 disabled:opacity-50 select-none ${chip.c}`}
                   >
                     {isBusy ? (
                       <span className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin shrink-0" />
                     ) : (
                       chip.t === 'Chat McGilla' ? <span className="text-[18px]">🦍</span> : null
                     )}
                     <span>{isSuccess ? 'Sent ✓' : chip.t}</span>
                   </button>
                 );
               })}
            </div>
 
            {/* NARRATIVE SECTION */}
            <div className="bg-accent/5 border border-accent/20 p-6 mb-10" role="region" aria-labelledby="narrative-heading">
              <h3 id="narrative-heading" className="font-display text-lg tracking-widest uppercase mb-2 silver-gradient">What keeps you up at night?</h3>
              <p className="text-dim text-[13px] font-light leading-relaxed mb-4">
                You're missing family dinners to handle manual work that <strong className="text-foreground">shouldn't exist</strong>. 
                Our AI systems reclaim 10–20 hours a week from the repetitive chaos, 
                giving you back your weekends and accelerating business growth.
              </p>
              <div className="flex gap-4 items-center">
                 <div className="p-2 border border-accent/20 text-xs" aria-hidden="true">🚀</div>
                 <div className="text-[10px] text-accent font-mono uppercase tracking-widest">Reclaim your time · Growth-focused</div>
              </div>
            </div>
 
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              {t.hero.phase01}
            </div>
            
            <h3 id="hero-survey-prompt-title" className="text-xl font-display uppercase tracking-widest mb-6">{t.hero.nightTitle}</h3>
            
            <div className="relative group mb-6">
              <div className="relative overflow-visible">
                <input 
                  id="hero-dreaded-task-input"
                  type="text"
                  placeholder={t.hero.placeholder}
                  aria-label="Describe any manual business bottleneck or repetitive administrative task keeping you up at night"
                  aria-describedby="hero-survey-prompt-title"
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
                className="absolute right-0 top-1/2 -translate-y-1/2 text-accent opacity-0 group-focus-within:opacity-100 transition-opacity p-2"
                aria-label="Submit custom dreaded task for automatic resolution audit"
              >
                <ArrowRight size={24} />
              </button>
            </div>
 
            {/* PRESET SURVEY OPTIONS MATRIX - MOBILE FIRST & COHESIVE OUTCOMES */}
            <div className="space-y-3 mb-8" role="group" aria-label="Preset Bottlenecks Selection Matrix">
              <p className="text-[10px] font-mono text-dim tracking-widest uppercase" aria-hidden="true">// OR TAP AN INDUSTRY BOTTLENECK TO SOLVE INSTANTLY:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Industry Bottlenecks">
                {[
                  { 
                    t: 'Late night client quote replies', 
                    save: '15 hrs/week saved', 
                    outcome: 'Silverback Autoresponder acts as an instant sales assistant drafting bids 24/7.' 
                  },
                  { 
                    t: 'Copy-pasting files from spreadsheet matrices', 
                    save: '12 hrs/week saved', 
                    outcome: 'Custom automated parser maps rows into clean structured CRM databases safely.' 
                  },
                  { 
                    t: 'Missing warm lead calls when off-shift', 
                    save: '+35% conversions', 
                    outcome: 'SMS Toolkit triggers immediate text qualification workflows under 30 seconds.' 
                  },
                  { 
                    t: 'Tedious field team scheduling/routing', 
                    save: 'Zero human mistakes', 
                    outcome: 'AI solver assigns proximity-optimized jobs to field dispatch automatically.' 
                  },
                ].map((item, idx) => {
                  const isActive = dreadedTask === item.t && isSlayed;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setDreadedTask(item.t);
                        setIsSlayed(true);
                      }}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      aria-label={`Select bottleneck: ${item.t}. Average impact: ${item.save}. Solution outcome: ${item.outcome}`}
                      className={`text-left p-4 border transition-all duration-300 flex flex-col justify-between h-full rounded-sm ${
                        isActive 
                          ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(0,240,255,0.05)]' 
                          : 'border-border bg-card/60 hover:border-accent/40 text-dim hover:text-foreground'
                      }`}
                    >
                      <div>
                        <div className="text-[10px] font-mono text-accent font-bold uppercase tracking-wider mb-1">
                          {item.save}
                        </div>
                        <div className="text-xs font-bold leading-snug mt-1 text-foreground">
                          {item.t}
                        </div>
                      </div>
                      <p className="text-[11px] text-dim/80 font-light mt-2 leading-relaxed">
                        {item.outcome}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {isSlayed && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="p-4 bg-accent/5 border-l-2 border-accent backdrop-blur-sm"
                >
                  <p className="text-sm font-light italic silver-gradient flex items-center gap-3">
                    <Sparkles size={14} className="text-accent shrink-0" />
                    "{t.hero.slayedText1}{dreadedTask.toLowerCase().split(' ')[0] || 'your task'}{t.hero.slayedText2}"
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
              className="inline-flex items-center gap-3 bg-silver-gradient text-background font-mono text-[12px] tracking-[2px] uppercase px-8 py-4 font-medium transition-all hover:shadow-[0_0_32px_rgba(200,200,200,0.26)] hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}
            >
              {t.hero.startBtn}
            </button>
            <a 
              href="#products" 
              className="inline-flex items-center gap-3 bg-transparent text-sm font-mono text-[11px] tracking-[2px] uppercase px-8 py-4 border border-border transition-all hover:border-accent hover:bg-card"
            >
              {t.hero.seeWork}
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
              { val: 'ROI', label: 'Focused' },
              { val: '100%', label: 'Custom Built' },
              { val: '∞', label: 'Industries' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display text-3xl silver-gradient-2">{stat.val}</div>
                <div className="font-mono text-[11px] tracking-[2px] text-dimmer uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-silver-gradient py-4 overflow-hidden" style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}>
        <div className="flex whitespace-nowrap animate-[scroll_28s_linear_infinite]">
          {Array(4).fill(lang === 'EN' ? [
            'What Keeps You Up At Night', 'We Have The Solution', 'Real Estate', 'Law Firms', 'Flooring', 'Congressional Trades', 'Home Remodeling', 'Any Industry', 'Deployed Fast'
          ] : [
            '¿Qué te quita el sueño?', 'Tenemos la solución', 'Bienes Raíces', 'Bufetes de Abogados', 'Pisos', 'Transacciones del Congreso', 'Remodelación de Hogares', 'Cualquier Industria', 'Despliegue Rápido'
          ]).flat().map((text, i) => (
            <div key={i} className="font-display text-[17px] tracking-[4px] text-background px-8 flex items-center gap-4 border-r border-black/10">
              {text}
              <span className="text-[7px] opacity-25">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products and Industries removed from landing- handled by SHOWCASE view */}

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
              {t.founder.tag}
            </div>
            <h2 className="font-display text-[clamp(40px,5vw,66px)] leading-[0.95] tracking-[2px] text-foreground mb-7 uppercase">
              {t.founder.title1}<br />{t.founder.title2}<br /><span className="silver-gradient">{t.founder.title3}</span>
            </h2>
            <div className="space-y-5 text-base font-light text-[#666] leading-[1.9]">
              <p>{t.founder.p1}</p>
              <p>{t.founder.p2}</p>
              
              <div className="border-l-2 border-[#2a2a2a] px-7 py-5 my-7 relative bg-white/[0.015]">
                <div className="absolute top-[-1px] left-0 right-0 h-[1px] bg-silver-gradient opacity-25" />
                <p className="font-display text-[clamp(22px,2.5vw,30px)] tracking-widest text-foreground leading-[1.2] uppercase">{t.founder.quote}</p>
              </div>

              <p>{t.founder.p3}</p>
            </div>
            <a href="#intake" className="inline-flex items-center gap-3 bg-silver-gradient text-background font-mono text-[11px] tracking-[2px] uppercase px-8 py-4 font-medium mt-9 transition-all hover:shadow-[0_0_18px_rgba(200,200,200,0.1)] hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}>{t.founder.cta}</a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 max-w-[900px] mx-auto">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[4px] text-dim uppercase mb-3 justify-center">
          <div className="w-5 h-[1px] bg-[#2a2a2a]" />
          {t.faq.tag}
          <div className="w-5 h-[1px] bg-[#2a2a2a]" />
        </div>
        <h2 className="font-display text-[clamp(36px,5vw,56px)] leading-[0.95] tracking-[2px] text-foreground mb-16 text-center uppercase">
          {t.faq.title1} <span className="silver-gradient">{t.faq.title2}</span>
        </h2>
        
        <div className="space-y-4">
          {t.faq.questions.map((faqItem: {q: string; a: string}, i: number) => (
            <div key={i} className="border border-border bg-card/30 overflow-hidden transition-colors hover:border-accent/40">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full text-left px-6 py-6 flex items-center justify-between gap-4 group"
              >
                <div id={`faq-q-${i}`} className="font-medium text-lg md:text-xl leading-tight group-hover:text-accent transition-colors">
                  {faqItem.q}
                </div>
                <div className={`shrink-0 transition-transform duration-300 transform ${openFaq === i ? 'rotate-180 text-accent' : 'text-dim'}`}>
                  <ChevronDown size={24} />
                </div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-dim font-light leading-relaxed border-t border-border/30 mt-2 pt-4">
                      {faqItem.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Table Component */}
      <PricingTable lang={lang} onChoosePlan={handleChoosePlan} />

      {/* Screen Reader Live Region for Intake survey steps */}
      <div id="survey-announcement" aria-live="polite" className="sr-only">
        {announcementText}
      </div>

      {/* Intake Form */}
      <section id="intake" className="py-20 px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">
          <div>
            <div className="flex items-center gap-3 font-mono text-[12px] tracking-[4px] text-dim uppercase mb-3">
              <div className="w-5 h-[1px] bg-dimmer" />
              {t.intake.tag}
            </div>
            <h2 className="font-display text-[clamp(40px,5vw,66px)] leading-[0.95] tracking-[2px] text-foreground mb-4 uppercase">
              {t.intake.title1}<br /><span className="silver-gradient">{t.intake.title2}</span>
            </h2>
            <p className="text-sm text-dim font-light leading-[1.85] mb-6">{t.intake.desc}</p>
            <div className="space-y-2.5">
              {[
                t.intake.bullet1,
                t.intake.bullet2,
                t.intake.bullet3,
                t.intake.bullet4
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
              <div className="space-y-6">
                {/* Visual Step Tracker and Progress Bar */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="font-mono text-[10px] tracking-[4px] text-accent uppercase">
                    {surveyStep <= 5 ? `Question 0${surveyStep} of 05` : `Step 06: Contact`}
                  </span>
                  <div className="flex gap-1.5" aria-hidden="true">
                    {[1, 2, 3, 4, 5, 6].map((stepNum) => (
                      <div 
                        key={stepNum} 
                        className={`h-1.5 transition-all duration-300 ${
                          stepNum === surveyStep 
                            ? 'w-6 bg-accent shadow-[0_0_8px_rgba(0,240,255,0.4)]' 
                            : stepNum < surveyStep 
                              ? 'w-2 bg-foreground/60' 
                              : 'w-2 bg-border'
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {surveyStep <= 5 ? (
                    <motion.div
                      key={`survey-step-${surveyStep}`}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="border border-border p-5 md:p-6 bg-black/30 space-y-4" role="group" aria-labelledby={`survey-step-label-${surveyStep}`}>
                        <div className="font-mono text-[11px] tracking-[3px] text-dim uppercase" aria-hidden="true">
                          // 0{surveyStep} — {surveySteps[surveyStep - 1].name}
                        </div>
                        <h3 id={`survey-step-label-${surveyStep}`} className="text-base font-medium text-foreground leading-relaxed">
                          {surveySteps[surveyStep - 1].q}
                        </h3>
                        <p className="text-[11px] text-dim font-mono tracking-widest uppercase">// {surveySteps[surveyStep - 1].description}</p>
                        
                        <div className="space-y-1.5" role="radiogroup" aria-labelledby={`survey-step-label-${surveyStep}`}>
                          {surveySteps[surveyStep - 1].options.map((o: any, i: number) => {
                            const isSelected = selectedAnswers[surveyStep] === o.t;
                            return (
                              <button 
                                key={i} 
                                type="button" 
                                onClick={() => {
                                  setSelectedAnswers(prev => ({ ...prev, [surveyStep]: o.t }));
                                  if (surveyStep === 1) {
                                    setDreadedTask(o.t);
                                  }
                                  setSurveyStep(prev => prev + 1);
                                }}
                                role="radio"
                                aria-checked={isSelected}
                                aria-label={`Option ${o.l}: ${o.t}. ${o.d}`}
                                className={`w-full flex items-start gap-4 border ${isSelected ? 'border-accent bg-accent/10' : 'border-border'} p-4.5 text-left hover:border-dimmer hover:bg-card transition-all group`}
                              >
                                <span className="font-display text-lg silver-gradient-2 leading-none shrink-0" aria-hidden="true">{o.l}</span>
                                <div>
                                  <div className="text-[13px] font-medium text-foreground uppercase tracking-wider">{o.t}</div>
                                  <div className="text-[11px] text-dim font-light mt-1 leading-normal">{o.d}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`survey-step-contact`}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form 
                        aria-label="Discovery Audit Contact Form"
                        onSubmit={(e) => { 
                          e.preventDefault(); 
                          const q1Ans = selectedAnswers[1] || dreadedTask || 'None selected';
                          const q2Ans = selectedAnswers[2] || 'None selected';
                          const q3Ans = selectedAnswers[3] || 'None selected';
                          const q4Ans = selectedAnswers[4] || 'None selected';
                          const q5Ans = selectedAnswers[5] || 'None selected';

                          const bodyVal = `Silverback AI Discovery Audit Intake Form:\n------------------------------------------\n1. Core Bottleneck: ${q1Ans}\n2. Weekly Hours Lost: ${q2Ans}\n3. Core Software Stack: ${q3Ans}\n4. Automation Motivator: ${q4Ans}\n5. Operational Scale: ${q5Ans}\n\nClient Contact Details:\n------------------------\nName: ${clientName}\nEmail: ${clientEmail}`;
                          
                          window.location.href = `mailto:bryan@silverbackai.agency?subject=Silverback%20Intake%20Form%20Submission&body=${encodeURIComponent(bodyVal)}`;
                          
                          // Clear state parameters and associated local storage items on submit
                          localStorage.removeItem('silverback_survey_step');
                          localStorage.removeItem('silverback_survey_answers');
                          localStorage.removeItem('silverback_dreaded_task');
                          localStorage.removeItem('silverback_is_slayed');
                          localStorage.removeItem('silverback_client_name');
                          localStorage.removeItem('silverback_client_email');

                          setDreadedTask('');
                          setIsSlayed(false);
                          setSurveyStep(1);
                          setSelectedAnswers({});
                          setClientName('');
                          setClientEmail('');
                          setFormSubmitted(true); 
                        }} 
                        className="space-y-4"
                      >
                        <div className="border border-border p-5 md:p-6 bg-black/30 space-y-4" role="group" aria-labelledby="contact-info-label">
                          <div className="font-mono text-[11px] tracking-[3px] text-dim uppercase" aria-hidden="true">// 06 — {lang === 'EN' ? 'Contact Details' : 'Datos De Contacto'}</div>
                          <div id="contact-info-label" className="text-sm font-medium text-foreground leading-relaxed">{t.intake.q2}</div>
                          <div>
                            <label htmlFor="intake-name" className="sr-only">{t.intake.namePlaceholder}</label>
                            <input 
                              id="intake-name" 
                              name="name" 
                              type="text" 
                              placeholder={t.intake.namePlaceholder} 
                              required 
                              aria-required="true" 
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              className="w-full bg-transparent border-b border-border text-foreground font-light py-2.5 outline-none focus:border-accent transition-colors placeholder:text-dimmer" 
                            />
                          </div>
                          <div>
                            <label htmlFor="intake-email" className="sr-only">{t.intake.emailPlaceholder}</label>
                            <input 
                              id="intake-email" 
                              name="email" 
                              type="email" 
                              placeholder={t.intake.emailPlaceholder} 
                              required 
                              aria-required="true" 
                              value={clientEmail}
                              onChange={(e) => setClientEmail(e.target.value)}
                              className="w-full bg-transparent border-b border-border text-foreground font-light py-2.5 outline-none focus:border-accent transition-colors placeholder:text-dimmer" 
                            />
                          </div>
                        </div>

                        <button type="submit" aria-label="Submit Form and Send Professional Audit Diagnostic Email" className="w-full bg-silver-gradient text-background py-4 font-display text-xl tracking-[3px] uppercase hover:shadow-[0_0_32px_rgba(200,200,200,0.22)] hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}>
                          {t.intake.submit}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                 {/* Question Control Buttons Code */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  {surveyStep > 1 ? (
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setSurveyStep(prev => prev - 1)}
                        className="font-mono text-[10px] tracking-[2px] text-dim hover:text-foreground uppercase flex items-center gap-1.5 transition-all py-1"
                        aria-label="Go back to previous diagnostic question"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem('silverback_survey_step');
                          localStorage.removeItem('silverback_survey_answers');
                          localStorage.removeItem('silverback_dreaded_task');
                          localStorage.removeItem('silverback_is_slayed');
                          localStorage.removeItem('silverback_client_name');
                          localStorage.removeItem('silverback_client_email');

                          setDreadedTask('');
                          setIsSlayed(false);
                          setSurveyStep(1);
                          setSelectedAnswers({});
                          setClientName('');
                          setClientEmail('');
                        }}
                        className="font-mono text-[10px] tracking-[2px] text-dimmer hover:text-red-400 uppercase transition-all py-1"
                        aria-label="Clear all survey progress and start over"
                      >
                        Reset ↺
                      </button>
                    </div>
                  ) : <div aria-hidden="true" />}

                  {surveyStep <= 5 && selectedAnswers[surveyStep] && (
                    <button
                      type="button"
                      onClick={() => setSurveyStep(prev => prev + 1)}
                      className="font-mono text-[10px] tracking-[2px] text-accent hover:text-white uppercase flex items-center gap-1.5 transition-all py-1 font-bold"
                      aria-label="Skip or go forward to next diagnostic question"
                    >
                      Next →
                    </button>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-border/50 text-center">
                  <div className="font-mono text-[10px] tracking-[4px] text-accent mb-3 uppercase">Ready for a Full Move?</div>
                  <p className="text-sm text-dim leading-relaxed mb-6 max-w-[400px] mx-auto">Skip the back-and-forth. Get a full company efficiency audit for <strong>$500</strong>. Bryan will personally audit your ops and jump on a call to go over your custom plan.</p>
                  <button 
                    type="button"
                    onClick={() => {
                      const email = "bryan@silverbackai.agency";
                      const subject = "Requesting $500 Company Audit";
                      const body = "Hi Bryan, I'd like to request a full company efficiency audit for $500 as discussed on the site.";
                      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    }}
                    className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/40 px-6 py-2.5 font-mono text-[10px] tracking-[2px] uppercase hover:bg-accent hover:text-black transition-all"
                  >
                    Request $500 Audit <TrendingUp size={12} />
                  </button>
                </div>
                <div className="font-mono text-[9px] text-dimmer text-center tracking-widest uppercase mt-4" aria-hidden="true">// No pitch · No spam · Bryan responds within 24 hours</div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-7 border border-border bg-white/[0.02]"
              >
                <div className="text-5xl mb-4">🦍</div>
                <h3 className="font-display text-4xl tracking-widest silver-gradient uppercase mb-3">{t.intake.successTitle}</h3>
                <p className="text-sm text-dim leading-relaxed whitespace-pre-line">{t.intake.successDesc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-border flex flex-wrap justify-between items-center gap-10 relative z-10 bg-card/30">
        <div className="flex items-center gap-3">
          <div className="logo-hex w-10 h-10 flex items-center justify-center text-background font-bold text-lg">🦍</div>
          <div>
            <div className="font-display text-2xl tracking-[4px] silver-gradient-2 uppercase">Silverback AI</div>
            <div className="font-mono text-[11px] text-dim tracking-widest uppercase mt-0.5">silverbackai.agency</div>
          </div>
        </div>
        <div className="font-display text-2xl tracking-[3px] text-dim uppercase">{t.footer.tagline}</div>
        <div className="font-mono text-xs text-dim text-right uppercase tracking-widest leading-relaxed">
          {t.footer.locations}<br />
          © 2026 Silverback AI<br />
          <a href="mailto:bryan@silverbackai.agency" className="text-accent underline underline-offset-4 hover:text-white transition-colors">bryan@silverbackai.agency</a>
        </div>
      </footer>
          </>
        ) : (
          <main className="dashboard px-6 md:px-12 pt-28 pb-20 max-w-7xl mx-auto">
            <header className="stats-grid">
              <div className="stat-card group hover:border-accent transition-colors">
                <label>{t.dashboard.collected}</label>
                <div className="value">$42,950</div>
              </div>
              <div className="stat-card group hover:border-red-500/50 transition-colors">
                <label className="text-red-400">{t.dashboard.outstanding}</label>
                <div className="value text-red-500">$4,200</div>
              </div>
            </header>

            <section className="table-container glow-shadow">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h3 className="font-display text-2xl tracking-widest uppercase silver-gradient">{t.dashboard.ledger}</h3>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-card border border-border text-[10px] font-mono uppercase tracking-widest text-dim">{lang === 'EN' ? 'Filter: All Properties' : 'Filtro: Todas las Propiedades'}</div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>{t.dashboard.unit}</th>
                      <th>{t.dashboard.tenant}</th>
                      <th>{t.dashboard.status}</th>
                      <th>{t.dashboard.rent}</th>
                      <th>{t.dashboard.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="font-mono text-accent">{item.unit}</td>
                        <td className="font-medium">{item.tenant}</td>
                        <td>
                          <span className={`badge ${item.status} ${isDarkMode ? 'chip-glow' : ''}`}>
                            {item.status === 'paid' ? (lang === 'EN' ? 'paid' : 'pagado') : (lang === 'EN' ? 'late' : 'tarde')}
                          </span>
                        </td>
                        <td className="font-mono">${item.rent.toLocaleString()}</td>
                        <td>
                          <button className="text-[10px] font-mono uppercase tracking-widest px-4 py-2 border border-border hover:bg-card hover:border-accent transition-all">
                            {t.dashboard.generateNotice}
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
                  <div className="pt-0.5">{t.dashboard.msg1}</div>
                </div>
                <div className="msg bot flex gap-2.5 items-start">
                  <motion.div 
                    className="w-6 h-6 rounded flex items-center justify-center shrink-0 border border-border bg-black/20 text-[10px]"
                    animate={{ rotate: [2, -2, 2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🦍
                  </motion.div>
                  <div className="pt-0.5">{t.dashboard.msg2}</div>
                </div>
              </div>
              <div className="ai-input">
                <input type="text" placeholder={t.dashboard.askBot} className="placeholder:text-dimmer" />
                <button className="text-dim hover:text-accent transition-colors"><Send size={16} /></button>
              </div>
            </aside>
          </main>
        )}
      </div>
    </div>
  );
}
