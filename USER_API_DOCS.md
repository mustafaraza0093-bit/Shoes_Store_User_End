# User / Public APIs

### Register a new customer account

**API Name:** `AuthController_register`
**Method:** `POST`
**Endpoint:** `/api/auth/register`

**Description:** Creates a new customer account. Returns a JWT accessToken immediately after registration. Role is always set to "customer" — admin accounts must be created via seeder.

**CURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "hamza@gmail.com",
  "password": "Hamza@2026",
  "fullName": "Hamza Malik",
  "phone": "0321-4567890"
}'
```

**Success Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": "15m",
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "hamza@gmail.com",
    "fullName": "Hamza Malik",
    "phone": "0321-4567890",
    "role": "customer",
    "isActive": true,
    "addresses": [
      {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "label": "Home",
        "street": "123 Main St",
        "city": "Lahore",
        "province": "Punjab",
        "postalCode": "54000",
        "country": "Pakistan",
        "isDefault": true
      }
    ]
  }
}
```

---

### Login with email and password

**API Name:** `AuthController_login`
**Method:** `POST`
**Endpoint:** `/api/auth/login`

**Description:** Returns a JWT accessToken valid for 15 minutes.
    
**Admin credentials (dev):** admin@solestory.pk / Admin@1234  
**Customer credentials (dev):** hamza@gmail.com / Customer@1234

**CURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "admin@solestory.pk",
  "password": "Admin@1234"
}'
```

**Success Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": "15m",
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "hamza@gmail.com",
    "fullName": "Hamza Malik",
    "phone": "0321-4567890",
    "role": "customer",
    "isActive": true,
    "addresses": [
      {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "label": "Home",
        "street": "123 Main St",
        "city": "Lahore",
        "province": "Punjab",
        "postalCode": "54000",
        "country": "Pakistan",
        "isDefault": true
      }
    ]
  }
}
```

---

### Get current authenticated user

**API Name:** `AuthController_getMe`
**Method:** `GET`
**Endpoint:** `/api/auth/me`

**Description:** Returns profile of the currently logged-in user based on the JWT token.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "hamza@gmail.com",
  "fullName": "Hamza Malik",
  "phone": "0321-4567890",
  "role": "customer",
  "isActive": true,
  "addresses": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "label": "Home",
      "street": "123 Main St",
      "city": "Lahore",
      "province": "Punjab",
      "postalCode": "54000",
      "country": "Pakistan",
      "isDefault": true
    }
  ]
}
```

---

### Get my profile

**API Name:** `UsersController_getProfile`
**Method:** `GET`
**Endpoint:** `/api/users/profile`

**Description:** Returns the full profile of the authenticated user.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "hamza@gmail.com",
  "fullName": "Hamza Malik",
  "phone": "0321-4567890",
  "role": "customer",
  "isActive": true,
  "addresses": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "label": "Home",
      "street": "123 Main St",
      "city": "Lahore",
      "province": "Punjab",
      "postalCode": "54000",
      "country": "Pakistan",
      "isDefault": true
    }
  ]
}
```

---

### Update my profile

**API Name:** `UsersController_updateProfile`
**Method:** `PATCH`
**Endpoint:** `/api/users/profile`

**Description:** Update name and phone number.

**CURL Example:**
```bash
curl -X PATCH http://localhost:3000/api/users/profile \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "fullName": "Hamza Malik",
  "phone": "0321-4567890"
}'
```

**Success Response:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "hamza@gmail.com",
  "fullName": "Hamza Malik",
  "phone": "0321-4567890",
  "role": "customer",
  "isActive": true,
  "addresses": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "label": "Home",
      "street": "123 Main St",
      "city": "Lahore",
      "province": "Punjab",
      "postalCode": "54000",
      "country": "Pakistan",
      "isDefault": true
    }
  ]
}
```

---

### Get my saved addresses

**API Name:** `UsersController_getAddresses`
**Method:** `GET`
**Endpoint:** `/api/users/addresses`

**Description:** Returns all delivery addresses saved by the customer.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/users/addresses \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "label": "Home",
    "street": "123 Main St",
    "city": "Lahore",
    "province": "Punjab",
    "postalCode": "54000",
    "country": "Pakistan",
    "isDefault": true
  }
]
```

---

### Add a delivery address

**API Name:** `UsersController_addAddress`
**Method:** `POST`
**Endpoint:** `/api/users/addresses`

**Description:** Adds a new saved address. If isDefault is true, all other addresses are set to non-default.

**CURL Example:**
```bash
curl -X POST http://localhost:3000/api/users/addresses \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "label": "Home",
  "street": "123 Main St",
  "city": "Lahore",
  "province": "Punjab",
  "postalCode": "54000",
  "country": "Pakistan",
  "isDefault": true
}'
```

