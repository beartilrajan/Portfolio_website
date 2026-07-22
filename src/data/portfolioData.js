export const personalInfo = {
  name: "Beartil Rajan",
  role: "CS Engineer & Aspiring Product Engineer",
  positioning: "Computer Science Engineering student focused on building complete software applications, 3D web tools, and Python gesture interfaces.",
  bio: "I'm Beartil Rajan, a Computer Science Engineering student and aspiring product engineer. My focus is on building complete, user-centric software applications and responsive web platforms. I balance daily classes with a disciplined development routine across WSL, Cursor, React, and Python, while documenting my journey through tech and dev vlogs.",
  location: "Open for CS Internships & Engineering Collaborations",
  availability: "Available for CS Internships & Product Collaborations",
  email: "beartilrajan@gmail.com",
  formspreeEndpoint: "https://formspree.io/f/maqrbrzg",
  github: "https://github.com/beartilrajan",
  linkedin: "https://www.linkedin.com/in/beartilrajan",
  youtubeMain: "https://youtube.com/@Raydth",
  youtubeBuilds: "https://youtube.com/@RaydthBuilds",
  resumeUrl: "#resume"
};

export const stats = [
  { label: "Degree Focus", value: "B.E. CS" },
  { label: "Built Projects", value: "10+" },
  { label: "Dev Workflow", value: "WSL + AI" },
  { label: "Core Focus", value: "Product & AI" }
];

export const focusAreas = [
  {
    icon: "Code2",
    title: "Product Engineering",
    description: "Architecting end-to-end applications with React, JavaScript, and modern CSS, translating ideas into user-ready products."
  },
  {
    icon: "Eye",
    title: "Computer Vision & 3D Web",
    description: "Building touchless gesture interfaces using Python & MediaPipe alongside browser 3D spatial engines using React Three Fiber."
  },
  {
    icon: "Zap",
    title: "AI-Assisted Workflow",
    description: "Leveraging WSL, Ollama, Claude, and GitHub Copilot Pro within a disciplined daily engineering routine."
  }
];

