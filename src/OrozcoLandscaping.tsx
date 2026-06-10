import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  Shield, 
  Clock, 
  Globe, 
  DollarSign, 
  Users, 
  Calendar, 
  ArrowLeft, 
  ChevronDown, 
  Activity, 
  Sparkles, 
  CheckCircle, 
  Calculator, 
  MapPin, 
  Grid, 
  ChevronRight, 
  Compass, 
  Wrench, 
  Layers, 
  MessageSquare
} from 'lucide-react';

// Interfaces for translation keys
interface TranslationSet {
  header: {
    title: string;
    phoneBtn: string;
    estBtn: string;
  };
  hero: {
    pill: string;
    title: string;
    titleHighlight: string;
    desc: string;
    ctaCall: string;
    ctaEst: string;
    status: string;
  };
  owner: {
    title: string;
    name: string;
    locSub: string;
    callText: string;
    emailText: string;
    licensed: string;
    insured: string;
    bonded: string;
  };
  trust: {
    licensed: string;
    insured: string;
    bonded: string;
    exp: string;
    crew: string;
    est: string;
  };
  services: {
    title: string;
    subtitle: string;
    list: Array<{
      title: string;
      desc: string;
      icon: string;
    }>;
  };
  sheet: {
    title: string;
    subtitle: string;
    serviceCol: string;
    unitCol: string;
    priceCol: string;
    quantityCol: string;
    totalCol: string;
    reset: string;
    estTotal: string;
    transparentNote: string;
  };
  story: {
    title: string;
    body: string;
    author: string;
    authorTitle: string;
  };
  work: {
    title: string;
    subtitle: string;
    viewBeforeAfter: string;
    items: Array<{
      title: string;
      loc: string;
      desc: string;
    }>;
  };
  area: {
    title: string;
    subtitle: string;
    notOnList: string;
  };
  hours: {
    title: string;
    openState: string;
    closedState: string;
    today: string;
    closed: string;
  };
  footer: {
    ctaTitle: string;
    ctaSub: string;
    credits: string;
  };
}

