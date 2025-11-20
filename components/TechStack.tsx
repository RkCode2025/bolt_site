"use client";

import React from "react";

const techStack = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "NumPy",
  "Scikit-learn",
  "Pandas",
];

export default function TechStack() {
  return (
    <section className="mt-14 w-full">
      <h2 className="text-2xl font-semibold tracking-tight mb-5">
        Tech Stack
      </h2>

      <div className="flex flex-wrap gap-3">
        {techStack.map((tech) => (
          <div
            key={tech}
            className="px-3 py-1 text-sm rounded-md border border-neutral-700 bg-neutral-900/60 text-neutral-200 hover:bg-neutral-800/70 transition-all"
          >
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
}
