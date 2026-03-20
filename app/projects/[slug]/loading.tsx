'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme ? savedTheme === 'dark' : true;
    setIsDarkMode(isDark);
  }, []);

  return (
    <main className={`min-h-screen relative overflow-x-hidden flex items-center justify-center ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-950'}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:36px_36px] ${isDarkMode ? 'opacity-100' : 'opacity-60'}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_55%,rgba(2,6,23,0.35)_100%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <p className={`uppercase tracking-[0.35em] text-sm mb-6 animate-pulse ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          Loading Project
        </p>

        <h1 className={`text-5xl md:text-7xl font-bold tracking-wide bg-gradient-to-r ${isDarkMode ? 'from-white/10 via-white/40 to-white/10' : 'from-slate-950/10 via-slate-950/40 to-slate-950/10'} bg-[length:200%_100%] bg-clip-text text-transparent animate-[shine_2.5s_linear_infinite] select-none`}>
          Dor Yogev
        </h1>

        <div className={`mt-8 h-[2px] w-40 overflow-hidden rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-300'}`}>
          <div className="h-full w-1/2 animate-[loadingBar_1.4s_ease-in-out_infinite] rounded-full bg-sky-400" />
        </div>
      </div>
    </main>
  );
}