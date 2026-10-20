import React from 'react';

/**
 * Full-screen looping background video shown behind every route.
 * Sits at z-index -10 so it never blocks clicks or content.
 */
const BackgroundVideo: React.FC = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
    <video
      src="/bg.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="h-full w-full object-cover"
    />
    {/* Dark veil so text and cards stay readable */}
    <div className="absolute inset-0 bg-black/55" />
  </div>
);

export default BackgroundVideo;