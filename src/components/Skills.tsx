import React, { useEffect, useRef } from 'react';
import { SiPython, SiJavascript, SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTensorflow, SiPytorch, SiGit, SiMysql, SiHtml5, SiCss3, SiPostman, SiSpring, SiOpencv, SiPandas, SiNumpy, SiScikitlearn, SiPostgresql } from 'react-icons/si';
import { Code } from 'lucide-react';

interface Skill {
  name: string;
  icon?: JSX.Element;
  note?: string;
}

const languages: Skill[] = [
  { name: 'Python', icon: <SiPython size={28} color="#3776AB" /> },
  { name: 'Java', icon: <Code size={28} color="#007396" /> },
  { name: 'JavaScript', icon: <SiJavascript size={28} color="#F7DF1E" /> },
];

const backend: Skill[] = [
  { name: 'Node.js', icon: <SiNodedotjs size={28} color="#339933" /> },
  { name: 'Express.js', icon: <SiExpress size={28} color="#000000" /> },
  { name: 'Spring Boot', icon: <SiSpring size={28} color="#6DB33F" /> },
];

const mlLibraries: Skill[] = [
  { name: 'NumPy', icon: <SiNumpy size={28} color="#013243" /> },
  { name: 'Pandas', icon: <SiPandas size={28} color="#150458" /> },
  { name: 'Matplotlib', icon: <Code size={28} color="#11557C" /> },
  { name: 'Seaborn', icon: <Code size={28} color="#7F4E90" /> },
  { name: 'Scikit-learn', icon: <SiScikitlearn size={28} color="#F7931E" /> },
  { name: 'TensorFlow', icon: <SiTensorflow size={28} color="#FF6F00" /> },
  { name: 'PyTorch', icon: <SiPytorch size={28} color="#EE4C2C" /> },
  { name: 'OpenCV', icon: <SiOpencv size={28} color="#5C3EE8" /> },
];

const frontend: Skill[] = [
  { name: 'React.js', icon: <SiReact size={28} color="#61DAFB" /> },
  { name: 'HTML5', icon: <SiHtml5 size={28} color="#E34F26" /> },
  { name: 'CSS3', icon: <SiCss3 size={28} color="#1572B6" /> },
];

const databases: Skill[] = [
  { name: 'MongoDB', icon: <SiMongodb size={28} color="#47A248" /> },
  { name: 'MySQL', icon: <SiMysql size={28} color="#4479A1" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql size={28} color="#336791" /> },
];

const concepts: Skill[] = [
  { name: 'Machine Learning' },
  { name: 'Deep Learning' },
  { name: 'Computer Vision' },
  { name: 'Natural Language Processing (NLP)' },
  { name: 'Data Structures & Algorithms' },
  { name: 'Object-Oriented Programming (OOPs)' },
];

const tools: Skill[] = [
  { name: 'Git & GitHub', icon: <SiGit size={28} color="#F05032" /> },
  { name: 'Postman', icon: <SiPostman size={28} color="#FF6C37" /> },
  { name: 'VS Code', icon: <Code size={28} color="#007ACC" /> },
];

const SkillList: React.FC<{ title: string; skills: Skill[] }> = ({ title, skills }) => (
  <div className="h-full bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
      {title}
    </h3>
    <div className="grid gap-2">
      {skills.map((skill) => (
        <div key={skill.name} className="flex items-center h-10 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          {skill.icon && <span className="w-8 flex-shrink-0">{skill.icon}</span>}
          <div className="flex-1">
            <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
            {skill.note && <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{skill.note}</span>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Skills: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

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

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="skills" 
      ref={skillsRef}
      className="py-20 opacity-0"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of the technologies I've been working with recently.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <SkillList title="Programming Languages" skills={languages} />
          <SkillList title="Backend" skills={backend} />
          <SkillList title="Libraries & Frameworks" skills={mlLibraries} />
          <SkillList title="Frontend" skills={frontend} />
          <SkillList title="Databases" skills={databases} />
          <SkillList title="Concepts & Tools" skills={[...concepts, ...tools]} />
        </div>
      </div>
    </section>
  );
};

export default Skills;