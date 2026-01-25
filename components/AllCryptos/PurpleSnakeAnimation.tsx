'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Bounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Map distance along rectangle perimeter (clockwise from top-left)
function pointOnPerimeter(x: number, y: number, w: number, h: number, distance: number): Point {
  const perimeter = 2 * (w + h);
  const d = ((distance % perimeter) + perimeter) % perimeter;

  if (d <= w) return { x: x + d, y };
  if (d <= w + h) return { x: x + w, y: y + (d - w) };
  if (d <= 2 * w + h) return { x: x + w - (d - w - h), y: y + h };
  return { x, y: y + h - (d - 2 * w - h) };
}

interface PurpleSnakeAnimationProps {
  children: React.ReactNode;
  trendingRef?: React.RefObject<HTMLDivElement>;
  newsRef?: React.RefObject<HTMLDivElement>;
  nftRef?: React.RefObject<HTMLDivElement>;
}

export default function PurpleSnakeAnimation({ children, trendingRef, newsRef, nftRef }: PurpleSnakeAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

  // Determine if we're in multi-section mode (homepage) or single-container mode (markets)
  const isMultiSection = !!(trendingRef && newsRef && nftRef);

  const snakeStateRef = useRef({
    position: 0,
    speed: 150,
    length: 200,
  });

  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(Date.now());
  const isVisibleRef = useRef(true);
  const mountTimeRef = useRef<number>(Date.now());
  
  // Animation state
  const [opacity, setOpacity] = useState(1);
  const [currentSection, setCurrentSection] = useState<'trending' | 'news' | 'nft'>('trending');
  const [animationPhase, setAnimationPhase] = useState<'fadeIn' | 'animate' | 'fadeOut'>('fadeIn');
  const sectionStartTimeRef = useRef<number>(Date.now());
  const phaseStartTimeRef = useRef<number>(Date.now());
  
  const ANIMATION_TIME = 6; // 6 seconds per section
  const FADE_DURATION = 1.0; // 1 second for fade (increased for smoother effect)
  const SECTION_COLOR: Record<'trending' | 'news' | 'nft', string> = {
    trending: '#a855f7',
    news: '#22d3ee',
    nft: '#f59e0b',
  };

  // Setup canvas
  useEffect(() => {
    const setup = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setCanvasSize({ w: rect.width, h: rect.height });

      canvasRef.current.width = rect.width;
      canvasRef.current.height = rect.height;

      lastTimeRef.current = Date.now();
      mountTimeRef.current = Date.now();
    };

    const timeout = setTimeout(setup, 50);
    window.addEventListener('resize', setup);

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden) {
        lastTimeRef.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', setup);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Single-container mode: simple continuous animation
  useEffect(() => {
    if (isMultiSection) return;

    const fadeInterval = setInterval(() => {
      const elapsed = (Date.now() - mountTimeRef.current) / 1000;
      setOpacity(Math.min(elapsed / 3, 1));
    }, 16);

    return () => clearInterval(fadeInterval);
  }, [isMultiSection]);

  // Multi-section mode: handle animation phases
  useEffect(() => {
    if (!isMultiSection) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedInPhase = (now - phaseStartTimeRef.current) / 1000;

      if (animationPhase === 'fadeIn') {
        setOpacity(1);
        phaseStartTimeRef.current = Date.now();
        setAnimationPhase('animate');
      } else if (animationPhase === 'animate') {
        setOpacity(1);
        if (elapsedInPhase >= ANIMATION_TIME) {
          phaseStartTimeRef.current = Date.now();
          setAnimationPhase('fadeOut');
        }
      } else if (animationPhase === 'fadeOut') {
        const fadeProgress = Math.min(elapsedInPhase / FADE_DURATION, 1);
        setOpacity(Math.max(1 - fadeProgress, 0));
        if (fadeProgress >= 1) {
          setCurrentSection((prev) => {
            let next: 'trending' | 'news' | 'nft';
            if (prev === 'trending') next = 'news';
            else if (prev === 'news') next = 'nft';
            else next = 'trending';
            return next;
          });
          // Reset path for next section start; snake is invisible here
          snakeStateRef.current.position = 0;
          sectionStartTimeRef.current = Date.now();
          phaseStartTimeRef.current = Date.now();
          setAnimationPhase('fadeIn');
        }
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isMultiSection, animationPhase]);

  // Get active bounds based on section
  const getActiveBounds = (): Bounds => {
    if (!isMultiSection) {
      return { x: 0, y: 0, w: canvasSize.w, h: canvasSize.h };
    }

    let ref;
    if (currentSection === 'trending') ref = trendingRef;
    else if (currentSection === 'news') ref = newsRef;
    else ref = nftRef;

    if (!ref?.current) {
      return { x: 0, y: 0, w: 0, h: 0 };
    }

    const sectionRect = ref.current.getBoundingClientRect();
    // Always use (0,0,width,height) for the section, so the snake traces the outer border
    return {
      x: 0,
      y: 0,
      w: sectionRect.width,
      h: sectionRect.height,
    };
  };

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || canvasSize.w <= 0 || canvasSize.h <= 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const now = Date.now();
      let deltaTime = (now - lastTimeRef.current) / 1000;

      if (deltaTime > 0.05) {
        lastTimeRef.current = now;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTimeRef.current = now;

      const activeBounds = getActiveBounds();

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw if we have valid bounds
      if (activeBounds.w <= 0 || activeBounds.h <= 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const perimeter = 2 * (activeBounds.w + activeBounds.h);

      // Update position for animate phase only
      if (isMultiSection && animationPhase === 'animate') {
        snakeStateRef.current.position += snakeStateRef.current.speed * deltaTime;
      } else if (!isMultiSection) {
        // Single container: loop continuously
        snakeStateRef.current.position = (snakeStateRef.current.position + snakeStateRef.current.speed * deltaTime) % perimeter;
      }

      // Draw snake
      const headPos = snakeStateRef.current.position;
      const tailPos = isMultiSection 
        ? Math.max(0, headPos - snakeStateRef.current.length)
        : (headPos - snakeStateRef.current.length + perimeter) % perimeter;

      ctx.beginPath();
      const samples = 25;

      for (let i = 0; i <= samples; i++) {
        const ratio = i / samples;
        let currentPos;
        
        if (isMultiSection) {
          currentPos = tailPos + snakeStateRef.current.length * ratio;
        } else {
          currentPos = (tailPos + snakeStateRef.current.length * ratio) % perimeter;
        }
        
        const point = pointOnPerimeter(activeBounds.x, activeBounds.y, activeBounds.w, activeBounds.h, currentPos);

        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }

      ctx.strokeStyle = SECTION_COLOR[currentSection];
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#a855f7';
      ctx.globalAlpha = opacity * 0.95;
      ctx.stroke();

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = Date.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasSize, isMultiSection, animationPhase, currentSection, opacity]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full" 
    >
      <div className="relative z-0">
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
        {children}
      </div>
    </div>
  );
}
