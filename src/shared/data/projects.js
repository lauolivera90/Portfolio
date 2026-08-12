const en = [
  {
    id: "nexo",
    title: "Nexo — Academic Planning Platform",
    shortDescription:
      "A platform to help university students plan their academic path and avoid falling behind. Built with a 5-person team using Scrum.",
    fullDescription:
      "Nexo helps university students track their academic progress and plan their path through their degree. It shows course records and stats, and includes a planning assistant that projects future semesters based on completed courses, upcoming exams, and the student's own time constraints. A social module lets students share progress, study materials, and join study groups.\n\nBuilt collaboratively with a 5-person team following Scrum, coordinating sprints through Trello. I started by proposing the database design (ER model) and building core CRUD endpoints on the backend, then moved into frontend work from the second sprint onward — eventually working across both. I built the academic planning module, the academic record view, and the study plan visualization, and later worked on the site's redesign and responsive layout.\n\nThe most challenging part was the planning assistant: it needed to project a student's course schedule while respecting prerequisite chains, which could form circular dependencies between courses. I modeled this as a graph and wrote a recursive algorithm to resolve it — the first algorithm of this kind I'd built from scratch.\n\nThe project also required learning to work with AI coding agents (OpenCode) mid-development — something not covered in my technical training — alongside adapting to a real Scrum workflow for the first time.",
    stack: {
      frontend: ["TypeScript", "React", "Vite", "Tailwind CSS"],
      backend: ["Node.js", "Express", "Sequelize", "JWT", "Nodemailer"],
      database: ["PostgreSQL"],
      tools: ["Docker", "OpenCode"],
    },
    status: "finished",
    demoType: "deployment",
    demoUrl: "https://desapp-frontend.onrender.com",
    repoUrl: [
      { type: "frontend", url: "https://github.com/DesApp-2026c1-Grupo-3/frontend" },
      { type: "backend", url: "https://github.com/DesApp-2026c1-Grupo-3/backend" },
    ],
  },
  {
    id: "antisocial-net",
    title: "Antisocial Net — Full Stack Web App",
    shortDescription:
      "A Twitter-inspired social network, built as my first full-stack project across two university courses.",
    fullDescription:
      "Antisocial Net is a social network inspired by Twitter's design, built early in my studies as a way to learn full-stack development in practice. The backend was developed for one course and the frontend for a parallel one, so I worked across both from the start.\n\nI worked on the backend architecture, including the database design (ER model) and building the API endpoints, and also contributed to the frontend design and some of its features. The backend and frontend teams overlapped partially — I kept one teammate across both.\n\nThis was my first time working on a team project, which was itself one of the biggest challenges early on. On the technical side, designing the database model before building the endpoints took the most effort, and consuming an API from the frontend for the first time meant working through some new problems along the way. I deployed both the frontend (Vercel) and backend (Render) myself.",
    stack: {
      frontend: ["JavaScript", "React", "Vite", "Bootstrap"],
      backend: ["Node.js", "Express", "Swagger UI"],
      database: ["MongoDB"],
      tools: ["Docker"],
    },
    status: "finished",
    demoType: "deployment",
    demoUrl: "https://anti-social-net.vercel.app/",
    repoUrl: [
      { type: "frontend", url: "https://github.com/lauolivera90/anti-social-net" },
      { type: "backend", url: "https://github.com/lauolivera90/backend-antisocialnet" },
    ],
  },
  {
    id: "uloom",
    title: "Uloom — Desktop Session Launcher",
    shortDescription:
      "A desktop app to launch entire work/study environments — apps and browser tabs — with a single click. Solo project, currently in development.",
    fullDescription:
      "Uloom solves a small but repetitive problem: setting up your environment before a work or study session — opening the right browser tabs, tools, and apps every time. With Uloom, you create a \"session\" (e.g. \"English study\") once, and launching it opens everything you'd normally set up manually — translators, PDFs, a study platform, and so on. Tab automation is working today; launching external apps is planned next.\n\nThis is a solo project — I handle documentation, design, and development end to end, including a written set of architecture and coding guidelines I follow throughout the project.\n\nTechnically, it's an Electron desktop app: a React + Vite frontend (the renderer process) and Electron's main process handling everything at the OS level, communicating through IPC — no traditional backend or database, with configuration persisted in local JSON files. Building this was my first time working with a desktop app architecture: understanding how the frontend talks to the operating system, and writing the scripts that detect installed browsers and launch tabs in them, were both new problems I had to work through from scratch.\n\nUloom is currently in development (v0.4.3), working toward a first public release.",
    stack: {
      frontend: ["React", "Vite", "Tailwind CSS", "React Router"],
      backend: ["Electron"],
      database: [], // persistencia en archivos JSON locales, no hay DB
      tools: ["Electron Forge", "ESLint", "OpenCode", "Figma", "Stitch"],
    },
    status: "in-development",
    demoType: "deployment", // "video" cuando exista una grabación; "download" cuando haya release
    demoUrl: null,
    repoUrl: [{ type: "frontend", url: "https://github.com/lauolivera90/uloom" }], // TODO: confirmar URL exacta del repo
  }
]

