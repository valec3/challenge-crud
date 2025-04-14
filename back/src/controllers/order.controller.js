import { OrderService } from '../services/order.service.js';

const orderService = new OrderService();

export const orderController = {
    async getAll(req, res, next) {
        try {
            const orders = await orderService.getAll();
            res.json(orders);
        } catch (error) {
            next(error);
        }
    },

    async getById(req, res, next) {
        try {
            const order = await orderService.getById(req.params.id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.json(order);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const order = await orderService.create(req.body);
            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const order = await orderService.update(req.params.id, req.body);
            res.json(order);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            await orderService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
};