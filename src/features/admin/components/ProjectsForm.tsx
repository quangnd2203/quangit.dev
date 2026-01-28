'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjectsAdmin } from '../hooks/useProjectsAdmin';
import { Project, ProjectImage } from '@/core/entities/Project';
import { cn } from '@/shared/utils/cn';

export const ProjectsForm = () => {
  const {
    projects,
    loading,
    saving,
    error,
    success,
    handleAddProject,
    handleUpdateProject,
    handleDeleteProject,
    handleMoveProjectUp,
    handleMoveProjectDown,
    handleAddTechnology,
    handleUpdateTechnology,
    handleDeleteTechnology,
    handleAddImage,
    handleUpdateImage,
    handleDeleteImage,
    handleAddAchievement,
    handleUpdateAchievement,
    handleDeleteAchievement,
    handleAddMetric,
    handleUpdateMetric,
    handleDeleteMetric,
    handleSubmit,
  } = useProjectsAdmin();

  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set(projects.map(proj => proj.id))
  );

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
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
          Projects Management
        </h1>
        <p className="text-lg text-gray-600">Manage your portfolio projects</p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6"
      >
        {/* Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <button
              type="button"
              onClick={handleAddProject}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Add Project
            </button>
          </div>

          {projects.length === 0 && (
            <p className="text-sm text-gray-500 italic py-4">
              No projects yet. Click "Add Project" to add one.
            </p>
          )}

          <div className="space-y-4">
            {projects.map((project, projectIndex) => {
              const isExpanded = expandedProjects.has(project.id);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Project Header */}
                  <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        type="button"
                        onClick={() => toggleProject(project.id)}
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
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleUpdateProject(project.id, { title: e.target.value })}
                        placeholder="Project title"
                        required
                        disabled={saving}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed font-medium"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleMoveProjectUp(project.id)}
                        disabled={saving || projectIndex === 0}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveProjectDown(project.id)}
                        disabled={saving || projectIndex === projects.length - 1}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(project.id)}
                        disabled={saving}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete project"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Project Details */}
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
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                              </label>
                              <input
                                type="text"
                                value={project.description}
                                onChange={(e) => handleUpdateProject(project.id, { description: e.target.value })}
                                placeholder="Short description"
                                required
                                disabled={saving}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Long Description
                              </label>
                              <textarea
                                value={project.longDescription || ''}
                                onChange={(e) => handleUpdateProject(project.id, { longDescription: e.target.value })}
                                placeholder="Detailed description (optional)"
                                rows={4}
                                disabled={saving}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed resize-y"
                              />
                            </div>
                          </div>

                          {/* Technologies Section */}
                          <div className="space-y-3 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">Technologies *</h3>
                              <button
                                type="button"
                                onClick={() => handleAddTechnology(project.id)}
                                disabled={saving}
                                className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                + Add Technology
                              </button>
                            </div>

                            {(!project.technologies || project.technologies.length === 0) && (
                              <p className="text-sm text-gray-500 italic py-2">
                                No technologies yet. Click "Add Technology" to add one.
                              </p>
                            )}

                            <div className="space-y-2">
                              {project.technologies?.map((technology, techIndex) => (
                                <div key={techIndex} className="flex items-start gap-2">
                                  <input
                                    type="text"
                                    value={technology}
                                    onChange={(e) => handleUpdateTechnology(project.id, techIndex, e.target.value)}
                                    placeholder="Technology name"
                                    required
                                    disabled={saving}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteTechnology(project.id, techIndex)}
                                    disabled={saving || (project.technologies?.length || 0) <= 1}
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

                          {/* URLs Section */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Thumbnail URL
                              </label>
                              <input
                                type="text"
                                value={project.thumbnailUrl || ''}
                                onChange={(e) => handleUpdateProject(project.id, { thumbnailUrl: e.target.value })}
                                placeholder="Thumbnail image URL"
                                disabled={saving}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                GitHub URL
                              </label>
                              <input
                                type="text"
                                value={project.githubUrl || ''}
                                onChange={(e) => handleUpdateProject(project.id, { githubUrl: e.target.value })}
                                placeholder="GitHub repository URL"
                                disabled={saving}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Demo URL
                              </label>
                              <input
                                type="text"
                                value={project.demoUrl || ''}
                                onChange={(e) => handleUpdateProject(project.id, { demoUrl: e.target.value })}
                                placeholder="Live demo URL"
                                disabled={saving}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                              />
                            </div>
                          </div>

                          {/* Images Section */}
                          <div className="space-y-3 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">Images</h3>
                              <button
                                type="button"
                                onClick={() => handleAddImage(project.id)}
                                disabled={saving}
                                className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                + Add Image
                              </button>
                            </div>

                            {(!project.images || project.images.length === 0) && (
                              <p className="text-sm text-gray-500 italic py-2">
                                No images yet. Click "Add Image" to add one.
                              </p>
                            )}

                            <div className="space-y-3">
                              {project.images?.map((image, imageIndex) => (
                                <div key={imageIndex} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                      Image URL *
                                    </label>
                                    <input
                                      type="text"
                                      value={image.url}
                                      onChange={(e) => handleUpdateImage(project.id, imageIndex, { url: e.target.value })}
                                      placeholder="Image URL"
                                      required
                                      disabled={saving}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                    />
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Alt Text
                                      </label>
                                      <input
                                        type="text"
                                        value={image.alt || ''}
                                        onChange={(e) => handleUpdateImage(project.id, imageIndex, { alt: e.target.value })}
                                        placeholder="Alt text"
                                        disabled={saving}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Caption
                                      </label>
                                      <input
                                        type="text"
                                        value={image.caption || ''}
                                        onChange={(e) => handleUpdateImage(project.id, imageIndex, { caption: e.target.value })}
                                        placeholder="Caption"
                                        disabled={saving}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Order
                                      </label>
                                      <input
                                        type="number"
                                        value={image.order ?? imageIndex}
                                        onChange={(e) => handleUpdateImage(project.id, imageIndex, { order: parseInt(e.target.value) || 0 })}
                                        min="0"
                                        disabled={saving}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end pt-2 border-t border-gray-200">
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteImage(project.id, imageIndex)}
                                      disabled={saving}
                                      className="px-3 py-1.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      Remove Image
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Achievements Section */}
                          <div className="space-y-3 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                              <button
                                type="button"
                                onClick={() => handleAddAchievement(project.id)}
                                disabled={saving}
                                className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                + Add Achievement
                              </button>
                            </div>

                            {(!project.achievements || project.achievements.length === 0) && (
                              <p className="text-sm text-gray-500 italic py-2">
                                No achievements yet. Click "Add Achievement" to add one.
                              </p>
                            )}

                            <div className="space-y-2">
                              {project.achievements?.map((achievement, achievementIndex) => (
                                <div key={achievementIndex} className="flex items-start gap-2">
                                  <input
                                    type="text"
                                    value={achievement}
                                    onChange={(e) => handleUpdateAchievement(project.id, achievementIndex, e.target.value)}
                                    placeholder="Achievement description"
                                    disabled={saving}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAchievement(project.id, achievementIndex)}
                                    disabled={saving}
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

                          {/* Metrics Section */}
                          <div className="space-y-3 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">Metrics</h3>
                              <button
                                type="button"
                                onClick={() => handleAddMetric(project.id)}
                                disabled={saving}
                                className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                + Add Metric
                              </button>
                            </div>

                            {(!project.metrics || project.metrics.length === 0) && (
                              <p className="text-sm text-gray-500 italic py-2">
                                No metrics yet. Click "Add Metric" to add one.
                              </p>
                            )}

                            <div className="space-y-2">
                              {project.metrics?.map((metric, metricIndex) => (
                                <div key={metricIndex} className="flex items-start gap-2">
                                  <input
                                    type="text"
                                    value={metric.label}
                                    onChange={(e) => handleUpdateMetric(project.id, metricIndex, 'label', e.target.value)}
                                    placeholder="Metric label"
                                    disabled={saving}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                  />
                                  <input
                                    type="text"
                                    value={metric.value}
                                    onChange={(e) => handleUpdateMetric(project.id, metricIndex, 'value', e.target.value)}
                                    placeholder="Metric value"
                                    disabled={saving}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteMetric(project.id, metricIndex)}
                                    disabled={saving}
                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Remove metric"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Other Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                              </label>
                              <input
                                type="text"
                                value={project.category || ''}
                                onChange={(e) => handleUpdateProject(project.id, { category: e.target.value })}
                                placeholder="Project category"
                                disabled={saving}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Featured
                              </label>
                              <div className="flex items-center gap-2 pt-2">
                                <input
                                  type="checkbox"
                                  checked={project.featured || false}
                                  onChange={(e) => handleUpdateProject(project.id, { featured: e.target.checked })}
                                  disabled={saving}
                                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <span className="text-sm text-gray-700">Mark as featured project</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date
                              </label>
                              <input
                                type="text"
                                value={project.startDate || ''}
                                onChange={(e) => handleUpdateProject(project.id, { startDate: e.target.value })}
                                placeholder="YYYY-MM or YYYY"
                                disabled={saving}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Date
                              </label>
                              <input
                                type="text"
                                value={project.endDate || ''}
                                onChange={(e) => handleUpdateProject(project.id, { endDate: e.target.value })}
                                placeholder="YYYY-MM, YYYY, or leave empty"
                                disabled={saving}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                              />
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
            Projects updated successfully!
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
