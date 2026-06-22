# User Portal Missing APIs

### Update user password

**API Name:** `UsersController_updatePassword`
**Method:** `PATCH`
**Endpoint:** `/api/users/profile/password`

**CURL Example:**
```bash
curl -X PATCH http://localhost:3000/api/users/profile/password \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}'
```

**Success Response:**
```json
"any"
```

---

### Get Flash Sale items

**API Name:** `ArticlesController_getFlashSale`
**Method:** `GET`
**Endpoint:** `/api/articles/flash-sale`

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/articles/flash-sale \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
[
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
]
```

---

### Get Featured items

**API Name:** `ArticlesController_getFeatured`
**Method:** `GET`
**Endpoint:** `/api/articles/featured`

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/articles/featured \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
[
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
]
```

---

### Get article reviews

**API Name:** `ArticlesController_getReviews`
**Method:** `GET`
**Endpoint:** `/api/articles/{slug}/reviews`

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/articles/{slug}/reviews \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
[
  {
    "id": "string",
    "author": "string",
    "rating": "number",
    "date": "string",
    "text": "string"
  }
]
```

---

### Add a review

**API Name:** `ArticlesController_addReview`
**Method:** `POST`
**Endpoint:** `/api/articles/{id}/reviews`

**CURL Example:**
```bash
curl -X POST http://localhost:3000/api/articles/{id}/reviews \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "rating": 5,
  "text": "Amazing shoes! Very comfortable."
}'
```

**Success Response:**
```json
{
  "id": "string",
  "author": "string",
  "rating": "number",
  "date": "string",
  "text": "string"
}
```

---

### Get article condition report

**API Name:** `ArticlesController_getConditionReport`
**Method:** `GET`
**Endpoint:** `/api/articles/{slug}/condition`

**CURL Example:**
```bash
curl -X GET http://localhost:3000/api/articles/{slug}/condition \
  -H 'Content-Type: application/json'
```

**Success Response:**
```json
{
  "grade": "Good",
  "score": "8/10",
  "inspectedDate": "2026-06-18T14:30:00Z",
  "inspectorName": "Hassan",
  "metrics": {
    "sole": 8,
    "upper": 9,
    "insole": 8,
    "laces": 10,
    "stitching": 9
  },
  "defects": [
    "string"
  ],
  "photos": [
    "string"
  ],
  "originalBox": true,
  "notes": "Worn approximately 5 times.",
  "articleId": "string"
}
```

---
