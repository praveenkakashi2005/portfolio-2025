import ScorpionCursor from './components/ScorpionCursor';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/HeroNew';
import About from './components/About';
import FloatingSkills from './components/FloatingSkills';
import Projects from './components/ProjectsNew';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Chatbot from './components/Chatbot';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ThemeProvider>
      <ScorpionCursor />
      <div className="min-h-screen transition-colors duration-300">
        <ScrollProgress />
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <main>
              <Hero />
              <About />
              <FloatingSkills />
              <Projects />
              <Education />
              <Contact />
            </main>
            <Footer />
            <Chatbot />
          </motion.div>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;