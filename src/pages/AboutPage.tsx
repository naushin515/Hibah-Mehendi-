import { motion } from 'framer-motion'
import { aboutContent } from '../data/policies'

export default function AboutPage() {
  return (
    <div className="container-app py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-4xl font-bold">{aboutContent.title}</h1>
        <p className="mt-2 text-lg text-brand-600 dark:text-brand-400">{aboutContent.subtitle}</p>
      </motion.div>

      <div className="mt-10 max-w-3xl space-y-6">
        {aboutContent.paragraphs.map((p, i) => (
          <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="leading-relaxed text-stone-600 dark:text-stone-300">
            {p}
          </motion.p>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {aboutContent.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="rounded-2xl border border-stone-200 bg-white p-6 text-center dark:border-stone-800 dark:bg-stone-900"
          >
            <p className="font-display text-3xl font-bold text-brand-600 dark:text-brand-400">{stat.value}</p>
            <p className="mt-1 text-sm text-stone-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
