'use client';

import AnimatedCursor from 'react-animated-cursor';

export default function CustomCursor() {
  return (
    <AnimatedCursor
      innerSize={8}
      outerSize={35}
      innerScale={1}
      outerScale={2}
      outerAlpha={0}
      innerStyle={{
        backgroundColor: 'var(--bg-tertiary)',
        zIndex: 99999
      }}
      outerStyle={{
        border: '3px solid var(--bg-tertiary)',
        zIndex: 99999
      }}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]}
    />
  );
}
