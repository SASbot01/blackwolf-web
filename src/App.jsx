import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Satellite, CheckCircle, ArrowRight, Activity, Zap, FileWarning, X, FileText, Scale, Globe, Calendar } from 'lucide-react';
// import emailjs from '@emailjs/browser'; // ESTO FUE ELIMINADO PORQUE CAUSABA EL ERROR DE COMPILACIÓN

const BlackWolfLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  
  // --- ESTADO DE IDIOMA ('es' o 'en') ---
  const [lang, setLang] = useState('es'); 

  const form = useRef();

  // --- CONFIGURACIÓN DE EMAILJS (MOVIDO AL ÁMBITO GLOBAL DE LA FUNCIÓN) ---
  const SERVICE_ID = 'service_5he3zdo'; // ID CORRECTO DE TU PANEL
  const TEMPLATE_ID = 'template_jten7cj'; // ID PROPORCIONADO POR EL USUARIO
  const PUBLIC_KEY = 'Bi1JTPlVrUxDqibOc'; // CLAVE PÚBLICA PROPORCIONADA

  // --- CONFIGURACIÓN CALENDLY ---
  // ¡OJO! Cambia esto por tu enlace real de evento, ej: "https://calendly.com/blackwolf-sec/auditoria"
  const CALENDLY_URL = "https://calendly.com/"; 

  // --- RUTA BASE ---
  const REPO_BASE = "/blackwolf-web"; 

  // --- ASSETS ---
  const wolfLogoUrl = REPO_BASE + "/assets/blackwolf_head_transparent.png";
  const videoUrl = REPO_BASE + "/assets/videos/Video_de_Bienvenida_Blackwolf.mp4";
  
  const base = window.location.origin + REPO_BASE;
  const clientLogos = [
    { img: base + "/assets/images/logos/nasa.webp", pdf: base + "/assets/docs/NASA_Report_BlackWolf.pdf", alt: "NASA Vulnerability Report" },
    { img: base + "/assets/images/logos/uber.webp", pdf: base + "/assets/docs/Uber_Bounty_Report.pdf", alt: "Uber Eats Bounty" },
    { img: base + "/assets/images/logos/isntagram.webp", pdf: base + "/assets/docs/instagram_report.pdf", alt: "Instagram Report" },
    { img: base + "/assets/images/logos/logo-nexustech.png", pdf: null, alt: "NexusTech" },
    { img: base + "/assets/images/logos/logo-aurorasystems.png", pdf: null, alt: "Aurora Systems" },
    { img: base + "/assets/images/logos/logo-gridforce.png", pdf: null, alt: "GridForce" },
  ];

  // --- DICCIONARIO DE TRADUCCIONES ---
  const content = {
    es: {
      nav: {
        cta: "SOLICITAR AUDITORÍA",
      },
      hero: {
        subtitle: "Corporate Offensive Security",
        title1: "Firma de",
        title2: "Ciberseguridad Ofensiva",
        title3: "Para Entornos Críticos",
        desc: <>Protegemos infraestructuras corporativas y consejos de administración. Nuestro equipo ha reportado vulnerabilidades confirmadas en la <span className="text-white font-semibold border-b border-white/30">NASA</span>.</>,
        button: "Solicitar Evaluación",
        live: "LIVE FEED // ENCRYPTED"
      },
      method: {
        title: "INGENIERÍA",
        titleHighlight: "OFENSIVA",
        desc: "No usamos defensas pasivas. Auditamos su empresa con la misma sofisticación técnica que utilizan los atacantes reales.",
        cards: [
          { title: "Detección Ofensiva", text: "Simulamos vectores de ataque reales antes de que sean explotados." },
          { title: "Impacto de Negocio", text: "Traducimos vulnerabilidades técnicas a riesgos financieros." },
          { title: "Acompañamiento", text: "Reportes para C-Level (riesgo) y equipos técnicos (remediación)." },
          { title: "Vigilancia Continua", text: "La superficie de ataque cambia. Nuestra vigilancia también." },
          { title: "Transparencia", text: "Alcance, metodología y entregables definidos por contrato." }
        ],
        ctaCard: {
          title: "¿Su infraestructura resistiría?",
          button: "CONTACTAR"
        }
      },
      risk: {
        title: "RIESGO ESTRUCTURAL Y",
        titleHighlight: "CUMPLIMIENTO",
        quote: "\"El coste del cumplimiento es alto, pero el coste del incumplimiento es el cierre.\"",
        list1: "Responsabilidad directa de administradores (NIS2).",
        list2: "Sanciones regulatorias por fugas (RGPD).",
        stats: [
          { num: "24h", label: "Plazo máximo notificación incidentes (NIS2)." },
          { num: "4%", label: "Sanción máxima facturación anual (RGPD)." },
          { num: "ISO", label: "Estándares requeridos para licitaciones." }
        ],
        complianceTitle: "Integridad y Compliance",
        complianceItems: [
          { title: "RGPD / GDPR", desc: "Evitamos brechas y sanciones." },
          { title: "Directiva NIS2", desc: "Resiliencia operativa asegurada." },
          { title: "Secretos", desc: "Protección de know-how estratégico." },
          { title: "ISO 27001", desc: "Preparación para auditorías." }
        ],
        clientsTitle: "Capacidad Demostrada",
        verified: "Verified",
        clientsDesc: "Empresas e instituciones donde nuestro equipo ha reportado vulnerabilidades críticas o participado en programas de recompensa."
      },
      form: {
        title: "Solicitar Auditoría",
        secure: "Información protegida bajo estricto NDA.",
        labels: {
          name: "Nombre",
          email: "Email Corporativo",
          phone: "Teléfono",
          phoneOp: "(opcional)",
          domain: "Dominio Corporativo",
          industry: "Industria",
          location: "Sede",
          objective: "Objetivo"
        },
        placeholders: {
          name: "Nombre Completo",
          email: "usuario@empresa.com",
          phone: "+34 600...",
          domain: "ejemplo.com",
          location: "Ciudad, País",
          objective: "Cumplimiento, Auditoría..."
        },
        industries: ["Financiero / Banca", "Salud / Farma", "Industrial / Energía", "Tecnología"],
        checks: {
          authTitle: "Autorización de Seguridad (Safe Harbor)",
          authText: "Acepto y autorizo el análisis de vulnerabilidades sobre el dominio facilitado.",
          authLink: "Leer términos de Safe Harbor",
          privTitle: "Confidencialidad y NDA",
          privText: "Acepto el tratamiento de datos bajo secreto profesional.",
          privLink: "Ver acuerdo de privacidad"
        },
        button: "ENVIAR SOLICITUD",
        successTitle: "Solicitud Registrada",
        successText: "Su solicitud ha sido procesada correctamente por nuestro sistema."
      },
      calendly: {
          title: "Siguientes Pasos",
          text: "Nuestro equipo de expertos necesitará entre 48-72 horas para revisar la seguridad de su empresa. Por favor, utilice el calendario a continuación para agendar la llamada de presentación de resultados una vez finalizado ese plazo.",
      },
      modals: {
        authTitle: "Acuerdo de Safe Harbor & Autorización",
        authContent: <>
          <p><strong>1. OBJETO:</strong> Por el presente, el solicitante autoriza a BLACKWOLF INTEL a realizar maniobras de reconocimiento pasivo y análisis de superficie de ataque sobre el dominio facilitado.</p>
          <p><strong>2. NO INTRUSIVO:</strong> Estas maniobras se limitarán a la identificación de vulnerabilidades públicas. No se realizarán ataques de denegación de servicio (DoS) ni alteraciones.</p>
          <p><strong>3. SAFE HARBOR:</strong> La Firma actúa bajo principios de "Hacking Ético". Los hallazgos no serán divulgados públicamente. Esta autorización exime de responsabilidad por el acceso a sistemas vulnerables dentro del diagnóstico.</p>
        </>,
        privTitle: "Acuerdo de Confidencialidad (NDA)",
        privContent: <>
          <p><strong>1. CONFIDENCIALIDAD:</strong> Todos los datos y hallazgos están protegidos bajo estricto Secreto Profesional.</p>
          <p><strong>2. TRATAMIENTO:</strong> La información no será compartida con terceros. Los datos técnicos se almacenan cifrados.</p>
          <p><strong>3. ÉTICA:</strong> Tratar sus datos con el máximo nivel de seguridad es nuestro modelo de negocio.</p>
        </>,
        button: "Entendido"
      },
      footer: {
        legal: ["Legal", "Privacidad", "Contacto"]
      }
    }
  };

  const t = content[lang] || content['es'];
  
  // Hook para cargar librerías externas (EmailJS y Calendly)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // 1. Carga del CDN de EmailJS
    const scriptEmail = document.createElement('script');
    scriptEmail.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    scriptEmail.async = true;
    scriptEmail.onload = () => {
        if (window.emailjs) {
            window.emailjs.init(PUBLIC_KEY);
        }
    };
    document.body.appendChild(scriptEmail);

    // 2. Carga de CSS de Calendly
    const linkCalCss = document.createElement('link');
    linkCalCss.href = "https://assets.calendly.com/assets/external/widget.css";
    linkCalCss.rel = "stylesheet";
    document.head.appendChild(linkCalCss);

    // 3. Carga de JS de Calendly
    const scriptCalJs = document.createElement('script');
    scriptCalJs.src = "https://assets.calendly.com/assets/external/widget.js";
    scriptCalJs.async = true;
    document.body.appendChild(scriptCalJs);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.removeChild(scriptEmail);
      document.body.removeChild(scriptCalJs);
      document.head.removeChild(linkCalCss);
    };
  }, []);

  // Efecto para inicializar el widget de Calendly cuando se muestra el formulario de éxito
  useEffect(() => {
    if (formSubmitted && window.Calendly) {
        // Pequeño timeout para asegurar que el DOM se ha renderizado
        setTimeout(() => {
            window.Calendly.initInlineWidget({
                url: CALENDLY_URL,
                parentElement: document.getElementById('calendly-embed'),
                prefill: {},
                utm: {}
            });
        }, 500);
    }
  }, [formSubmitted]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (typeof window.emailjs === 'undefined') {
        console.error("EmailJS no está cargado.");
        setIsLoading(false);
        alert(lang === 'es' ? "Error al enviar: El servicio de email no está cargado." : "Sending error: Email service is not loaded.");
        return;
    }

    window.emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current)
      .then((result) => {
          setIsLoading(false);
          setFormSubmitted(true);
          document.getElementById('application-section').scrollIntoView({ behavior: 'smooth' });
      }, (error) => {
          console.error("Error al enviar el formulario:", error);
          setIsLoading(false);
          alert(lang === 'es' ? `Error al enviar: El destino del correo está vacío. Por favor, ve a EmailJS, abre la plantilla con ID '${TEMPLATE_ID}' y configura el campo 'Para enviar por correo electrónico' (To email) con tu dirección.` : "Error sending: The template is missing the recipient address.");
      });
  };

  // --- MODAL COMPONENT ---
  const LegalModal = ({ title, content, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-slate-900/90 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-fade-in p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
        <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
          <Scale className="w-6 h-6 text-blue-400" />
          <h3 className="font-josefin font-bold text-xl text-white uppercase tracking-widest">{title}</h3>
        </div>
        <div className="font-inter text-slate-300 text-sm leading-relaxed space-y-4">{content}</div>
        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-slate-200">{t.modals.button}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full font-sans text-slate-200 selection:bg-blue-500/30 selection:text-white overflow-x-hidden bg-black relative">
      
      {/* --- MODALES LEGALES --- */}
      {activeModal === 'auth' && <LegalModal onClose={() => setActiveModal(null)} title={t.modals.authTitle} content={t.modals.authContent} />}
      {activeModal === 'privacy' && <LegalModal onClose={() => setActiveModal(null)} title={t.modals.privTitle} content={t.modals.privContent} />}

      {/* --- BACKGROUNDS --- */}
      <div className="fixed inset-0 bg-black z-[-5]"></div>
      <div className="fixed inset-0 z-[-4] opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-blue-900/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-indigo-900/20 rounded-full blur-[60px] md:blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[90vw] h-[60vw] md:w-[60vw] md:h-[40vw] bg-slate-800/20 rounded-full blur-[80px] md:blur-[120px]"></div>
      </div>
      <div className="fixed inset-0 z-[-3] opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="fixed inset-0 z-[-2] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Josefin+Sans:wght@400;500;600;700&display=swap');
          .font-josefin { font-family: 'Josefin Sans', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          .text-metallic { background: linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0px 0px 20px rgba(255,255,255,0.1); }
          .glass-card { background: rgba(10, 10, 10, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); }
          .glass-card:hover { background: rgba(20, 20, 20, 0.6); border-color: rgba(255, 255, 255, 0.15); box-shadow: 0 0 30px rgba(59, 130, 246, 0.1); }
          .custom-checkbox { appearance: none; background-color: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; display: grid; place-content: center; transition: all 0.2s; cursor: pointer; width: 1.25rem; height: 1.25rem; margin-top: 0.15rem; }
          .custom-checkbox::before { content: ""; width: 0.65em; height: 0.65em; transform: scale(0); transition: 120ms transform ease-in-out; box-shadow: inset 1em 1em white; transform-origin: center; clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%); }
          .custom-checkbox:checked { background-color: #3b82f6; border-color: #3b82f6; }
          .custom-checkbox:checked::before { transform: scale(1); }
          @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
          html { scroll-behavior: smooth; }
        `}
      </style>

      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 bg-transparent"> 
             <img src={wolfLogoUrl} alt="BlackWolf Icon" className="h-10 md:h-12 w-auto opacity-100 bg-transparent" /> 
            <span className="font-josefin font-bold text-lg md:text-xl tracking-[0.2em] text-metallic">BLACKWOLF</span>
          </div>
          <div className="flex items-center gap-4">
            {/* BUTTON LANG SWITCH */}
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 transition-colors font-mono text-xs uppercase tracking-widest">
              <Globe className="w-3 h-3" />
              {lang === 'es' ? 'ES' : 'EN'}
            </button>

            <button onClick={() => document.getElementById('application-section').scrollIntoView()} className="hidden md:block px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-josefin text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {t.nav.cta}
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-20 md:pt-32 md:pb-32 px-6">
        <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 text-center lg:text-left">
            <div className="relative">
              <h2 className="font-josefin font-bold text-slate-400 text-xs md:text-base tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 uppercase flex items-center justify-center lg:justify-start gap-3">
                <span className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-slate-500 to-transparent"></span>
                {t.hero.subtitle}
              </h2>
              <h1 className="font-josefin font-bold text-4xl sm:text-5xl md:text-7xl leading-[1.1] uppercase tracking-wide">
                <span className="text-white block mb-2 drop-shadow-2xl">{t.hero.title1}</span>
                <span className="text-metallic block">{t.hero.title2}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 text-2xl sm:text-3xl md:text-5xl block mt-4 tracking-wider font-light">{t.hero.title3}</span>
              </h1>
            </div>
            <p className="font-inter text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-light mx-auto lg:mx-0 lg:pl-6 lg:border-l-2 border-slate-900/50">
              {t.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4 md:mt-6 w-full sm:w-auto mx-auto lg:mx-0">
              <button onClick={() => document.getElementById('application-section').scrollIntoView()} className="group w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-josefin font-bold text-xs tracking-[0.15em] uppercase hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3">
                {t.hero.button}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative perspective-1000 group w-full mt-8 lg:mt-0">
            <div className="relative w-full aspect-video bg-black rounded-xl border border-white/10 overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,1)] transition-all duration-500 group-hover:border-white/30 group-hover:scale-[1.02]">
              <video src={videoUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" autoPlay loop muted playsInline />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-[9px] md:text-[10px] font-mono text-slate-300 uppercase tracking-widest bg-black/60 backdrop-blur px-2 py-1 md:px-3 rounded border border-white/5">{t.hero.live}</span>
              </div>
            </div>
            <div className="absolute -inset-4 bg-blue-600/10 blur-3xl -z-10 rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>

      {/* --- METHOD --- */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <div className="max-w-2xl">
              <h2 className="font-josefin font-bold text-3xl md:text-5xl mb-4 md:mb-6 leading-tight text-white">
                {t.method.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500">{t.method.titleHighlight}</span>
              </h2>
              <p className="font-inter text-slate-400 text-base md:text-lg leading-relaxed">{t.method.desc}</p>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-gradient-to-l from-white/20 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {t.method.cards.map((item, idx) => (
                <div key={idx} className="glass-card p-6 md:p-8 rounded-2xl transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-xs text-slate-500 group-hover:text-slate-400 transition-colors">0{idx + 1}</span>
                    <div className="text-slate-600 group-hover:text-white transition-colors">
                      {idx === 0 && <Activity className="w-5 h-5" />}
                      {idx === 1 && <Zap className="w-5 h-5" />}
                      {idx === 2 && <CheckCircle className="w-5 h-5" />}
                      {idx === 3 && <Satellite className="w-5 h-5" />}
                      {idx === 4 && <FileWarning className="w-5 h-5" />}
                    </div>
                  </div>
                  <h3 className="font-josefin font-bold text-lg md:text-xl text-slate-200 mb-3 group-hover:text-white">{item.title}</h3>
                  <p className="font-inter text-slate-500 text-sm leading-relaxed group-hover:text-slate-400">{item.text}</p>
                </div>
             ))}
             <div className="relative p-[1px] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-black/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl h-full flex flex-col justify-center items-center text-center">
                  <Shield className="w-10 h-10 md:w-12 md:h-12 text-slate-500 mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                  <h3 className="font-josefin font-bold text-white text-lg mb-6">{t.method.ctaCard.title}</h3>
                  <button onClick={() => document.getElementById('application-section').scrollIntoView()} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105">
                    {t.method.ctaCard.button}
                  </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- RISK & CREDENTIALS --- */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30vw] h-[60vh] bg-slate-800/10 blur-[100px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start md:items-center mb-20 md:mb-24">
            <div>
              <h2 className="font-josefin font-bold text-3xl md:text-4xl mb-6 md:mb-8 text-white">{t.risk.title} <br/><span className="text-slate-500">{t.risk.titleHighlight}</span></h2>
              <div className="glass-card p-6 md:p-8 rounded-xl border-l-4 border-l-slate-900/50">
                <p className="font-josefin text-lg md:text-xl text-slate-300 italic mb-6">{t.risk.quote}</p>
                <ul className="space-y-4 font-inter text-slate-400 text-sm">
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div> {t.risk.list1}</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div> {t.risk.list2}</li>
                </ul>
              </div>
            </div>
            <div className="grid gap-4">
               {t.risk.stats.map((data, idx) => (
                <div key={idx} className="glass-card p-6 rounded-lg flex items-center justify-between hover:bg-white/5 transition-colors">
                  <span className="font-josefin font-bold text-2xl md:text-3xl text-white drop-shadow-lg">{data.num}</span>
                  <p className="font-inter text-[10px] text-slate-400 uppercase tracking-widest font-semibold text-right">{data.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 pt-12 border-t border-white/5">
            <div className="lg:col-span-6">
              <h3 className="font-josefin text-2xl text-white font-bold mb-8 flex items-center gap-3"><Lock className="w-6 h-6 text-slate-500" />{t.risk.complianceTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                 {t.risk.complianceItems.map((item, i) => (
                   <div key={i} className="p-4 rounded border border-white/5 hover:border-white/20 transition-colors bg-black/20">
                     <h4 className="font-josefin text-white font-bold mb-1">{item.title}</h4>
                     <p className="text-xs text-slate-500">{item.desc}</p>
                   </div>
                 ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="glass-card h-full p-6 md:p-8 rounded-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full group-hover:bg-white/20 transition-all duration-500"></div>
                 <div className="relative z-10">
                   <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                      <h3 className="font-josefin text-2xl text-white font-bold">{t.risk.clientsTitle}</h3>
                      <div className="self-start sm:self-auto px-3 py-1 rounded-full border border-slate-500/30 bg-slate-50/10 text-[10px] font-mono text-slate-300 uppercase tracking-widest">{t.risk.verified}</div>
                   </div>
                   <p className="text-slate-400 text-sm mb-8">{t.risk.clientsDesc}</p>
                   
                   {/* MODIFICADO: Solo mostrar las primeras 3 imágenes (0, 3) */}
                   <div className="grid grid-cols-3 gap-4">
                     {clientLogos.slice(0, 3).map((item, idx) => ( 
                       <div key={idx} className={`aspect-video bg-black/40 rounded border border-white/5 flex items-center justify-center p-3 transition-all duration-300 ${item.pdf ? 'hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer group/link' : 'hover:border-white/20 hover:bg-white/5'}`}>
                         {item.pdf ? (
                            <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center relative">
                               <img src={item.img} alt={item.alt} className="w-full h-full object-contain grayscale opacity-40 group-hover/link:opacity-100 group-hover/link:grayscale-0 transition-all duration-500" />
                               <FileText className="absolute w-4 h-4 text-blue-400 opacity-0 group-hover/link:opacity-100 transition-opacity top-0 right-0" />
                            </a>
                         ) : (
                            <img src={item.img} alt="Client Logo" className="w-full h-full object-contain grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500" />
                         )}
                       </div>
                     ))}
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORMULARIO --- */}
      <section id="application-section" className="py-20 md:py-32 relative">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          {!formSubmitted ? (
            <div className="glass-card rounded-3xl p-6 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="font-josefin font-bold text-2xl md:text-3xl text-white mb-4">{t.form.title}</h2>
                <p className="font-inter text-slate-500 text-sm flex justify-center items-center gap-2"><Lock className="w-3 h-3" /> {t.form.secure}</p>
              </div>

              <form ref={form} onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t.form.labels.name}</label>
                    <input required name="user_name" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder={t.form.placeholders.name} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t.form.labels.email}</label>
                    <input required name="user_email" type="email" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder={t.form.placeholders.email} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t.form.labels.phone} <span className="text-slate-600 font-normal lowercase">{t.form.labels.phoneOp}</span></label>
                    <input name="phone" type="tel" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder={t.form.placeholders.phone} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t.form.labels.domain} <span className="text-red-500">*</span></label>
                    <input required name="domain" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder={t.form.placeholders.domain} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t.form.labels.industry}</label>
                    <select name="industry" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm appearance-none">
                      {t.form.industries.map((ind, i) => <option key={i}>{ind}</option>)}
                    </select>
                  </div>
                   <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t.form.labels.location}</label>
                    <input name="location" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder={t.form.placeholders.location} />
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">{t.form.labels.objective}</label>
                   <input name="message" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder={t.form.placeholders.objective} />
                </div>
                
                <div className="space-y-5 pt-6 border-t border-white/5">
                    <div className="flex gap-4 items-start group">
                        <input required id="auth-check" type="checkbox" className="custom-checkbox shrink-0 mt-1" />
                        <label htmlFor="auth-check" className="text-xs text-slate-400 font-inter leading-relaxed cursor-pointer transition-colors hover:text-white">
                            <span className="text-white font-bold block mb-1">{t.form.checks.authTitle}</span>
                            {t.form.checks.authText} 
                            <button type="button" onClick={(e) => {e.preventDefault(); setActiveModal('auth')}} className="ml-1 text-blue-400 hover:text-blue-300 underline underline-offset-2 decoration-blue-500/30">{t.form.checks.authLink}</button>.
                        </label>
                    </div>

                    <div className="flex gap-4 items-start group">
                        <input required id="privacy-check" type="checkbox" className="custom-checkbox shrink-0 mt-1" />
                        <label htmlFor="privacy-check" className="text-xs text-slate-400 font-inter leading-relaxed cursor-pointer transition-colors hover:text-white">
                             <span className="text-white font-bold block mb-1">{t.form.checks.privTitle}</span>
                             {t.form.checks.privText} 
                             <button type="button" onClick={(e) => {e.preventDefault(); setActiveModal('privacy')}} className="ml-1 text-blue-400 hover:text-blue-300 underline underline-offset-2 decoration-blue-500/30">{t.form.checks.privLink}</button>.
                        </label>
                    </div>
                </div>

                <div className="pt-6">
                  <button type="submit" disabled={isLoading} className="w-full bg-white text-black rounded-lg py-4 font-josefin font-bold uppercase tracking-[0.15em] text-xs hover:bg-slate-200 transition-all disabled:opacity-50 flex justify-center gap-2 items-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      {isLoading ? <Activity className="w-4 h-4 animate-spin" /> : t.form.button}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-6 md:p-10 text-center shadow-2xl animate-fade-in w-full max-w-4xl mx-auto">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="font-josefin font-bold text-2xl text-white mb-2">{t.form.successTitle}</h2>
                <p className="font-inter text-slate-400 text-sm mb-4">{t.form.successText}</p>
              </div>

              <div className="w-full h-px bg-white/10 mb-8"></div>

              {/* --- CONTENEDOR DE CALENDLY INLINE --- */}
              <div className="w-full text-left">
                  <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <h3 className="font-josefin font-bold text-white uppercase tracking-widest text-sm">{t.calendly.title}</h3>
                  </div>
                  <p className="font-inter text-slate-300 text-sm leading-relaxed mb-6">
                    {t.calendly.text}
                  </p>
                  
                  {/* El widget se renderizará aquí. Altura ajustada para el widget. */}
                  <div 
                    id="calendly-embed" 
                    className="w-full rounded-xl overflow-hidden border border-white/10 bg-white/5" 
                    style={{ minHeight: '700px' }}
                  ></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 md:py-20 border-t border-white/5 bg-black/40 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 bg-transparent">
            <img src={wolfLogoUrl} alt="BlackWolf" className="h-6 w-auto bg-transparent" />
            <span className="font-josefin font-bold text-lg tracking-[0.2em] text-white">BLACKWOLF</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {t.footer.legal.map((text) => (
               <a key={text} href="#" className="font-inter text-xs text-slate-500 hover:text-white transition-colors uppercase tracking-widest">{text}</a>
            ))}
          </div>
          <div className="font-mono text-[10px] text-slate-700">© {new Date().getFullYear()} BLACKWOLF INTEL.</div>
        </div>
      </footer>
    </div>
  );
};

export default BlackWolfLanding;