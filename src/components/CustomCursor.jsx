import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const labelRef = useRef(null);
  const targetPos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });
  const isVisible = useRef(false);
  const isHovering = useRef(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const outer = cursorOuterRef.current;
    const inner = cursorInnerRef.current;
    const label = labelRef.current;
    if (!outer || !inner) return;

    let animFrameId = null;

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        outer.style.opacity = '1';
        inner.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      outer.style.opacity = '0';
      inner.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      outer.style.opacity = '1';
      inner.style.opacity = '1';
    };

    // Detect hover on interactive elements (data-cursor or buttons/links)
    const handleHoverIn = (e) => {
      const el = e.target.closest('[data-cursor], a, button');
      if (!el) return;
      isHovering.current = true;
      const cursorLabel = el.getAttribute('data-cursor');
      // Expand outer ring
      outer.style.width = '56px';
      outer.style.height = '56px';
      outer.style.borderColor = 'rgba(184,155,94,0.85)';
      outer.style.backgroundColor = 'rgba(184,155,94,0.10)';
      // Show label if any
      if (cursorLabel && label) {
        label.textContent = cursorLabel;
        label.style.opacity = '1';
      }
      // Shrink inner dot
      inner.style.width = '4px';
      inner.style.height = '4px';
    };

    const handleHoverOut = (e) => {
      const el = e.target.closest('[data-cursor], a, button');
      if (!el) return;
      isHovering.current = false;
      // Reset outer ring
      outer.style.width = '28px';
      outer.style.height = '28px';
      outer.style.borderColor = 'rgba(184,155,94,0.45)';
      outer.style.backgroundColor = 'transparent';
      // Hide label
      if (label) label.style.opacity = '0';
      // Reset inner dot
      inner.style.width = '6px';
      inner.style.height = '6px';
    };

    document.addEventListener('mouseover', handleHoverIn);
    document.addEventListener('mouseout', handleHoverOut);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const render = () => {
      const ease = isHovering.current ? 0.12 : 0.18;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      if (outer) {
        outer.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (inner) {
        inner.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleHoverIn);
      document.removeEventListener('mouseout', handleHoverOut);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      {/* Outer ring — slow, expands on hover */}
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center opacity-0"
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1px solid rgba(184,155,94,0.45)',
          backgroundColor: 'transparent',
          willChange: 'transform, width, height',
          transition: 'width 0.35s cubic-bezier(0.25,0.46,0.45,0.94), height 0.35s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s, background-color 0.3s, opacity 0.3s',
        }}
      >
        {/* Label inside the expanded cursor */}
        <span
          ref={labelRef}
          style={{
            opacity: 0,
            transition: 'opacity 0.2s',
            fontSize: '7px',
            fontFamily: 'var(--font-sans, sans-serif)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#B89B5E',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Inner dot — fast, stays on exact mouse position */}
      <div
        ref={cursorInnerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block opacity-0"
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#B89B5E',
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s, opacity 0.3s',
        }}
      />
    </>
  );
}
