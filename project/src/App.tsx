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
  Filter
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const projects = [
    {
      title: "🗂️ Menu CLI Tool",
      description: "Internship CLI tool with Python menus and voice command",
      borderColor: "border-pink-400",
      tags: ["Python", "CLI", "Voice"],
      category: "Python"
    },
    {
      title: "📅 Mess Menu Tracker",
      description: "Streamlit UI app showing college mess menus",
      borderColor: "border-cyan-400",
      tags: ["Streamlit", "Python", "UI"],
      category: "Python"
    },
    {
      title: "🐳 Flask-Docker App",
      description: "Flask app deployed using Docker + Jenkins pipelines",
      borderColor: "border-blue-400",
      tags: ["Docker", "Flask", "Jenkins"],
      category: "CI/CD"
    },
    {
      title: "🛠️ Mini Task Set",
      description: "Python automation: SMS, Email, WhatsApp, Phone calls",
      borderColor: "border-yellow-400",
      tags: ["Python", "Automation", "API"],
      category: "Python"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white relative overflow-x-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-pink-400 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Tech Logos & Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Particles */}
        <div className="absolute top-24 left-16 w-8 h-8 bg-cyan-400 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-1/3 right-24 w-6 h-6 bg-pink-400 rounded-full opacity-30 animate-bounce" />
        <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-violet-400 rounded-full opacity-25 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-10 h-10 bg-blue-400 rounded-full opacity-20 animate-bounce" />
        {/* Docker Logo */}
        <div className="absolute left-10 top-1/2 animate-float-slow">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="24" fill="#0db7ed"/><path d="M14 30c1.5 2.5 5.5 4 10 4 6.5 0 10-2.5 10-7v-1h-20v1c0 1.5.5 2.5 1.5 3z" fill="#fff"/><rect x="16" y="22" width="3" height="4" rx="1" fill="#fff"/><rect x="20" y="22" width="3" height="4" rx="1" fill="#fff"/><rect x="24" y="22" width="3" height="4" rx="1" fill="#fff"/><rect x="28" y="22" width="3" height="4" rx="1" fill="#fff"/></svg>
        </div>
        {/* Jenkins Logo */}
        <div className="absolute right-16 top-1/4 animate-float-medium">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="24" fill="#d24939"/><circle cx="24" cy="24" r="14" fill="#fff"/><ellipse cx="24" cy="28" rx="8" ry="6" fill="#d24939"/><ellipse cx="24" cy="22" rx="5" ry="6" fill="#fff" stroke="#d24939" strokeWidth="2"/></svg>
        </div>
        {/* Kubernetes Logo */}
        <div className="absolute left-1/3 bottom-16 animate-float-fast">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="24" fill="#326ce5"/><polygon points="24,12 34,24 24,36 14,24" fill="#fff"/></svg>
        </div>
        {/* Git Logo */}
        <div className="absolute right-1/3 bottom-24 animate-float-slow">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="24" fill="#f34f29"/><circle cx="24" cy="24" r="10" fill="#fff"/><rect x="22" y="18" width="4" height="12" rx="2" fill="#f34f29"/><rect x="18" y="22" width="12" height="4" rx="2" fill="#f34f29"/></svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Rohit
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center md:text-left">
            <div className="space-y-4">
              <p className="text-cyan-400 text-lg">Hello! I Am</p>
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                Rohit
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300">
                🚀 DevOps Engineer | Final Year B.Tech CSE
              </p>
              <p className="text-gray-400 text-lg max-w-2xl">
                Automating the future of software delivery, one pipeline at a time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                <span className="relative z-10 flex items-center gap-2">
                  📂 View Projects
                  <ExternalLink size={20} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group px-8 py-4 border-2 border-cyan-400 rounded-lg font-semibold transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                <span className="flex items-center gap-2">
                  <Download size={20} />
                  Download Resume
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/20 to-pink-400/20 flex items-center justify-center text-6xl">
                    👨‍💻
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-400/50">
                <span className="text-cyan-400 font-semibold">💻 DevOps Engineer</span>
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
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            🧠 About Me
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
      <section id="skills" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            ⚒️ Skills & Tools
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-xl font-semibold text-cyan-400 text-center">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-sm font-medium border border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            🚀 Projects That Speak DevOps
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'CI/CD', 'Python', 'Streamlit'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.5)]'
                    : 'bg-black/30 text-gray-300 hover:text-cyan-400 hover:border-cyan-400/50'
                } border border-white/10`}
              >
                <Filter size={16} className="inline mr-2" />
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className={`group relative bg-black/30 backdrop-blur-md rounded-2xl p-6 border-2 ${project.borderColor} hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 rounded-full text-sm text-cyan-400 border border-cyan-400/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="flex items-center gap-2 text-cyan-400 hover:text-pink-400 transition-colors">
                    🔍 View Details
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DevOps Tasks Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
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
      <section id="education" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            🎓 Education & Academics
          </h2>
          
          <div className="space-y-8">
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
                <h3 className="text-2xl font-bold text-cyan-400">B.Tech (CSE) | 2022 – Present</h3>
              </div>
              <p className="text-gray-300 mb-2">🏫 Vivekananda Global University, Jaipur</p>
              <p className="text-pink-400 font-semibold">📈 CGPA: 8.0</p>
            </div>

            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
                <h3 className="text-2xl font-bold text-pink-400">12th (CBSE) | 2020 – 2022</h3>
              </div>
              <p className="text-gray-300 mb-2">🎒 CMJ Institute of Education, Motihari (Bihar)</p>
              <p className="text-cyan-400 font-semibold">📈 74.4%</p>
            </div>

            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-4 h-4 bg-violet-400 rounded-full"></div>
                <h3 className="text-2xl font-bold text-violet-400">10th (CBSE) | 2019 – 2020</h3>
              </div>
              <p className="text-gray-300 mb-2">🎒 CMJ Institute of Education, Motihari (Bihar)</p>
              <p className="text-cyan-400 font-semibold">📈 83%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            💼 Internship Experience
          </h2>
          
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
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
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            📄 Resume
          </h2>
          
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
            <div className="text-6xl mb-6">📋</div>
            <p className="text-gray-300 mb-8 text-lg">
              Need a quick summary? Download my updated resume (PDF).
            </p>
            <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              <span className="flex items-center gap-2">
                <Download size={20} />
                Download Resume
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
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
          <p className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            "Keep shipping. Keep scaling." – Rohit, DevOps Engineer
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/rohit99-23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/rohit-kumar-157014289"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:rohitkumarpani246@gmail.com"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] z-30"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default App;