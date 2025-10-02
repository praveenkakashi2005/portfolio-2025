import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Award, Download } from 'lucide-react';

const certifications = [
  {
    name: 'AI Foundation',
    imgSrc: '/certificats/AIfoundation.png',
  },
  {
    name: 'Data Structures in C',
    imgSrc: '/certificats/dataStructuresinC.png',
  },
  {
    name: 'Generative AI',
    imgSrc: '/certificats/genAI.png',
  },
  {
    name: 'Java Foundation',
    imgSrc: '/certificats/javafoundation.png',
  },
  {
    name: 'Machine Learning',
    imgSrc: '/certificats/machinelearning.png',
  },
  {
    name: 'Python Zero to Hero',
    imgSrc: '/certificats/python.png',
  },
];

const Education: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'education' | 'certifications' | 'resume'>('education');
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomedCert, setZoomedCert] = useState<null | {name: string, imgSrc: string}>(null);
  const educationRef = useRef<HTMLDivElement>(null);

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

    if (educationRef.current) {
      observer.observe(educationRef.current);
    }

    return () => {
      if (educationRef.current) {
        observer.unobserve(educationRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="education" 
      ref={educationRef}
      className="py-20 opacity-0"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Education
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="relative flex border-b border-gray-300 dark:border-gray-700 mb-6">
            <button
              className={`px-6 py-2 rounded-t-lg font-semibold focus:outline-none transition-all duration-300 z-10 ${selectedTab === 'education' ? 'text-blue-700 dark:text-blue-300 scale-105 shadow-lg' : 'text-gray-800 dark:text-gray-300'}`}
              onClick={() => setSelectedTab('education')}
            >
              Education
            </button>
            <button
              className={`px-6 py-2 rounded-t-lg font-semibold focus:outline-none transition-all duration-300 ml-2 z-10 ${selectedTab === 'certifications' ? 'text-blue-700 dark:text-blue-300 scale-105 shadow-lg' : 'text-gray-800 dark:text-gray-300'}`}
              onClick={() => setSelectedTab('certifications')}
            >
              Certifications
            </button>
            <button
              className={`px-6 py-2 rounded-t-lg font-semibold focus:outline-none transition-all duration-300 ml-2 z-10 ${selectedTab === 'resume' ? 'text-blue-700 dark:text-blue-300 scale-105 shadow-lg' : 'text-gray-800 dark:text-gray-300'}`}
              onClick={() => setSelectedTab('resume')}
            >
              Resume
            </button>
            {/* Animated sliding highlight bar */}
            <span
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded transition-all duration-500 ease-in-out z-0`}
              style={{
                width: '120px',
                transform: selectedTab === 'education' 
                  ? 'translateX(0)' 
                  : selectedTab === 'certifications'
                    ? 'translateX(148px)'
                    : 'translateX(296px)',
                boxShadow: '0 2px 8px 2px rgba(59,130,246,0.18)',
              }}
            />
          </div>

          {/* Tab Content */}
          {selectedTab === 'education' && (
            <div className="flex flex-col md:flex-row bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="md:w-1/3 bg-blue-600 dark:bg-blue-700 text-white p-6 flex flex-col items-center justify-center">
                <BookOpen size={48} className="mb-4" />
                <h3 className="text-xl font-bold text-center">Bachelor of Engineering</h3>
                <p className="text-blue-100 text-center mt-2">2022 - 2026</p>
              </div>
              <div className="md:w-2/3 p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Computer Science & Engineering (AI&ML)
                </h4>
<p className="text-gray-600 dark:text-gray-400 mb-4 mt-2">
  Pursuing a comprehensive engineering program focused on computer science fundamentals, 
  software development, and specialized tracks in AI and machine learning.
</p>
<h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center">
  <Award size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
  Relevant Coursework:
</h5>
<ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-6">
  <li>Data Structures and Algorithms</li>
  <li>Machine Learning & Artificial Intelligence</li>
  <li>Web Development & Software Engineering</li>
  <li>Computer Vision & Image Processing</li>
  <li>Database Systems & Cloud Computing</li>
</ul>
<div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
  <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center">
    <Award size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
    Achievements:
  </h5>
  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-6">
    <li>1st Place at Project Olympiad-VOLANT’24. </li>
    <li>1st Place at ML Fusion-SPARK'24.</li>
    <li>Organizer for Neural Nexus-THREADS’25.</li>
  </ul>
</div>
              </div>
            </div>
          )}
          {selectedTab === 'certifications' && (
             <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
               <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                 Certifications
               </h3>
               <div className="overflow-x-auto">
                 <div className="flex flex-wrap gap-12 justify-center py-6">
  {certifications.map(cert => (
    <div key={cert.name} className="flex flex-col items-center min-w-[260px] cursor-pointer" onClick={() => { setZoomedCert(cert); setZoomOpen(true); }}>
      <img
        src={cert.imgSrc}
        alt={cert.name}
        className="w-64 h-48 object-contain rounded-xl shadow-lg mb-4 bg-white dark:bg-gray-900 p-4 border-2 border-gray-300 dark:border-gray-700 hover:scale-105 transition-transform duration-200"
      />
      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center mt-2">
        {cert.name}
      </span>
    </div>
  ))}

  {/* Zoom Modal */}
  {zoomOpen && zoomedCert && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setZoomOpen(false)}>
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 max-w-2xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl font-bold" onClick={() => setZoomOpen(false)}>&times;</button>
        <img src={zoomedCert.imgSrc} alt={zoomedCert.name} className="w-full max-h-[70vh] object-contain rounded-lg" />
        <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mt-4">{zoomedCert.name}</span>
      </div>
    </div>
  )}
</div>
               </div>
             </div>
           )}
           {selectedTab === 'resume' && (
             <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
               <div className="max-w-2xl mx-auto">
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Resume</h3>
                 <p className="text-gray-600 dark:text-gray-300 mb-8">
                   Download my resume to learn more about my professional experience, skills, and achievements.
                 </p>
                 <a 
                   href="/YOGAPRAVEEN-RAVIKUMAR-FlowCV-Resume-20250904 (1).pdf" 
                   download
                   className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-lg font-medium"
                 >
                   <Download size={20} className="mr-2" />
                   Download Resume
                 </a>
                 <div className="mt-8">
                   <p className="text-gray-500 dark:text-gray-400 text-sm">
                     File: YOGAPRAVEEN-RAVIKUMAR-FlowCV-Resume-20250904 (1).pdf
                   </p>
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>
     </section>
   );
}

export default Education;