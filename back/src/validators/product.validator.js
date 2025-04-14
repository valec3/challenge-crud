import { body, validationResult } from 'express-validator';

export const validateProduct = [
    body('name')
        .notEmpty()
        .withMessage('Product name is required')
        .isString()
        .withMessage('Product name must be a string')
        .custom((value) => {
            if (typeof value === 'number') {
                throw new Error('Product name cannot be a number');
            }
            if (!/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/.test(value)) {
                throw new Error('Product name contains invalid characters');
            }
            return true;
        })
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Product name must be between 3 and 100 characters'),
    
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a positive number')
        .custom((value) => {
            if (typeof value === 'string') {
                throw new Error('Price must be a number, not a string');
            }
            return true;
        })
        .toFloat(),
    
    body('ingredients')
        .optional()
        .isArray()
        .withMessage('Ingredients must be an array')
        .custom((value) => {
            if (!Array.isArray(value)) {
                throw new Error('Ingredients must be an array');
            }
            if (!value.every(item => typeof item === 'string')) {
                throw new Error('All ingredients must be strings');
            }
            return true;
        }),
    
    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isString()
        .withMessage('Category must be a string')
        .custom((value) => {
            if (typeof value === 'number') {
                throw new Error('Category must be a string, not a number');
            }
            if (!/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/.test(value)) {
                throw new Error('Category contains invalid characters');
            }
            return true;
        })
        .trim(),
    
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