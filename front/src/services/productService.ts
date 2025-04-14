import api from './api';
import type { Product } from '@/lib/types';

export const productService = {
    async getAllProducts() {
        const response = await api.get('/products');
        return response.data;
    },

    async createProduct(productData: Omit<Product, 'id'>) {
        const response = await api.post('/products', {
            name: productData.name,
            price: productData.price,
            ingredients: productData.ingredients,
            category: productData.category
        });
        return response.data;
    },

    async getProductById(id: string) {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    async getProductsByCategory(categoryId: string) {
        const response = await api.get(`/products/category/${categoryId}`);
        return response.data;
    }
};