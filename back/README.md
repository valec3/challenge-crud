
# Pizza API Documentation

## Base URL
```
http://localhost:3000/api
```

## Products

### Get all products
- **GET** `/products`
- **Response**: Array of products

### Get product by ID
- **GET** `/products/:id`
- **Response**: Single product

### Create product
- **POST** `/products`
- **Body**:
```json
{
    "name": "Margherita Pizza",
    "price": 14.99,
    "ingredients": ["Tomato", "Mozzarella", "Basil"],
    "category": "Traditional Pizzas"
}
```

### Update product
- **PUT** `/products/:id`
- **Body**: Same as create

### Delete product
- **DELETE** `/products/:id`
- **Response**: 204 No Content

## Categories

### Get all categories
- **GET** `/categories`
- **Response**: Array of categories

### Create category
- **POST** `/categories`
- **Body**:
```json
{
    "name": "Traditional Pizzas"
}
```

### Update category
- **PUT** `/categories/:id`
- **Body**: Same as create

### Delete category
- **DELETE** `/categories/:id`
- **Response**: 204 No Content

## Orders

### Get all orders
- **GET** `/orders`
- **Response**: Array of orders

### Create order
- **POST** `/orders`
- **Body**:
```json
{
    "items": [
        {
            "name": "Margherita Pizza",
            "price": 14.99,
            "quantity": 2
        }
    ]
}
```

### Update order
- **PUT** `/orders/:id`
- **Body**: Same as create

### Delete order
- **DELETE** `/orders/:id`
- **Response**: 204 No Content

## Error Responses
All errors follow this format:
```json
{
    "error": {
        "message": "Error description",
        "status": 400
    }
}
```
