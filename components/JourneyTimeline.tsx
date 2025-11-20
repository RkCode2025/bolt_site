"use client";

import { useEffect, useState } from "react";

export default function Timeline() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
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
    <section className="max-w-6xl mx-auto px-10 md:px-22 mt-10">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Timeline</h2>

      <div className="relative mt-10 ml-4">

        {/* LINE */}
        <div className="absolute left-0 top-0 h-full w-1">
          <div className="h-full w-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 opacity-70 dark:opacity-80 rounded-full"></div>
        </div>

        <div className="space-y-10 ml-8">
          {events.map((event, index) => (
            <div
              key={index}
              className={`
                relative
                transform transition-all duration-700 ease-out
                ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
              `}
            >

              {/* DOT */}
              <span className="
                absolute -left-8 top-1.5
                w-4 h-4 rounded-full
                bg-blue-500 border-4 border-white
                dark:border-neutral-900 shadow-md
              "></span>

              {/* TEXT */}
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                {event.date}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                {event.text}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
