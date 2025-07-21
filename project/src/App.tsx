import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Menu, 
  X,
  ArrowUp,
  Check,
  Sun,
  Moon,
  FileText
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import VanillaTilt from 'vanilla-tilt';
import axios from 'axios';

const CHAT_API_URL = 'https://rohitkumar-pp8o.onrender.com/chat';

function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<{from: 'user'|'bot', text: string}[]>([]);
  const [loading, setLoading] = React.useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, {from: 'user', text: input}]);
    setLoading(true);
    try {
      const res = await axios.post(CHAT_API_URL, { message: input });
      setMessages(msgs => [...msgs, {from: 'bot', text: res.data.response}]);
    } catch (e) {
      setMessages(msgs => [...msgs, {from: 'bot', text: 'Sorry, there was an error.'}]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div className="chat-widget-fab">
      {open ? (
        <div className="chat-widget-box">
          <div className="chat-widget-header">
            <span>Ask RohitBot</span>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: 18, cursor: 'pointer' }}>×</button>
          </div>
          <div className="chat-widget-messages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === 'user' ? 'chat-widget-message-user' : 'chat-widget-message-bot'}>
                <span className={msg.from === 'user' ? 'chat-widget-bubble-user' : 'chat-widget-bubble-bot'}>{msg.text}</span>
              </div>
            ))}
            {loading && <div style={{ color: '#22d3ee', fontSize: 12 }}>RohitBot is typing...</div>}
          </div>
          <div className="chat-widget-input-row">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
              placeholder="Type your message..."
              className="chat-widget-input"
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} className="chat-widget-send-btn">Send</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="chat-widget-fab" title="Chat with RohitBot">
          💬
        </button>
      )}
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  // Add state for avatar error
  const [avatarError, setAvatarError] = useState(false);
  // Add state for resume error
  const [resumeError, setResumeError] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 60,
      easing: 'ease-in-out',
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const projects = [
    {
      title: "🗂️ Menu CLI Tool",
      description: "Internship CLI tool with Python menus and voice command",
      longDescription: "A comprehensive CLI tool developed during my internship that features interactive Python menus with voice command capabilities. The tool includes multiple menu levels, voice recognition for hands-free operation, and automated task execution.",
      borderColor: "border-pink-400",
      tags: ["Python", "CLI", "Voice"],
      category: "Python",
      demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual demo video
      githubLink: "https://github.com/rohit99-23/menu-cli-tool",
      features: [
        "Interactive menu system with multiple levels",
        "Voice command recognition and execution",
        "Automated task scheduling",
        "Cross-platform compatibility"
      ]
    },
    {
      title: "📅 Mess Menu Tracker",
      description: "Streamlit UI app showing college mess menus",
      longDescription: "A user-friendly Streamlit application that displays and tracks college mess menus. Features include real-time menu updates, nutritional information, and a responsive web interface for easy access.",
      borderColor: "border-cyan-400",
      tags: ["Streamlit", "Python", "UI"],
      category: "Streamlit",
      demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual demo video
      githubLink: "https://github.com/rohit99-23/mess.git",
      features: [
        "Real-time menu updates",
        "Nutritional information display",
        "Responsive web interface",
        "User preference tracking"
      ]
    },
    {
      title: "🐳 Flask-Docker App",
      description: "Flask app deployed using Docker + Jenkins pipelines",
      longDescription: "A Flask web application containerized with Docker and deployed using Jenkins CI/CD pipelines. Demonstrates modern DevOps practices including automated testing, building, and deployment.",
      borderColor: "border-blue-400",
      tags: ["Docker", "Flask", "Jenkins"],
      category: "CI/CD",
      demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual demo video
      githubLink: "https://github.com/rohit99-23/myapp123.git",
      features: [
        "Docker containerization",
        "Jenkins CI/CD pipeline",
        "Automated testing and deployment",
        "Git webhook integration"
      ]
    },
    {
      title: "🛠️ Mini Task Set",
      description: "Python automation: SMS, Email, WhatsApp, Phone calls",
      longDescription: "A comprehensive Python automation suite that handles various communication tasks including SMS sending, email automation, WhatsApp messaging, and phone call management through APIs.",
      borderColor: "border-yellow-400",
      tags: ["Python", "Automation", "API"],
      category: "Python",
      demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual demo video
      githubLink: "https://github.com/rohit99-23/mini-task-set.git",
      features: [
        "SMS automation via Twilio API",
        "Email automation with SMTP",
        "WhatsApp messaging integration",
        "Phone call management"
      ]
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const skills = [
    { category: "Programming & Web", items: ["C++", "Python", "HTML", "CSS"] },
    { category: "Tools & Platforms", items: ["Docker", "Jenkins", "Kubernetes", "Git", "GitHub", "VS Code", "Figma"] },
    { category: "OS & Concepts", items: ["Windows", "Linux", "CI/CD Pipelines", "Socket Programming", "Manual & Automation Testing"] }
  ];

  const devOpsTasks = [
    "CI/CD Pipeline using Jenkins",
    "Dockerized Flask App",
    "Trigger builds via Git Webhooks",
    "Automated emails & SMS with Python",
    "Built CLI tools with voice commands",
    "Streamlit apps with UI + speech output"
  ];

  // Custom hook for tilt effect
  function useTilt(options: {
    max: number;
    speed: number;
    glare: boolean;
    'max-glare': number;
    scale: number;
  }) {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      const currentRef = ref.current;
      if (currentRef) {
        VanillaTilt.init(currentRef, options);
      }
      return () => {
        if (currentRef && (currentRef as unknown as { vanillaTilt?: { destroy: () => void } }).vanillaTilt) {
          (currentRef as unknown as { vanillaTilt: { destroy: () => void } }).vanillaTilt.destroy();
        }
      };
    }, [options]);
    return ref;
  }

  // Create tilt options once
  const tiltOptions = {
    max: 18,
    speed: 400,
    glare: true,
    'max-glare': 0.25,
    scale: 1.04,
  };

  // Create a single tilt ref for the first project
  const tiltRef = useTilt(tiltOptions);

  // Detect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white relative overflow-x-hidden animate-gradient-move ${theme} ${prefersReducedMotion ? 'motion-reduce' : ''}`}>
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-pink-400 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Enhanced Floating Tech Logos & Particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Floating Particles - More Dynamic */}
          <div className="absolute top-24 left-16 w-8 h-8 bg-cyan-400 rounded-full opacity-20 animate-pulse animate-float-slow" />
          <div className="absolute top-1/3 right-24 w-6 h-6 bg-pink-400 rounded-full opacity-30 animate-bounce animate-float-medium" />
          <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-violet-400 rounded-full opacity-25 animate-pulse animate-float-fast" />
          <div className="absolute bottom-20 right-10 w-10 h-10 bg-blue-400 rounded-full opacity-20 animate-bounce animate-float-slow" />
          
          {/* Additional Floating Particles */}
          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-cyan-300 rounded-full opacity-30 animate-float-medium" style={{animationDelay: '1s'}} />
          <div className="absolute top-2/3 right-1/3 w-5 h-5 bg-pink-300 rounded-full opacity-25 animate-float-fast" style={{animationDelay: '2s'}} />
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-violet-300 rounded-full opacity-40 animate-float-slow" style={{animationDelay: '0.5s'}} />
          <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-blue-300 rounded-full opacity-20 animate-float-medium" style={{animationDelay: '1.5s'}} />
          
          {/* Sparkle Effects */}
          <div className="absolute top-32 left-1/5 w-2 h-2 bg-yellow-300 rounded-full animate-sparkle" style={{animationDelay: '0s'}} />
          <div className="absolute top-1/2 left-2/3 w-1 h-1 bg-cyan-300 rounded-full animate-sparkle" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-1/3 right-1/5 w-1.5 h-1.5 bg-pink-300 rounded-full animate-sparkle" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-violet-300 rounded-full animate-sparkle" style={{animationDelay: '0.5s'}} />
          
          {/* Glowing Orbs */}
          <div className="absolute top-16 left-1/4 w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 rounded-full animate-pulse animate-float-slow blur-sm" />
          <div className="absolute bottom-32 right-1/4 w-16 h-16 bg-gradient-to-r from-pink-400/15 to-violet-400/15 rounded-full animate-pulse animate-float-medium blur-sm" />
          <div className="absolute top-3/4 left-1/6 w-10 h-10 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse animate-float-fast blur-sm" />
          
          {/* Rotating Rings */}
          <div className="absolute left-1/4 top-1/3 w-24 h-24 border-2 border-cyan-400/30 rounded-full animate-rotate-slow" />
          <div className="absolute right-1/4 bottom-1/3 w-32 h-32 border-2 border-pink-400/20 rounded-full animate-rotate-slow" style={{animationDirection: 'reverse'}} />
          <div className="absolute left-1/2 top-1/4 w-16 h-16 border-2 border-violet-400/25 rounded-full animate-rotate-slow" style={{animationDuration: '15s'}} />
          
          {/* Breathing Elements */}
          <div className="absolute top-1/6 right-1/6 w-8 h-8 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full animate-breathe" />
          <div className="absolute bottom-1/6 left-1/6 w-6 h-6 bg-gradient-to-r from-pink-400/25 to-violet-400/25 rounded-full animate-breathe" style={{animationDelay: '2s'}} />
          
          {/* Tech Logos with Enhanced Animation */}
          {/* Docker Logo */}
          <div className="absolute left-10 top-1/2 animate-float-slow hover:scale-110 transition-transform duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md animate-pulse"></div>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="relative z-10">
                <rect width="48" height="48" rx="24" fill="#0db7ed"/>
                <path d="M14 30c1.5 2.5 5.5 4 10 4 6.5 0 10-2.5 10-7v-1h-20v1c0 1.5.5 2.5 1.5 3z" fill="#fff"/>
                <rect x="16" y="22" width="3" height="4" rx="1" fill="#fff"/>
                <rect x="20" y="22" width="3" height="4" rx="1" fill="#fff"/>
                <rect x="24" y="22" width="3" height="4" rx="1" fill="#fff"/>
                <rect x="28" y="22" width="3" height="4" rx="1" fill="#fff"/>
              </svg>
            </div>
          </div>
          
          {/* Jenkins Logo */}
          <div className="absolute right-16 top-1/4 animate-float-medium hover:scale-110 transition-transform duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-red-400/20 rounded-full blur-md animate-pulse"></div>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="relative z-10">
                <rect width="48" height="48" rx="24" fill="#d24939"/>
                <circle cx="24" cy="24" r="14" fill="#fff"/>
                <ellipse cx="24" cy="28" rx="8" ry="6" fill="#d24939"/>
                <ellipse cx="24" cy="22" rx="5" ry="6" fill="#fff" stroke="#d24939" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          
          {/* Kubernetes Logo */}
          <div className="absolute left-1/3 bottom-16 animate-float-fast hover:scale-110 transition-transform duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md animate-pulse"></div>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="relative z-10">
                <rect width="48" height="48" rx="24" fill="#326ce5"/>
                <polygon points="24,12 34,24 24,36 14,24" fill="#fff"/>
              </svg>
            </div>
          </div>
          
          {/* Git Logo */}
          <div className="absolute right-1/3 bottom-24 animate-float-slow hover:scale-110 transition-transform duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-md animate-pulse"></div>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="relative z-10">
                <rect width="48" height="48" rx="24" fill="#f34f29"/>
                <circle cx="24" cy="24" r="10" fill="#fff"/>
                <rect x="22" y="18" width="4" height="12" rx="2" fill="#f34f29"/>
                <rect x="18" y="22" width="12" height="4" rx="2" fill="#f34f29"/>
              </svg>
            </div>
          </div>
          
          {/* Additional Tech Icons */}
          {/* Python Logo */}
          <div className="absolute left-1/4 top-1/6 animate-float-medium hover:scale-110 transition-transform duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-md animate-pulse"></div>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="relative z-10">
                <circle cx="20" cy="20" r="20" fill="#3776ab"/>
                <path d="M20 8c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="#ffd43b"/>
              </svg>
            </div>
          </div>
          
          {/* React Logo */}
          <div className="absolute right-1/6 top-2/3 animate-float-fast hover:scale-110 transition-transform duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md animate-pulse"></div>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="relative z-10">
                <circle cx="20" cy="20" r="20" fill="#61dafb"/>
                <path d="M20 8c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="#282c34"/>
              </svg>
            </div>
          </div>
          
          {/* Glow Pulse Elements */}
          <div className="absolute top-1/3 left-1/2 w-20 h-20 bg-gradient-to-r from-cyan-400/10 to-pink-400/10 rounded-full animate-glow-pulse blur-md" />
          <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-gradient-to-r from-pink-400/10 to-violet-400/10 rounded-full animate-glow-pulse blur-md" style={{animationDelay: '1.5s'}} />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Rohit
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8 items-center">
                {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] bg-transparent border-none cursor-pointer font-medium"
                    aria-label={`Go to ${item} section`}
                  >
                    {item}
                  </button>
                ))}
                {/* Theme Toggle */}
                <button
                  className="ml-6 p-2 rounded-full border border-cyan-400 bg-black/40 hover:bg-cyan-400 hover:text-black transition-colors duration-300 shadow-md"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                  tabIndex={0}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 hover:bg-cyan-400/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Open mobile menu"
                tabIndex={0}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="mt-4 space-y-4 flex flex-col items-center">
                {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className="block text-lg text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 glow-effect bg-transparent border-none cursor-pointer font-medium w-full"
                    tabIndex={isMenuOpen ? 0 : -1}
                    aria-label={`Go to ${item} section`}
                  >
                    {item}
                  </button>
                ))}
                {/* Theme Toggle for Mobile */}
                <button
                  className="mt-2 p-2 rounded-full border border-cyan-400 bg-black/40 hover:bg-cyan-400 hover:text-black transition-colors duration-300 shadow-md"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 px-6" data-aos="fade-up">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center md:text-left">
              <div className="space-y-4">
                <p className="text-cyan-400 text-lg">Hello! I Am</p>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-300/80 via-pink-300/80 to-violet-300/80 bg-clip-text text-transparent">
                  Rohit
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-300">
                   DevOps Engineer | Final Year B.Tech CSE
                </p>
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl">
                  Automating the future of software delivery, one pipeline at a time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] glow-effect focus:outline-none focus:ring-4 focus:ring-cyan-400/50 min-h-[44px] touch-manipulation"
                  onClick={() => scrollToSection('projects')}
                  aria-label="View Projects"
                  tabIndex={0}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    📂 View Projects
                    <ExternalLink size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button 
                  className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-400 rounded-lg font-semibold transition-all duration-300 hover:bg-cyan-400 hover:text-black active:scale-95 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] glow-effect focus:outline-none focus:ring-4 focus:ring-cyan-400/50 min-h-[44px] touch-manipulation"
                  onClick={() => setIsResumeOpen(true)}
                  aria-label="Download Resume"
                  tabIndex={0}
                >
                  <span className="flex items-center gap-2">
                    <Download size={20} />
                    Download Resume
                  </span>
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                {/* Pulsing waves behind avatar */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/40 to-pink-400/40 animate-pulse-wave"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-pink-400/30 animate-pulse-wave" style={{animationDelay: '0.3s'}}></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-400/20 animate-pulse-wave" style={{animationDelay: '0.6s'}}></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 to-pink-400/10 animate-pulse-wave" style={{animationDelay: '0.9s'}}></div>
                
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 p-1 animate-pulse">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/20 to-pink-400/20 flex items-center justify-center text-6xl">
                      {/* Simple profile picture with fallback */}
                      <img 
                        src="/rohit-avatar.jpg" 
                        alt="Rohit Avatar" 
                        className="w-44 h-44 rounded-full object-cover border-4 border-cyan-400/60 shadow-lg"
                        onError={() => setAvatarError(true)}
                        style={{ display: avatarError ? 'none' : 'block' }}
                      />
                      {avatarError && (
                        <div className="w-44 h-44 rounded-full bg-gradient-to-br from-cyan-400 to-pink-400 flex items-center justify-center text-4xl font-bold text-white border-4 border-cyan-400/60 shadow-lg">
                          RK
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-400/50 animate-bounce">
                  <span className="text-cyan-400 font-semibold">DevOps Engineer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-400 text-sm">Scroll to explore</span>
              <ChevronDown size={24} className="text-cyan-400" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6" data-aos="fade-up">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-300/80 to-pink-300/80 bg-clip-text text-transparent">
               About Me
            </h2>
            
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
              <p className="text-lg text-gray-300 leading-relaxed text-center md:text-left">
                I'm a Final Year B.Tech (CSE) student with a deep passion for DevOps and automation. 
                I thrive in building CI/CD pipelines, automating tasks, and working with modern tools 
                like Docker, Jenkins, Kubernetes, and Python. My journey is driven by experimentation, 
                learning, and delivery.
              </p>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-cyan-400/10 to-pink-400/10 rounded-lg border border-cyan-400/30">
                <p className="text-cyan-400 font-semibold text-center">
                  🛠 Tools I use daily: Docker | Jenkins | Git | Python | VS Code | Terminal
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6" data-aos="fade-up">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-300/80 to-pink-300/80 bg-clip-text text-transparent">
              ⚒️ Skills & Tools
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skillGroup, index) => (
                <div key={index} className="space-y-6">
                  <h3 className="text-xl font-semibold text-cyan-400 text-center">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {skillGroup.items.map((item) => (
                      <span key={item} className="glow-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6" data-aos="fade-up">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-300/80 to-pink-300/80 bg-clip-text text-transparent">
               Projects That Speak DevOps
            </h2>
            
            {/* Project Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['All', 'CI/CD', 'Python', 'Streamlit'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 glow-effect hover:scale-105 touch-manipulation ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg border-2 border-cyan-400'
                      : 'bg-black/40 border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400'
                  }`}
                >
                  {filter === 'All' ? '🔘 All' : filter === 'CI/CD' ? '🔧 CI/CD' : filter === 'Python' ? '🐍 Python' : '📊 Streamlit'}
                </button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project, idx) => {
                return (
                  <div
                    ref={idx === 0 ? tiltRef : undefined}
                    key={project.title}
                    onClick={() => setSelectedProject(project)}
                    className={`rounded-2xl p-8 border-4 ${project.borderColor} bg-black/30 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] cursor-pointer relative group glow-effect`}
                    data-aos="zoom-in-up"
                    data-aos-delay={idx * 100}
                  >
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-cyan-400/20 border border-cyan-400/50 rounded-full text-xs font-medium text-cyan-300 hover:bg-cyan-400/40 hover:border-cyan-400 hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to view details
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg text-white font-semibold hover:scale-105 active:scale-95 glow-effect focus:outline-none focus:ring-2 focus:ring-cyan-400/50 min-h-[36px] touch-manipulation"
                      >
                        🔍 Learn More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 p-8 rounded-2xl border-2 border-cyan-400 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-cyan-400 hover:text-pink-400 text-2xl z-10"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                <X size={28} />
              </button>
              
              <div className="space-y-6">
                {/* Project Header */}
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-cyan-400 mb-2">{selectedProject.title}</h3>
                  <p className="text-gray-300 text-lg">{selectedProject.description}</p>
                </div>

                {/* Demo Video */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-pink-400">🎥 Demo Video</h4>
                  <div className="relative w-full h-64 bg-black/40 rounded-lg overflow-hidden">
                    <iframe 
                      src={selectedProject.demoVideo}
                      title={`${selectedProject.title} Demo`}
                      className="w-full h-full rounded-lg border-none"
                      allowFullScreen
                    />
                    {/* TODO: Replace placeholder demo video links with actual project demo URLs */}
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-pink-400">📝 Project Overview</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-pink-400">✨ Key Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-cyan-400/30">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-pink-400">🛠️ Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-cyan-400/20 border border-cyan-400/50 rounded-full text-sm font-medium text-cyan-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg font-semibold text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 border-2 border-gray-600"
                  >
                    <Github size={20} />
                    View on GitHub
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300 border-2 border-pink-400/60"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DevOps Tasks Section */}
        <section className="py-20 px-6" data-aos="fade-up">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-300/80 to-pink-300/80 bg-clip-text text-transparent">
              🔧 DevOps Tasks I've Done
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {devOpsTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-black/30 backdrop-blur-md rounded-lg border border-green-400/30 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-black" />
                  </div>
                  <span className="text-gray-300 font-medium">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-6" data-aos="fade-up">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-300/80 to-pink-300/80 bg-clip-text text-transparent">
              🎓 Education & Academics
            </h2>
            <div className="relative pl-8 md:pl-16">
              {/* Vertical timeline line */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-pink-400 to-violet-400 rounded-full opacity-60"></div>
              {/* Timeline entries */}
              <div className="space-y-12">
                {/* B.Tech */}
                <div className="relative flex items-start group">
                  <div className="absolute -left-6 md:-left-10 top-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-pink-400 border-4 border-violet-950 shadow-lg group-hover:scale-110 transition-transform"></div>
                  </div>
                  <div className="bg-black/40 border border-cyan-400/40 rounded-xl p-6 shadow-lg w-full ml-4 md:ml-8">
                    <h3 className="text-xl font-bold text-cyan-400 mb-1">B.Tech (CSE) <span className="text-sm text-gray-400 font-normal">2022 – Present</span></h3>
                    <p className="text-gray-200 font-semibold">Vivekananda Global University, Jaipur</p>
                    <p className="text-pink-400 font-bold">CGPA: 8.0</p>
                  </div>
                </div>
                {/* 12th */}
                <div className="relative flex items-start group">
                  <div className="absolute -left-6 md:-left-10 top-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-pink-400 border-4 border-violet-950 shadow-lg group-hover:scale-110 transition-transform"></div>
                  </div>
                  <div className="bg-black/40 border border-cyan-400/40 rounded-xl p-6 shadow-lg w-full ml-4 md:ml-8">
                    <h3 className="text-xl font-bold text-cyan-400 mb-1">12th (CBSE) <span className="text-sm text-gray-400 font-normal">2020 – 2022</span></h3>
                    <p className="text-gray-200 font-semibold">CMJ Institute of Education, Motihari (Bihar)</p>
                    <p className="text-pink-400 font-bold">74.4%</p>
                  </div>
                </div>
                {/* 10th */}
                <div className="relative flex items-start group">
                  <div className="absolute -left-6 md:-left-10 top-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-pink-400 border-4 border-violet-950 shadow-lg group-hover:scale-110 transition-transform"></div>
                  </div>
                  <div className="bg-black/40 border border-cyan-400/40 rounded-xl p-6 shadow-lg w-full ml-4 md:ml-8">
                    <h3 className="text-xl font-bold text-cyan-400 mb-1">10th (CBSE) <span className="text-sm text-gray-400 font-normal">2019 – 2020</span></h3>
                    <p className="text-gray-200 font-semibold">CMJ Institute of Education, Motihari (Bihar)</p>
                    <p className="text-pink-400 font-bold">83%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internship Section */}
        <section className="py-20 px-6" data-aos="fade-up">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-300/80 to-pink-300/80 bg-clip-text text-transparent">
              💼 Internship Experience
            </h2>
            
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                Summer Internship at LinuxWorld Informatics Pvt. Ltd.
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Worked on real-world DevOps challenges: creating CLI automation tools, implementing 
                CI/CD pipelines in Jenkins, Docker-based deployment, Python scripting, and task 
                automation like sending WhatsApp messages, emails, and SMS.
              </p>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section className="py-20 px-6" data-aos="fade-up">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-300/80 to-pink-300/80 bg-clip-text text-transparent">
              <span className="inline-block align-middle mr-2"><FileText className="inline-block text-pink-400 animate-pulse drop-shadow-[0_0_8px_rgba(236,72,153,0.7)]" size={28} /></span>
              Resume
            </h2>
            <p className="text-gray-300 mb-6">Need a quick summary? Download my updated resume (PDF).</p>
            <div className="flex flex-col items-center gap-4">
              <button
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold text-white shadow-lg hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300 border-2 border-pink-400/60 glow-effect focus:outline-none focus:ring-4 focus:ring-pink-400/50 min-h-[44px] touch-manipulation"
                onClick={() => setIsResumeOpen(true)}
                aria-label="Download Resume"
                tabIndex={0}
              >
                <FileText className="inline-block mr-2 animate-pulse text-pink-400" size={24} />
                Download Resume
              </button>
            </div>
          </div>
          {/* Resume Modal */}
          {isResumeOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 p-8 rounded-2xl border-2 border-cyan-400 shadow-2xl max-w-lg w-full relative animate-fade-in">
                <button
                  className="absolute top-4 right-4 text-cyan-400 hover:text-pink-400 text-2xl"
                  onClick={() => setIsResumeOpen(false)}
                  aria-label="Close resume preview"
                >
                  <X size={28} />
                </button>
                <div className="flex flex-col items-center gap-4">
                  <FileText className="text-pink-400 animate-pulse drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]" size={48} />
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">Rohit Kumar - Resume</h3>
                  <div className="w-full h-48 bg-black/40 rounded-lg flex items-center justify-center border border-cyan-400/40 mb-4">
                    {/* PDF preview placeholder using iframe */}
                    <iframe 
                      src="/resume.pdf" 
                      title="Resume PDF Preview" 
                      className="w-full h-full rounded-lg border-none" 
                      aria-label="Resume PDF Preview"
                      onError={() => setResumeError(true)}
                    >
                    </iframe>
                    {resumeError && (
                      <span className="text-red-400 font-semibold">Resume PDF not found. Please try again later.</span>
                    )}
                  </div>
                  <a
                    href="/resume.pdf"
                    download="Rohit_Kumar_Resume.pdf"
                    className={`px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold text-white shadow-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300 border-2 border-pink-400/60${resumeError ? ' opacity-50 pointer-events-none' : ''}`}
                    aria-disabled={resumeError}
                    aria-label="Download Resume PDF"
                    tabIndex={resumeError ? -1 : 0}
                  >
                    <Download className="inline-block mr-2" size={20} />
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6" data-aos="fade-up">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-300/80 to-pink-300/80 bg-clip-text text-transparent">
              📬 Let's Connect
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <a
                href="mailto:rohitkumarpani246@gmail.com"
                className="group flex items-center gap-4 p-6 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Mail size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 group-hover:text-pink-400 transition-colors">
                    Email
                  </h3>
                  <p className="text-gray-300">rohitkumarpani246@gmail.com</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/rohit-kumar-157014289"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Linkedin size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 group-hover:text-pink-400 transition-colors">
                    LinkedIn
                  </h3>
                  <p className="text-gray-300">Connect with me</p>
                </div>
              </a>

              <a
                href="https://github.com/rohit99-23"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Github size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 group-hover:text-pink-400 transition-colors">
                    GitHub
                  </h3>
                  <p className="text-gray-300">Check out my code</p>
                </div>
              </a>

              <div className="group flex items-center gap-4 p-6 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center">
                  <MapPin size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 group-hover:text-pink-400 transition-colors">
                    Location
                  </h3>
                  <p className="text-gray-300">Jaipur (Open to relocate)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                <span className="relative inline-block">
                  "Keep shipping. Keep scaling."
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-300/80 via-pink-300/80 to-violet-300/80 animate-pulse shadow-lg"></span>
                </span>
              </h3>
              <p className="text-gray-400">– Rohit Kumar, DevOps Engineer</p>
            </div>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="mailto:rohitkumarpani246@gmail.com"
                className="p-3 rounded-full bg-black/40 border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 glow-effect hover:scale-110"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://linkedin.com/in/rohit-kumar-157014289"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-black/40 border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 glow-effect hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/rohit99-23"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-black/40 border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 glow-effect hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            </div>
            
            <div className="text-gray-500 text-sm">
              <p>📍 Jaipur (Open to relocate)</p>
            </div>
          </div>
        </footer>

        {/* Floating Scroll-to-Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-br from-cyan-400 to-pink-400 text-white shadow-lg hover:scale-110 transition-all duration-300 animate-bounce focus:outline-none focus:ring-4 focus:ring-cyan-400/50 border-2 border-white/20"
            aria-label="Scroll to top"
            tabIndex={0}
          >
            <ArrowUp size={28} />
          </button>
        )}
      </div>
      <ChatWidget />
    </>
  );
}

export default App;