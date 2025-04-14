import { CategoryService } from '../services/category.service.js';

const categoryService = new CategoryService();

export const categoryController = {
    async getAll(req, res, next) {
        try {
            const categories = await categoryService.getAll();
            res.json(categories);
        } catch (error) {
            next(error);
        }
    },

    async getById(req, res, next) {
        try {
            const category = await categoryService.getById(req.params.id);
            if (!category) return res.status(404).json({ message: 'Category not found' });
            res.json(category);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const category = await categoryService.create(req.body);
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const category = await categoryService.update(req.params.id, req.body);
            res.json(category);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            await categoryService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
};