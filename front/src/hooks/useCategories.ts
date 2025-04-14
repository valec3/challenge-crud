import { useState, useEffect } from 'react';
import { categoryService } from '@/services/categoryService';
import type { Category } from '@/lib/types';
import { useToast } from '@/hooks/useToast';

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast({
                title: "Error",
                description: "Failed to fetch categories",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (name: string) => {
        try {
            console.log('Creating category:', name);
            const newCategory = await categoryService.createCategory(name);
            setCategories(prev => [...prev, newCategory]);
            toast({
                title: "Success",
                description: "Category created successfully",
            });
            return true;
        } catch (error) {
            console.error('Error creating category:', error);
            toast({
                title: "Error",
                description: "Failed to create category",
                variant: "destructive",
            });
            return false;
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            await categoryService.deleteCategory(id);
            setCategories(prev => prev.filter(category => category.id !== id));
            toast({
                title: "Success",
                description: "Category deleted successfully",
            });
            return true;
        } catch (error) {
            console.error('Error deleting category:', error);
            toast({
                title: "Error",
                description: "Failed to delete category",
                variant: "destructive",
            });
            return false;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        createCategory,
        deleteCategory,
        refreshCategories: fetchCategories
    };
}