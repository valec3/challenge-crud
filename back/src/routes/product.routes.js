import { Router } from 'express';
import { productController } from '../controllers/product.controller.js';
import { validateProduct } from '../validators/product.validator.js';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateProduct, productController.createProduct);
router.put('/:id', validateProduct, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/category/:categoryId', productController.getProductsByCategory);

export default router;