'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperiencesAdmin } from '../hooks/useExperiencesAdmin';
import { Experience } from '@/core/entities/Experience';
import { cn } from '@/shared/utils/cn';

export const ExperiencesForm = () => {
  const {
    experiences,
    loading,
    saving,
    error,
    success,
    handleAddExperience,
    handleUpdateExperience,
    handleDeleteExperience,
    handleMoveExperienceUp,
    handleMoveExperienceDown,
    handleAddAchievement,
    handleUpdateAchievement,
    handleDeleteAchievement,
    handleAddTechnology,
    handleUpdateTechnology,
    handleDeleteTechnology,
    handleSubmit,
  } = useExperiencesAdmin();

  const [expandedExperiences, setExpandedExperiences] = useState<Set<string>>(
    new Set(experiences.map(exp => exp.id))
  );

  const toggleExperience = (experienceId: string) => {
    setExpandedExperiences(prev => {
      const newSet = new Set(prev);
      if (newSet.has(experienceId)) {
        newSet.delete(experienceId);
      } else {
        newSet.add(experienceId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-extrabold mb-2 bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent">
          Experiences Management
        </h1>
        <p className="text-lg text-gray-600">Manage your work experiences</p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6"
      >
        {/* Experiences */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h2 className="text-2xl font-bold text-gray-900">Experiences</h2>
            <button
              type="button"
              onClick={handleAddExperience}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Add Experience
            </button>
          </div>

          {experiences.length === 0 && (
            <p className="text-sm text-gray-500 italic py-4">
              No experiences yet. Click "Add Experience" to add one.
            </p>
          )}

          <div className="space-y-4">
            {experiences.map((experience, experienceIndex) => {
              const isExpanded = expandedExperiences.has(experience.id);
              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Experience Header */}
                  <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        type="button"
                        onClick={() => toggleExperience(experience.id)}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <svg
                          className={cn('w-5 h-5 transition-transform', isExpanded && 'rotate-90')}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={experience.company}
                          onChange={(e) => handleUpdateExperience(experience.id, { company: e.target.value })}
                          placeholder="Company name"
                          required
                          disabled={saving}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed font-medium"
                        />
                        <input
                          type="text"
                          value={experience.role}
                          onChange={(e) => handleUpdateExperience(experience.id, { role: e.target.value })}
                          placeholder="Role/Position"
                          required
                          disabled={saving}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleMoveExperienceUp(experience.id)}
                        disabled={saving || experienceIndex === 0}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveExperienceDown(experience.id)}
                        disabled={saving || experienceIndex === experiences.length - 1}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteExperience(experience.id)}
                        disabled={saving}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete experience"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Experience Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 space-y-4 border-t border-gray-200">
                          {/* Basic Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date *
                              </label>
                              <input
                                type="text"
                                value={experience.period?.start || ''}
                                onChange={(e) => handleUpdateExperience(experience.id, {
                                  period: { ...experience.period, start: e.target.value }
                                })}
                                placeholder="YYYY-MM or YYYY"
                                required
                                disabled={saving}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Date *
                              </label>
                              <input
                                type="text"
                                value={experience.period?.end || ''}
                                onChange={(e) => handleUpdateExperience(experience.id, {
                                  period: { ...experience.period, end: e.target.value }
                                })}
                                placeholder="YYYY-MM, YYYY, or 'Present'"
                                required
                                disabled={saving}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                              </label>
                              <input
                                type="text"
                                value={experience.location || ''}
                                onChange={(e) => handleUpdateExperience(experience.id, { location: e.target.value })}
                                placeholder="Location (optional)"
                                disabled={saving}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                              />
                            </div>
                          </div>

                          {/* Achievements Section */}
                          <div className="space-y-3 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">Achievements *</h3>
                              <button
                                type="button"
                                onClick={() => handleAddAchievement(experience.id)}
                                disabled={saving}
                                className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                + Add Achievement
                              </button>
                            </div>

                            {(!experience.achievements || experience.achievements.length === 0) && (
                              <p className="text-sm text-gray-500 italic py-2">
                                No achievements yet. Click "Add Achievement" to add one.
                              </p>
                            )}

                            <div className="space-y-2">
                              {experience.achievements?.map((achievement, achievementIndex) => (
                                <div key={achievementIndex} className="flex items-start gap-2">
                                  <input
                                    type="text"
                                    value={achievement}
                                    onChange={(e) => handleUpdateAchievement(experience.id, achievementIndex, e.target.value)}
                                    placeholder="Achievement description"
                                    required
                                    disabled={saving}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAchievement(experience.id, achievementIndex)}
                                    disabled={saving || (experience.achievements?.length || 0) <= 1}
                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Remove achievement"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Technologies Section */}
                          <div className="space-y-3 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">Technologies</h3>
                              <button
                                type="button"
                                onClick={() => handleAddTechnology(experience.id)}
                                disabled={saving}
                                className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                + Add Technology
                              </button>
                            </div>

                            {(!experience.technologies || experience.technologies.length === 0) && (
                              <p className="text-sm text-gray-500 italic py-2">
                                No technologies yet. Click "Add Technology" to add one.
                              </p>
                            )}

                            <div className="space-y-2">
                              {experience.technologies?.map((technology, techIndex) => (
                                <div key={techIndex} className="flex items-start gap-2">
                                  <input
                                    type="text"
                                    value={technology}
                                    onChange={(e) => handleUpdateTechnology(experience.id, techIndex, e.target.value)}
                                    placeholder="Technology name"
                                    disabled={saving}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteTechnology(experience.id, techIndex)}
                                    disabled={saving}
                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Remove technology"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
          >
            Experiences updated successfully!
          </motion.div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
};
