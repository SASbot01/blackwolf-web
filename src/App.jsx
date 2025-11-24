import React, { useState, useEffect } from 'react';
import { Shield, Lock, Satellite, CheckCircle, ArrowRight, Play, FileWarning, Scale, Activity, Zap } from 'lucide-react';

const BlackWolfLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const REPO_BASE = "/blackwolf-web";

  // --- RUTAS CORREGIDAS ---
  const wolfLogoUrl = REPO_BASE + "/assets/logo1.png"; 
  const videoUrl = REPO_BASE + "/assets/Video_de_Bienvenida_Blackwolf.mp4";
  
  const clientLogos = [
   REPO_BASE + "/assets/images/logos/nasa.webp",
   REPO_BASE + "/assets/images/logos/uber.webp",
    "/assets/images/logos/logo-digitaasystems.png",
    "/assets/images/logos/logo-nexustech.png",
    "/assets/images/logos/logo-aurorasystems.png",
    "/assets/images/logos/logo-gridforce.png",
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
    setTimeout(() => {
      setIsLoading(false);
      setFormSubmitted(true);
      document.getElementById('application-section').scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full font-sans text-slate-200 selection:bg-blue-500/30 selection:text-white overflow-x-hidden bg-black relative">
      
      {/* --- FONDO GLOBAL UNIFICADO (EL SECRETO DEL DISEÑO) --- */}
      {/* 1. Fondo Base Negro */}
      <div className="fixed inset-0 bg-black z-[-5]"></div>

      {/* 2. Orbes de Luz Ambiental (Gradients) que eliminan la sensación plana */}
      <div className="fixed inset-0 z-[-4] opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[40vw] bg-slate-800/20 rounded-full blur-[120px]"></div>
      </div>

      {/* 3. Malla Tecnológica (Grid) Sutil */}
      <div className="fixed inset-0 z-[-3] opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* 4. Efecto Vignette (Oscurece los bordes para centrar la atención) */}
      <div className="fixed inset-0 z-[-2] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Josefin+Sans:wght@400;500;600;700&display=swap');
          
          .font-josefin { font-family: 'Josefin Sans', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          
          /* TEXTO METALIZADO MEJORADO */
          .text-metallic {
            background: linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0px 0px 20px rgba(255,255,255,0.1);
          }

          /* TARJETAS GLASSMORPHISM (Cristal Ahumado) */
          .glass-card {
            background: rgba(10, 10, 10, 0.4); /* Muy transparente */
            backdrop-filter: blur(12px); /* Desenfoque del fondo */
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          }
          
          .glass-card:hover {
            background: rgba(20, 20, 20, 0.6);
            border-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.1); /* Glow azul sutil */
          }

          /* ANIMACIÓN SUAVE PARA EL SCROLL */
          html { scroll-behavior: smooth; }
        `}
      </style>

      {/* --- NAVIGATION --- */}
   <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
    
      {/* INICIO DEL BLOQUE AJUSTADO */}
     <div className="flex items-center gap-3 bg-transparent"> 
         <img 
            src={wolfLogoUrl} 
            alt="BlackWolf Icon" 
         // h-12 y w-auto para tamaño, **opacity-100** y **bg-transparent** son clave
            className="h-12 w-auto opacity-100 bg-transparent" 
         /> 
      <span className="font-josefin font-bold text-xl tracking-[0.2em] text-metallic">BLACKWOLF</span>
    </div>
    {/* FIN DEL BLOQUE AJUSTADO */}
    
         <button 
            onClick={() => document.getElementById('application-section').scrollIntoView()}
            className="hidden md:block px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-josefin text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
         >
         SOLICITAR AUDITORÍA
         </button>
      </div>
   </nav>

      {/* --- SECTION 1: HERO (Sin bordes, inmersivo) --- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 px-6">
        <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-16 items-center relative z-10">
          
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="relative">
              {/* Elemento decorativo Hexagon ELIMINADO */}

              {/* Subtítulo CORPORATE OFFENSIVE SECURITY A GRIS/PLATA */}
              <h2 className="font-josefin font-bold text-slate-400 text-sm md:text-base tracking-[0.3em] mb-6 uppercase flex items-center gap-3">
                <span className="w-12 h-[1px] bg-gradient-to-r from-slate-500 to-transparent"></span>
                Corporate Offensive Security
              </h2>
              <h1 className="font-josefin font-bold text-5xl md:text-7xl leading-[1.05] uppercase tracking-wide">
                <span className="text-white block mb-2 drop-shadow-2xl">Firma de</span>
                <span className="text-metallic block">Ciberseguridad Ofensiva</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 text-3xl md:text-5xl block mt-4 tracking-wider font-light">Para Entornos Críticos</span>
              </h1>
            </div>

            <p className="font-inter text-slate-400 text-lg leading-relaxed max-w-2xl font-light pl-6 border-l-2 border-slate-900/50">
              Protegemos infraestructuras corporativas y consejos de administración. Nuestro equipo ha reportado vulnerabilidades confirmadas en la <span className="text-white font-semibold border-b border-white/30">NASA</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mt-6">
              <button 
                onClick={() => document.getElementById('application-section').scrollIntoView()}
                className="group px-10 py-4 rounded-full bg-white text-black font-josefin font-bold text-xs tracking-[0.15em] uppercase hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3"
              >
                Solicitar Evaluación
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Video Monitor - Flotando con sombra difusa */}
          <div className="lg:col-span-5 relative perspective-1000 group">
            <div className="relative w-full aspect-video bg-black rounded-xl border border-white/10 overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,1)] transition-all duration-500 group-hover:border-white/30 group-hover:scale-[1.02]">
              <video 
                src={videoUrl} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
                autoPlay loop muted playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest bg-black/60 backdrop-blur px-3 py-1 rounded border border-white/5">
                  LIVE FEED // ENCRYPTED
                </span>
              </div>
            </div>
            {/* Glow azul detrás del video (se mantiene para dar profundidad) */}
            <div className="absolute -inset-4 bg-blue-600/10 blur-3xl -z-10 rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: MÉTODO (Cards Flotantes, sin cortes de sección) --- */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-josefin font-bold text-4xl md:text-5xl mb-6 leading-tight text-white">
                INGENIERÍA <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500">OFENSIVA</span>
              </h2>
              <p className="font-inter text-slate-400 text-lg leading-relaxed">
                No usamos defensas pasivas. Auditamos su empresa con la misma sofisticación técnica que utilizan los atacantes reales.
              </p>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-gradient-to-l from-white/20 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Cards con efecto Glassmorphism */}
             {[
               { id: "01", title: "Detección Ofensiva", text: "Simulamos vectores de ataque reales antes de que sean explotados.", icon: <Activity className="w-5 h-5" /> },
               { id: "02", title: "Impacto de Negocio", text: "Traducimos vulnerabilidades técnicas a riesgos financieros.", icon: <Zap className="w-5 h-5" /> },
               { id: "03", title: "Acompañamiento", text: "Reportes para C-Level (riesgo) y equipos técnicos (remediación).", icon: <CheckCircle className="w-5 h-5" /> },
               { id: "04", title: "Vigilancia Continua", text: "La superficie de ataque cambia. Nuestra vigilancia también.", icon: <Satellite className="w-5 h-5" /> },
               { id: "05", title: "Transparencia", text: "Alcance, metodología y entregables definidos por contrato.", icon: <FileWarning className="w-5 h-5" /> }
             ].map((item, idx) => (
                <div key={idx} className="glass-card p-8 rounded-2xl transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-xs text-slate-500 group-hover:text-slate-400 transition-colors">0{idx + 1}</span>
                    <div className="text-slate-600 group-hover:text-white transition-colors">{item.icon}</div>
                  </div>
                  <h3 className="font-josefin font-bold text-xl text-slate-200 mb-3 group-hover:text-white">{item.title}</h3>
                  <p className="font-inter text-slate-500 text-sm leading-relaxed group-hover:text-slate-400">{item.text}</p>
                </div>
             ))}
             
             {/* CTA Card Destacada */}
             <div className="relative p-[1px] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-black/80 backdrop-blur-xl p-8 rounded-2xl h-full flex flex-col justify-center items-center text-center">
                  <Shield className="w-12 h-12 text-slate-500 mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                  <h3 className="font-josefin font-bold text-white text-lg mb-6">¿Su infraestructura resistiría?</h3>
                  <button 
                    onClick={() => document.getElementById('application-section').scrollIntoView()}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105"
                  >
                    Contactar
                  </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3 & 4 MERGED: RIESGO & CREDENCIALES (Layout Asimétrico) --- */}
      <section className="py-24 relative overflow-hidden">
        {/* Glow lateral para unir secciones visualmente */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30vw] h-[60vh] bg-slate-800/10 blur-[100px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h2 className="font-josefin font-bold text-3xl md:text-4xl mb-8 text-white">
                RIESGO ESTRUCTURAL Y <br/>
                <span className="text-slate-500">CUMPLIMIENTO</span>
              </h2>
              <div className="glass-card p-8 rounded-xl border-l-4 border-l-slate-900/50">
                <p className="font-josefin text-xl text-slate-300 italic mb-6">
                  "El coste del cumplimiento es alto, pero el coste del incumplimiento es el cierre."
                </p>
                <ul className="space-y-4 font-inter text-slate-400 text-sm">
                   <li className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div> Responsabilidad directa de administradores (NIS2).
                   </li>
                   <li className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div> Sanciones regulatorias por fugas (RGPD).
                   </li>
                </ul>
              </div>
            </div>

            {/* Datos flotantes */}
            <div className="grid gap-4">
              {[
                { number: "24h", label: "Plazo máximo notificación incidentes (NIS2)." },
                { number: "4%", label: "Sanción máxima facturación anual (RGPD)." },
                { number: "ISO", label: "Estándares requeridos para licitaciones." }
              ].map((data, idx) => (
                <div key={idx} className="glass-card p-6 rounded-lg flex items-center justify-between hover:bg-white/5 transition-colors">
                  <span className="font-josefin font-bold text-3xl text-white drop-shadow-lg">{data.number}</span>
                  <p className="font-inter text-[10px] text-slate-400 uppercase tracking-widest font-semibold text-right">{data.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CREDENCIALES BLOCK */}
          <div className="grid lg:grid-cols-12 gap-12 pt-12 border-t border-white/5">
            <div className="lg:col-span-6">
              <h3 className="font-josefin text-2xl text-white font-bold mb-8 flex items-center gap-3">
                <Lock className="w-6 h-6 text-slate-500" />
                Integridad y Compliance
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                 {/* Mini Cards */}
                 {[
                  { title: "RGPD / GDPR", desc: "Evitamos brechas y sanciones." },
                  { title: "Directiva NIS2", desc: "Resiliencia operativa asegurada." },
                  { title: "Secretos", desc: "Protección de know-how estratégico." },
                  { title: "ISO 27001", desc: "Preparación para auditorías." }
                 ].map((item, i) => (
                   <div key={i} className="p-4 rounded border border-white/5 hover:border-white/20 transition-colors bg-black/20">
                     <h4 className="font-josefin text-white font-bold mb-1">{item.title}</h4>
                     <p className="text-xs text-slate-500">{item.desc}</p>
                   </div>
                 ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="glass-card h-full p-8 rounded-2xl relative overflow-hidden group">
                 {/* Efecto de luz al hover */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full group-hover:bg-white/20 transition-all duration-500"></div>
                 
                 <div className="relative z-10">
                   <div className="flex items-center justify-between mb-8">
                      <h3 className="font-josefin text-2xl text-white font-bold">Capacidad Demostrada</h3>
                      <div className="px-3 py-1 rounded-full border border-slate-500/30 bg-slate-50/10 text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                        Verified
                      </div>
                   </div>
                   
                   <p className="text-slate-400 text-sm mb-8">
                     Empresas e instituciones donde nuestro equipo ha reportado vulnerabilidades críticas o participado en programas de recompensa.
                   </p>

                   {/* LOGOS GRID MEJORADO */}
                   <div className="grid grid-cols-3 gap-4">
                     {clientLogos.slice(0, 6).map((logoUrl, idx) => (
                       <div key={idx} className="aspect-video bg-black/40 rounded border border-white/5 flex items-center justify-center p-3 hover:border-white/20 hover:bg-white/5 transition-all duration-300">
                         <img 
                           src={logoUrl} 
                           alt="Client Logo" 
                           className="w-full h-full object-contain grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500" 
                         />
                       </div>
                     ))}
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: FORMULARIO (Elevado y Minimalista) --- */}
      <section id="application-section" className="py-32 relative">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          
          {!formSubmitted ? (
            <div className="glass-card rounded-3xl p-10 md:p-14 relative overflow-hidden">
              {/* Fondo decorativo sutil dentro del form */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              <div className="text-center mb-12">
                <h2 className="font-josefin font-bold text-3xl text-white mb-4">
                  Solicitar Auditoría
                </h2>
                <p className="font-inter text-slate-500 text-sm flex justify-center items-center gap-2">
                  <Lock className="w-3 h-3" /> Información protegida bajo estricto NDA.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Nombre</label>
                    <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder="Nombre Completo" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Email Corporativo</label>
                    <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder="usuario@empresa.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Industria</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm appearance-none">
                      <option>Financiero / Banca</option>
                      <option>Salud / Farma</option>
                      <option>Industrial / Energía</option>
                      <option>Tecnología</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Sede</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm" placeholder="Ciudad, País" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Objetivo</label>
                  <textarea rows="4" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all font-inter text-sm resize-none" placeholder="Cumplimiento normativo, incidente reciente, auditoría anual..."></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-white text-black rounded-lg py-4 font-josefin font-bold uppercase tracking-[0.15em] text-xs hover:bg-slate-200 transition-all disabled:opacity-50 flex justify-center gap-2 items-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                      {isLoading ? <Activity className="w-4 h-4 animate-spin" /> : "ENVIAR SOLICITUD"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-16 text-center shadow-2xl animate-fade-in">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="font-josefin font-bold text-2xl text-white mb-4">Solicitud Registrada</h2>
              <p className="font-inter text-slate-400 text-sm max-w-md mx-auto mb-8">
                Nuestro equipo de análisis de riesgo revisará su perfil y contactará en 24h.
              </p>
              <div className="w-full h-px bg-white/10 max-w-xs mx-auto mb-8"></div>
              <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
                BlackWolf Security Ops
              </p>
            </div>
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 bg-black/40 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <img src={wolfLogoUrl} alt="BlackWolf" className="h-6 w-auto" />
            <span className="font-josefin font-bold text-lg tracking-[0.2em] text-white">BLACKWOLF</span>
          </div>
          <div className="flex gap-8">
            {['Legal', 'Privacidad', 'Contacto'].map((text) => (
               <a key={text} href="#" className="font-inter text-xs text-slate-500 hover:text-white transition-colors uppercase tracking-widest">{text}</a>
            ))}
          </div>
          <div className="font-mono text-[10px] text-slate-700">
            © {new Date().getFullYear()} BLACKWOLF INTEL.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlackWolfLanding;