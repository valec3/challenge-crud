import api from './api';
import type { OrderItem } from '@/lib/types';

export const orderService = {
    async getAllOrders() {
        const response = await api.get('/orders');
        return response.data;
    },

    async createOrder(orderData: { items: OrderItem[] }) {
        const response = await api.post('/orders', orderData);
        return response.data;
    }
};