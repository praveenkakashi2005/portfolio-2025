import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  github: string;
  demo?: string;
  category?: string;
}

const projectsData: Project[] = [
  {
    title: "Social Media Analytics",
    description: "Analyzed user engagement with sentiment analysis and predictive tools.",
    longDescription: "A comprehensive analytics platform that studies user engagement and behavior patterns on social media. Implemented sentiment analysis and predictive modeling to provide actionable insights for content strategy.",
    image: "https://images.pexels.com/photos/8088489/pexels-photo-8088489.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["MongoDB", "Express", "React", "Node.js", "Data Analysis"],
    github: "https://github.com/YogapraveenRavikumar2026/SMA-Main-project1",
    demo: "#",
    category: "web"
  },
  {
    title: "E-commerce Website (MERN Stack)",
    description: "Scalable MERN e-commerce with auth, cart, admin dashboard, and RBAC.",
    longDescription: "Built a scalable full‑stack shopping platform using MongoDB, Express.js, React.js, and Node.js. Features include product listing and search, secure authentication, shopping cart & checkout, and an admin dashboard with role‑based access control for product and user management.",
    image: "https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "RBAC"],
    github: "https://github.com/YogapraveenRavikumar2026/FSD_project",
    demo: "#",
    category: "web"
  },
  {
    title: "Smart Object Detection",
    description: "Real-time object detection using deep learning models.",
    longDescription: "An advanced computer vision system that detects and classifies objects in real-time using YOLO and Faster R-CNN models. Processes video streams with high accuracy and performance.",
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Python", "TensorFlow", "OpenCV", "YOLO"],
    github: "https://github.com/YogapraveenRavikumar2026/dl-object-detection",
    category: "ai"
  },
  {
    title: "Women Safety Alert System",
    description: "Real‑time safety system with gesture detection and instant alerts.",
    longDescription: "Designed a real‑time safety system using computer vision to detect emergency gestures and trigger immediate alerts. Integrated with an Arduino microcontroller via serial communication for rapid response and notifications.",
    image: "/projectImage/womensaftyImg.jpg",
    tags: ["Python", "OpenCV", "Arduino", "TensorFlow", "Serial Communication"],
    github: "https://github.com/YogapraveenRavikumar2026/women-safty-",
    category: "ai"
  },
  {
    title: "Personal Portfolio Website",
    description: "Responsive portfolio showcasing projects and skills, deployed on Vercel.",
    longDescription: "Built a modern, responsive portfolio using React.js and TailwindCSS to highlight projects, skills, and experience. Focused on performance, accessibility, and clean UI; deployed on Vercel for fast global delivery.",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["React", "TailwindCSS", "Vercel"],
    github: "#",
    demo: "#",
    category: "web"
  },
  {
    title: "Knee Osteoarthritis Classification",
    description: "CNN model classifying knee X‑rays for osteoarthritis detection.",
    longDescription: "Developed a deep learning pipeline to classify knee X‑ray images for osteoarthritis detection. Utilized preprocessing, data augmentation, and a CNN in TensorFlow/Keras, achieving strong accuracy and F1‑score with clear visualizations.",
    image: "https://images.pexels.com/photos/4226264/pexels-photo-4226264.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
    github: "#",
    category: "ai"
  }
];

const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Here are some of the projects I've worked on
        </p>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="web">Web Development</option>
            <option value="ai">AI/ML</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects found matching your criteria.</p>
          </div>
        )}
      </div>

      {filteredProjects.length > 0 && (
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            View More Projects
          </button>
        </div>
      )}

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
