// NEMESIS Activities Section — Obsidian Chronicle Design
// Shows 6 most recent activities on homepage

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { Calendar, ArrowRight } from 'lucide-react';
import { activities, categoryLabels, categoryColors } from '@/lib/data';

export default function ActivitiesSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const recent = [...activities].sort((a, b) => b.id - a.id).slice(0, 6);

  return (
    <section id="activities" ref={sectionRef} className="py-24 bg-[oklch(0.12_0.01_260)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
              <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">Recent Events</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              近期活動
            </h2>
          </div>
          <Link
            href="/activities"
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors group"
          >
            查看全部 29 個活動
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Activity grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card rounded-xl p-6 group hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full border ${categoryColors[activity.category]}`}
                >
                  {categoryLabels[activity.category]}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar size={12} />
                  {activity.date}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                {activity.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                {activity.description}
              </p>

              {/* Decorative bottom line */}
              <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
