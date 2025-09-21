import React, { useEffect, useState } from 'react';

interface TypingTextProps {
  name: string;
  role: string;
  typingSpeed?: number; // ms per character
  pauseBetween?: number; // ms between lines
  nameClassName?: string;
  roleClassName?: string;
}

const TypingText: React.FC<TypingTextProps> = ({
  name,
  role,
  typingSpeed = 100,
  pauseBetween = 800,
  nameClassName = '',
  roleClassName = '',
}) => {
  const [typedName, setTypedName] = useState('');
  const [typedRole, setTypedRole] = useState('');
  const [phase, setPhase] = useState<'name' | 'role' | 'done'>('name');

  useEffect(() => {
    if (phase === 'name' && typedName.length < name.length) {
      const timeout = setTimeout(() => {
        setTypedName(name.slice(0, typedName.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (phase === 'name') {
      const pause = setTimeout(() => setPhase('role'), pauseBetween);
      return () => clearTimeout(pause);
    } else if (phase === 'role' && typedRole.length < role.length) {
      const timeout = setTimeout(() => {
        setTypedRole(role.slice(0, typedRole.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (phase === 'role') {
      setPhase('done');
    }
  }, [phase, typedName, typedRole, name, role, typingSpeed, pauseBetween]);

  return (
    <div style={{ display: 'inline-block', textAlign: 'center' }}>
      <div className={nameClassName} style={{ display: 'block' }}>
        {typedName}
        {phase === 'name' && <span className="typing-cursor" style={{ borderRight: '2px solid', animation: 'blink 1s step-end infinite' }}></span>}
      </div>
      <div
        className={roleClassName}
        style={{
          display: 'block',
          opacity: phase === 'role' || phase === 'done' ? 1 : 0,
          transition: 'opacity 0.5s',
        }}
      >
        {typedRole}
        {phase === 'role' && <span className="typing-cursor" style={{ borderRight: '2px solid', animation: 'blink 1s step-end infinite' }}></span>}
      </div>
    </div>
  );
};

export default TypingText;
