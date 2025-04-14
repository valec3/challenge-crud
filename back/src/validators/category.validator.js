import { body, validationResult } from 'express-validator';

export const validateCategory = [
    body('name')
        .notEmpty()
        .withMessage('Category name is required')
        .isString()
        .withMessage('Category name must be a string')
        .custom((value) => {
            if (!/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/.test(value)) {
                throw new Error('Category name contains invalid characters');
            }
            return true;
        })
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Category name must be between 3 and 50 characters'),
    
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