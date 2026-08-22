import React from 'react';

export default function TextReveal({ 
  text = '', 
  className = '', 
  tag = 'h2', 
  delay = 0 
}) {
  const Tag = tag;
  const lines = text.split('\n');

  return (
    <Tag className={`overflow-hidden ${className}`}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden">
          <span
            className="block transform translate-y-full animate-textLineReveal"
            style={{
              animationDelay: `${delay + idx * 0.15}s`,
              animationFillMode: 'forwards'
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
