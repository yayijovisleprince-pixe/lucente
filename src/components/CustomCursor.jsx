import React, { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const requestRef = useRef(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hovered element for data-cursor or interactive tags
      const target = e.target.closest('[data-cursor], a, button, input, textarea, select');
      if (target) {
        const customText = target.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
          setIsHovered(true);
        } else if (target.tagName === 'A' || target.tagName === 'BUTTON') {
          setCursorText('');
          setIsHovered(true);
        } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          setIsVisible(false); // Hide over inputs for comfort
        }
      } else {
        setCursorText('');
        setIsHovered(false);
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth Lerp Spring Loop
    const render = () => {
      const ease = 0.18;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      setPosition({
        x: currentPos.current.x,
        y: currentPos.current.y
      });

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        willChange: 'transform'
      }}
    >
      {/* Outer Halo / Badge */}
      <div
        className={`relative -top-1/2 -left-1/2 flex items-center justify-center rounded-full transition-all duration-300 ${
          cursorText
            ? 'w-20 h-20 bg-or/90 text-nero backdrop-blur-sm border border-or shadow-2xl scale-100'
            : isHovered
            ? 'w-10 h-10 bg-or/20 border border-or/60 scale-125'
            : isClicking
            ? 'w-5 h-5 bg-or/40 border border-or scale-90'
            : 'w-7 h-7 bg-transparent border border-or/40'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, transform 0.2s ease'
        }}
      >
        {cursorText ? (
          <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-nero animate-fadeIn">
            {cursorText}
          </span>
        ) : (
          <div
            className={`w-1.5 h-1.5 rounded-full bg-or transition-transform duration-200 ${
              isHovered ? 'scale-150' : 'scale-100'
            }`}
          />
        )}
      </div>
    </div>
  );
}
