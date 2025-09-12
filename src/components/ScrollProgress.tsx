import React, { useEffect, useState } from "react";

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollTop = Math.max(window.scrollY, doc.scrollTop);
        const max = doc.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (scrollTop / max) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, pct)));
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="h-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 animated-gradient"
      style={{ width: `${progress}%` }}
      aria-hidden
    />
  );
};

export default ScrollProgress;

