'use client';

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const project = projects.find((item) => item.slug === slug);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme ? savedTheme === "dark" : true;
    setIsDarkMode(isDark);

    // Simulate data fetching delay to see loading state (remove in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!project) {
    return notFound();
  }

  if (isLoading) {
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

  const theme = {
    mainBg: isDarkMode
      ? "bg-slate-950 text-white"
      : "bg-slate-100 text-slate-950",
    border: isDarkMode ? "border-slate-800" : "border-slate-300",
    card: isDarkMode
      ? "bg-slate-900/70 border-slate-800"
      : "bg-white/70 border-slate-300",
    text: isDarkMode ? "text-slate-300" : "text-slate-700",
    tag: isDarkMode
      ? "border-slate-700 bg-slate-900 text-slate-300"
      : "border-slate-300 bg-white text-slate-700",
    gridOpacity: isDarkMode ? "opacity-100" : "opacity-60",
  };

  return (
    <main className={`relative min-h-screen overflow-x-hidden transition-colors duration-300 ${theme.mainBg}`}>
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:36px_36px] ${theme.gridOpacity}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_55%,rgba(2,6,23,0.35)_100%)]" />
      </div>

      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <Link
          href="/#projects"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur transition duration-300 mb-8 ${
            isDarkMode
              ? "border-slate-700 bg-slate-900/60 text-sky-400 hover:border-slate-500 hover:bg-slate-900"
              : "border-slate-300 bg-white/70 text-sky-600 hover:border-slate-400 hover:bg-white"
          }`}
        >
          ← Back to Projects
        </Link>

        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-400 mb-4">
            Project Details
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            {project.title}
          </h1>

          <p className={`text-lg leading-8 max-w-3xl ${theme.text}`}>
            {project.fullDescription}
          </p>
        </div>

        <div className={`relative h-[320px] md:h-[480px] overflow-hidden rounded-[2rem] border ${theme.border} ${isDarkMode ? 'bg-slate-900' : 'bg-slate-200'} mb-10`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`border px-4 py-2 rounded-xl ${theme.tag}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className={`border ${theme.card} rounded-3xl p-6`}>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className={theme.text}>
              This is a placeholder section for the project overview. Later you
              can describe the goal, context, users, or business problem.
            </p>
          </div>

          <div className={`border ${theme.card} rounded-3xl p-6`}>
            <h2 className="text-2xl font-semibold mb-4">What Will Be Added</h2>
            <p className={theme.text}>
              Here you will later add process steps, screenshots, analysis,
              research, tools, challenges, decisions, and outcomes.
            </p>
          </div>

          <div className={`border ${theme.card} rounded-3xl p-6`}>
            <h2 className="text-2xl font-semibold mb-4">Images</h2>
            <p className={theme.text}>
              You can later add gallery images, mockups, charts, or system
              screenshots for the project.
            </p>
          </div>

          <div className={`border ${theme.card} rounded-3xl p-6`}>
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <p className={theme.text}>
              This section can later show outcomes, business value, lessons
              learned, or technical takeaways.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}