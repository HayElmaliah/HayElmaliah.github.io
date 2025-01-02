// App.jsx
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Mail } from 'lucide-react';

const Portfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCanvasSupported, setIsCanvasSupported] = useState(true);

  useEffect(() => {
    // Check if canvas is supported
    const canvas = document.createElement('canvas');
    setIsCanvasSupported(!!canvas.getContext);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    "Python", "C++", "JavaScript", "React", "Node.js",
    "Linux", "Git", "EDA Tools", "Machine Learning"
  ];

  const mainProjects = [
    {
      title: "TakTick",
      description: "Full-stack task management application featuring user authentication, priority levels, and interactive dashboards. Built with modern web technologies for real-time collaboration.",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://taktick.netlify.app/",
      github: "https://github.com/HayElmaliah/TaskTracker"
    },
    {
      title: "YOLOv8 Object Detection",
      description: "Advanced implementation of environmental trash detection using YOLOv8. Conducted extensive experiments and achieved significant improvements in detection accuracy on the TACO dataset.",
      tech: ["PyTorch", "Computer Vision", "Deep Learning"],
      github: "https://github.com/HayElmaliah/Deep-Learning-CS236781-MiniProject"
    },
    {
      title: "Multi-Agent Systems",
      description: "Implemented algorithms for geometric search patterns, focusing on circular pincer movements - Featuring simulation of multiple agents performing coordinated search strategies.",
      tech: ["Python", "NumPy", "Matplotlib", "Algorithms"],
      github: "https://github.com/HayElmaliah/On-Multi-Agent-Systems-CS236604"
    }
  ];

  const academicProjects = [
    {
      title: "Intro to Data Processing",
      github: "https://github.com/HayElmaliah/Intro-to-data-processing-CS236201"
    },
    {
      title: "Deep Learning Course",
      github: "https://github.com/HayElmaliah/Deep-Learning-CS236781"
    },
    {
      title: "Submodular Optimization",
      github: "https://github.com/HayElmaliah/Submodular-Optimization-Algorithms-CS236621"
    }
  ];

  // Matrix rain effect with error handling and performance optimizations
  useEffect(() => {
    if (!isCanvasSupported) return;

    const canvas = document.getElementById('matrix-rain');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const chars = '0123456789ABCDEF';
    const fontSize = Math.max(12, Math.floor(window.innerWidth / 100)); // Responsive font size
    const columns = Math.ceil(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    let animationFrameId;
    let lastTime = 0;
    const fps = 30;
    const frameInterval = 1000 / fps;

    const draw = (currentTime) => {
      animationFrameId = requestAnimationFrame(draw);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (y < canvas.height) {
          ctx.fillText(text, x, y);
        }
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      lastTime = currentTime;
    };

    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        drops.length = Math.ceil(canvas.width / fontSize);
        drops.fill(1);
      }, 250);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isCanvasSupported]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold">HE</span>
            <div className="hidden sm:flex space-x-8">
              {['projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-300 hover:text-white transition-colors capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        {isCanvasSupported && (
          <canvas 
            id="matrix-rain" 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          />
        )}
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Hay Elmaliah
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            Software Engineer at Intel PESG
          </p>
          <button 
            onClick={() => scrollToSection('projects')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            See My Projects
          </button>
        </div>
      </section>

      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainProjects.map((project, idx) => (
              <div 
                key={idx}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIdx) => (
                    <span 
                      key={techIdx}
                      className="px-3 py-1 text-sm bg-gray-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Code
                  </a>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors inline-flex items-center"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Academic Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicProjects.map((project, idx) => (
              <div 
                key={idx}
                className="bg-gray-800 rounded-lg p-5 flex items-center justify-between hover:bg-gray-700 transition-colors"
              >
                <span className="text-lg font-semibold">{project.title}</span>
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gray-800 rounded-lg text-gray-200 hover:bg-gray-700 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="mailto:hay.elmaliah@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;