**Success Response:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "label": "Home",
  "street": "123 Main St",
  "city": "Lahore",
  "province": "Punjab",
  "postalCode": "54000",
  "country": "Pakistan",
  "isDefault": true
}
```

---

### Update an address

**API Name:** `UsersController_updateAddress`
**Method:** `PATCH`
**Endpoint:** `/api/users/addresses/{id}`

**CURL Example:**
```bash
curl -X PATCH http://localhost:3000/api/users/addresses/{id} \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "label": "Home",
  "street": "123 Main St",
  "city": "Lahore",
  "province": "Punjab",
  "postalCode": "54000",
  "country": "Pakistan",
  "isDefault": true
}'
```

**Success Response:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "label": "Home",
  "street": "123 Main St",
  "city": "Lahore",
  "province": "Punjab",
  "postalCode": "54000",
  "country": "Pakistan",
  "isDefault": true
}
```

---

### Delete an address

**API Name:** `UsersController_deleteAddress`
**Method:** `DELETE`
**Endpoint:** `/api/users/addresses/{id}`

**CURL Example:**
```bash
curl -X DELETE http://localhost:3000/api/users/addresses/{id} \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
"any"
```

---

### Set an address as default delivery address

**API Name:** `UsersController_setDefaultAddress`
**Method:** `PATCH`
**Endpoint:** `/api/users/addresses/{id}/set-default`

**CURL Example:**
```bash
curl -X PATCH http://localhost:3000/api/users/addresses/{id}/set-default \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "label": "Home",
  "street": "123 Main St",
  "city": "Lahore",
  "province": "Punjab",
  "postalCode": "54000",
  "country": "Pakistan",
  "isDefault": true
}
```

---

### List all active brands

**API Name:** `BrandsController_findAll`
**Method:** `GET`
**Endpoint:** `/api/brands`

**Description:** Public endpoint. Returns all active brands with their product count. Used in navbar mega-dropdown and brand showcase on User Portal homepage.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/brands \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Nike",
    "slug": "nike",
    "logoUrl": "https://solestory.pk/uploads/nike-logo.webp",
    "description": "Just Do It \u2014 world's leading athletic brand",
    "isActive": true,
    "productCount": 18,
    "createdAt": "2026-01-15T10:30:00.000Z"
  }
]
```

---

### Get brand by slug

**API Name:** `BrandsController_findOne`
**Method:** `GET`
**Endpoint:** `/api/brands/{slug}`

**Description:** Returns brand detail. Used on brand pages.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/brands/{slug} \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Nike",
  "slug": "nike",
  "logoUrl": "https://solestory.pk/uploads/nike-logo.webp",
  "description": "Just Do It \u2014 world's leading athletic brand",
  "isActive": true,
  "productCount": 18,
  "createdAt": "2026-01-15T10:30:00.000Z"
}
```

---

### List all categories

**API Name:** `CategoriesController_findAll`
**Method:** `GET`
**Endpoint:** `/api/categories`

**Description:** Returns Male, Female, Boys, Kids with product counts. Used in navbar and homepage category strip.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/categories \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Male",
    "slug": "male",
    "productCount": 120
  }
]
```

---

### Get category by slug

**API Name:** `CategoriesController_findOne`
**Method:** `GET`
**Endpoint:** `/api/categories/{slug}`

**Description:** Used to build category page header.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/categories/{slug} \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Male",
  "slug": "male",
  "productCount": 120
}
```

---

### List articles with filters

**API Name:** `ArticlesController_findAll`
**Method:** `GET`
**Endpoint:** `/api/articles`

**Description:** Returns a paginated, filtered list of shoe articles.  
Used by the User Portal listing page for /shop/male, /shop/female, /shop/boys, /shop/kids, and brand pages.  
Also used by Admin Panel product list.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/articles \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
"any"
```

---

### Get article by slug

**API Name:** `ArticlesController_findOne`
**Method:** `GET`
**Endpoint:** `/api/articles/{slug}`

**Description:** Returns article detail including images and available sizes. Used on product detail page.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/articles/{slug} \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
{
  "id": "a1b2c3d4...",
  "name": "Nike Air Max 270",
  "slug": "nike-air-max-270",
  "description": "A very comfortable shoe",
  "condition": "new",
  "sku": "NK-AM270-001",
  "sellingPrice": 120,
  "shippingCost": 10,
  "isActive": true,
  "isFeatured": false,
  "brand": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Nike",
    "slug": "nike",
    "logoUrl": "https://solestory.pk/uploads/nike-logo.webp",
    "description": "Just Do It \u2014 world's leading athletic brand",
    "isActive": true,
    "productCount": 18,
    "createdAt": "2026-01-15T10:30:00.000Z"
  },
  "category": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Male",
    "slug": "male",
    "productCount": 120
  },
  "images": [
    {
      "id": "a1b2c3d4...",
      "url": "https://solestory.pk/uploads/shoes/shoe1.webp",
      "altText": "Nike Air Max 270 side view",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "totalStock": 50
}
```