const es = [
  {
    id: "nexo",
    title: "Nexo — Plataforma de planificación académica",
    shortDescription:
      "Una plataforma para ayudar a estudiantes universitarios a planificar su recorrido académico y evitar atrasarse. Construida con un equipo de 5 personas usando Scrum.",
    fullDescription:
      "Nexo ayuda a estudiantes universitarios a registrar su avance académico y planificar su recorrido a lo largo de la carrera. Muestra el historial de materias y estadísticas, e incluye un asistente de planificación que proyecta los futuros semestres en base a las materias aprobadas, los próximos exámenes y las limitaciones de tiempo del propio estudiante. Un módulo social permite compartir avances, materiales de estudio y unirse a grupos de estudio.\n\nConstruida en colaboración con un equipo de 5 personas siguiendo Scrum, coordinando los sprints con Trello. Empecé proponiendo el diseño de la base de datos (modelo ER) y construyendo los endpoints CRUD principales del backend, y desde el segundo sprint pasé a trabajar también en el frontend — eventualmente trabajando en ambos. Construí el módulo de planificación académica, la vista del historial académico y la visualización del plan de estudio, y más tarde trabajé en el rediseño del sitio y su layout responsivo.\n\nLa parte más desafiante fue el asistente de planificación: necesitaba proyectar el calendario de materias de un estudiante respetando las cadenas de correlatividades, que podían formar dependencias circulares entre materias. Lo modelé como un grafo y escribí un algoritmo recursivo para resolverlo — el primer algoritmo de este tipo que escribía desde cero.\n\nEl proyecto también me exigió aprender a trabajar con agentes de IA de programación (OpenCode) a mitad del desarrollo — algo que no estaba cubierto en mi formación técnica — junto con adaptarme por primera vez a un flujo de trabajo Scrum real.",
    stack: {
      frontend: ["TypeScript", "React", "Vite", "Tailwind CSS"],
      backend: ["Node.js", "Express", "Sequelize", "JWT", "Nodemailer"],
      database: ["PostgreSQL"],
      tools: ["Docker", "OpenCode"],
    },
    status: "finished",
    demoType: "deployment",
    demoUrl: "https://desapp-frontend.onrender.com",
    repoUrl: [
      { type: "frontend", url: "https://github.com/DesApp-2026c1-Grupo-3/frontend" },
      { type: "backend", url: "https://github.com/DesApp-2026c1-Grupo-3/backend" },
    ],
  },
  {
    id: "antisocial-net",
    title: "Antisocial Net — Aplicación web full stack",
    shortDescription:
      "Una red social inspirada en Twitter, construida como mi primer proyecto full stack entre dos materias de la universidad.",
    fullDescription:
      "Antisocial Net es una red social inspirada en el diseño de Twitter, construida al principio de mis estudios para aprender desarrollo full stack en la práctica. El backend se desarrolló para una materia y el frontend para otra en paralelo, así que trabajé en ambos desde el principio.\n\nTrabajé en la arquitectura del backend, incluyendo el diseño de la base de datos (modelo ER) y la construcción de los endpoints de la API, y también contribuí al diseño del frontend y a algunas de sus funcionalidades. Los equipos de backend y frontend se superponían parcialmente — mantuve a un compañero en ambos.\n\nEsta fue mi primera vez trabajando en un proyecto en equipo, lo cual fue en sí mismo uno de los mayores desafíos al principio. En lo técnico, diseñar el modelo de base de datos antes de construir los endpoints fue lo que más esfuerzo requirió, y consumir una API desde el frontend por primera vez implicó resolver problemas nuevos en el camino. Desplegué yo mismo tanto el frontend (Vercel) como el backend (Render).",
    stack: {
      frontend: ["JavaScript", "React", "Vite", "Bootstrap"],
      backend: ["Node.js", "Express", "Swagger UI"],
      database: ["MongoDB"],
      tools: ["Docker"],
    },
    status: "finished",
    demoType: "deployment",
    demoUrl: "https://anti-social-net.vercel.app/",
    repoUrl: [
      { type: "frontend", url: "https://github.com/lauolivera90/anti-social-net" },
      { type: "backend", url: "https://github.com/lauolivera90/backend-antisocialnet" },
    ],
  },
  {
    id: "uloom",
    title: "Uloom — Lanzador de sesiones de escritorio",
    shortDescription:
      "Una app de escritorio para iniciar entornos completos de trabajo/estudio — apps y pestañas del navegador — con un clic. Proyecto en solitario, actualmente en desarrollo.",
    fullDescription:
      "Uloom resuelve un problema pequeño pero repetitivo: preparar el entorno antes de una sesión de trabajo o estudio — abrir las pestañas del navegador, las herramientas y las apps de siempre. Con Uloom creás una \"sesión\" (ej. \"Estudio de inglés\") una sola vez, y al iniciarla se abren todas las cosas que normalmente configurarías a mano — traductores, PDFs, una plataforma de estudio, etc. La automatización de pestañas ya funciona; el lanzamiento de apps externas es lo próximo a implementar.\n\nEs un proyecto en solitario — me encargo de la documentación, el diseño y el desarrollo de punta a punta, incluyendo un conjunto escrito de pautas de arquitectura y estilo de código que sigo a lo largo del proyecto.\n\nTécnicamente, es una app de escritorio con Electron: un frontend React + Vite (el proceso renderer) y el proceso principal de Electron manejando todo a nivel del sistema operativo, comunicándose vía IPC — sin backend ni base de datos tradicionales, con la configuración persistida en archivos JSON locales. Construir esto fue mi primera vez trabajando con la arquitectura de una app de escritorio: entender cómo el frontend se comunica con el sistema operativo y escribir los scripts que detectan los navegadores instalados y abren pestañas en ellos fueron problemas nuevos que tuve que resolver desde cero.\n\nUloom está actualmente en desarrollo (v0.4.3), rumbo a su primer release público.",
    stack: {
      frontend: ["React", "Vite", "Tailwind CSS", "React Router"],
      backend: ["Electron"],
      database: [], // persistencia en archivos JSON locales, no hay DB
      tools: ["Electron Forge", "ESLint", "OpenCode", "Figma", "Stitch"],
    },
    status: "in-development",
    demoType: "deployment", // "video" cuando exista una grabación; "download" cuando haya release
    demoUrl: null,
    repoUrl: [{ type: "frontend", url: "https://github.com/lauolivera90/uloom" }], // TODO: confirmar URL exacta del repo
  }
]

export const projects = { en, es }