export const projects = [
  {
    id: "room-layout-optimization",
    title: "Room Layout Optimization",
    subtitle: "3D Spatial Optimization Application",
    category: "3D & Web Apps",
    featured: true,
    description: "A browser-based 3D spatial optimization application utilizing React and React Three Fiber to arrange furniture dynamically based on real-time comfort and spatial constraints.",
    detailedDescription: "Built with React Three Fiber and Three.js to solve spatial arrangement challenges. Users can position furniture items in a 3D viewport, evaluate clearance zones, and calculate algorithmic comfort scores based on ergonomics and accessibility metrics.",
    tags: ["React", "React Three Fiber", "Three.js", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/beartilrajan/room-layout-optimization",
    live: "https://beartilrajan.github.io/room-layout-optimization",
    metrics: "Interactive 3D Scene • Real-Time Constraint Solver",
    highlights: [
      "Real-time 3D room canvas rendering with orbit controls",
      "Constraint evaluation engine calculating furniture clearance",
      "Custom drag-and-rotate spatial manipulator",
      "Distraction-free controls with modern CSS styling"
    ]
  },
  {
    id: "gesturex",
    title: "GestureX",
    subtitle: "Touchless Gesture-Control Interface",
    category: "AI / Vision",
    featured: true,
    description: "An 'Iron Man' style touchless gesture-control interface built for a college project expo to control desktop applications using real-time computer vision.",
    detailedDescription: "GestureX leverages OpenCV and MediaPipe to detect hand landmarks via webcam at sub-30ms latency. Hand motions and finger pinches map to system controls, cursor positioning, and volume adjustments via PyAutoGUI.",
    tags: ["Python", "MediaPipe", "OpenCV", "PyAutoGUI", "Computer Vision"],
    github: "https://github.com/beartilrajan/gesturex",
    live: "https://github.com/beartilrajan/gesturex",
    metrics: "College Expo Featured • Sub-30ms Hand Tracking",
    highlights: [
      "21-Point 3D hand skeletal tracking without hardware sensors",
      "Pinch, swipe, and air-mouse movement controls",
      "Expo demonstration mode with visual gesture feed overlay",
      "Low CPU overhead optimization for laptop hardware"
    ]
  },
  {
    id: "ai-markdown-editor",
    title: "AI-Powered Markdown Editor",
    subtitle: "Distraction-Free Writing Application",
    category: "Web Apps",
    featured: true,
    description: "A distraction-free markdown writing application initialized in a Linux (WSL) environment featuring live preview, custom themes, and fast parsing.",
    detailedDescription: "Designed for technical writers and developers. Initialized inside WSL using React and Vite, utilizing the marked package for instant HTML rendering, local file export, and clean typography.",
    tags: ["React", "Vite", "marked", "JavaScript", "WSL"],
    github: "https://github.com/beartilrajan/ai-markdown-editor",
    live: "https://beartilrajan.github.io/ai-markdown-editor",
    metrics: "Instant Live Preview • WSL Environment",
    highlights: [
      "Split-pane live Markdown parsing via marked package",
      "Initialized and developed inside WSL (Windows Subsystem for Linux)",
      "One-click Markdown file download & copy formatted HTML",
      "Clean dark mode optimized for long writing sessions"
    ]
  },
  {
    id: "weather-app",
    title: "Responsive Weather App",
    subtitle: "Real-Time Front-End Forecast App",
    category: "Web Apps",
    featured: false,
    description: "A responsive front-end weather application fetching real-time meteorological data via async/await and Open-Meteo API, deployed on GitHub Pages.",
    detailedDescription: "Built with pure Vanilla JavaScript to master asynchronous data fetching, DOM manipulation, error handling, and responsive layout styling without external libraries.",
    tags: ["Vanilla JS", "Async/Await", "Open-Meteo API", "HTML5/CSS3", "GitHub Pages"],
    github: "https://github.com/beartilrajan/weather-app",
    live: "https://beartilrajan.github.io/weather-app",
    metrics: "Zero Dependencies • GitHub Pages Deployed",
    highlights: [
      "Clean async/await fetching from Open-Meteo REST API",
      "Dynamic weather status UI based on WMO weather codes",
      "Zero build step Vanilla JS architecture",
      "Deployed directly via GitHub Pages"
    ]
  },
  {
    id: "unity-3d-game-challenge",
    title: "Unity 3D Game Challenge",
    subtitle: "AI Scripting & Dev Vlog Experiment",
    category: "Game Dev & AI",
    featured: false,
    description: "A 3D game built in Unity 6.4 testing AI-driven script generation (Ollama/LLMs) for an upcoming technical video vlog on YouTube.",
    detailedDescription: "Combines game development and AI experimentations. Built in Unity 6.4 using C# scripts generated and refined through local Ollama LLM prompts to accelerate mechanics development.",
    tags: ["Unity 6.4", "C#", "Ollama / AI", "3D Engine", "Dev Vlog"],
    github: "https://github.com/beartilrajan/unity-3d-game-challenge",
    live: "https://youtube.com/@RaydthBuilds",
    metrics: "Unity 6.4 Engine • AI-Assisted C# Scripts",
    highlights: [
      "AI-driven C# player controller & game loop generation",
      "3D physics environment built in Unity 6.4",
      "Documented step-by-step for YouTube RaydthBuilds channel"
    ]
  }
];

export const skills = [
  {
    category: "Core Languages & Concepts",
    items: [
      { name: "JavaScript (ES6+)", level: "Advanced", icon: "FileCode" },
      { name: "Python", level: "Advanced", icon: "Terminal" },
      { name: "HTML5 & CSS3", level: "Expert", icon: "Layout" },
      { name: "Data Structures & Algo", level: "Advanced", icon: "Cpu" },
      { name: "C / C++", level: "Academic", icon: "Code" }
    ]
  },
  {
    category: "Frontend & 3D Web",
    items: [
      { name: "React 18", level: "Advanced", icon: "Atom" },
      { name: "React Three Fiber", level: "Intermediate", icon: "Sparkles" },
      { name: "Tailwind CSS", level: "Advanced", icon: "Palette" },
      { name: "Vite & Web Tooling", level: "Advanced", icon: "Zap" },
      { name: "Responsive Web Design", level: "Expert", icon: "Smartphone" }
    ]
  },
  {
    category: "Tools, AI & Creative",
    items: [
      { name: "WSL (Linux)", level: "Advanced", icon: "Terminal" },
      { name: "Cursor & VS Code", level: "Expert", icon: "Code" },
      { name: "Ollama & Claude AI", level: "Advanced", icon: "Sparkles" },
      { name: "Git & GitHub", level: "Advanced", icon: "GitBranch" },
      { name: "Adobe Premiere & Canva", level: "Advanced", icon: "Cloud" }
    ]
  }
];
