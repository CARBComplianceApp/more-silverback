import React from 'react';
import { Check, Sparkles, Zap, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingTableProps {
  lang: 'EN' | 'ES';
  onChoosePlan: (planType: 'STANDARD' | 'ENTERPRISE') => void;
}

export default function PricingTable({ lang, onChoosePlan }: PricingTableProps) {
  const dictionary = {
    EN: {
      tag: "Audit Packages & Plans",
      title1: "Choose Your",
      title2: "Scale.",
      desc: "Our systems are fully custom. We apply your $500 Discovery Audit fee directly as a credit on any automation build.",
      monthly: "month",
      starting: "starting",
      auditCredit: "$500 Audit Credit Applied",
      selectBtn: "Select Package & Start Audit",
      customQuote: "Request Custom Proposal",
      recommended: "HIGH SCALE",
      standardName: "Standard Automation",
      standardPrice: "$1,250",
      standardSub: "For solo founders and mid-market leaders wasting 2-10 hrs/week on administrative leaks.",
      enterpriseName: "Enterprise Systems",
      enterprisePrice: "$4,500+",
      enterpriseSub: "For high-scale enterprises ($5M+) drowning in manual processes across disparate apps.",
      comparisonTitle: "Compare Features",
      featureOps: "Operational Target",
      featureSupport: "Guaranteed Support",
      featureIntegrations: "AI Integrations",
      featureDatabase: "Data Infrastructure",
      featureAgent: "McGilla Custom LLM",
      featureSetup: "Setup Timeline",
    },
    ES: {
      tag: "Paquetes y Planes de Auditoría",
      title1: "Elige Tu",
      title2: "Escala.",
      desc: "Nuestros sistemas son completamente personalizados. Aplicamos la tarifa de la Auditoría de Descubrimiento de $500 de forma directa como crédito para cualquier automatización.",
      monthly: "mes",
      starting: "inicial",
      auditCredit: "$500 Crédito De Auditoría Aplicado",
      selectBtn: "Seleccionar Plan e Iniciar",
      customQuote: "Solicitar Propuesta Personalizada",
      recommended: "ALTA ESCALA",
      standardName: "Automatización Estándar",
      standardPrice: "$1,250",
      standardSub: "Para fundadores independientes y líderes de mercado medio que pierden de 2 a 10 horas semanales.",
      enterpriseName: "Sistemas Enterprise",
      enterprisePrice: "$4,500+",
      enterpriseSub: "Para operaciones de gran escala ($5M+) con flujos manuales desorganizados en múltiples apps.",
      comparisonTitle: "Comparación de Características",
      featureOps: "Objetivo Operacional",
      featureSupport: "Soporte Garantizado",
      featureIntegrations: "Integraciones de IA",
      featureDatabase: "Infraestructura de Datos",
      featureAgent: "LLM McGilla Personalizado",
      featureSetup: "Tiempo de Entrega",
    }
  };

  const t = dictionary[lang];

  const standardFeatures = lang === 'EN' ? [
    "1 Complex Custom AI Workflow",
    "Automated Spreadsheet Syncing",
    "SMS or Email Autoresponder",
    "Standard Core Dashboard Integration",
    "Email & Text Support (Business Hours)",
    "Full $500 Discovery Audit Refunded"
  ] : [
    "1 Flujo de Trabajo Complejo de IA",
    "Sincronización de Hojas de Cálculo",
    "Auto-respondedor de Correo o SMS",
    "Integración del Panel de Control",
    "Soporte por Email/SMS (Horas Hábiles)",
    "Reembolso total de Auditoría de $500"
  ];

  const enterpriseFeatures = lang === 'EN' ? [
    "Unlimited Workflow Pipelines",
    "Private Isolated Cloud DB (SQL/Firestore)",
    "Custom Trained LLM Agent (McGilla Custom)",
    "Multi-Node Secure API Integrations",
    "24/7 System Telemetry & Proactive Alerts",
    "Priority VIP Emergency Hotlines (WhatsApp)",
    "Comprehensive Corporate Operations Audit"
  ] : [
    "Integraciones y Flujos de Trabajo Ilimitados",
    "Base de Datos Cloud Aislada (SQL/Firestore)",
    "Agente LLM Entrenado a Medida (McGilla)",
    "Integraciones seguras de API para todo el stack",
    "Monitoreo 24/7 y Alertas Proactivas",
    "Línea de urgencia VIP dedicada (WhatsApp)",
    "Auditoría corporativa completa de operaciones"
  ];

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-background border-t border-border relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-radial-[circle,rgba(0,240,255,0.03)_0%,transparent_60%] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-radial-[circle,rgba(200,200,200,0.02)_0%,transparent_60%] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[4px] text-dim uppercase mb-3 text-center justify-center">
            <div className="w-5 h-[1px] bg-[#2a2a2a]" />
            {t.tag}
            <div className="w-5 h-[1px] bg-[#2a2a2a]" />
          </div>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] leading-[0.95] tracking-[2px] text-foreground mb-6 uppercase">
            {t.title1} <span className="silver-gradient">{t.title2}</span>
          </h2>
          <p className="text-sm text-dim font-light max-w-2xl leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch mb-16">
          
          {/* STANDARD CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-border bg-card/20 p-8 flex flex-col justify-between hover:border-accent/40 transition-all group relative rounded-none"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] tracking-[3px] text-dim uppercase">// PLAN 01</span>
                <span className="text-xs px-3 py-1 border border-border font-mono text-dimmer uppercase">{lang === 'EN' ? 'STANDARD' : 'ESTÁNDAR'}</span>
              </div>
              <h3 className="font-display text-2xl tracking-widest text-foreground uppercase mb-2 group-hover:silver-gradient transition-all duration-300">
                {t.standardName}
              </h3>
              <p className="text-xs text-dim font-light leading-relaxed mb-6 h-12">
                {t.standardSub}
              </p>
              
              <div className="flex items-baseline gap-2 mb-8 border-b border-border pb-6">
                <span className="font-display text-5xl tracking-normal text-foreground">{t.standardPrice}</span>
                <span className="font-mono text-xs text-dim">/ {t.monthly}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {standardFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-dim font-light">
                    <Check size={14} className="text-accent shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[10px] font-mono text-accent text-center tracking-widest uppercase mb-4 h-5 flex items-center justify-center gap-1.5 bg-accent/5 py-1 border border-accent/10">
                <ShieldCheck size={10} className="text-accent" />
                {t.auditCredit}
              </div>
              <button 
                onClick={() => onChoosePlan('STANDARD')}
                className="w-full flex items-center justify-center gap-2 border border-border hover:bg-card hover:border-accent py-4 font-mono text-[11px] tracking-[2px] uppercase text-foreground group-hover:text-white transition-all rounded-none"
                aria-label={`Select standard package starting at ${t.standardPrice} per month`}
              >
                {t.selectBtn} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* ENTERPRISE CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="border-2 border-accent/40 bg-card/40 p-8 flex flex-col justify-between hover:border-accent transition-all group relative rounded-none shadow-[0_0_35px_rgba(0,240,255,0.03)]"
          >
            {/* Highlighter label */}
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-black font-mono text-[9px] font-bold tracking-[2.5px] px-3.5 py-1 uppercase shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              {t.recommended}
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] tracking-[3px] text-accent uppercase font-bold">// PLAN 02</span>
                <span className="text-xs px-3 py-1 bg-accent/10 border border-accent/30 font-mono text-accent uppercase font-bold">{lang === 'EN' ? 'ENTERPRISE' : 'EMPRESA'}</span>
              </div>
              <h3 className="font-display text-2xl tracking-widest text-foreground uppercase mb-2 group-hover:silver-gradient transition-all duration-300">
                {t.enterpriseName}
              </h3>
              <p className="text-xs text-dim font-light leading-relaxed mb-6 h-12">
                {t.enterpriseSub}
              </p>
              
              <div className="flex items-baseline gap-2 mb-8 border-b border-border pb-6">
                <span className="font-display text-5xl tracking-normal text-foreground silver-gradient">{t.enterprisePrice}</span>
                <span className="font-mono text-xs text-dim">/ {t.monthly} {t.starting}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {enterpriseFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-foreground font-light">
                    <Zap size={14} className="text-accent shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[10px] font-mono text-accent text-center tracking-widest uppercase mb-4 h-5 flex items-center justify-center gap-1.5 bg-accent/20 py-1 border border-accent/35 font-bold animate-pulse">
                <Sparkles size={11} className="text-accent" />
                {t.auditCredit}
              </div>
              <button 
                onClick={() => onChoosePlan('ENTERPRISE')}
                className="w-full flex items-center justify-center gap-2 bg-silver-gradient text-background hover:shadow-[0_0_24px_rgba(0,240,255,0.2)] py-4 font-display text-base tracking-[3px] uppercase font-bold transition-all rounded-none border-none"
                style={{ background: 'linear-gradient(135deg,#fff 0%,#a0a0a0 35%,#d8d8d8 60%,#787878 100%)' }}
                aria-label={`Select enterprise package starting at ${t.enterprisePrice} per month`}
              >
                {t.selectBtn} <ArrowRight size={12} className="text-background group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Dense Technical Feature Comparison Table */}
        <div className="border border-border bg-card/10 overflow-hidden rounded-none">
          <div className="p-5 border-b border-border bg-black/40">
            <h4 className="font-display text-xs tracking-[4px] uppercase silver-gradient text-center md:text-left">{t.comparisonTitle}</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-[11px] text-dim uppercase">
              <thead>
                <tr className="border-b border-border/80 bg-black/20 text-foreground">
                  <th className="p-4 tracking-wider">{lang === 'EN' ? 'RESOURCES' : 'RECURSOS'}</th>
                  <th className="p-4 tracking-wider">{lang === 'EN' ? 'STANDARD' : 'ESTÁNDAR'}</th>
                  <th className="p-4 tracking-wider text-accent">{lang === 'EN' ? 'ENTERPRISE' : 'EMPRESA'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="p-4 font-semibold text-foreground">{t.featureOps}</td>
                  <td className="p-4 text-dim">{lang === 'EN' ? 'Solo founder / under 5 team' : 'Solo fundador / menos de 5 personas'}</td>
                  <td className="p-4 text-accent font-medium">{lang === 'EN' ? 'High-scale enterprise ($5M-$20M+)' : 'Empresas alta escala ($5M-$20M+)'}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground">{t.featureIntegrations}</td>
                  <td className="p-4 text-dim">{lang === 'EN' ? '1 Core Pipeline Workflow' : '1 Flujo de trabajo central'}</td>
                  <td className="p-4 text-accent font-medium">{lang === 'EN' ? 'Bespoke Unlimited Pipelines' : 'Bespoke flujos ilimitados'}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground">{t.featureDatabase}</td>
                  <td className="p-4 text-dim">{lang === 'EN' ? 'Client Local State / Sheets' : 'Local State / Google Sheets'}</td>
                  <td className="p-4 text-accent font-medium">{lang === 'EN' ? 'Dedicated Cloud SQL / Firestore' : 'Cloud SQL / Firestore Dedicada'}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground">{t.featureAgent}</td>
                  <td className="p-4 text-dim">{lang === 'EN' ? 'Not Included' : 'No Incluido'}</td>
                  <td className="p-4 text-accent font-medium">{lang === 'EN' ? 'Custom Trained Neural Model' : 'Entrenado con datos privados'}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground">{t.featureSupport}</td>
                  <td className="p-4 text-dim">{lang === 'EN' ? 'Standard Business SLA (Email)' : 'SLA comercial estándar (Email)'}</td>
                  <td className="p-4 text-accent font-medium">{lang === 'EN' ? '24/7 VIP Multi-channel Support' : 'Soporte VIP 24/7 multicanal'}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground">{t.featureSetup}</td>
                  <td className="p-4 text-dim">{lang === 'EN' ? '2 to 3 weeks build' : '2 a 3 semanas de ejecución'}</td>
                  <td className="p-4 text-accent font-medium">{lang === 'EN' ? 'Continuous Agile Sprint releases' : 'Entregas ágiles continuas'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
