import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Satellite, CheckCircle, ArrowRight, Activity, Zap, FileWarning, X, FileText } from 'lucide-react';
import emailjs from '@emailjs/browser';

const BlackWolfLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para los Modales Legales
  const [activeModal, setActiveModal] = useState(null); // 'auth' | 'privacy' | null

  const form = useRef();

  // --- RUTA BASE DE GITHUB PAGES ---
  const REPO_BASE = "/blackwolf-web"; 

  // --- RUTAS DE ASSETS ---
  const wolfLogoUrl = REPO_BASE + "/assets/images/blackwolf_head_transparent.png";
  const videoUrl = REPO_BASE + "/assets/videos/Video_de_Bienvenida_Blackwolf.mp4";
  
  // --- CONFIGURACIÓN DE LOGOS CON PDFs ---
  // Ahora cada logo es un objeto con 'img' y 'pdf' (opcional)
  const clientLogos = [
    { 
      img: REPO_BASE + "/assets/images/logos/nasa.webp", 
      pdf: REPO_BASE + "/assets/docs/NASA_Report_BlackWolf.pdf", // <--- Pon aquí tu PDF real
      alt: "NASA Vulnerability Report"
    },
    { 
      img: REPO_BASE + "/assets/images/logos/uber.webp", 
      pdf: REPO_BASE + "/assets/docs/Uber_Bounty_Report.pdf",   // <--- Pon aquí tu PDF real
      alt: "Uber Eats Bounty"
    },
    { img: REPO_BASE + "/assets/images/logos/logo-digitaasystems.png", pdf: null },
    { img: REPO_BASE + "/assets/images/logos/logo-nexustech.png", pdf: null },
    { img: REPO_BASE + "/assets/images/logos/logo-aurorasystems.png", pdf: null },
    { img: REPO_BASE + "/assets/images/logos/logo-gridforce.png", pdf: null },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // --- CREDENCIALES EMAILJS ---
    const SERVICE_ID = 'TU_SERVICE_ID';
    const TEMPLATE_ID = 'TU_TEMPLATE_ID';
    const PUBLIC_KEY = 'TU_PUBLIC_KEY';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log('Enviado:', result.text);
          setIsLoading(false);
          setFormSubmitted(true);
          document.getElementById('application-section').scrollIntoView({ behavior: 'smooth' });
      }, (error) => {
          console.log('Error:', error.text);
          setIsLoading(false);
          alert("Error al enviar. Por favor verifica tu conexión.");
      });
  };

  // --- COMPONENTE DE MODAL (POP-UP) ---
  const LegalModal = ({ title, content, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-slate-900/90 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-fade-in p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
          <Scale className="w-6 h-6 text-blue-400" />
          <h3 className="font-josefin font-bold text-xl text-white uppercase tracking-widest">{title}</h3>
        </div>
        <div className="font-inter text-slate-300 text-sm leading-relaxed space-y-4">
          {content}
        </div>
        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-slate-200">
            Entendido
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full font-sans text-slate-200 selection:bg-blue-500/30 selection:text-white overflow-x-hidden bg-black relative">
      
      {/* --- MODALES LEGALES --- */}
      {activeModal === 'auth' && (
        <LegalModal 
          onClose={() => setActiveModal(null)}
          title="Acuerdo de Safe Harbor & Autorización"
          content={
            <>
              <p><strong>1. OBJETO:</strong> Por el presente, el solicitante autoriza a BLACKWOLF INTEL ("La Firma") a realizar maniobras de reconocimiento pasivo y análisis de superficie de ataque sobre el dominio corporativo indicado en el formulario.</p>
              <p><strong>2. NATURALEZA NO INTRUSIVA:</strong> Estas maniobras se limitarán estrictamente a la identificación de vulnerabilidades públicas y brechas de seguridad visibles. No se realizarán ataques de denegación de servicio (DoS), inyección de código malicioso ni alteración de bases de datos en esta fase preliminar.</p>
              <p><strong>3. CLÁUSULA SAFE HARBOR:</strong> La Firma actúa bajo los principios de "Hacking Ético". Cualquier hallazgo de seguridad será reportado exclusivamente al contacto autorizado y no será explotado ni divulgado públicamente. Esta autorización exime a La Firma de responsabilidad civil o penal por el acceso a sistemas vulnerables, siempre que se mantenga dentro de los límites de este diagnóstico.</p>
              <p><strong>4. GARANTÍA DE INTEGRIDAD:</strong> Nos comprometemos a "no romper nada". Nuestra función es la de guardianes, utilizando mentalidad ofensiva únicamente para el blindaje de la infraestructura del cliente.</p>
            </>
          }
        />
      )}

      {activeModal === 'privacy' && (
        <LegalModal 
          onClose={() => setActiveModal(null)}
          title="Acuerdo de Confidencialidad (NDA)"
          content={
            <>
              <p><strong>1. CONFIDENCIALIDAD ABSOLUTA:</strong> Todos los datos facilitados en este formulario, así como cualquier hallazgo derivado del análisis de seguridad, están protegidos bajo estricto Secreto Profesional. BlackWolf opera bajo una política de "Discreción Absoluta".</p>
              <p><strong>2. TRATAMIENTO DE DATOS:</strong> La información no será vendida, cedida ni compartida con terceros bajo ninguna circunstancia. Los datos técnicos se almacenan en entornos aislados y cifrados.</p>
              <p><strong>3. FINALIDAD:</strong> La información de contacto se utilizará exclusivamente para la entrega del Reporte de Seguridad y la comunicación de soluciones críticas.</p>
              <p><strong>4. COMPROMISO ÉTICO:</strong> Como firma de ciberseguridad boutique, nuestra reputación se basa en la confianza. Tratar sus datos con el máximo nivel de seguridad no es solo una obligación legal (RGPD), es nuestro modelo de negocio.</p>
            </>
          }
        />
      )}

      {/* --- FONDO GLOBAL --- */}
      <div className="fixed inset-0 bg-black z-[-5]"></div>
      <div className="fixed inset-0 z-[-4] opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-blue-900/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-indigo-900/20 rounded-full blur-[60px] md:blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[90vw] h-[60vw] md:w-[60vw] md:h-[40vw] bg-slate-800/20 rounded-full blur-[80px] md:blur-[120px]"></div>
      </div>
      <div className="fixed inset-0 z-[-3] opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="fixed inset-0 z-[-2] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Josefin+Sans:wght@400;500;600;700&display=swap');
          
          .font-josefin { font-family: 'Josefin Sans', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          
          .text-metallic {
            background: linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0px 0px 20px rgba(255,255,255,0.1);
          }

          .glass-card {
            background: rgba(10, 10, 10, 0.4);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          }
          .glass-card:hover {
            background: rgba(20, 20, 20, 0.6);
            border-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.1);
          }

          .custom-checkbox {
            appearance: none;
            background-color: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            display: grid;
            place-content: center;
            transition: all 0.2s;
            cursor: pointer;
            width: 1.25rem;
            height: 1.25rem;
            margin-top: 0.15rem;
          }
          .custom-checkbox::before {
            content: "";
            width: 0.65em;
            height: 0.65em;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            box-shadow: inset 1em 1em white;
            transform-origin: center;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
          }
          .custom-checkbox:checked {
            background-color: #3b82f6;
            border-color: #3b82f6;
          }
          .custom-checkbox:checked::before {
            transform: scale(1);
          }
          
          /* Animación suave para el modal */
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
          }

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
          <button 
            onClick={() => document.getElementById('application-section').scrollIntoView()}
            className="hidden md:block px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-josefin text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            SOLICITAR AUDITORÍA
          </button>
          <button onClick={() => document.getElementById('application-section').scrollIntoView()} className="md:hidden p-2 text-white border border-white/20 rounded-full bg-white/5">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-20 md:pt-32 md:pb-32 px-6">
        <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 text-center lg:text-left">
            <div className="relative">
              <h2 className="font-josefin font-bold text-slate-400 text-xs md:text-base tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 uppercase flex items-center justify-center lg:justify-start gap-3">
                <span className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-slate-500 to-transparent"></span>
                Corporate Offensive Security
              </h2>
              <h1 className="font-josefin font-bold text-4xl sm:text-5xl md:text-7xl leading-[1.1] uppercase tracking-wide">
                <span className="text-white block mb-2 drop-shadow-2xl">Firma de</span>
                <span className="text-metallic block">Ciberseguridad Ofensiva</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 text-2xl sm:text-3xl md:text-5xl block mt-4 tracking-wider font-light">Para Entornos Críticos</span>
              </h1>
            </div>
            <p className="font-inter text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-light mx-auto lg:mx-0 lg:pl-6 lg:border-l-2 border-slate-900/50">
              Protegemos infraestructuras corporativas y consejos de administración. Nuestro equipo ha reportado vulnerabilidades confirmadas en la <span className="text-white font-semibold border-b border-white/30">NASA</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4 md:mt-6 w-full sm:w-auto mx-auto lg:mx-0">
              <button 
                onClick={() => document.getElementById('application-section').scrollIntoView()}
                className="group w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-josefin font-bold text-xs tracking-[0.15em] uppercase hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3"
              >
                Solicitar Evaluación
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
                <span className="text-[9px] md:text-[10px] font-mono text-slate-300 uppercase tracking-widest bg-black/60 backdrop-blur px-2 py-1 md:px-3 rounded border border-white/5">LIVE FEED // ENCRYPTED</span>
              </div>
            </div>
            <div className="absolute -inset-4 bg-blue-600/10 blur-3xl -z-10 rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>

      {/* --- SECCIONES INTERMEDIAS (Omitidas para brevedad, son iguales que antes, mantener layout) --- */}
      <section className="py-20 md:py-32 relative">
          {/* ... (Mantén aquí el contenido de la Sección 2 - Ingeniería Ofensiva del código anterior) ... */}
           <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <div className="max-w-2xl">
              <h2 className="font-josefin font-bold text-3xl md:text-5xl mb-4 md:mb-6 leading-tight text-white">
                INGENIERÍA <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500">OFENSIVA</span>
              </h2>
              <p className="font-inter text-slate-400 text-base md:text-lg leading-relaxed">
                No usamos defensas pasivas. Auditamos su empresa con la misma sofisticación técnica que utilizan los atacantes reales.
              </p>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-gradient-to-l from-white/20 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[{ id: "01", title: "Detección Ofensiva", text: "Simulamos vectores de ataque reales antes de que sean explotados.", icon: <Activity className="w-5 h-5" /> }, { id: "02", title: "Impacto de Negocio", text: "Traducimos vulnerabilidades técnicas a riesgos financieros.", icon: <Zap className="w-5 h-5" /> }, { id: "03", title: "Acompañamiento", text: "Reportes para C-Level (riesgo) y equipos técnicos (remediación).", icon: <CheckCircle className="w-5 h-5" /> }, { id: "04", title: "Vigilancia Continua", text: "La superficie de ataque cambia. Nuestra vigilancia también.", icon: <Satellite className="w-5 h-5" /> }, { id: "05", title: "Transparencia", text: "Alcance, metodología y entregables definidos por contrato.", icon: <FileWarning className="w-5 h-5" /> }].map((item, idx) => (
                <div key={idx} className="glass-card p-6 md:p-8 rounded-2xl transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-xs text-slate-500 group-hover:text-slate-400 transition-colors">0{idx + 1}</span>
                    <div className="text-slate-600 group-hover:text-white transition-colors">{item.icon}</div>
                  </div>
                  <h3 className="font-josefin font-bold text-lg md:text-xl text-slate-200 mb-3 group-hover:text-white">{item.title}</h3>
                  <p className="font-inter text-slate-500 text-sm leading-relaxed group-hover:text-slate-400">{item.text}</p>
                </div>
             ))}
             <div className="relative p-[1px] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-black/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl h-full flex flex-col justify-center items-center text-center">
                  <Shield className="w-10 h-10 md:w-12 md:h-12 text-slate-500 mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                  <h3 className="font-josefin font-bold text-white text-lg mb-6">¿Su infraestructura resistiría?</h3>
                  <button onClick={() => document.getElementById('application-section').scrollIntoView()} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105">
                    Contactar
                  </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- RIESGO & CREDENCIALES (MODIFICADO PARA LINKS PDF) --- */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30vw] h-[60vh] bg-slate-800/10 blur-[100px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start md:items-center mb-20 md:mb-24">
             {/* ... (Parte Izquierda igual: Riesgo Estructural) ... */}
             <div>
              <h2 className="font-josefin font-bold text-3xl md:text-4xl mb-6 md:mb-8 text-white">RIESGO ESTRUCTURAL Y <br/><span className="text-slate-500">CUMPLIMIENTO</span></h2>
              <div className="glass-card p-6 md:p-8 rounded-xl border-l-4 border-l-slate-900/50">
                <p className="font-josefin text-lg md:text-xl text-slate-300 italic mb-6">"El coste del cumplimiento es alto, pero el coste del incumplimiento es el cierre."</p>
                <ul className="space-y-4 font-inter text-slate-400 text-sm">
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div> Responsabilidad directa de administradores (NIS2).</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div> Sanciones regulatorias por fugas (RGPD).</li>
                </ul>
              </div>
            </div>
            <div className="grid gap-4">
               {[{ number: "24h", label: "Plazo máximo notificación incidentes (NIS2)." }, { number: "4%", label: "Sanción máxima facturación anual (RGPD)." }, { number: "ISO", label: "Estándares requeridos para licitaciones." }].map((data, idx) => (
                <div key={idx} className="glass-card p-6 rounded-lg flex items-center justify-between hover:bg-white/5 transition-colors">
                  <span className="font-josefin font-bold text-2xl md:text-3xl text-white drop-shadow-lg">{data.number}</span>
                  <p className="font-inter text-[10px] text-slate-400 uppercase tracking-widest font-semibold text-right">{data.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 pt-12 border-t border-white/5">
             <div className="lg:col-span-6">
              <h3 className="font-josefin text-2xl text-white font-bold mb-8 flex items-center gap-3"><Lock className="w-6 h-6 text-slate-500" />Integridad y Compliance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                 {[{ title: "RGPD / GDPR", desc: "Evitamos brechas y sanciones." }, { title: "Directiva NIS2", desc: "Resiliencia operativa asegurada." }, { title: "Secretos", desc: "Protección de know-how estratégico." }, { title: "ISO 27001", desc: "Preparación para auditorías." }].map((item, i) => (
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
                      <h3 className="font-josefin text-2xl text-white font-bold">Capacidad Demostrada</h3>
                      <div className="self-start sm:self-auto px-3 py-1 rounded-full border border-slate-500/30 bg-slate-50/10 text-[10px] font-mono text-slate-300 uppercase tracking-widest">Verified</div>
                   </div>
                   <p className="text-slate-400 text-sm mb-8">Empresas e instituciones donde nuestro equipo ha reportado vulnerabilidades críticas o participado en programas de recompensa.</p>
                   
                   {/* --- LOGOS CLICABLES A PDF --- */}
                   <div className="grid grid-cols-3 gap-4">
                     {clientLogos.slice(0, 6).map((item, idx) => (
                       <div key={idx} className={`aspect-video bg-black/40 rounded border border-white/5 flex items-center justify-center p-3 transition-all duration-300 ${item.pdf ? 'hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer group/link' : 'hover:border-white/20 hover:bg-white/5'}`}>
                         {item.pdf ? (
                            <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center relative">
                               <img src={item.img} alt={item.alt || "Client Logo"} className="w-full h-full object-contain grayscale opacity-40 group-hover/link:opacity-100 group-hover/link:grayscale-0 transition-all duration-500" />
                               {/* Icono de PDF flotante al hover */}
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

      {/* --- FORMULARIO CON CONTRATO --- */}
      <section id="application-section" className="py-20 md:py-32 relative">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          {!formSubmitted ? (
            <div className="glass-card rounded-3xl p-6 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="font-josefin font-bold text-2xl md:text-3xl text-white mb-4">Solicitar Auditoría</h2>
                <p className="font-inter text-slate-500 text-sm flex justify-center items-center gap-2"><Lock className="w-3 h-3" /> Información protegida bajo estricto NDA.</p>
              </div>

              <form ref={form} onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Nombre</label>
                    <input required name="user_name" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder="Nombre Completo" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Email Corporativo</label>
                    <input required name="user_email" type="email" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder="usuario@empresa.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   {/* NUEVO CAMPO: TELÉFONO (OPCIONAL) */}
                   <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Teléfono <span className="text-slate-600 font-normal lowercase">(opcional)</span></label>
                    <input name="phone" type="tel" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder="+34 600..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Dominio Corporativo <span className="text-red-500">*</span></label>
                    <input required name="domain" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder="ejemplo.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Industria</label>
                    <select name="industry" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm appearance-none">
                      <option>Financiero / Banca</option>
                      <option>Salud / Farma</option>
                      <option>Industrial / Energía</option>
                      <option>Tecnología</option>
                    </select>
                  </div>
                   <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Sede</label>
                    <input name="location" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder="Ciudad, País" />
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Objetivo</label>
                   <input name="message" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder="Cumplimiento, Auditoría..." />
                </div>
                
                {/* --- CHECKBOXES CONTRATO INTERACTIVOS --- */}
                <div className="space-y-5 pt-6 border-t border-white/5">
                    
                    {/* Check 1: SAFE HARBOR */}
                    <div className="flex gap-4 items-start group">
                        <input required id="auth-check" type="checkbox" className="custom-checkbox shrink-0 mt-1" />
                        <label htmlFor="auth-check" className="text-xs text-slate-400 font-inter leading-relaxed cursor-pointer transition-colors hover:text-white">
                            <span className="text-white font-bold block mb-1">Autorización de Seguridad (Safe Harbor)</span>
                            Acepto y autorizo el análisis de vulnerabilidades sobre el dominio facilitado. 
                            <button type="button" onClick={(e) => {e.preventDefault(); setActiveModal('auth')}} className="ml-1 text-blue-400 hover:text-blue-300 underline underline-offset-2 decoration-blue-500/30">
                              Leer términos de Safe Harbor
                            </button>.
                        </label>
                    </div>

                    {/* Check 2: NDA */}
                    <div className="flex gap-4 items-start group">
                        <input required id="privacy-check" type="checkbox" className="custom-checkbox shrink-0 mt-1" />
                        <label htmlFor="privacy-check" className="text-xs text-slate-400 font-inter leading-relaxed cursor-pointer transition-colors hover:text-white">
                             <span className="text-white font-bold block mb-1">Confidencialidad y NDA</span>
                             Acepto el tratamiento de datos bajo secreto profesional.
                             <button type="button" onClick={(e) => {e.preventDefault(); setActiveModal('privacy')}} className="ml-1 text-blue-400 hover:text-blue-300 underline underline-offset-2 decoration-blue-500/30">
                               Ver acuerdo de privacidad
                             </button>.
                        </label>
                    </div>
                </div>

                <div className="pt-6">
                  <button type="submit" disabled={isLoading} className="w-full bg-white text-black rounded-lg py-4 font-josefin font-bold uppercase tracking-[0.15em] text-xs hover:bg-slate-200 transition-all disabled:opacity-50 flex justify-center gap-2 items-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      {isLoading ? <Activity className="w-4 h-4 animate-spin" /> : "ENVIAR SOLICITUD"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-10 md:p-16 text-center shadow-2xl animate-fade-in">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-green-500/20">
                <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
              </div>
              <h2 className="font-josefin font-bold text-xl md:text-2xl text-white mb-4">Solicitud Registrada</h2>
              <p className="font-inter text-slate-400 text-sm max-w-md mx-auto mb-8">Nuestro equipo de análisis de riesgo revisará su perfil y contactará en 24h.</p>
              <div className="w-full h-px bg-white/10 max-w-xs mx-auto mb-8"></div>
              <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">BlackWolf Security Ops</p>
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
            {['Legal', 'Privacidad', 'Contacto'].map((text) => (
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