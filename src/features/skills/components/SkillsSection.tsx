'use client';

import { motion } from 'framer-motion';
import { useSkills } from '../hooks/useSkills';
import { cn } from '@/shared/utils/cn';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const getProficiencyColor = (level: string) => {
  switch (level) {
    case 'expert':
      return 'bg-primary text-white font-bold border-primary';
    case 'advanced':
      return 'bg-primary/10 text-primary border-primary/30 font-semibold';
    case 'intermediate':
      return 'bg-accent/10 text-accent-dark border-accent/30';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-300';
  }
};

export const SkillsSection = () => {
  const { categories, loading, error } = useSkills();

  if (loading) {
    return (
      <section id="skills" className="py-24 bg-gray-50">
        <div className="container-custom">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-24"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-28"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || categories.length === 0) {
    return (
      <section id="skills" className="py-24 bg-gray-50">
        <div className="container-custom text-center">
          <p className="text-red-600 text-lg">{error || 'No skills found'}</p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="py-24 bg-gray-50"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div variants={headerVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent pb-1">
              Technical Skills
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Grid of Categories */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Category Header */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                {category.name}
              </h3>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm border transition-all duration-200 cursor-default',
                      getProficiencyColor(skill.proficiency || 'beginner')
                    )}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-gray-600"
        >
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary text-white font-bold text-xs border border-primary">
              Expert
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/30">
              Advanced
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent-dark text-xs border border-accent/30">
              Intermediate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs border border-gray-300">
              Beginner
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
