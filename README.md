# Hibah Mehendi Store API Documentation

## Authentication & Users

### POST `/api/auth/register`
Register a new user.
- **Body**: `{ "name", "email", "password", "mobile" }`
- **Response**: User object & JWT Token

### POST `/api/auth/login`
Authenticate user.
- **Body**: `{ "email", "password" }`
- **Response**: User object & JWT Token

### POST `/api/auth/google`
Authenticate using Google OAuth.
- **Body**: `{ "tokenId" }` (Google ID Token from frontend)
- **Response**: User object & JWT Token

### GET `/api/users/profile`
Get logged-in user profile.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User object

### PUT `/api/users/profile`
Update logged-in user profile/address.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "name", "mobile", "address", "city", "state", "pincode", "password" }`
- **Response**: Updated User object

## Products & Categories

### GET `/api/products`
Get all products. Supports search, filter, sorting.
- **Query Params**: `search`, `category`, `sort`
- **Response**: Array of Product objects

### GET `/api/products/categories`
Get all product categories.
- **Response**: Array of Category objects

### GET `/api/products/:identifier`
Get a single product by ID or Slug.
- **Response**: Product object

### POST `/api/products` (Admin Only)
Create a new product.
- **Headers**: `Authorization: Bearer <token>`

## Orders

### POST `/api/orders`
Create a new order.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "orderItems", "shippingAddress", "paymentMethod", "itemsPrice", "shippingPrice", "totalPrice" }`
- **Response**: Order object

### GET `/api/orders/myorders`
Get all orders for the logged-in user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of Order objects

### GET `/api/orders/:id`
Get order by ID.
- **Headers**: `Authorization: Bearer <token>`

## Uploads

### POST `/api/upload` (Admin Only)
Upload an image to Cloudinary.
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Body**: FormData with `image` file
- **Response**: `{ "url", "publicId" }`
