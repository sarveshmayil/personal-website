import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
}

const InteractivePoint: React.FC<{ point: Point; mousePosition: { x: number; y: number } }> = ({ point, mousePosition }) => {
  const x = useMotionValue(point.originX);
  const y = useMotionValue(point.originY);
  const springConfig = { stiffness: 300, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const updatePosition = () => {
      const dx = mousePosition.x - point.originX;
      const dy = mousePosition.y - point.originY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 100;

      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * 15;
        x.set(point.originX - dx * force / distance);
        y.set(point.originY - dy * force / distance);
      } else {
        x.set(point.originX);
        y.set(point.originY);
      }
    };

    updatePosition();
  }, [point, x, y, mousePosition]);

  return (
    <motion.circle
      cx={springX}
      cy={springY}
      r={2}
      fill="var(--color-accent)"
      opacity={0.4}
    />
  );
};

interface InteractiveGridProps {
  containerRef: React.RefObject<HTMLElement>;
}

const InteractiveGrid: React.FC<InteractiveGridProps> = ({ containerRef }) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const generatePoints = useCallback(() => {
    if (!containerRef.current) return;

    const newPoints: Point[] = [];
    const spacing = 60;
    const width = window.innerWidth;
    const height = containerRef.current.offsetHeight;

    for (let x = spacing; x < width - spacing; x += spacing) {
      for (let y = spacing; y < height - spacing; y += spacing) {
        newPoints.push({ x, y, originX: x, originY: y });
      }
    }

    setPoints(newPoints);
  }, [containerRef]);

  useEffect(() => {
    generatePoints();
    window.addEventListener('resize', generatePoints);

    return () => {
      window.removeEventListener('resize', generatePoints);
    };
  }, [generatePoints]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <svg 
      ref={svgRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ userSelect: 'none' }}
    >
      {points.map((point, index) => (
        <InteractivePoint key={index} point={point} mousePosition={mousePosition} />
      ))}
    </svg>
  );
};

export default InteractiveGrid;