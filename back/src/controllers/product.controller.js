import { ProductService } from '../services/product.service.js';

const productService = new ProductService();

export const productController = {
    async getAllProducts(req, res, next) {
        try {
            const products = await productService.getAll();
            res.json(products);
        } catch (error) {
            next(error);
        }
    },

    async getProductById(req, res, next) {
        try {
            const product = await productService.getById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        } catch (error) {
            next(error);
        }
    },

    async createProduct(req, res, next) {
        try {
            const product = await productService.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    },

    async updateProduct(req, res, next) {
        try {
            const product = await productService.update(req.params.id, req.body);
            res.json(product);
        } catch (error) {
            next(error);
        }
    },

    async deleteProduct(req, res, next) {
        try {
            await productService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },

    async getProductsByCategory(req, res, next) {
        try {
            const products = await productService.getByCategory(req.params.categoryId);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
};