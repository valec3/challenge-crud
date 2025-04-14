import { useState, useEffect } from 'react';
import { orderService } from '@/services/orderService';
import type { Order, OrderItem } from '@/lib/types';
import { useToast } from '@/hooks/useToast';

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchOrders = async () => {
        try {
            const data = await orderService.getAllOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast({
                title: "Error",
                description: "Failed to fetch orders",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (items: OrderItem[]) => {
        try {
            const newOrder = await orderService.createOrder({ items });
            setOrders(prev => [...prev, newOrder]);
            toast({
                title: "Success",
                description: "Order created successfully",
            });
            return true;
        } catch (error) {
            console.error('Error creating order:', error);
            toast({
                title: "Error",
                description: "Failed to create order",
                variant: "destructive",
            });
            return false;
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        loading,
        createOrder,
        refreshOrders: fetchOrders
    };
}