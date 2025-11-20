"use client";

import React from "react";

interface TimelineEvent {
  date: string;
  text: string;
}

const timeline: TimelineEvent[] = [
  { date: "April 2024", text: "Started Python" },
  { date: "July 2024", text: "Started Andrew Ng’s ML course" },
  { date: "October 2024", text: "Finished ML Specialization" },
  { date: "January 2025", text: "Started TensorFlow" },
  { date: "September 2025", text: "Started PyTorch" },
];

export default function JourneyTimeline() {
  return (
    <section className="mt-16 w-full">
      <h2 className="text-2xl font-semibold tracking-tight mb-8">
        My Journey
      </h2>

      <div className="relative pl-6 border-l border-neutral-700">
        {timeline.map((event, idx) => (
          <div key={idx} className="mb-8 relative">
            {/* Dot */}
            <div className="absolute -left-[9px] w-3 h-3 bg-neutral-400 rounded-full"></div>

            <p className="text-sm text-neutral-400">{event.date}</p>
            <p className="text-base text-neutral-200">{event.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
