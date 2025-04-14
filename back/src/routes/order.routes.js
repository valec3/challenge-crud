import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';
import { validateOrder } from '../validators/order.validator.js';

const router = Router();

router.get('/', orderController.getAll);
router.get('/:id', orderController.getById);
router.post('/', validateOrder, orderController.create);
router.put('/:id', validateOrder, orderController.update);
router.delete('/:id', orderController.delete);

export default router;