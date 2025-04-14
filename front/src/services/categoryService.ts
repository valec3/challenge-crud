import { Product } from '@/lib/types';
import api from './api';

export const categoryService = {
    async getAllCategories() {
        const response = await api.get('/categories');
        return response.data;
    },

    async createCategory(categoryData:Omit<Product, 'id'>) {
        const response = await api.post('/categories', {
            name: categoryData
        });
        return response.data;
    }
};