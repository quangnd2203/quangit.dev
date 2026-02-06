'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillsAdmin } from '../hooks/useSkillsAdmin';
import { SkillCategory } from '@/core/entities/SkillCategory';
import { Skill } from '@/core/entities/Skill';
import { cn } from '@/shared/utils/cn';

const proficiencyOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
] as const;

export const SkillsForm = () => {
    const {
        categories,
        loading,
        saving,
        error,
        success,
        handleAddCategory,
        handleUpdateCategory,
        handleDeleteCategory,
        handleMoveCategoryUp,
        handleMoveCategoryDown,
        handleAddSkill,
        handleUpdateSkill,
        handleDeleteSkill,
        handleMoveSkillUp,
        handleMoveSkillDown,
        handleSubmit,
    } = useSkillsAdmin();

    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set(categories.map((cat) => cat.id))
    );

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading skills...</p>
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
                    Skills Management
                </h1>
                <p className="text-lg text-gray-600">Manage your skills and categories</p>
            </motion.div>

            {/* Form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6"
            >
                {/* Categories */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                        <button
                            type="button"
                            onClick={handleAddCategory}
                            disabled={saving}
                            className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            + Add Category
                        </button>
                    </div>

                    {categories.length === 0 && (
                        <p className="text-sm text-gray-500 italic py-4">
                            No categories yet. Click "Add Category" to add one.
                        </p>
                    )}

                    <div className="space-y-4">
                        {categories.map((category, categoryIndex) => {
                            const isExpanded = expandedCategories.has(category.id);
                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="border border-gray-200 rounded-lg overflow-hidden"
                                >
                                    {/* Category Header */}
                                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <button
                                                type="button"
                                                onClick={() => toggleCategory(category.id)}
                                                className="text-gray-600 hover:text-gray-900 transition-colors"
                                            >
                                                <svg
                                                    className={cn(
                                                        'w-5 h-5 transition-transform',
                                                        isExpanded && 'rotate-90'
                                                    )}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </button>
                                            <input
                                                type="text"
                                                value={category.name}
                                                onChange={(e) =>
                                                    handleUpdateCategory(category.id, {
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="Category name"
                                                required
                                                disabled={saving}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed font-medium"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleMoveCategoryUp(category.id)}
                                                disabled={saving || categoryIndex === 0}
                                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                title="Move up"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 15l7-7 7 7"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleMoveCategoryDown(category.id)}
                                                disabled={
                                                    saving ||
                                                    categoryIndex === categories.length - 1
                                                }
                                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                title="Move down"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteCategory(category.id)}
                                                disabled={saving}
                                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Delete category"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Category Details */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 space-y-4 border-t border-gray-200">
                                                    {/* Category Fields */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Icon
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={category.icon || ''}
                                                                onChange={(e) =>
                                                                    handleUpdateCategory(
                                                                        category.id,
                                                                        { icon: e.target.value }
                                                                    )
                                                                }
                                                                placeholder="Icon name or URL"
                                                                disabled={saving}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Order
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={
                                                                    category.order ?? categoryIndex
                                                                }
                                                                onChange={(e) =>
                                                                    handleUpdateCategory(
                                                                        category.id,
                                                                        {
                                                                            order:
                                                                                parseInt(
                                                                                    e.target.value
                                                                                ) || 0,
                                                                        }
                                                                    )
                                                                }
                                                                min="0"
                                                                disabled={saving}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Skills Section */}
                                                    <div className="space-y-3 pt-4 border-t border-gray-200">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-lg font-semibold text-gray-900">
                                                                Skills
                                                            </h3>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleAddSkill(category.id)
                                                                }
                                                                disabled={saving}
                                                                className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                + Add Skill
                                                            </button>
                                                        </div>

                                                        {category.skills.length === 0 && (
                                                            <p className="text-sm text-gray-500 italic py-2">
                                                                No skills in this category. Click
                                                                "Add Skill" to add one.
                                                            </p>
                                                        )}

                                                        <div className="space-y-3">
                                                            {category.skills.map(
                                                                (skill, skillIndex) => (
                                                                    <motion.div
                                                                        key={skill.id}
                                                                        initial={{
                                                                            opacity: 0,
                                                                            x: -10,
                                                                        }}
                                                                        animate={{
                                                                            opacity: 1,
                                                                            x: 0,
                                                                        }}
                                                                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
                                                                    >
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                            <div>
                                                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                                    Skill Name *
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={
                                                                                        skill.name
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleUpdateSkill(
                                                                                            category.id,
                                                                                            skill.id,
                                                                                            {
                                                                                                name: e
                                                                                                    .target
                                                                                                    .value,
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    placeholder="Skill name"
                                                                                    required
                                                                                    disabled={
                                                                                        saving
                                                                                    }
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                                    Proficiency
                                                                                </label>
                                                                                <select
                                                                                    value={
                                                                                        skill.proficiency ||
                                                                                        'intermediate'
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleUpdateSkill(
                                                                                            category.id,
                                                                                            skill.id,
                                                                                            {
                                                                                                proficiency:
                                                                                                    e
                                                                                                        .target
                                                                                                        .value as Skill['proficiency'],
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    disabled={
                                                                                        saving
                                                                                    }
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                                                                >
                                                                                    {proficiencyOptions.map(
                                                                                        (opt) => (
                                                                                            <option
                                                                                                key={
                                                                                                    opt.value
                                                                                                }
                                                                                                value={
                                                                                                    opt.value
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    opt.label
                                                                                                }
                                                                                            </option>
                                                                                        )
                                                                                    )}
                                                                                </select>
                                                                            </div>
                                                                            <div>
                                                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                                    Priority
                                                                                </label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={
                                                                                        skill.priority ??
                                                                                        0
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleUpdateSkill(
                                                                                            category.id,
                                                                                            skill.id,
                                                                                            {
                                                                                                priority:
                                                                                                    parseInt(
                                                                                                        e
                                                                                                            .target
                                                                                                            .value
                                                                                                    ) ||
                                                                                                    0,
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    min="0"
                                                                                    disabled={
                                                                                        saving
                                                                                    }
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-white disabled:cursor-not-allowed"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                                                            <div className="flex items-center gap-2">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        handleMoveSkillUp(
                                                                                            category.id,
                                                                                            skill.id
                                                                                        )
                                                                                    }
                                                                                    disabled={
                                                                                        saving ||
                                                                                        skillIndex ===
                                                                                            0
                                                                                    }
                                                                                    className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                                                    title="Move up"
                                                                                >
                                                                                    <svg
                                                                                        className="w-4 h-4"
                                                                                        fill="none"
                                                                                        stroke="currentColor"
                                                                                        viewBox="0 0 24 24"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            strokeWidth={
                                                                                                2
                                                                                            }
                                                                                            d="M5 15l7-7 7 7"
                                                                                        />
                                                                                    </svg>
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        handleMoveSkillDown(
                                                                                            category.id,
                                                                                            skill.id
                                                                                        )
                                                                                    }
                                                                                    disabled={
                                                                                        saving ||
                                                                                        skillIndex ===
                                                                                            category
                                                                                                .skills
                                                                                                .length -
                                                                                                1
                                                                                    }
                                                                                    className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                                                    title="Move down"
                                                                                >
                                                                                    <svg
                                                                                        className="w-4 h-4"
                                                                                        fill="none"
                                                                                        stroke="currentColor"
                                                                                        viewBox="0 0 24 24"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            strokeWidth={
                                                                                                2
                                                                                            }
                                                                                            d="M19 9l-7 7-7-7"
                                                                                        />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    handleDeleteSkill(
                                                                                        category.id,
                                                                                        skill.id
                                                                                    )
                                                                                }
                                                                                disabled={saving}
                                                                                className="px-3 py-1.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </motion.div>
                                                                )
                                                            )}
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
                        Skills updated successfully!
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
