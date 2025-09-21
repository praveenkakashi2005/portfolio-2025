import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code } from 'lucide-react';
import TypingText from './TypingText';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const startPosition = window.pageYOffset;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // 1 second
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      
      // Ease in-out function for smooth acceleration/deceleration
      const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const percent = Math.min(progress / duration, 1);
      const easedPercent = easeInOutQuad(percent);
      
      // Apply rotation based on scroll progress (360 degrees for full scroll)
      document.documentElement.style.setProperty('--scroll-rotation', `${360 * percent}deg`);
      
      // Smooth scrolling
      window.scrollTo(0, startPosition + distance * easedPercent);
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        // Reset rotation after scroll completes
        setTimeout(() => {
          document.documentElement.style.removeProperty('--scroll-rotation');
        }, 200);
      }
    };
    
    window.requestAnimationFrame(step);
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 opacity-90" />
      
      <div className="container px-6 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, rotateX: 90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 origin-center"
        >
          {/* Profile Picture */}
          <motion.div
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto"
          >
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1 overflow-hidden"
              whileHover={{ 
                rotateY: 360,
                transition: { 
                  repeat: Infinity, 
                  duration: 4, 
                  ease: "linear",
                  repeatType: "loop"
                } 
              }}
            >
              <img
                src="/images/img1.jpeg"
                alt="Yogapraveen R"
                className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800 pointer-events-auto aspect-square"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://via.placeholder.com/320';
                }}
              />
            </motion.div>
          </motion.div>
          
          {/* Content */}
          <div className="w-full max-w-3xl mx-auto text-center">
            {/* Name and Title */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
            <TypingText
              name="Yogapraveen R"
              role="AI/ML & Full Stack Developer"
              typingSpeed={90}
              pauseBetween={800}
              nameClassName="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2"
              roleClassName="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 font-medium mb-8"
            />
            <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex justify-center space-x-6 mb-10"
            >
              {[
                { icon: <Github className="w-6 h-6" />, href: 'https://github.com/YogapraveenRavikumar2026', label: 'GitHub' },
                { icon: <Linkedin className="w-6 h-6" />, href: 'https://www.linkedin.com/in/yogapraveen-ravikumar-33507a2bb/', label: 'LinkedIn' },
                { icon: <Mail className="w-6 h-6" />, href: 'mailto:yogagkn@gmail.com', label: 'Email' },
                { icon: <Code className="w-6 h-6" />, href: 'https://leetcode.com/u/praveen532005/', label: 'LeetCode' }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-gray-900 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 bg-white/50 dark:bg-transparent rounded-full hover:bg-white/80 dark:hover:bg-gray-800/50 transition-all"
                  aria-label={item.label}
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-800 dark:text-gray-300 mb-10 px-4 font-medium"
            >
              Crafting intelligent solutions and seamless digital experiences through code and creativity
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                View My Work
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection('about')}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          aria-label="Scroll to next section"
        >
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
