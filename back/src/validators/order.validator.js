import { body, validationResult } from 'express-validator';

export const validateOrder = [
    body('items')
        .isArray()
        .withMessage('Items must be an array')
        .notEmpty()
        .withMessage('Order must have at least one item'),
    
    body('items.*')
        .isObject()
        .withMessage('Each item must be an object'),
    
    body('items.*.name')
        .notEmpty()
        .withMessage('Product name is required')
        .isString()
        .withMessage('Product name must be a string'),
    
    body('items.*.price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a positive number')
        .toFloat(),
    
    body('items.*.quantity')
        .notEmpty()
        .withMessage('Quantity is required')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1')
        .toInt(),
    
    body('status')
        .optional()
        .isString()
        .withMessage('Status must be a string')
        .isIn(['pending', 'completed', 'cancelled'])
        .withMessage('Invalid status value'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: 'error',
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }
        next();
    }
];