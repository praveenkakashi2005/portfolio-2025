import React, { useEffect, useRef } from "react";

const TAIL_LENGTH = 26; // shorter, more realistic
const SEGMENT_LENGTH = 12;
const LEG_COLOR = "#d9d9d9";
const LEG_LENGTH = 16;
// Colors for striped tail (grayscale stripes for dark/white/black look)
const STRIPE_COLORS = ["#ffffff", "#bfbfbf", "#222222"]; // white, gray, near-black
const STINGER_FILL = "#eeeeee";
const STINGER_STROKE = "#111111";
// Head styling (geometric wedge style to match reference)
const HEAD_RADIUS = 12;
const HEAD_FILL = "#dcdcdc"; // light gray fill
const HEAD_STROKE = "#222222"; // dark outline

const ScorpionCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const segments: { x: number; y: number }[] = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    for (let i = 0; i < TAIL_LENGTH; i++) {
      segments.push({ x: mouse.x, y: mouse.y });
    }

    const update = (x: number, y: number) => {
      segments[0].x = x;
      segments[0].y = y;
      for (let i = 1; i < segments.length; i++) {
        // Curve the tail by offsetting the angle
        const prev = segments[i - 1];
        const curr = segments[i];
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Angle towards previous, but curve slightly using sine
        const angle = Math.atan2(dy, dx) + Math.sin(Date.now() / 400 + i * 0.2) * 0.18 * (i / segments.length);
        if (dist > SEGMENT_LENGTH) {
          curr.x = prev.x + Math.cos(angle) * SEGMENT_LENGTH;
          curr.y = prev.y + Math.sin(angle) * SEGMENT_LENGTH;
        }
      }
    };

    const drawLegs = (segIdx: number, x: number, y: number, angle: number) => {
      // Only draw legs for the first 30% of segments (scorpion tail base)
      if (segIdx < 5 || segIdx > TAIL_LENGTH * 0.5) return;
      for (let side = -1; side <= 1; side += 2) {
        // Animate leg wave with time and segment index
        const legAngle = angle + side * (Math.PI / 2.3 + Math.sin(Date.now() / 250 + segIdx * 0.7) * 0.18);
        const legLen = LEG_LENGTH + Math.sin(Date.now() / 350 + segIdx) * 2;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(legAngle) * legLen, y + Math.sin(legAngle) * legLen);
        ctx.strokeStyle = LEG_COLOR;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = LEG_COLOR;
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      // Draw head at the leading end (near the cursor)
      const head = segments[0];
      const next = segments[1] || head;
      const forwardAngle = Math.atan2(head.y - next.y, head.x - next.x);
      ctx.save();
      ctx.translate(head.x, head.y);
      // Wedge head as polygon with outline
      const wedge = HEAD_RADIUS + 8;
      const leftPoint = {
        x: Math.cos(forwardAngle + 0.60) * wedge,
        y: Math.sin(forwardAngle + 0.60) * wedge,
      };
      const rightPoint = {
        x: Math.cos(forwardAngle - 0.60) * wedge,
        y: Math.sin(forwardAngle - 0.60) * wedge,
      };
      const backPoint = {
        x: Math.cos(forwardAngle + Math.PI) * (HEAD_RADIUS * 0.6),
        y: Math.sin(forwardAngle + Math.PI) * (HEAD_RADIUS * 0.6),
      };
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(leftPoint.x, leftPoint.y);
      ctx.lineTo(backPoint.x, backPoint.y);
      ctx.lineTo(rightPoint.x, rightPoint.y);
      ctx.closePath();
      ctx.fillStyle = HEAD_FILL;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = HEAD_STROKE;
      ctx.stroke();
      // Angular pincers (filled polygons), slight wave for liveliness
      const wave = Math.sin(Date.now() / 280) * 0.12;
      const pincerSpread = Math.PI / 5.5;
      const base = HEAD_RADIUS * 0.8;
      const inner = HEAD_RADIUS + 10;
      const leftDir = forwardAngle - (pincerSpread + wave);
      const rightDir = forwardAngle + (pincerSpread + wave);
      const drawPincer = (dir: number) => {
        const baseX = Math.cos(dir) * base;
        const baseY = Math.sin(dir) * base;
        const innerX = Math.cos(dir) * inner;
        const innerY = Math.sin(dir) * inner;
        const tipDir = dir + (dir === leftDir ? 0.35 : -0.35);
        const tipX = innerX + Math.cos(tipDir) * 10;
        const tipY = innerY + Math.sin(tipDir) * 10;
        const sideDir = dir + (dir === leftDir ? -0.6 : 0.6);
        const sideX = Math.cos(sideDir) * (HEAD_RADIUS * 0.6);
        const sideY = Math.sin(sideDir) * (HEAD_RADIUS * 0.6);
        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        ctx.lineTo(innerX, innerY);
        ctx.lineTo(tipX, tipY);
        ctx.lineTo(sideX, sideY);
        ctx.closePath();
        ctx.fillStyle = "#bfbfbf";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = HEAD_STROKE;
        ctx.stroke();
      };
      drawPincer(leftDir);
      drawPincer(rightDir);
      ctx.restore();
      // Draw tail as per-segment stripes with tapered width
      for (let i = 1; i < segments.length; i++) {
        const p1 = segments[i - 1];
        const p2 = segments[i];
        const color = STRIPE_COLORS[i % STRIPE_COLORS.length];
        // Taper width from base to tip
        const t = i / (segments.length - 1);
        const width = 8 * (1 - t) + 2.5; // 10 -> 2.5
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8 * (1 - t);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      // Draw legs for each segment (first 60% of body)
      for (let i = 4; i < segments.length * 0.6; i++) {
        const seg = segments[i];
        const prev = segments[i - 1];
        const angle = Math.atan2(seg.y - prev.y, seg.x - prev.x);
        drawLegs(i, seg.x, seg.y, angle);
      }
      // Draw stinger (triangle) at the tip with outline
      const tip = segments[segments.length - 1];
      const tipPrev = segments[segments.length - 2];
      const angle = Math.atan2(tip.y - tipPrev.y, tip.x - tipPrev.x);
      const stingerLen = 22;
      ctx.save();
      ctx.translate(tip.x, tip.y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-stingerLen, 7);
      ctx.lineTo(-stingerLen, -7);
      ctx.closePath();
      ctx.fillStyle = STINGER_FILL;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = STINGER_STROKE;
      ctx.stroke();
      ctx.restore();
      ctx.restore();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      update(mouse.x, mouse.y);
      draw();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ScorpionCursor;