---

### Get stock by article

**API Name:** `InventoryController_getInventoryByArticle`
**Method:** `GET`
**Endpoint:** `/api/inventory/article/{articleId}`

**Description:** Returns inventory for all sizes of a specific article.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/inventory/article/{articleId} \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
[
  {
    "id": "a1b2c3d4...",
    "quantity": 50,
    "lowStockThreshold": 5,
    "sizeLabel": "UK 7",
    "stockStatus": "in_stock"
  }
]
```

---

### Place a new order

**API Name:** `OrdersController_create`
**Method:** `POST`
**Endpoint:** `/api/orders`

**Description:** Creates order, verifies stock, applies promotion, and decrements inventory.

**CURL Example:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "addressId": "a1b2c3d4...",
  "items": [
    {
      "articleId": "a1b2c3d4...",
      "sizeId": "a1b2c3d4...",
      "quantity": 1
    }
  ],
  "couponCode": "SUMMER20",
  "notes": "Leave at front door"
}'
```

**Success Response:**
```json
{
  "id": "a1b2c3d4...",
  "status": "pending",
  "subtotal": 120,
  "shippingTotal": 10,
  "discountTotal": 0,
  "grandTotal": 130,
  "address": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "label": "Home",
    "street": "123 Main St",
    "city": "Lahore",
    "province": "Punjab",
    "postalCode": "54000",
    "country": "Pakistan",
    "isDefault": true
  },
  "items": [
    {
      "id": "a1b2c3d4...",
      "articleName": "Nike Air Max 270",
      "sizeLabel": "UK 7",
      "quantity": 1,
      "unitPrice": 120,
      "totalPrice": 120
    }
  ],
  "placedAt": "2026-06-21T10:00:00.000Z"
}
```

---

### Get my orders

**API Name:** `OrdersController_getMyOrders`
**Method:** `GET`
**Endpoint:** `/api/orders/my-orders`

**Description:** Returns order history for the current customer.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/orders/my-orders \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
[
  {
    "id": "a1b2c3d4...",
    "status": "pending",
    "subtotal": 120,
    "shippingTotal": 10,
    "discountTotal": 0,
    "grandTotal": 130,
    "address": {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "label": "Home",
      "street": "123 Main St",
      "city": "Lahore",
      "province": "Punjab",
      "postalCode": "54000",
      "country": "Pakistan",
      "isDefault": true
    },
    "items": [
      {
        "id": "a1b2c3d4...",
        "articleName": "Nike Air Max 270",
        "sizeLabel": "UK 7",
        "quantity": 1,
        "unitPrice": 120,
        "totalPrice": 120
      }
    ],
    "placedAt": "2026-06-21T10:00:00.000Z"
  }
]
```

---

### Get order details

**API Name:** `OrdersController_getMyOrderById`
**Method:** `GET`
**Endpoint:** `/api/orders/my-orders/{id}`

**Description:** Customer only sees their own order details.

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/orders/my-orders/{id} \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
{
  "id": "a1b2c3d4...",
  "status": "pending",
  "subtotal": 120,
  "shippingTotal": 10,
  "discountTotal": 0,
  "grandTotal": 130,
  "address": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "label": "Home",
    "street": "123 Main St",
    "city": "Lahore",
    "province": "Punjab",
    "postalCode": "54000",
    "country": "Pakistan",
    "isDefault": true
  },
  "items": [
    {
      "id": "a1b2c3d4...",
      "articleName": "Nike Air Max 270",
      "sizeLabel": "UK 7",
      "quantity": 1,
      "unitPrice": 120,
      "totalPrice": 120
    }
  ],
  "placedAt": "2026-06-21T10:00:00.000Z"
}
```

---

### Validate coupon code

**API Name:** `PromotionsController_validateCoupon`
**Method:** `POST`
**Endpoint:** `/api/promotions/validate`

**Description:** Checks if coupon is active, within date range, and order meets minimum value.

**CURL Example:**
```bash
curl -X POST http://localhost:3000/api/promotions/validate \
  -H 'Content-Type: application/json' \
  -d '{
  "couponCode": "SUMMER20",
  "orderValue": 150
}'
```

**Success Response:**
```json
"any"
```

---