const translations: { EN: TranslationSet; ES: TranslationSet } = {
  EN: {
    header: {
      title: "Orozco Landscaping",
      phoneBtn: "(408) 205-8417",
      estBtn: "Get a Free Estimate"
    },
    hero: {
      pill: "Sunnyvale, CA • Licensed • Insured • Bonded",
      title: "Landscaping, irrigation & concrete.",
      titleHighlight: "Done right the first time.",
      desc: "Family-run, bilingual crew serving Sunnyvale and the Peninsula for 10 years. Free estimates — no job too small.",
      ctaCall: "Call (408) 205-8417",
      ctaEst: "Get a Free Estimate",
      status: "Open now • No job too small • Same-week estimates • Se habla español"
    },
    owner: {
      title: "OWNER",
      name: "Miguel Orozco",
      locSub: "Sunnyvale, CA • 10 years",
      callText: "Call or text",
      emailText: "Email",
      licensed: "LICENSED",
      insured: "INSURED",
      bonded: "BONDED"
    },
    trust: {
      licensed: "Licensed",
      insured: "Insured",
      bonded: "Bonded",
      exp: "10 Years Experience",
      crew: "Bilingual Crew",
      est: "Free Estimates"
    },
    services: {
      title: "What we do",
      subtitle: "From a single sprinkler head to a full driveway tear-out and re-pour.",
      list: [
        {
          title: "Lawn Care & Maintenance",
          desc: "Weekly mow, trim, blow, and edge. Seasonal cleanups included.",
          icon: "Lawn"
        },
        {
          title: "Sprinklers & Irrigation",
          desc: "New installs, broken valves, leaks, smart timers, drip conversion.",
          icon: "Irrigation"
        },
        {
          title: "Landscape Design",
          desc: "Fresh sod, new plantings, mulch, and layout that actually drains.",
          icon: "Design"
        },
        {
          title: "Concrete & Driveways",
          desc: "Driveways, walkways, patios, and concrete flatwork done to code.",
          icon: "Concrete"
        },
        {
          title: "Pavers & Hardscape",
          desc: "Paver patios, borders, and walkways. Clean lines, no settling.",
          icon: "Pavers"
        },
        {
          title: "Fences",
          desc: "Wood fence repair and new builds. Straight lines, posts set in concrete.",
          icon: "Fences"
        }
      ]
    },
    sheet: {
      title: "Orozco Interactive Estimate Spreadsheet",
      subtitle: "Silverback built-in transparent quoting terminal. Configure fields below to instantly simulate on-site project pricing.",
      serviceCol: "SERVICE & SUB-CATEGORY",
      unitCol: "UNIT",
      priceCol: "RATE",
      quantityCol: "QUANTITY",
      totalCol: "ROW TOTAL",
      reset: "Reset Sheet",
      estTotal: "Estimated Project Total",
      transparentNote: "Notice: This automated sheet models standard Bay Area material and trade indexing. Final quotes are validated during Orozco's on-site discovery walk."
    },
    story: {
      title: "Our story",
      body: "Orozco Landscaping has served owners of residential and commercial properties in Sunnyvale and the surrounding Peninsula for the last decade. We are a family-run, locally owned shop — licensed, insured, and bonded — with a crew that treats every yard like it belongs to their own family. From a one-visit lawn clean-up to full irrigation and concrete projects, we listen first, quote honestly, and show up when we said we would. No job is too small.",
      author: "Miguel Orozco",
      authorTitle: "Founder • Orozco Landscaping"
    },
    work: {
      title: "Recent work",
      subtitle: "A few jobs from the last few months.",
      viewBeforeAfter: "Interactive Before / After Showcase",
      items: [
        { title: "Lawn • Sunnyvale", loc: "Sunnyvale, CA", desc: "Complete sod preparation and custom premium blend laying." },
        { title: "Driveway • Mountain View", loc: "Mountain View, CA", desc: "Concrete foundation pour, grade optimization, and smooth finish." },
        { title: "Sprinklers • Cupertino", loc: "Cupertino, CA", desc: "Multi-zone smart valve grid installation with drip conversion." },
        { title: "Pavers • Los Altos", loc: "Los Altos, CA", desc: "Intricate interlocking driveway bricklaying and stable bedding." },
        { title: "Fence • Santa Clara", loc: "Santa Clara, CA", desc: "Redwood privacy fencing with concrete post reinforce support." },
        { title: "Sod • Palo Alto", loc: "Palo Alto, CA", desc: "High-grade premium turf remodeling and custom soil drainage grid." }
      ]
    },
    area: {
      title: "Service area",
      subtitle: "We work across the Peninsula and South Bay.",
      notOnList: "Not on the list? Call us — we probably still cover you."
    },
    hours: {
      title: "Hours",
      openState: "Open now",
      closedState: "Closed",
      today: "TODAY",
      closed: "Closed"
    },
    footer: {
      ctaTitle: "Get a free estimate",
      ctaSub: "Fastest way to reach us is a call or text. We answer in English or Spanish.",
      credits: "Website & Google Business Profile by Silverback AI Agency • bryan@silverbackai.agency"
    }
  },
  ES: {
    header: {
      title: "Orozco Landscaping",
      phoneBtn: "(408) 205-8417",
      estBtn: "Cotización Gratis"
    },
    hero: {
      pill: "Sunnyvale, CA • Con licencia • Asegurado • Afianzado",
      title: "Jardinería, riego y concreto.",
      titleHighlight: "Bien hecho desde la primera vez.",
      desc: "Cuadrilla familiar y bilingüe sirviendo Sunnyvale y la Península por 10 años. Cotizaciones gratis — ningún trabajo es muy pequeño.",
      ctaCall: "Llama (408) 205-8417",
      ctaEst: "Cotización Gratis",
      status: "Abierto ahora • Ningún trabajo es muy pequeño • Cotizaciones la misma semana • Se habla español"
    },
    owner: {
      title: "PROPIETARIO",
      name: "Miguel Orozco",
      locSub: "Sunnyvale, CA • 10 años",
      callText: "Llamada o texto",
      emailText: "Correo",
      licensed: "CON LICENCIA",
      insured: "ASEGURADO",
      bonded: "AFIANZADO"
    },
    trust: {
      licensed: "Con licencia",
      insured: "Asegurado",
      bonded: "Afianzado",
      exp: "10 años de experiencia",
      crew: "Cuadrilla bilingüe",
      est: "Cotizaciones gratis"
    },
    services: {
      title: "Lo que hacemos",
      subtitle: "Desde un solo aspersor hasta una cochera completa, la arrancamos y la volvemos a colar.",
      list: [
        {
          title: "Jardinería y Mantenimiento",
          desc: "Corte semanal, orillado, soplado y recorte. Limpieza de temporada incluida.",
          icon: "Lawn"
        },
        {
          title: "Riego y Aspersores",
          desc: "Instalaciones nuevas, válvulas, fugas, timers inteligentes, conversión a goteo.",
          icon: "Irrigation"
        },
        {
          title: "Diseño de Jardín",
          desc: "Pasto nuevo, plantas, mulch, y diseño que sí drena.",
          icon: "Design"
        },
        {
          title: "Concreto y Cocheras",
          desc: "Cocheras, banquetas, patios, y concreto plano hecho al código.",
          icon: "Concrete"
        },
        {
          title: "Adoquín y Hardscape",
          desc: "Patios y banquetas de adoquín. Líneas limpias, sin hundimiento.",
          icon: "Pavers"
        },
        {
          title: "Cercas",
          desc: "Reparación de cercas de madera y cercas nuevas. Postes en concreto.",
          icon: "Fences"
        }
      ]
    },
    sheet: {
      title: "Spreadsheet Interactivo de Cotización Orozco",
      subtitle: "Terminal de cotización directa construida por Silverback. Ajuste los parámetros para calcular al instante su cotización estimada.",
      serviceCol: "SERVICIO Y SUB-CATEGORÍA",
      unitCol: "UNIDAD",
      priceCol: "TASA",
      quantityCol: "CANTIDAD",
      totalCol: "TOTAL FILA",
      reset: "Reiniciar Hoja",
      estTotal: "Total del Proyecto Estimado",
      transparentNote: "Nota: Este spreadsheet automatizado modela tarifas indexadas del Área de la Bahía. La cotización final es validada durante la visita de Orozco en el sitio."
    },
    story: {
      title: "Sobre nosotros",
      body: "Orozco Landscaping ha servido a dueños de propiedades residenciales y comerciales en Sunnyvale y la Península durante la última década. Somos un negocio familiar y local — con licencia, asegurado y afianzado — con una cuadrilla que trata cada jardín como si fuera propio. Desde una limpieza de una visita hasta proyectos completos de riego y concreto, escuchamos primero, cotizamos honestamente, y llegamos cuando dijimos que íbamos a llegar. Ningún trabajo es demasiado pequeño.",
      author: "Miguel Orozco",
      authorTitle: "Fundador • Orozco Landscaping"
    },
    work: {
      title: "Trabajos recientes",
      subtitle: "Algunos trabajos de los últimos meses.",
      viewBeforeAfter: "Presentación Interactiva Antes / Después",
      items: [
        { title: "Lawn • Sunnyvale", loc: "Sunnyvale, CA", desc: "Preparación de tierra y colocación de pasto natural premium." },
        { title: "Driveway • Mountain View", loc: "Mountain View, CA", desc: "Preparación y colado de concreto con pendientes óptimas." },
        { title: "Sprinklers • Cupertino", loc: "Cupertino, CA", desc: "Instalación de sistema inteligente de riego multizona y goteo." },
        { title: "Pavers • Los Altos", loc: "Los Altos, CA", desc: "Alineado e instalación de ladrillos adoquines de alta resistencia." },
        { title: "Fence • Santa Clara", loc: "Santa Clara, CA", desc: "Instalación de bardas de madera de redwood con postes reforzados." },
        { title: "Sod • Palo Alto", loc: "Palo Alto, CA", desc: "Renovación integral de césped y drenaje subsuperficial." }
      ]
    },
    area: {
      title: "Área de servicio",
      subtitle: "Trabajamos en toda la Península y el South Bay.",
      notOnList: "¿No está en la lista? Llámanos — probablemente sí te cubrimos."
    },
    hours: {
      title: "Horario",
      openState: "Abierto ahora",
      closedState: "Cerrado",
      today: "HOY",
      closed: "Cerrado"
    },
    footer: {
      ctaTitle: "Cotización gratis",
      ctaSub: "La forma más rápida de contactarnos es por llamada o texto. Contestamos en inglés o español.",
      credits: "Sitio web y Perfil de Google hecho por Silverback AI Agency • bryan@silverbackai.agency"
    }
  }
};

