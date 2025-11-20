"use client";

export default function JourneyTimeline() {
  const events = [
    { date: "April 2024", text: "Started Python" },
    { date: "July 2024", text: "Started Andrew Ng’s ML course" },
    { date: "October 2024", text: "Finished ML Specialization" },
    { date: "January 2025", text: "Started TensorFlow" },
    { date: "September 2025", text: "Started PyTorch" },
  ];

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold tracking-tight mb-8">
        Timeline
      </h2>

      <div className="
        relative
        pl-6
        border-l
        border-neutral-300
        dark:border-neutral-700
        max-w-xl
      ">
        {events.map((event, idx) => (
          <div key={idx} className="mb-10 relative">

            {/* Colored dot */}
            <div
              className="
                absolute -left-3
                w-3.5 h-3.5
                rounded-full
                bg-blue-500
                ring-4 ring-blue-500/20
                dark:ring-blue-400/20 dark:bg-blue-400
              "
            />

            {/* Date */}
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {event.date}
            </p>

            {/* Description */}
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              {event.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
