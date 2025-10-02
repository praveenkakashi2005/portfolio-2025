import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Eye } from 'lucide-react';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="py-20 opacity-0"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <AnimatedParagraph className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed">
            I'm a passionate and driven Engineering student with a specialization in Machine Learning, Deep Learning, and Full Stack Development. I’ve built a range of impactful projects — from a Deepfake Detection System using CNN, a women's safety application, to scalable web platforms using React.js and Node.js — blending innovation with purpose. My goal is to turn complex problems into meaningful solutions.
          </AnimatedParagraph>
          
          <AnimatedParagraph className="text-gray-700 dark:text-gray-300 text-lg mb-12 leading-relaxed">
            My expanding skill set includes Prompt Engineering, Generative AI, and Project Management, backed by certifications from Microsoft, IBM, and LinkedIn. Technically, I work with Python, Java, CNN, NLP, and full-stack tools like MongoDB, React.js, and Node.js. I’m proud to have won 1st Prize for the IoT project “Bheem Converter” and to have deployed deep learning models for real-world medical and safety use cases. I'm always looking to collaborate, intern, or contribute to innovative tech initiatives.
          </AnimatedParagraph>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-transform hover:transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">AI & Machine Learning</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Developing intelligent systems that can learn from data and make predictions or decisions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-transform hover:transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">Full Stack Development</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Building complete web applications with both front-end interfaces and back-end functionality.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-transform hover:transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">Computer Vision</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Creating systems that can interpret and understand the visual world through digital images and videos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// AnimatedParagraph for word-by-word animation
const AnimatedParagraph: React.FC<{ children: string; className?: string }> = ({ children, className }) => {
  const words = children.split(/(\s+)/);
  return (
    <motion.p
      className={className}
      initial="hidden"
      animate="visible"
      variants={{}}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: word.trim() === '' ? 'pre' : undefined }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default About;