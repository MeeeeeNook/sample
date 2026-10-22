import React, { useEffect, useState, useRef } from 'react';

interface ResizerProps {
  onResize: (leftPercentage: number) => void;
}

export const Resizer: React.FC<ResizerProps> = ({ onResize }) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const parent = containerRef.current?.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percentage = (offsetX / rect.width) * 100;

      // Restrict percentage between 25% and 75%
      const clamped = Math.max(25, Math.min(75, percentage));
      onResize(clamped);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onResize]);

  return (
    <div
      ref={containerRef}
      onMouseDown={() => {
        setIsDragging(true);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
      }}
      className="hidden md:flex w-2.5 h-full bg-transparent hover:bg-blue-500/20 cursor-col-resize items-center justify-center group transition-colors shrink-0 z-20 my-auto"
      title="Drag to resize panes"
    >
      <div className="w-1 h-12 bg-gray-300 dark:bg-slate-700 group-hover:bg-[#005581] rounded-full transition-colors" />
    </div>
  );
};
