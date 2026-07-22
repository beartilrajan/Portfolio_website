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
    id: "weather-app",
    title: "Responsive Weather App",
    subtitle: "Real-Time Front-End Forecast App",
    category: "Web Apps",
    featured: true,
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
