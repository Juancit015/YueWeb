
import {
  BookOpen,
  Brain,
  Camera,
  CheckCircle2,
  ChevronRight,
  Eye,
  Github,
  GraduationCap,
  HeartHandshake,
  Mic2,
  MonitorCog,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import YueVrm from "./YueVrm.jsx";

const GITHUB_URL = "https://github.com/anghelovillarreal843-rgb/yue-companion";
const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" };

const features = [
  {
    icon: Mic2,
    title: "Voz que acompaña",
    text: "Puedes hablarle y recibir respuestas habladas, con interrupciones naturales cuando necesitas cambiar de idea.",
    accent: "text-[#7df9ff]",
  },
  {
    icon: Eye,
    title: "Presencia visual",
    text: "YUE puede mirar la pantalla y usar la cámara para notar rostro, atención y señales emocionales.",
    accent: "text-[#b388ff]",
  },
  {
    icon: Brain,
    title: "Memoria entre sesiones",
    text: "Recuerda datos y continuidad para que no tengas que empezar desde cero cada vez.",
    accent: "text-[#e0567a]",
  },
  {
    icon: MonitorCog,
    title: "Ayuda en tu PC",
    text: "Puede ejecutar acciones en el escritorio con límites, permisos y confirmaciones.",
    accent: "text-[#7df9ff]",
  },
  {
    icon: GraduationCap,
    title: "Modo profesora",
    text: "Explica materiales, hace preguntas y evalúa respuestas cuando quieres estudiar.",
    accent: "text-[#b388ff]",
  },
  {
    icon: Sparkles,
    title: "Responde con respaldo",
    text: "Usa varios proveedores de IA con relevo automático si uno falla o deja de responder.",
    accent: "text-[#e0567a]",
  },
];

const daySteps = [
  "Te escucha cuando no sabes cómo empezar.",
  "Mira contigo una tarea, una pantalla o un documento.",
  "Recuerda lo importante y mantiene el hilo.",
  "Te ayuda a estudiar o a ordenar el día sin quitarte el control.",
];

export default function YueLanding() {

  const navItems = [
    ["Qué es YUE", "#que-es"],
    ["Funciones", "#funciones"],
    ["Profesora", "#profesora"],
    ["Quiénes somos", "#quienes-somos"],
  ];

  return (
    <main
      className="min-h-screen bg-[#08060f] text-[#ece7f5]"
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: no-preference) {
          .pulse-brand { animation: pulseBrand 4s ease-in-out infinite; }
          .glow-pulse { animation: glowPulse 2.6s ease-in-out infinite; }
          .glow-pulse-soft { animation: glowPulse 3.6s ease-in-out infinite; }
        }
        @keyframes pulseBrand { 0%,100% { opacity:.4; transform:scale(.96); } 50% { opacity:.8; transform:scale(1.04); } }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(125,249,255,0); }
          50% { box-shadow: 0 0 22px 2px rgba(125,249,255,0.35); }
        }
      `}</style>

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#b388ff]/15 bg-[#08060f]/85 backdrop-blur-xl">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
          <a href="#inicio" className="flex w-fit items-center gap-2 transition hover:opacity-85">
            <img
              src="/images/yue-logo.png"
              alt="YUE"
              className="h-9 w-9 rounded-lg object-cover shadow-[0_0_18px_rgba(179,136,255,0.35)]"
            />
            <span className="text-2xl font-extrabold tracking-tight text-[#b388ff]">
              YUE<span className="text-[#7df9ff]">.</span>
            </span>
          </a>
          <div className="flex items-center justify-center gap-6 text-sm font-semibold text-[#9b8fc0]">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="group relative hidden py-1 transition hover:text-[#ece7f5] md:block"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#b388ff] to-[#7df9ff] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center justify-end">
            <a
              href={GITHUB_URL}
              {...EXTERNAL}
              className="group inline-flex items-center gap-2 rounded-md border border-[#b388ff]/30 bg-[#161033] px-4 py-2 text-sm font-bold text-[#ece7f5] transition duration-300 hover:-translate-y-0.5 hover:border-[#7df9ff]/60 hover:text-white hover:shadow-[0_8px_24px_rgba(125,249,255,0.25)]"
            >
              <Github className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
              <span className="hidden sm:inline">Ver proyecto</span>
            </a>
          </div>
        </div>
      </nav>

      <section id="inicio" className="relative overflow-hidden px-4 pt-28 sm:px-6 lg:pt-36">
        <div className="pulse-brand absolute left-1/2 top-28 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#b388ff]/15 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_420px]">
          <div className="relative z-10">
            <p className="mb-4 inline-flex rounded-md border border-[#7df9ff]/25 px-3 py-1 text-sm font-semibold text-[#7df9ff]">
              Compañera virtual de escritorio
            </p>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-[#ece7f5] sm:text-7xl">
              YUE vive en tu escritorio{" "}
              <span className="bg-gradient-to-r from-[#b388ff] to-[#7df9ff] bg-clip-text text-transparent">
                cuando necesitas que alguien esté ahí.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9b8fc0]">
              No es otro chat esperando texto. YUE tiene avatar 3D, voz, memoria y
              una forma de estar contigo: escucha, mira, recuerda y ayuda cuando
              estudiar o seguir el día se vuelve pesado.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="group glow-pulse inline-flex items-center justify-center gap-2 rounded-md border border-[#7df9ff]/40 bg-[#161033] px-5 py-3 font-bold text-[#ece7f5] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7df9ff] hover:shadow-[0_10px_30px_rgba(125,249,255,0.3)] active:scale-95"
              >
                Ver cómo se siente
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
              <a
                href={GITHUB_URL}
                {...EXTERNAL}
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#b388ff] to-[#7df9ff] px-5 py-3 font-bold text-[#06121a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(179,136,255,0.45)] active:scale-95"
              >
                Ver desarrollo
                <Github className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              </a>
            </div>
          </div>
          <div className="relative z-10 h-[500px] lg:h-[560px]">
            <YueVrm className="h-full w-full" />
          </div>
        </div>
      </section>

      <section id="que-es" className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-4xl font-extrabold tracking-tight">Qué es YUE</h2>
        <p className="mt-5 text-lg leading-8 text-[#9b8fc0]">
          YUE es una compañera virtual con cuerpo 3D, voz y continuidad. Puede
          ver lo que ocurre en pantalla o por cámara, recordar lo importante y
          ayudarte con tareas reales del PC. Su foco no es solo responder: es
          acompañarte con presencia.
        </p>
      </section>

      <section id="funciones" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              Lo que la hace distinta
            </h2>
            <p className="mt-3 max-w-2xl text-[#9b8fc0]">
              Funciones reales del proyecto, contadas sin prometer magia.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text, accent }) => (
            <article
              key={title}
              className="group rounded-lg border border-[#38326b]/50 bg-[#0d0a1c] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b388ff]/50 hover:shadow-[0_16px_44px_rgba(179,136,255,0.18)]"
            >
              <span className={`inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#161033] transition-transform duration-300 group-hover:scale-110`}>
                <Icon className={`h-5 w-5 ${accent}`} />
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight">{title}</h3>
              <p className="mt-3 leading-7 text-[#9b8fc0] transition-colors duration-300 group-hover:text-[#b9aee0]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="demo" className="mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">Un día con YUE</h2>
          <p className="mt-4 leading-8 text-[#9b8fc0]">
            La experiencia ocurre en el escritorio: una presencia pequeña, visible,
            que puede hablar contigo mientras trabajas, estudias o intentas ordenar
            lo que sientes.
          </p>
          <div className="mt-8 grid gap-3">
            {daySteps.map((step) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-md border border-[#38326b]/50 bg-[#0d0a1c] p-4"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#7df9ff]" />
                <span className="text-[#ece7f5]">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-[#38326b]/50 bg-[#0d0a1c] p-4 shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between border-b border-[#38326b]/40 pb-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#b388ff]" />
              <span className="h-3 w-3 rounded-full bg-[#7df9ff]" />
              <span className="h-3 w-3 rounded-full bg-[#e0567a]" />
            </div>
            <span className="text-xs font-semibold text-[#9b8fc0]">YUE en escritorio</span>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-[160px_1fr]">
            <div className="flex h-48 flex-col overflow-hidden rounded-lg bg-gradient-to-b from-[#161033] to-[#08060f]">
              <div className="min-h-0 flex-1 flex items-center justify-center">
                <img
                  src="/images/yue.png"
                  alt="YUE escucha"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="shrink-0 bg-[#08060f]/70 py-2 text-center text-sm font-bold text-[#b388ff]">
                YUE escucha
              </p>
            </div>
            <div className="space-y-3">
              <div className="rounded-md bg-[#161033] p-4 text-sm leading-6 text-[#ece7f5]">
                Hoy no me fue bien en una nota.
              </div>
              <div className="rounded-md border border-[#b388ff]/20 bg-[#08060f] p-4 text-sm leading-6 text-[#9b8fc0]">
                Respira. Lo revisamos paso a paso: primero entendemos qué falló,
                luego armamos un plan corto para recuperarlo.
              </div>
              <div className="rounded-md bg-[#161033] p-4 text-sm leading-6 text-[#ece7f5]">
                También tengo que estudiar el PDF.
              </div>
              <div className="rounded-md border border-[#b388ff]/20 bg-[#08060f] p-4 text-sm leading-6 text-[#9b8fc0]">
                Activo modo profesora y empezamos por la primera página.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="profesora" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 rounded-lg border border-[#38326b]/50 bg-[#0d0a1c] p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <BookOpen className="h-9 w-9 text-[#7df9ff]" />
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight">
              Modo profesora
            </h2>
            <p className="mt-5 leading-8 text-[#9b8fc0]">
              Cuando toca estudiar, YUE cambia de ritmo: explica con más calma,
              hace preguntas para comprobar si entendiste y registra evaluaciones
              para mantener progreso.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-[#ece7f5]">
            <div className="rounded-md bg-[#08060f] p-4">
              Sirve para repasar temas complicados sin sentir que estudias solo.
            </div>
            <div className="rounded-md bg-[#08060f] p-4">
              Puede trabajar con material de clase y explicar página por página.
            </div>
            <div className="rounded-md bg-[#08060f] p-4">
              Evalúa respuestas con criterio, sin romper el tono cercano de YUE.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <article className="rounded-lg border border-[#38326b]/50 bg-[#0d0a1c] p-6">
          <ShieldCheck className="h-8 w-8 text-[#7df9ff]" />
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight">
            Tiene el control, pero tú decides
          </h2>
          <p className="mt-4 leading-8 text-[#9b8fc0]">
            YUE puede ayudarte a usar el PC, pero no actúa como si todo estuviera
            permitido. Las acciones sensibles pasan por permisos, límites y
            confirmaciones.
          </p>
        </article>
        <article
          id="quienes-somos"
          className="rounded-lg border border-[#38326b]/50 bg-[#0d0a1c] p-6"
        >
          <HeartHandshake className="h-8 w-8 text-[#e0567a]" />
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight">
            Quiénes somos
          </h2>
          <p className="mt-4 leading-8 text-[#9b8fc0]">
            Somos un equipo de 3 personas:{" "}
            <strong className="text-[#ece7f5]">Anghelo Villarreal</strong> y{" "}
            <strong className="text-[#ece7f5]">Jamir</strong> desarrollan YUE, la
            app;{" "}
            <strong className="text-[#ece7f5]">Juan David Rivera Huancas</strong>{" "}
            desarrolla esta web presentativa.
          </p>
          <p className="mt-4 leading-8 text-[#9b8fc0]">
            El proyecto nace para apoyar emocionalmente: acompañarte en momentos
            de malas notas, problemas familiares, estrés o tristeza. No queremos
            vender solo un asistente funcional; queremos construir una compañía
            que se sienta presente cuando hace falta.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <Camera className="mx-auto h-9 w-9 text-[#7df9ff]" />
        <h2 className="mt-5 text-4xl font-extrabold tracking-tight">
          Conoce a YUE desde el proyecto
        </h2>
        <p className="mt-4 text-lg leading-8 text-[#9b8fc0]">
          La app sigue en desarrollo. La mejor forma de seguirla ahora es revisar
          el repositorio y su evolución.
        </p>
        <a
          href={GITHUB_URL}
          {...EXTERNAL}
          className="group glow-pulse-soft mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#b388ff] to-[#7df9ff] px-5 py-3 font-bold text-[#06121a] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(179,136,255,0.5)] active:scale-95"
        >
          Ver proyecto en GitHub
          <Github className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        </a>
      </section>

      <footer id="contacto" className="border-t border-[#b388ff]/15 bg-[#0a0716]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="flex w-fit items-center gap-2 transition hover:opacity-85">
              <img
                src="/images/yue-logo.png"
                alt="YUE"
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="text-2xl font-extrabold tracking-tight text-[#b388ff]">
                YUE<span className="text-[#7df9ff]">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#9b8fc0]">
              Compañera virtual con avatar 3D, voz, memoria y modo profesora.
              Proyecto en desarrollo, no reemplaza apoyo profesional en salud
              mental.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#7df9ff]">Secciones</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map(([label, href]) => (
                <li key={href} className="flex justify-center md:justify-start">
                  <a
                    href={href}
                    className="group inline-flex items-center gap-2 text-[#9b8fc0] transition-all duration-200 hover:translate-x-1 hover:text-[#ece7f5]"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-[#b388ff] to-[#7df9ff] transition-all duration-300 group-hover:w-3" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#7df9ff]">Enlaces</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex justify-center md:justify-start">
                <a
                  href={GITHUB_URL}
                  {...EXTERNAL}
                  className="group inline-flex items-center gap-2 text-[#9b8fc0] transition-all duration-200 hover:translate-x-1 hover:text-[#ece7f5]"
                >
                  <span className="h-px w-0 bg-gradient-to-r from-[#b388ff] to-[#7df9ff] transition-all duration-300 group-hover:w-3" />
                  Repositorio GitHub
                </a>
              </li>
              <li className="flex justify-center md:justify-start">
                <a
                  href="#demo"
                  className="group inline-flex items-center gap-2 text-[#9b8fc0] transition-all duration-200 hover:translate-x-1 hover:text-[#ece7f5]"
                >
                  <span className="h-px w-0 bg-gradient-to-r from-[#b388ff] to-[#7df9ff] transition-all duration-300 group-hover:w-3" />
                  Ver cómo se siente
                </a>
              </li>
              <li className="flex justify-center md:justify-start">
                <a
                  href={GITHUB_URL}
                  {...EXTERNAL}
                  className="group inline-flex items-center gap-2 text-[#9b8fc0] transition-all duration-200 hover:translate-x-1 hover:text-[#ece7f5]"
                >
                  <span className="h-px w-0 bg-gradient-to-r from-[#b388ff] to-[#7df9ff] transition-all duration-300 group-hover:w-3" />
                  Última evolución del proyecto
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#b388ff]/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-center text-sm text-[#9b8fc0] sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              Créditos del equipo:{" "}
              <span className="font-semibold text-[#ece7f5]">Anghelo Villarreal</span>,{" "}
              <span className="font-semibold text-[#ece7f5]">Jamir</span> y{" "}
              <span className="font-semibold text-[#ece7f5]">Juan David Rivera Huancas</span>.
            </p>
            <p>© 2026 YUE Companion.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}