'use client';
import React, { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]|/\\';

const MatrixRain: React.FC<{ opacity?: number }> = ({ opacity = 0.18 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(0).map(() => Math.random() * -50);
    const speeds: number[] = Array(cols).fill(0).map(() => 0.3 + Math.random() * 0.7);
    const brightDrops: boolean[] = Array(cols).fill(false).map(() => Math.random() > 0.85);

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.fillStyle = 'rgba(10, 10, 10, 0.045)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Lead character — bright white/green
        if (brightDrops[i]) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = '#00ff41';
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 4;
        }
        ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
        ctx.fillText(char, x, y);

        // Trail fades
        ctx.shadowBlur = 0;

        drops[i] += speeds[i];
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.random() * -20;
          brightDrops[i] = Math.random() > 0.85;
        }
      }
    };

    const interval = setInterval(draw, 40);
    window.addEventListener('resize', resize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        opacity,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default MatrixRain;
