"use client";

import { BookOpen, ShieldCheck, Cpu, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200/80 bg-white/40 py-10 backdrop-blur-md transition dark:border-stone-800/80 dark:bg-stone-950/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-900 text-amber-100 dark:bg-amber-100 dark:text-stone-950">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100">
                BookVerse
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
              Modern web reading platform built for distraction-free browser immersion, customizable typography, and warm coffee aesthetics.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Documentation Suite
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
              <li>01-Product (PRD, BRD, MRD)</li>
              <li>02-Design (IA, UserFlow, Wireframes)</li>
              <li>03-Architecture (System, Database, Security)</li>
              <li>04-Development (API, Components, State)</li>
              <li>05-Testing (TestPlan, QA, BugTracking)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Accessibility & Standards
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                WCAG 2.1 AA Compliant
              </li>
              <li>Prefers-Reduced-Motion Enabled</li>
              <li>Prefers-Reduced-Transparency Fallbacks</li>
              <li>Contrast Ratio &gt;= 4.5:1</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Engine Specs
            </h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Next.js 15", "React 19", "Tailwind CSS", "Framer Motion", "Zustand", "Prisma", "Cloudflare R2"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-stone-200 bg-stone-100/80 px-2.5 py-1 text-[10px] font-medium text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-200/60 pt-6 text-center text-xs text-stone-500 dark:border-stone-800/60 dark:text-stone-500">
          © 2026 BookVerse. Production-ready web reading platform.
        </div>
      </div>
    </footer>
  );
}
