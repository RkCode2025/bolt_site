"use client";

import { useEffect, useState } from "react";

export default function Timeline() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const events = [
    { date: "April 2024", text: "Started Python" },
    { date: "July 2024", text: "Started Andrew Ng’s ML course" },
    { date: "October 2024", text: "Finished ML Specialization" },
    { date: "January 2025", text: "Started TensorFlow" },
    { date: "September 2025", text: "Started PyTorch" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 mt-12">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Timeline</h2>

      {/* Grid: left column reserved for line+dots (fixed width), right column for content */}
      <div className="grid grid-cols-[48px_1fr] gap-x-6">
        {/* LEFT column: full-height vertical line (placed once, covers whole list) */}
        <div className="relative">
          {/* the vertical line centered inside the left column */}
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full rounded-full
                       bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 opacity-75"
            aria-hidden
          />
        </div>

        {/* RIGHT column: the events list. Each event will render a dot inside the left column by using a sibling left-cell */}
        <div>
          <div className="space-y-10">
            {events.map((ev, i) => (
              <div
                key={i}
                className={`
                  relative flex items-start gap-4
                  transform transition-all duration-600 ease-out
                  ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
                `}
                style={{ minHeight: 56 }}
              >
                {/* Dot: absolutely positioned relative to the grid's left column.
                    We create a pseudo-left-cell using absolute positioning that sitsover the left column
                */}
                <span
                  className={`
                    absolute -left-[56px] top-2/2
                    left-0
                    md:-left-[56px]
                    w-4 h-4 rounded-full
                    bg-blue-500
                    ring-4 ring-white/90 dark:ring-neutral-900
                    shadow-md
                    translate-x-[24px] /* centers the dot inside the left 48px column */
                  `}
                  style={{ transform: "translateX(24px)" }}
                  aria-hidden
                />

                {/* Content */}
                <div className="pl-2">
                  <p className="text-sm font-semibold text-neutral-200 dark:text-neutral-100">
                    {ev.date}
                  </p>
                  <p className="mt-1 text-neutral-400 dark:text-neutral-300">
                    {ev.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
