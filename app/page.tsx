"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { projects } from "@/lib/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const typingWords = [
  "Business Analysis",
  "Operations & Process Improvement",
  "UX Thinking",
  "Data-Driven Problem Solving",
];

const navItems = ["about", "journey", "projects", "skills", "contact"];

const experienceItems = [
  {
    period: "2019 - Present",
    title: "Assistant Operations Manager",
    company: "Fritz Logistics",
    description:
      "Manage delivery-related operations, coordinate with customers and agents, monitor execution quality, and help ensure timely and reliable process flow across daily operations.",
  },
  {
    period: "2019 - Present",
    title: "Accounting & Process Support",
    company: "Fritz Logistics",
    description:
      "Support invoice and financial statement workflows, help ensure timely payments, and contribute to operational accuracy and efficiency across departments.",
  },
  {
    period: "2019 - Present",
    title: "System Implementation & Team Support",
    company: "Fritz Logistics",
    description:
      "Contributed to the implementation of a new internal system, supported communication across teams, and helped train new employees while maintaining accuracy, teamwork, and continuous improvement.",
  },
  {
    period: "2016 - 2019",
    title: "Flight Controller & Intelligence",
    company: "Israeli Air Force",
    description:
      "Served in the Israeli Air Force in flight control and intelligence roles. Worked with large volumes of information, supported operational decision-making, led impactful projects, and delivered presentations to senior-ranking officers.",
  },
];

const educationItems = [
  {
    period: "2024 - 2028",
    title: "B.Sc. in Industrial Engineering and Management",
    company: "H.I.T College",
    description:
      "Currently pursuing a bachelor’s degree in Industrial Engineering and Management, with growing focus on business analysis, systems thinking, process improvement, and data-oriented problem solving.",
  },
  {
    period: "2020 - 2023",
    title: "Electrical Engineering Studies",
    company: "Ariel University",
    description:
      "Completed two years of bachelor-level studies in Electrical Engineering, building a strong analytical and technical foundation.",
  },
  {
    period: "2019 - 2020",
    title: "UX Designer Program",
    company: "Haifa University",
    description:
      "Completed a one-year UX Designer program with emphasis on user experience, usability, interface thinking, and human-centered design.",
  },
];

type TimelineItem = {
  period: string;
  title: string;
  company: string;
  description: string;
};

