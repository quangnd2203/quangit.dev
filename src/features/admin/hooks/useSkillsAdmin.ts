import { useState, useEffect, ChangeEvent } from 'react';
import { SkillCategory } from '@/core/entities/SkillCategory';
import { Skill } from '@/core/entities/Skill';

export const useSkillsAdmin = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/admin/skills', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to load skills');
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Generate unique ID
  const generateId = (prefix: string) => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Category handlers
  const handleAddCategory = () => {
    const newCategory: SkillCategory = {
      id: generateId('category'),
      name: '',
      icon: '',
      order: categories.length,
      skills: [],
    };
    setCategories([...categories, newCategory]);
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleUpdateCategory = (categoryId: string, updates: Partial<SkillCategory>) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, ...updates } : cat
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleMoveCategoryUp = (categoryId: string) => {
    setCategories(prev => {
      const index = prev.findIndex(cat => cat.id === categoryId);
      if (index <= 0) return prev;
      const newCategories = [...prev];
      [newCategories[index - 1], newCategories[index]] = [newCategories[index], newCategories[index - 1]];
      return newCategories.map((cat, i) => ({ ...cat, order: i }));
    });
  };

  const handleMoveCategoryDown = (categoryId: string) => {
    setCategories(prev => {
      const index = prev.findIndex(cat => cat.id === categoryId);
      if (index >= prev.length - 1) return prev;
      const newCategories = [...prev];
      [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
      return newCategories.map((cat, i) => ({ ...cat, order: i }));
    });
  };

  // Skill handlers
  const handleAddSkill = (categoryId: string) => {
    const newSkill: Skill = {
      id: generateId('skill'),
      name: '',
      categoryId,
      proficiency: 'intermediate',
      priority: 0,
    };
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, skills: [...cat.skills, newSkill] }
          : cat
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleUpdateSkill = (categoryId: string, skillId: string, updates: Partial<Skill>) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              skills: cat.skills.map(skill =>
                skill.id === skillId ? { ...skill, ...updates } : skill
              ),
            }
          : cat
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleDeleteSkill = (categoryId: string, skillId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.filter(skill => skill.id !== skillId) }
          : cat
      )
    );
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleMoveSkillUp = (categoryId: string, skillId: string) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        const index = cat.skills.findIndex(skill => skill.id === skillId);
        if (index <= 0) return cat;
        const newSkills = [...cat.skills];
        [newSkills[index - 1], newSkills[index]] = [newSkills[index], newSkills[index - 1]];
        return { ...cat, skills: newSkills };
      })
    );
  };

  const handleMoveSkillDown = (categoryId: string, skillId: string) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        const index = cat.skills.findIndex(skill => skill.id === skillId);
        if (index >= cat.skills.length - 1) return cat;
        const newSkills = [...cat.skills];
        [newSkills[index], newSkills[index + 1]] = [newSkills[index + 1], newSkills[index]];
        return { ...cat, skills: newSkills };
      })
    );
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate
      for (const category of categories) {
        if (!category.name) {
          throw new Error(`Category "${category.id}" must have a name`);
        }
        for (const skill of category.skills) {
          if (!skill.name) {
            throw new Error(`Skill "${skill.id}" must have a name`);
          }
        }
      }

      const response = await fetch('/api/admin/skills', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(categories),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update skills');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update skills');
    } finally {
      setSaving(false);
    }
  };

  return {
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
  };
};