// Estimator spreadsheets items
interface EstimateRow {
  id: string;
  category: string;
  subcategory: string;
  unit: string;
  rate: number;
  quantity: number;
}

export default function OrozcoLandscaping({ onBack }: { onBack: () => void }) {
  const [lang, setLang] = useState<'EN' | 'ES'>('EN');
  const t = translations[lang];

  // Map Background interactive state
  const [selectedMapPin, setSelectedMapPin] = useState<string | null>(null);

  // Before/after toggle slider value (0 to 100)
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Spreadsheet state
  const [estimateRows, setEstimateRows] = useState<EstimateRow[]>([
    { id: '1', category: 'Lawn Maintenance', subcategory: 'Mowing & Edging (per visit)', unit: 'sq ft', rate: 0.15, quantity: 1500 },
    { id: '2', category: 'Lawn Maintenance', subcategory: 'Seasonal Clean-Up & Mulching', unit: 'cubic yard', rate: 85.00, quantity: 0 },
    { id: '3', category: 'Sprinklers', subcategory: 'Smart Controller & Valve Grid Set', unit: 'zones', rate: 350.00, quantity: 0 },
    { id: '4', category: 'Sprinklers', subcategory: 'Drip Irrigation Tubing & Emitters', unit: 'linear ft', rate: 4.50, quantity: 0 },
    { id: '5', category: 'Sod Installation', subcategory: 'Premium Blend Ground Sod Layout', unit: 'sq ft', rate: 2.20, quantity: 0 },
    { id: '6', category: 'Concrete & Flatwork', subcategory: 'Driveway/Patios 4" Concrete Base', unit: 'sq ft', rate: 14.00, quantity: 0 },
    { id: '7', category: 'Hardscaping Pavers', subcategory: 'Interlocking Paver installation', unit: 'sq ft', rate: 18.00, quantity: 0 },
    { id: '8', category: 'Fencing & Enclosures', subcategory: '6ft Wood Privacy Redwood Boards', unit: 'linear ft', rate: 65.00, quantity: 0 },
  ]);

  const updateQuantity = (id: string, qty: number) => {
    setEstimateRows(prev => prev.map(row => {
      if (row.id === id) {
        return { ...row, quantity: Math.max(0, qty) };
      }
      return row;
    }));
  };

  const resetEstimate = () => {
    setEstimateRows(prev => prev.map(row => ({ ...row, quantity: row.id === '1' ? 1500 : 0 })));
  };

  const totalEstimatePrice = estimateRows.reduce((acc, row) => acc + (row.rate * row.quantity), 0);

  // Standard schedules
  const weekDays = [
    { name: lang === 'EN' ? 'Monday' : 'Lunes', hours: '5:00 AM - 6:00 PM', isToday: new Date().getDay() === 1 },
    { name: lang === 'EN' ? 'Tuesday' : 'Martes', hours: '5:00 AM - 6:00 PM', isToday: new Date().getDay() === 2 },
    { name: lang === 'EN' ? 'Wednesday' : 'Miércoles', hours: '5:00 AM - 6:00 PM', isToday: new Date().getDay() === 3 },
    { name: lang === 'EN' ? 'Thursday' : 'Jueves', hours: '5:00 AM - 6:00 PM', isToday: new Date().getDay() === 4 },
    { name: lang === 'EN' ? 'Friday' : 'Viernes', hours: '5:00 AM - 6:00 PM', isToday: new Date().getDay() === 5 },
    { name: lang === 'EN' ? 'Saturday' : 'Sábado', hours: '5:00 AM - 6:00 PM', isToday: new Date().getDay() === 6 },
    { name: lang === 'EN' ? 'Sunday' : 'Domingo', hours: t.hours.closed, isToday: new Date().getDay() === 0 },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121c2c] selection:bg-emerald-200 relative pb-10 transition-colors duration-500 font-sans">
      
      {/* Client Frame Styling Top Banner */}
      <div className="bg-zinc-900 text-white px-6 py-2.5 flex items-center justify-between border-b border-zinc-800 tracking-wider">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 font-mono text-[11px] uppercase transition-colors"
        >
          <ArrowLeft size={13} /> Return to Silverback Hub
        </button>
        <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-mono text-zinc-500">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SILVERBACK LANDING SHOWCASE: Orozco Sheet v1.4</span>
        </div>
      </div>

      {/* Main Container framed like the original polished layout */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-950/5 px-6 md:px-12 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm border border-emerald-700">
            OL
          </div>
          <span className="font-serif font-extrabold text-xl tracking-tight text-emerald-900">{t.header.title}</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Interactive Language Selector */}
          <div className="flex rounded-full bg-zinc-100 p-1 border border-zinc-200/50">
            <button 
              onClick={() => setLang('EN')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'EN' ? 'bg-emerald-800 text-white shadow-xs' : 'text-zinc-600 hover:text-emerald-800'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('ES')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'ES' ? 'bg-emerald-800 text-white shadow-xs' : 'text-zinc-600 hover:text-emerald-800'}`}
            >
              ES
            </button>
          </div>

          <a 
            href="tel:4082058417"
            className="hidden md:flex items-center gap-2 bg-[#c21d3e] text-white px-5 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xs"
          >
            <Phone size={14} /> Call {t.header.phoneBtn}
          </a>
        </div>
      </header>

      {/* Decorative Brand Accent Grid / Background Theme change */}
      <main className="relative">
        
        {/* Dynamic Theme background section */}
        <section className={`relative transition-all duration-700 py-16 md:py-24 px-6 md:px-12 border-b-4 border-emerald-100 ${
          lang === 'EN' 
            ? 'bg-radial-[circle_at_top,_var(--tw-gradient-stops)] from-[#07244a] via-[#041329] to-[#010915] text-white' 
            : 'bg-radial-[circle_at_top,_var(--tw-gradient-stops)] from-[#024423] via-[#012412] to-[#000e05] text-white'
        }`}>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center relative z-10">
            
            {/* Left Main Hero Copy */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-[11px] tracking-wider text-emerald-400 font-semibold uppercase"
              >
                <Shield size={12} /> {t.hero.pill}
              </motion.div>

              <div className="space-y-4">
                <h1 className="font-serif text-[clamp(36px,5.5vw,72px)] leading-[1.05] font-black tracking-tight drop-shadow-md text-balance">
                  {t.hero.title}
                  <span className="block mt-2 bg-white text-[#c21d3e] inline-block px-4 py-1.5 font-serif font-black shadow-lg rounded-sm italic border-l-4 border-[#c21d3e] text-[0.88em]">
                    {t.hero.titleHighlight}
                  </span>
                </h1>
                
                <p className="font-sans text-white/85 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                  {t.hero.desc}
                </p>
              </div>

              {/* Dynamic Action Panel */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="tel:4082058417"
                  className="flex items-center justify-center gap-3 bg-[#c21d3e] hover:bg-[#a61732] text-white py-4 px-8 rounded-md font-sans font-bold text-[16px] tracking-wide shadow-xl active:scale-[0.98] transition-all border-b-2 border-black/25 uppercase"
                >
                  <Phone size={18} /> {t.hero.ctaCall}
                </a>

                <a 
                  href="#estimator-sheet"
                  className="flex items-center justify-center gap-3 bg-white hover:bg-emerald-50 text-emerald-950 py-4 px-8 rounded-md font-sans font-extrabold text-[16px] tracking-wide shadow-md hover:shadow-xl active:scale-[0.98] transition-all border border-transparent uppercase"
                >
                  <Calculator size={18} className="text-emerald-800" /> {t.hero.ctaEst}
                </a>
              </div>

              {/* Live Status indicator */}
              <div className="flex items-start gap-3 bg-black/30 border border-white/5 p-4 rounded-lg max-w-xl text-xs text-white/70 leading-relaxed font-mono">
                <div className="flex shrink-0 mt-1">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                  </span>
                </div>
                <div>{t.hero.status}</div>
              </div>
            </div>

            {/* Right Owner Badge Overlay & Interactive Portal card (recreating Page 1 perfectly) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#faf8f5] text-[#121c2c] border border-zinc-200 shadow-2xl p-6 md:p-8 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-red-500 via-emerald-600 to-blue-600" />
              
              <div className="flex justify-between items-start mb-6 pt-2">
                <div>
                  <span className="font-mono text-[10px] tracking-[5px] text-zinc-400 block font-bold leading-none">{t.owner.title}</span>
                  <h2 className="font-serif font-black text-2xl md:text-3xl text-emerald-950 mt-1">{t.owner.name}</h2>
                  <p className="text-xs text-zinc-500 font-mono mt-1 flex items-center gap-1.5">
                    <MapPin size={11} className="text-emerald-700" /> {t.owner.locSub}
                  </p>
                </div>
                <div className="w-14 h-14 bg-emerald-800 text-white rounded-full flex items-center justify-center font-serif font-black text-xl shadow-inner border-2 border-emerald-900">
                  MO
                </div>
              </div>

              {/* Progress Line */}
              <div className="h-[2px] bg-zinc-200 w-full mb-6 relative">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-emerald-700" />
              </div>

              {/* Action List items styled directly like original */}
              <div className="space-y-4">
                
                {/* Phone row */}
                <a 
                  href="tel:4082058417"
                  className="flex items-center justify-between p-4 bg-white border border-zinc-200/60 rounded-xl hover:border-emerald-600/40 hover:bg-emerald-50/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold group-hover:scale-110 transition-transform">
                      <Phone size={15} />
                    </div>
                    <span className="font-serif font-bold text-lg md:text-xl text-zinc-800">(408) 205-8417</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-sm group-hover:text-emerald-700 transition-colors">
                    {t.owner.callText}
                  </span>
                </a>

                {/* Email row */}
                <a 
                  href="mailto:migueob89@gmail.com"
                  className="flex items-center justify-between p-4 bg-white border border-zinc-200/60 rounded-xl hover:border-emerald-600/40 hover:bg-emerald-50/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold group-hover:scale-110 transition-transform">
                      <Mail size={15} />
                    </div>
                    <span className="font-mono text-xs md:text-sm text-zinc-700 break-all">migueob89@gmail.com</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#c21d3e] bg-red-50 px-2.5 py-1 rounded-sm group-hover:bg-red-100/50 transition-colors">
                    {t.owner.emailText}
                  </span>
                </a>
              </div>

              {/* Sub-Badges */}
              <div className="grid grid-cols-3 gap-2.5 pt-6 mt-6 border-t border-zinc-200/50 text-center font-mono text-[10px] font-black tracking-widest text-zinc-600">
                <div className="bg-emerald-100/40 py-2 rounded-md border border-emerald-200/40 text-emerald-800">{t.owner.licensed}</div>
                <div className="bg-blue-100/30 py-2 rounded-md border border-blue-200/40 text-blue-800">{t.owner.insured}</div>
                <div className="bg-amber-100/30 py-2 rounded-md border border-amber-200/40 text-amber-800">{t.owner.bonded}</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* trust grid strip */}
        <section className="bg-white border-y border-zinc-200 py-8 px-6 md:px-12 relative z-20 shadow-xs">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 gap-x-8 items-center text-zinc-700">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#faf8f5] flex items-center justify-center text-emerald-700 border border-zinc-200">
                <Shield size={16} />
              </div>
              <div>
                <span className="font-mono text-[11px] text-zinc-400 block tracking-widest leading-none">STATUS</span>
                <span className="text-sm font-semibold text-zinc-900">{t.trust.licensed}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#faf8f5] flex items-center justify-center text-blue-600 border border-zinc-200">
                <CheckCircle size={16} />
              </div>
              <div>
                <span className="font-mono text-[11px] text-zinc-400 block tracking-widest leading-none">COVERAGE</span>
                <span className="text-sm font-semibold text-zinc-900">{t.trust.insured}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#faf8f5] flex items-center justify-center text-amber-600 border border-zinc-200">
                <DollarSign size={16} />
              </div>
              <div>
                <span className="font-mono text-[11px] text-zinc-400 block tracking-widest leading-none">GUARANTEE</span>
                <span className="text-sm font-semibold text-zinc-900">{t.trust.bonded}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#faf8f5] flex items-center justify-center text-[#c21d3e] border border-zinc-200">
                <Clock size={16} />
              </div>
              <div>
                <span className="font-mono text-[11px] text-zinc-400 block tracking-widest leading-none">RECORD</span>
                <span className="text-sm font-semibold text-zinc-900">{t.trust.exp}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#faf8f5] flex items-center justify-center text-purple-600 border border-zinc-200">
                <Users size={16} />
              </div>
              <div>
                <span className="font-mono text-[11px] text-zinc-400 block tracking-widest leading-none">PEOPLE</span>
                <span className="text-sm font-semibold text-zinc-900">{t.trust.crew}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#faf8f5] flex items-center justify-center text-rose-500 border border-zinc-200">
                <Sparkles size={16} />
              </div>
              <div>
                <span className="font-mono text-[11px] text-zinc-400 block tracking-widest leading-none">PRICING</span>
                <span className="text-sm font-semibold text-zinc-900">{t.trust.est}</span>
              </div>
            </div>
          </div>
        </section>

        {/* "What we do" section / "Lo que hacemos" */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 font-mono text-[12px] tracking-[4px] text-zinc-400 uppercase mb-3">
            <div className="w-5 h-[1px] bg-zinc-300" />
            {t.services.title}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-emerald-950 tracking-tight mb-4">{t.services.title}</h2>
          <p className="font-sans text-zinc-500 text-lg md:text-xl font-light mb-16 max-w-2xl">{t.services.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.list.map((srv, idx) => {
              // Custom icon selection helper
              const getIconForType = (type: string) => {
                switch(type) {
                  case 'Lawn': return <Compass className="text-emerald-700" />;
                  case 'Irrigation': return <Activity className="text-sky-600" />;
                  case 'Design': return <Sparkles className="text-teal-600" />;
                  case 'Concrete': return <Wrench className="text-amber-700" />;
                  case 'Pavers': return <Layers className="text-amber-900" />;
                  case 'Fences': return <Grid className="text-zinc-700" />;
                  default: return <Wrench className="text-zinc-700" />;
                }
              };

              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -8 }}
                  className="bg-white border border-zinc-200/80 p-8 rounded-2xl shadow-xs hover:shadow-xl transition-all hover:border-emerald-600/30 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-zinc-50 border border-zinc-200/55 rounded-xl text-emerald-800 mb-6 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors text-2xl">
                    {getIconForType(srv.icon)}
                  </div>
                  
                  <h3 className="font-serif font-black text-xl text-emerald-950 mb-3 uppercase tracking-wide group-hover:text-emerald-800 transition-colors">
                    {srv.title}
                  </h3>
                  
                  <p className="text-zinc-500 text-sm font-light leading-relaxed">
                    {srv.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ARESCO/OROZCO INTERACTIVE ESTIMATE SPREADSHEET TERMINAL! */}
        <section id="estimator-sheet" className="scroll-mt-28 py-20 px-6 md:px-12 bg-[#ebe7df] border-y border-zinc-300">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono text-zinc-500 text-[11px] tracking-widest uppercase">
                  <Calculator size={13} className="text-emerald-800" /> Transparent Operations Engine
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1a2d42] font-black tracking-tight">{t.sheet.title}</h2>
                <p className="font-sans text-zinc-600 text-sm md:text-base mt-2 max-w-2xl">{t.sheet.subtitle}</p>
              </div>

              <button 
                onClick={resetEstimate}
                className="self-start lg:self-center px-4 py-2 border border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-50 rounded-md font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
              >
                {t.sheet.reset}
              </button>
            </div>

            {/* Simulated Desktop Spreadsheet Terminal */}
            <div className="overflow-x-auto border border-zinc-300 rounded-xl bg-white shadow-xl">
              <table className="w-full text-left border-collapse font-sans min-w-[700px]">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-500 border-b border-zinc-300 text-[11px] tracking-wider font-mono uppercase">
                    <th className="py-4 px-6">{t.sheet.serviceCol}</th>
                    <th className="py-4 px-4 w-[100px] text-center">{t.sheet.unitCol}</th>
                    <th className="py-4 px-4 w-[120px] text-right">{t.sheet.priceCol}</th>
                    <th className="py-4 px-6 w-[180px] text-center">{t.sheet.quantityCol}</th>
                    <th className="py-4 px-6 w-[160px] text-right">{t.sheet.totalCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-sm">
                  {estimateRows.map((row) => (
                    <tr 
                      key={row.id} 
                      className={`hover:bg-zinc-50/50 transition-colors ${row.quantity > 0 ? 'bg-emerald-50/20' : ''}`}
                    >
                      <td className="py-4 px-6">
                        <span className="font-mono text-[9px] uppercase tracking-widest bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-sm mr-3 font-semibold">
                          {row.category}
                        </span>
                        <div className="font-serif text-zinc-800 font-bold block md:inline-block md:mt-0 mt-1">{row.subcategory}</div>
                      </td>
                      <td className="py-4 px-4 text-center font-mono text-zinc-500 text-xs">{row.unit}</td>
                      <td className="py-4 px-4 text-right font-mono text-zinc-600">
                        ${row.rate.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1 max-w-[140px] mx-auto border border-zinc-200 rounded-md bg-white p-0.5">
                          <button 
                            onClick={() => updateQuantity(row.id, row.quantity - (row.unit === 'zones' || row.unit === 'cubic yard' ? 1 : 100))}
                            className="w-8 h-8 rounded hover:bg-zinc-100 font-mono text-xs font-bold text-zinc-500 flex items-center justify-center select-none"
                          >
                            -
                          </button>
                          <input 
                            type="number"
                            value={row.quantity || ''}
                            onChange={(e) => updateQuantity(row.id, parseInt(e.target.value) || 0)}
                            className="w-16 text-center font-mono font-bold text-zinc-800 text-sm border-0 focus:ring-0 p-0"
                            placeholder="0"
                          />
                          <button 
                            onClick={() => updateQuantity(row.id, row.quantity + (row.unit === 'zones' || row.unit === 'cubic yard' ? 1 : 100))}
                            className="w-8 h-8 rounded hover:bg-zinc-100 font-mono text-xs font-bold text-zinc-500 flex items-center justify-center select-none"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-mono font-black text-zinc-800 text-sm">
                        ${(row.rate * row.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}

                  {/* Summary Rows */}
                  <tr className="bg-zinc-50 border-t-2 border-zinc-300">
                    <td colSpan={3} className="py-6 px-6 hidden md:table-cell">
                      <p className="text-zinc-400 font-mono text-[11px] leading-relaxed max-w-md">
                        {t.sheet.transparentNote}
                      </p>
                    </td>
                    <td className="py-6 px-6 text-right font-serif font-black text-zinc-800 uppercase tracking-wide text-sm md:text-base">
                      {t.sheet.estTotal}:
                    </td>
                    <td className="py-6 px-6 text-right">
                      <div className="font-mono text-2xl md:text-3xl font-black text-emerald-800 underline decoration-solid decoration-emerald-800">
                        ${totalEstimatePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="block md:hidden text-zinc-500 font-mono text-[10px] bg-white p-4 border border-zinc-300 rounded-lg mt-4 leading-relaxed">
              {t.sheet.transparentNote}
            </p>
          </div>
        </section>

        {/* Beautiful interactive Before / After Comparison Slider */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-zinc-200">
          <div className="flex items-center gap-3 font-mono text-[12px] tracking-[4px] text-zinc-400 uppercase mb-3 justify-center">
            <div className="w-5 h-[1px] bg-zinc-300" />
            {t.work.viewBeforeAfter}
            <div className="w-5 h-[1px] bg-zinc-300" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-emerald-950 tracking-tight text-center mb-4 uppercase">{t.work.viewBeforeAfter}</h2>
          <p className="text-center font-sans text-zinc-500 max-w-2xl mx-auto mb-16 text-sm md:text-base">
            {lang === 'EN' 
              ? 'Drag the slider side to side to witness the real-time aesthetic upgrade of our signature landscaping and concrete operations.' 
              : 'Arrastre el control deslizante para observar la renovación estética en nuestros trabajos característicos de jardinería y concreto.'}
          </p>

          <div className="max-w-4xl mx-auto relative h-[380px] md:h-[480px] rounded-2xl overflow-hidden border border-zinc-200 outline outline-offset-4 outline-emerald-900/10 shadow-2xl">
            {/* "After" Image Background (Full Container Width) */}
            <img 
              src="https://images.unsplash.com/photo-1558904541-efa8c1a68fb1?auto=format&fit=crop&q=80&w=1600" 
              alt="After landscaping renovation" 
              className="absolute inset-0 w-full h-full object-cover select-none"
            />
            <div className="absolute top-4 right-4 bg-emerald-800 text-white font-mono text-[10px] tracking-widest font-black px-3 py-1.5 rounded-sm uppercase z-30 shadow-md">
              {lang === 'EN' ? 'AFTER STYLE' : 'DESPUÉS (ESTILO)'}
            </div>

            {/* "Before" Image Overlap Width cropped dynamically by slider value */}
            <div 
              className="absolute inset-0 z-10 overflow-hidden select-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1541845157-a5ec084c6af2?auto=format&fit=crop&q=80&w=1600" 
                alt="Before landscaping treatment" 
                className="absolute inset-0 w-full h-[380px] md:h-[480px] object-cover max-w-none select-none"
                style={{ width: '896px' }} // fixed size width so image doesnt warp on resize
              />
              <div className="absolute top-4 left-4 bg-zinc-900 text-white font-mono text-[10px] tracking-widest font-black px-3 py-1.5 rounded-sm uppercase z-30 shadow-md">
                {lang === 'EN' ? 'BEFORE (CHAOS)' : 'ANTES (CAOS)'}
              </div>
            </div>

            {/* Slider control line and handle handle */}
            <div 
              className="absolute top-0 bottom-0 z-20 w-[4px] bg-white cursor-ew-resize flex items-center justify-center shadow-lg"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-800 border-4 border-white flex items-center justify-center text-white text-md font-bold shadow-2xl select-none">
                ↔
              </div>
            </div>

            {/* Click/Drag invisible layer tracker on canvas */}
            <input 
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(parseFloat(e.target.value))}
              className="absolute inset-0 opacity-0 z-30 cursor-ew-resize w-full h-full"
            />
          </div>
        </section>

        {/* Original story quote styled block */}
        <section className="py-24 px-6 md:px-12 bg-white border-b border-zinc-200">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <span className="serif font-black text-6xl md:text-8xl text-emerald-800/15 leading-none block">“</span>
            
            <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#111] leading-tight select-none uppercase tracking-wide">
              {t.story.title}
            </h2>

            <p className="font-sans text-zinc-600 text-lg md:text-xl font-light leading-relaxed text-left md:text-center blockquote-styling">
              {t.story.body}
            </p>

            <div className="h-[1px] bg-zinc-300 w-32 mx-auto" />

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-emerald-800 text-white font-serif font-black text-[15px] flex items-center justify-center shadow-lg">
                MO
              </div>
              <p className="font-serif text-zinc-950 font-black tracking-wide text-lg mt-1">{t.story.author}</p>
              <p className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{t.story.authorTitle}</p>
            </div>
          </div>
        </section>

        {/* "Recent work" section / "Trabajos recientes" */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 font-mono text-[12px] tracking-[4px] text-zinc-400 uppercase mb-3">
            <div className="w-5 h-[1px] bg-zinc-300" />
            {t.work.title}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-emerald-950 tracking-tight mb-4">{t.work.title}</h2>
          <p className="font-sans text-zinc-500 text-lg md:text-xl font-light mb-16 max-w-2xl">{t.work.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.work.items.map((it, idx) => {
              // beautiful curated landscaping photos references to ensure elite UI aesthetic
              const placeholderPhotos = [
                "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1541845157-a5ec084c6af2?auto=format&fit=crop&q=80&w=800"
              ];

              return (
                <div 
                  key={idx}
                  className="bg-zinc-100 border border-zinc-200 shadow-sm rounded-xl overflow-hidden hover:scale-[1.02] duration-300 transition-transform flex flex-col justify-between"
                >
                  <div className="h-56 relative overflow-hidden bg-emerald-900 bg-cover bg-center">
                    <img 
                      src={placeholderPhotos[idx]} 
                      alt={it.title}
                      className="w-full h-full object-cover select-none"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-emerald-900 border border-emerald-950/20 font-mono text-[9px] tracking-widest font-extrabold px-2.5 py-1 rounded-sm uppercase">
                      {it.loc}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-black text-xl text-emerald-950 mb-2 uppercase tracking-wide">
                      {it.title}
                    </h3>
                    <p className="text-zinc-500 text-xs font-light leading-relaxed">
                      {it.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Service area list with styled map element */}
        <section className="py-24 px-6 md:px-12 bg-white border-y border-zinc-200">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-center">
            
            <div>
              <div className="flex items-center gap-3 font-mono text-[12px] tracking-[4px] text-zinc-400 uppercase mb-3">
                <div className="w-5 h-[1px] bg-zinc-300" />
                {t.area.title}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-black text-emerald-950 tracking-tight mb-6">{t.area.title}</h2>
              <p className="font-sans text-zinc-500 text-lg font-light leading-relaxed mb-8">{t.area.subtitle}</p>

              {/* clickable town pills triggers map coordinates */}
              <div className="flex flex-wrap gap-2.5 max-w-md">
                {["Sunnyvale", "Mountain View", "Cupertino", "Los Altos", "Santa Clara", "Palo Alto"].map((town) => (
                  <button 
                    key={town}
                    onClick={() => setSelectedMapPin(selectedMapPin === town ? null : town)}
                    className={`flex items-center gap-2 border px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider rounded-full transition-all ${
                      selectedMapPin === town 
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-900 shadow-sm' 
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 bg-[#faf8f5]'
                    }`}
                  >
                    <MapPin size={11} className={selectedMapPin === town ? 'text-emerald-850 animate-bounce' : 'text-zinc-400'} />
                    {town}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-200/50 text-xs font-mono text-zinc-400 leading-relaxed block">
                {t.area.notOnList}
              </div>
            </div>

            {/* Styled high-precision vector grid graphic map simulating on-site service zone */}
            <div className="border border-zinc-200 rounded-2xl p-4 bg-[#f8f6f2] shadow-lg relative min-h-[360px] flex items-center justify-center overflow-hidden select-none">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(180,180,180,0.08)_1px,transparent_1px),linear-gradient(95deg,rgba(180,180,180,0.08)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              {/* Interactive Pulsing Map graphic */}
              <div className="w-full h-[320px] relative border border-zinc-300/60 rounded-xl bg-[#eff1ea] overflow-hidden flex items-center justify-center">
                
                {/* SVG Route lines */}
                <svg className="absolute inset-0 w-full h-full text-zinc-300/40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-10,180 Q200,90 450,180 T900,100" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path d="M120,-10 C200,180 300,280 250,500" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path d="M-10,50 C300,150 400,20 400,400" fill="none" stroke="currentColor" strokeWidth="2.5" />
                </svg>

                {/* Sub regional labels */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs border border-zinc-300 text-zinc-500 font-mono text-[9px] tracking-widest font-black px-2.5 py-1 rounded-sm uppercase">
                  SOUTH BAY • PENINSULA
                </div>

                {/* Pins plotted with pulse triggers */}
                {[
                  { n: 'Sunnyvale', top: '50%', left: '42%' },
                  { n: 'Mountain View', top: '35%', left: '25%' },
                  { n: 'Cupertino', top: '70%', left: '55%' },
                  { n: 'Los Altos', top: '25%', left: '60%' },
                  { n: 'Santa Clara', top: '55%', left: '78%' },
                  { n: 'Palo Alto', top: '15%', left: '15%' },
                ].map((pin) => {
                  const isSel = selectedMapPin === pin.n;
                  return (
                    <div 
                      key={pin.n}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{ top: pin.top, left: pin.left }}
                      onClick={() => setSelectedMapPin(isSel ? null : pin.n)}
                    >
                      <span className={`relative flex h-8 w-8 items-center justify-center`}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000 ${isSel ? 'scale-150' : 'hidden group-hover:inline-flex'}`}></span>
                        <div className={`w-3.5 h-3.5 rounded-full border border-white shadow-md transition-all duration-300 ${isSel ? 'bg-emerald-800 scale-125' : 'bg-[#c21d3e] group-hover:bg-emerald-600'}`} />
                      </span>
                      
                      {/* Name popup overlay container */}
                      <AnimatePresence>
                        {(isSel || selectedMapPin === null) && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`absolute transform -translate-x-1/2 left-1/2 top-7 whitespace-nowrap bg-white text-zinc-800 text-[10px] uppercase font-mono tracking-widest font-extrabold px-2 py-1 rounded border shadow-md ${
                              isSel ? 'border-emerald-700 bg-emerald-50 text-emerald-990 font-black' : 'border-zinc-300/40 text-zinc-500 group-hover:border-zinc-500'
                            }`}
                          >
                            {pin.n}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Hours lists with live today calculation */}
        <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 font-mono text-[12px] tracking-[4px] text-zinc-400 uppercase mb-3 justify-center">
            <div className="w-5 h-[1px] bg-zinc-300" />
            {t.hours.title}
            <div className="w-5 h-[1px] bg-zinc-300" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-emerald-950 tracking-tight text-center mb-16 uppercase">{t.hours.title}</h2>

          <div className="border border-zinc-200 rounded-2xl bg-white shadow-xl overflow-hidden divide-y divide-zinc-150">
            {weekDays.map((day) => (
              <div 
                key={day.name} 
                className={`py-5 px-6 md:px-8 flex items-center justify-between text-sm transition-colors ${
                  day.isToday ? 'bg-emerald-50/25 font-bold' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-zinc-850 font-black text-md block tracking-wide">{day.name}</span>
                  {day.isToday && (
                    <span className="font-mono text-[9px] uppercase tracking-widest font-black bg-emerald-800 text-white px-2.5 py-0.5 rounded-sm">
                      {t.hours.today}
                    </span>
                  )}
                </div>
                <div className={`font-mono text-xs ${day.hours === t.hours.closed ? 'text-zinc-400 font-normal' : 'text-zinc-700 font-bold'}`}>
                  {day.hours}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* High Converting Footer call layout */}
        <section className="bg-emerald-950 border-t border-emerald-900 py-24 text-white text-center relative overflow-hidden px-6 md:px-12">
          <div className="absolute inset-0 bg-radial-[circle_at_bottom,_var(--tw-gradient-stops)] from-emerald-900/40 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <h2 className="font-serif text-4xl md:text-6xl font-black text-balance leading-none tracking-tight">
              {t.footer.ctaTitle}
            </h2>
            <p className="font-sans text-emerald-200/80 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto">
              {t.footer.ctaSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a 
                href="tel:4082058417"
                className="flex items-center justify-center gap-3 bg-[#c21d3e] hover:bg-[#a61732] text-white py-4 px-8 rounded-md font-sans font-bold text-[16px] tracking-wide shadow-xl active:scale-[0.98] transition-all uppercase"
              >
                <Phone size={18} /> {lang === 'EN' ? 'CALL: (408) 205-8417' : 'LLAMAR: (408) 205-8417'}
              </a>

              <a 
                href="mailto:migueob89@gmail.com"
                className="flex items-center justify-center gap-3 bg-white hover:bg-zinc-50 text-zinc-900 py-4 px-8 rounded-md font-sans font-extrabold text-[16px] tracking-wide shadow-md active:scale-[0.98] transition-all uppercase"
              >
                <Mail size={18} className="text-emerald-800" /> {lang === 'EN' ? 'EMAIL MIGUEL' : 'ENVIAR CORREO'}
              </a>
            </div>

            <div className="h-[1px] bg-emerald-900 w-full pt-4 mt-8" />
            
            <p className="font-mono text-[10px] tracking-widest text-emerald-400/50 uppercase leading-relaxed font-semibold">
              {t.footer.credits}
            </p>
          </div>
        </section>

      </main>

      {/* Copy-Right layout */}
      <footer className="py-8 bg-zinc-950 font-mono text-[10px] tracking-widest uppercase text-center text-zinc-500 border-t border-zinc-900/40">
        © {new Date().getFullYear()} Orozco Landscaping. All Rights Reserved. Custom Build by Silverback AI
      </footer>
    </div>
  );
}