function TimelineCard({
  title,
  items,
  theme,
}: {
  title: string;
  items: TimelineItem[];
  theme: {
    card: string;
    muted: string;
    softText: string;
    timelineLine: string;
    timelineDot: string;
  };
}) {
  return (
    <div
      className={`relative h-full backdrop-blur-md border rounded-3xl p-6 md:p-8 transition duration-300 hover:border-slate-500 hover:shadow-xl ${theme.card}`}
    >
      <h3 className="text-2xl font-semibold mb-8">{title}</h3>

      <div className="relative">
        <div
          className={`absolute left-[11px] top-2 bottom-2 w-[2px] ${theme.timelineLine}`}
        />

        <div className="space-y-10">
          {items.map((item, index) => (
            <div key={index} className="relative pl-10">
              <div
                className={`absolute left-0 top-1 h-6 w-6 rounded-full ring-8 ${theme.timelineDot}`}
              />

              <p className={`text-sm mb-2 ${theme.muted}`}>{item.period}</p>
              <h4 className="text-xl md:text-2xl font-semibold mb-1">
                {item.title}
              </h4>
              <p className="text-sky-400 mb-3">{item.company}</p>
              <p className={`leading-7 ${theme.softText}`}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("about");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const isDark = savedTheme === "dark";
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  useEffect(() => {
    const currentWord = typingWords[wordIndex];
    const typingSpeed = isDeleting ? 45 : 90;
    const pauseTime = 1400;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentWord.slice(0, text.length + 1);
        setText(nextText);

        if (nextText === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        const nextText = currentWord.slice(0, text.length - 1);
        setText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typingWords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  useEffect(() => {
    const sections = navItems
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.35;
      let closestSection = sections[0];
      let smallestDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestSection = section;
        }
      });

      if (closestSection) {
        setActiveSection(closestSection.id);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const theme = useMemo(
    () => ({
      mainBg: isDarkMode
        ? "bg-slate-950 text-white"
        : "bg-slate-100 text-slate-950",
      navBar: isDarkMode
        ? "bg-slate-900/40 border-slate-800 shadow-black/20"
        : "bg-white/40 border-slate-300 shadow-slate-300/40",
      navText: isDarkMode ? "text-slate-300" : "text-slate-700",
      navActive: isDarkMode ? "text-sky-400" : "text-sky-600",
      card: isDarkMode
        ? "bg-slate-900/70 border-slate-800"
        : "bg-white/80 border-slate-300",
      cardSolid: isDarkMode
        ? "bg-slate-900 border-slate-800"
        : "bg-white border-slate-300",
      muted: isDarkMode ? "text-slate-400" : "text-slate-600",
      softText: isDarkMode ? "text-slate-300" : "text-slate-700",
      tag: isDarkMode
        ? "bg-slate-800 border-slate-700 text-slate-300"
        : "bg-slate-100 border-slate-300 text-slate-700",
      buttonSecondary: isDarkMode
        ? "border-slate-700 hover:border-slate-500 hover:bg-slate-900"
        : "border-slate-300 hover:border-slate-400 hover:bg-white",
      imageFrame: isDarkMode
        ? "bg-slate-800 border-slate-800"
        : "bg-slate-200 border-slate-300",
      timelineLine: isDarkMode ? "bg-slate-700" : "bg-slate-300",
      timelineDot: isDarkMode
        ? "bg-sky-400 ring-slate-950"
        : "bg-sky-500 ring-slate-100",
      gridOpacity: isDarkMode ? "opacity-100" : "opacity-60",
    }),
    [isDarkMode]
  );

  return (
    <main
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-300 ${theme.mainBg}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:36px_36px] ${theme.gridOpacity}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_55%,rgba(2,6,23,0.35)_100%)]" />
      </div>

      <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6">
        <div
          className={`max-w-6xl mx-auto rounded-2xl border backdrop-blur-2xl shadow-lg transition-colors duration-300 ${theme.navBar}`}
        >
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <a href="#" className="text-lg font-bold tracking-wide">
              Dor Yogev
            </a>

            <div
              className={`hidden md:flex items-center gap-6 text-sm ${theme.navText}`}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item;

                return (
                  <a
                    key={item}
                    href={`#${item}`}
                    className={`transition relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-sky-400 after:transition-all ${
                      isActive
                        ? `${theme.navActive} after:w-full`
                        : "hover:text-sky-400 after:w-0 hover:after:w-full"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                );
              })}
            </div>

            <button
              onClick={() => {
                setIsDarkMode((prev) => {
                  const newMode = !prev;

                  localStorage.setItem("theme", newMode ? "dark" : "light");

                  if (newMode) {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }

                  return newMode;
                });
              }}
              className={`rounded-2xl border px-4 py-2 text-sm font-medium transition duration-300 ${
                isDarkMode
                  ? "border-slate-700 bg-slate-900 text-white hover:border-slate-500"
                  : "border-slate-300 bg-white text-slate-900 hover:border-slate-400"
              }`}
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </nav>

      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-12 items-center relative"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-400 mb-4">
              Personal Portfolio
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Dor Yogev
            </h1>

            <div className="mb-6 h-16 md:h-20">
              <p className={`text-xl md:text-2xl max-w-2xl ${theme.softText}`}>
                Focused on{" "}
                <span className="text-sky-400 font-semibold">{text}</span>
                <span className="inline-block w-[1ch] animate-pulse text-sky-400">
                  |
                </span>
              </p>
            </div>

            <p
              className={`text-base md:text-lg leading-8 max-w-2xl mb-8 ${theme.muted}`}
            >
              I am an Industrial Engineering and Management student with hands-on
              experience in operations, cross-team coordination, process
              improvement, and data-driven thinking. I am building my path toward
              Business Analyst and Product roles, where I can connect business
              needs, technology, user experience, and execution.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#projects"
                className="bg-sky-500 hover:bg-sky-400 hover:scale-105 text-slate-950 font-semibold px-6 py-3 rounded-2xl transition duration-300"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className={`border px-6 py-3 rounded-2xl transition duration-300 ${theme.buttonSecondary}`}
              >
                Contact Me
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className={`border px-4 py-2 rounded-xl transition duration-300 hover:-translate-y-1 ${theme.cardSolid}`}
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className={`border px-4 py-2 rounded-xl transition duration-300 hover:-translate-y-1 ${theme.cardSolid}`}
              >
                GitHub
              </a>

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noreferrer"
                className={`border px-4 py-2 rounded-xl transition duration-300 hover:-translate-y-1 ${theme.cardSolid}`}
              >
                View CV
              </a>
            </div>
          </div>

          <div className="relative">
            <div
              className={`relative backdrop-blur-md border rounded-[2rem] p-6 md:p-8 transition duration-300 hover:border-slate-500 hover:shadow-2xl ${theme.card}`}
            >
              <div
                className={`relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] border ${theme.imageFrame}`}
              >
                <Image
                  src="/profile-doryogev.png"
                  alt="Dor Yogev"
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  priority
                />
              </div>

              <div className="mt-6">
                <p className={`text-sm mb-2 ${theme.muted}`}>Current Focus</p>
                <h2 className="text-2xl font-semibold mb-4">
                  Business Analysis, Product Thinking & Process Improvement
                </h2>
                <p className={`leading-7 mb-6 ${theme.softText}`}>
                  Building a strong foundation in business analysis, operations,
                  UX thinking, and data tools such as Python, SQL, and Excel,
                  while gaining real-world experience in logistics and
                  coordination.
                </p>

                <div className="flex flex-wrap gap-3 text-sm">
                  {[
                    "Business Analysis",
                    "Operations",
                    "Python & SQL",
                    "UX Thinking",
                  ].map((item) => (
                    <span
                      key={item}
                      className={`border px-3 py-2 rounded-xl ${theme.tag}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.section
          id="about"
          className="mt-20 mb-16 scroll-mt-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6">About Me</h2>
          <div
            className={`backdrop-blur-md border rounded-3xl p-6 md:p-8 transition duration-300 hover:border-slate-500 hover:shadow-xl ${theme.card}`}
          >
            <p className={`leading-8 ${theme.softText}`}>
              I am an Industrial Engineering and Management student at HIT
              College, with practical experience in operations, customer
              coordination, accounting support, process improvement, and team
              collaboration. Alongside my academic journey, I work at Fritz
              Logistics and bring additional experience from my military service
              in the Israeli Air Force, where I worked in both flight control and
              intelligence roles. I enjoy solving problems, improving systems,
              and building solutions that connect people, processes, and
              technology.
            </p>
          </div>
        </motion.section>

        <motion.section
          id="journey"
          className="mb-16 scroll-mt-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-3">Journey</h2>
            <p className={theme.muted}>
              My professional experience and academic path, side by side.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <TimelineCard title="Experience" items={experienceItems} theme={theme} />
            <TimelineCard title="Education" items={educationItems} theme={theme} />
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="mb-16 scroll-mt-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6">Projects</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="block"
              >
                <div
                  className={`group overflow-hidden backdrop-blur-md border rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-slate-500 hover:shadow-2xl cursor-pointer ${theme.card}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-slate-200 leading-7 mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-xl text-sm backdrop-blur"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`px-6 py-4 flex items-center justify-between transition duration-300 ${theme.cardSolid}`}
                  >
                    <span className={theme.muted}>Portfolio Project</span>
                    <span className="text-sky-400 font-medium group-hover:translate-x-1 transition">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="mb-16 scroll-mt-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6">Skills</h2>

          <div className="flex flex-wrap gap-3">
            {[
              "Project Management",
              "Public Relations",
              "Teamwork",
              "Time Management",
              "Effective Communication",
              "Excel",
              "SQL",
              "Python",
              "Operations",
              "Process Improvement",
            ].map((skill) => (
              <span
                key={skill}
                className={`border px-4 py-2 rounded-xl transition duration-300 hover:-translate-y-1 hover:border-sky-500 hover:text-sky-400 ${theme.tag}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="scroll-mt-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6">Contact</h2>
          <div
            className={`backdrop-blur-md border rounded-3xl p-6 md:p-8 transition duration-300 hover:border-slate-500 hover:shadow-xl ${theme.card}`}
          >
            <p className={`mb-4 ${theme.softText}`}>
              Want to connect, collaborate, or talk about an opportunity?
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:doryogev1@gmail.com"
                className="inline-block bg-sky-500 text-slate-950 font-semibold px-6 py-3 rounded-2xl hover:bg-sky-400 hover:scale-105 transition duration-300"
              >
                Send Email
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className={`inline-block border px-6 py-3 rounded-2xl transition duration-300 ${theme.buttonSecondary}`}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
}