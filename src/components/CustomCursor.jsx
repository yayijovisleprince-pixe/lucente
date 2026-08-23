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

    // Detect hover on interactive elements:
    // 1. [data-cursor] (Header items) -> 64px gold badge with label
    // 2. Buttons & Links (Accessibility mode) -> 26px sleek dark cursor with gold border & glow
    // 3. Plain background -> 32px idle semi-transparent gold ring
    const handleHoverIn = (e) => {
      const dataCursorEl = e.target.closest('[data-cursor]');
      const interactiveEl = e.target.closest('a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])');

      if (dataCursorEl) {
        isHovering.current = true;
        const cursorLabel = dataCursorEl.getAttribute('data-cursor');

        // State 1: Expand to 64px gold sphere with label
        outer.style.width = '64px';
        outer.style.height = '64px';
        outer.style.borderColor = '#FAF8F5';
        outer.style.backgroundColor = 'rgba(184, 155, 94, 0.95)';
        outer.style.boxShadow = '0 0 25px rgba(184, 155, 94, 0.55)';

        if (label) {
          label.textContent = cursorLabel || '';
          label.style.opacity = cursorLabel ? '1' : '0';
        }
        inner.style.opacity = '0';
      } else if (interactiveEl) {
        isHovering.current = true;

        // State 2: Sleek Dark / Accessible Mode (Buttons & Links like "VOIR LES MENUS DÉGUSTATION →")
        outer.style.width = '26px';
        outer.style.height = '26px';
        outer.style.borderColor = '#B89B5E';
        outer.style.backgroundColor = 'rgba(16, 16, 14, 0.92)';
        outer.style.boxShadow = '0 0 16px rgba(184, 155, 94, 0.45)';

        if (label) {
          label.textContent = '';
          label.style.opacity = '0';
        }
        inner.style.opacity = '1';
        inner.style.backgroundColor = '#B89B5E';
      }
    };

    const handleHoverOut = (e) => {
      const nextEl = e.relatedTarget;
      if (nextEl && nextEl.closest && (nextEl.closest('[data-cursor]') || nextEl.closest('a, button, input, select, textarea, [role="button"]'))) {
        return; // Handled smoothly by incoming hover event
      }

      isHovering.current = false;

      // State 3: Reset to idle semi-opaque gold sphere
      outer.style.width = '32px';
      outer.style.height = '32px';
      outer.style.borderColor = 'rgba(184, 155, 94, 0.75)';
      outer.style.backgroundColor = 'rgba(184, 155, 94, 0.45)';
      outer.style.boxShadow = '0 0 15px rgba(184, 155, 94, 0.25)';

      if (label) label.style.opacity = '0';
      inner.style.opacity = '1';
      inner.style.backgroundColor = '#FAF8F5';
    };

    document.addEventListener('mouseover', handleHoverIn);
    document.addEventListener('mouseout', handleHoverOut);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const render = () => {
      const ease = isHovering.current ? 0.16 : 0.22;
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
      {/* Outer opaque gold ball — expands on hover */}
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center opacity-0"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(184, 155, 94, 0.75)',
          backgroundColor: 'rgba(184, 155, 94, 0.45)',
          backdropFilter: 'blur(2px)',
          boxShadow: '0 0 15px rgba(184, 155, 94, 0.25)',
          willChange: 'transform, width, height',
          transition: 'width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.25s, background-color 0.25s, box-shadow 0.25s, opacity 0.25s',
        }}
      >
        {/* Crisp black label inside the opaque gold sphere */}
        <span
          ref={labelRef}
          style={{
            opacity: 0,
            transition: 'opacity 0.2s',
            fontSize: '8px',
            fontFamily: 'var(--font-sans, sans-serif)',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#10100E',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Inner bright point */}
      <div
        ref={cursorInnerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block opacity-0"
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: '#FAF8F5',
          boxShadow: '0 0 6px #B89B5E',
          willChange: 'transform',
          transition: 'opacity 0.2s',
        }}
      />
    </>
  );
}
