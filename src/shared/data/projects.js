export const projects = [
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
    repoUrl: [], // TODO: agregar cuando esté público
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