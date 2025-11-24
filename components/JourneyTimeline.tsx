'use client';
import { useEffect, useState } from 'react';

export default function Timeline() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  const events = [
    { date: "April 2024", text: "Started Python" },
    { date: "July 2024", text: "Started Andrew Ng’s ML course" },
    { date: "October 2024", text: "Finished ML Specialization" },
    { date: "January 2025", text: "Started TensorFlow" },
    { date: "September 2025", text: "Started PyTorch" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 mt-14">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
        Timeline
      </h2>

      {/* === GRID: 3 columns === */}
      <div className="grid grid-cols-[20px_32px_1fr] relative">
        {/* === Vertical line (center column) === */}
        <div className="col-start-2 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] h-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-full opacity-80" />
        </div>

        {/* === Events === */}
        <div className="col-start-3">
          <div className="space-y-12">
            {events.map((ev, i) => (
              <div
                key={i}
                className={`relative flex gap-6 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                } transition-all duration-700 ease-out`}
              >
                {/* === Dot (centered on line) === */}
                <span
                  className="
                    absolute 
                    -left-[48px]
                    top-1
                    w-4 h-4 rounded-full bg-teal-500
                    border-4 border-white dark:border-neutral-900
                  "
                />

                {/* === Text === */}
                <div>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    {ev.date}
                  </p>
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400">
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
