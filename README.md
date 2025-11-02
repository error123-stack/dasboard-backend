# Food Delivery Admin Panel API

Backend REST API for managing a food delivery system built with Node.js, Express, and Supabase.

## Features

- **Restaurant Management**: Create, read, update, and delete restaurants
- **Menu Management**: Manage menu items for each restaurant
- **Order Management**: Track and manage customer orders with status updates
- **User Management**: Admin and staff user management
- **Order Statistics**: Get order summaries and revenue statistics

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Supabase** - Database and authentication
- **PostgreSQL** - Database (via Supabase)

## Project Structure

```
├── src/
│   ├── config/
│   │   └── supabase.js        # Supabase client configuration
│   ├── middleware/
│   │   └── errorHandler.js    # Global error handling
│   ├── routes/
│   │   ├── restaurants.js     # Restaurant routes
│   │   ├── menu.js            # Menu routes
│   │   ├── orders.js          # Order routes
│   │   └── users.js           # User routes
│   └── app.js                 # Express app setup
├── index.js                   # Server entry point
├── .env.example               # Environment variables template
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
```

### 3. Database Setup

The database schema has been created with the following tables:
- `restaurants` - Restaurant information
- `menu_items` - Menu items for restaurants
- `orders` - Customer orders
- `order_items` - Items within orders
- `users` - Admin/staff users

All tables have Row Level Security enabled.

### 4. Start the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Restaurants

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `POST /api/restaurants` - Create new restaurant
- `PUT /api/restaurants/:id` - Update restaurant
- `DELETE /api/restaurants/:id` - Delete restaurant

**Example Restaurant Object:**
```json
{
  "name": "Pizza Palace",
  "address": "123 Main St",
  "phone": "555-0100",
  "email": "contact@pizzapalace.com",
  "cuisine_type": "Italian",
  "opening_time": "10:00:00",
  "closing_time": "22:00:00",
  "delivery_fee": 5.00,
  "minimum_order": 15.00
}
```

### Menu Items

- `GET /api/menu` - Get all menu items (optional query: `?restaurant_id=uuid`)
- `GET /api/menu/:id` - Get menu item by ID
- `POST /api/menu` - Create new menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

**Example Menu Item Object:**
```json
{
  "restaurant_id": "uuid",
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato and mozzarella",
  "price": 12.99,
  "category": "Pizza",
  "is_available": true,
  "preparation_time": 20
}
```

### Orders

- `GET /api/orders` - Get all orders (optional query: `?status=pending&restaurant_id=uuid`)
- `GET /api/orders/:id` - Get order by ID with items
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order
- `GET /api/orders/stats/summary` - Get order statistics

**Example Order Object:**
```json
{
  "restaurant_id": "uuid",
  "customer_name": "John Doe",
  "customer_phone": "555-0123",
  "customer_address": "456 Oak Ave",
  "total_amount": 45.99,
  "delivery_fee": 5.00,
  "payment_method": "card",
  "notes": "Ring doorbell",
  "items": [
    {
      "menu_item_id": "uuid",
      "quantity": 2,
      "price": 12.99
    }
  ]
}
```

**Order Status Values:**
- `pending` - Order received
- `preparing` - Being prepared
- `delivered` - Completed
- `cancelled` - Cancelled

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Success Responses

Successful responses follow this format:

```json
{
  "success": true,
  "data": { ... }
}
```

## Database Schema

### Restaurants Table
- Stores restaurant details, operating hours, and delivery settings
- Includes rating and active status

### Menu Items Table
- Links to restaurants via foreign key
- Tracks availability and preparation time
- Supports categorization

### Orders Table
- Tracks order status and payment information
- Links to restaurants
- Includes customer details and delivery address

### Order Items Table
- Junction table for order-menu item relationship
- Stores quantity and price at time of order
- Auto-calculates subtotal

### Users Table
- Links to Supabase auth.users
- Supports role-based access (admin, staff, manager)
- Tracks active status

## Security

- Row Level Security (RLS) enabled on all tables
- Authentication required for all operations
- Secure Supabase client configuration

## Notes

- All timestamps are in UTC
- Prices are stored with 2 decimal precision
- Database uses UUID for all primary keys
- Cascading deletes configured for related records
