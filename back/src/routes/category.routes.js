import { Router } from 'express';
import { categoryController } from '../controllers/category.controller.js';
import { validateCategory } from '../validators/category.validator.js';

const router = Router();

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', validateCategory, categoryController.create);
router.put('/:id', validateCategory, categoryController.update);
router.delete('/:id', categoryController.delete);

export default router;