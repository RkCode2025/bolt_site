'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface Note {
  title: string;
  date: string;
  status: 'learning' | 'building' | 'exploring'| 'Completed';
}

const notes: Note[] = [
  {
    title: 'Machine Learning with Pytorch and Scikit Learn',
    date: '2025',
    status: 'learning',
  },
  {
    title: 'Experimenting with Pytorch implementations',
    date: '2025-10',
    status: 'exploring',
  },
  {
    title: 'ML Specialization by Andrew NG',
    date: '2024',
    status: 'Completed',
  },
  {
    title: 'Exploring Tensorflow workflow and Structure',
    date: '2025',
    status: 'Exploring',
  },
  {
    title: 'Working on a custom LLM model',
    date: '2025-10',
    status: 'building',
  },
];

const statusStyles = {
  learning: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  building: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  exploring: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  Completed: 'bg-green-500/10 text-green-500 border-green-500/20',
};

export function NotesSection() {
  return (
    <section className="min-h-screen px-6 md:px-12 py-24 relative">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-semibold mb-16 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Notes & Progress
        </motion.h2>

        <div className="space-y-4">
          {notes.map((note, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <motion.div
                className="group relative bg-secondary/20 backdrop-blur-sm rounded-xl p-5 border border-border/50 flex items-start gap-4 overflow-hidden"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <div className="relative z-10 flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-base font-medium leading-snug flex-1">
                      {note.title}
                    </h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full border font-mono whitespace-nowrap ${
                        statusStyles[note.status]
                      }`}
                    >
                      {note.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {note.date}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 p-6 rounded-xl bg-secondary/10 border border-dashed border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground text-center">
            This is a living notebook of my learning journey and experiments. Updated regularly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
