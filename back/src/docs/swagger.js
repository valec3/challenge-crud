import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Pizza API',
            version: '1.0.0',
            description: 'API para la gestión de pedidos de pizza',
            contact: {
                name: 'Pizza Team',
                email: '',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            }
        ],
        tags: [
            { name: 'products', description: 'Operaciones sobre productos' },
            { name: 'categories', description: 'Operaciones sobre categorías' },
            { name: 'orders', description: 'Operaciones sobre pedidos' }
        ],
    },
    apis: ['./src/docs/paths/*.yaml'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const swaggerDocs = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};