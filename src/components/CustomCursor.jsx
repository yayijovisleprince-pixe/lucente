import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    let animFrameId = null;

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        cursorEl.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      cursorEl.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      cursorEl.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const render = () => {
      const ease = 0.2;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block opacity-0 transition-opacity duration-300"
      style={{ willChange: 'transform' }}
    >
      <div
        className="w-6 h-6 -top-3 -left-3 rounded-full border border-or/50 flex items-center justify-center pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-or" />
      </div>
    </div>
  );
}
