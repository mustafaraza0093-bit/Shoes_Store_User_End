Missing APIs Requirement Document

As requested, here is the detailed list of APIs that are currently missing from the backend but are required by the User Portal features (Homepage, Product Details, Profile).

For each missing API or feature, I have outlined the method, endpoint, description, and the exact response structure the Angular frontend expects.

1. Product Reviews APIs
Currently, the product detail page expects a list of customer reviews, but the `ArticlesController_findOne` response does not include them.

1.1 Get Product Reviews
Method: GET Endpoint: `/api/articles/{slug}/reviews` Description: Returns the list of customer reviews and ratings for a specific product.

Expected Response:
```json
[
  {
    "id": "rev-1",
    "author": "Ali Khan",
    "rating": 5,
    "date": "12 Jun 2026",
    "text": "Amazing shoes! Very comfortable and the quality is outstanding."
  },
  {
    "id": "rev-2",
    "author": "Saad Ahmed",
    "rating": 4,
    "date": "15 Jun 2026",
    "text": "Good condition as described, fits perfectly."
  }
]
```

2. Product Filtering & Categories
The homepage displays specific sections for "Flash Sale" and "Featured/New Arrivals". The current `ArticlesController_findAll` needs to support these filters. Note: You can either create new endpoints or update the existing `/api/articles` to accept query parameters (e.g., `?isFlashSale=true`).

2.1 Get Flash Sale Products
Method: GET Endpoint: `/api/articles/flash-sale` (or `/api/articles?isFlashSale=true`)
Description: Returns a curated list of articles currently active in a flash sale campaign. This API should include specific pricing metrics like the discount percentage and a timestamp for when the flash sale ends to drive urgency on the frontend timer.

Expected Response:
```json
[
  {
    "id": "a1b2c3d4-e5f6...",
    "name": "Jordan 1 Retro High OG",
    "slug": "jordan-1-retro-high-og",
    "condition": "NEW",
    "sellingPrice": 21000,
    "originalPrice": 28000,
    "discountPercentage": 25,
    "flashSaleEndTime": "2026-06-30T23:59:59Z",
    "images": [
      { "url": "https://example.com/jordan1.png", "isPrimary": true }
    ],
    "brand": { "id": "b1", "name": "Nike" },
    "category": { "id": "c1", "name": "Sneakers" },
    "availableSizes": ["US 8", "US 9", "US 10"],
    "isFlashSale": true
  }
]
```

2.2 Get Featured / New Arrivals
Method: GET Endpoint: `/api/articles/featured` (or `/api/articles?isFeatured=true`)
Description: Fetches a prioritized list of articles that the admin has manually marked as "featured" or the most recently added inventory items. The response should provide enough context for rich product cards.

Expected Response: 
```json
[
  {
    "id": "x9y8z7w6-v5u4...",
    "name": "Yeezy Boost 350 V2",
    "slug": "yeezy-boost-350-v2",
    "condition": "PRE-OWNED",
    "sellingPrice": 35000,
    "originalPrice": null,
    "featuredOrder": 1,
    "addedAt": "2026-06-22T10:00:00Z",
    "images": [
      { "url": "https://example.com/yeezy.png", "isPrimary": true }
    ],
    "brand": { "id": "b2", "name": "Adidas" },
    "category": { "id": "c1", "name": "Sneakers" },
    "availableSizes": ["US 10.5"],
    "isFeatured": true
  }
]
```

3. Pre-Owned Condition Reports
The UI displays a highly granular condition report (sole rating, upper rating, defect photos, etc.) specifically for pre-owned shoes to build buyer trust.

3.1 Get Article Condition Report
Method: GET Endpoint: `/api/articles/{slug}/condition`
Description: Returns a comprehensive condition grading matrix for a specific pre-owned article. This API allows buyers to see exactly what flaws exist before purchasing. Alternatively, this detailed object could be nested inside the `ArticlesController_findOne` response for pre-owned items.

Expected Response:
```json
{
  "articleId": "x9y8z7w6-v5u4...",
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
    "Minor scuffing on the right toe box.",
    "Slight yellowing on the midsole."
  ],
  "photos": [
    "https://example.com/condition/defect1.png",
    "https://example.com/condition/defect2.png"
  ],
  "originalBox": true,
  "notes": "Worn approximately 5 times. Stored in original box away from sunlight."
}
```

4. User Security APIs
The user profile page needs to allow customers to update their passwords. The current `UsersController_updateProfile` only handles name and phone number.

4.1 Update User Password
Method: PATCH Endpoint: `/api/users/profile/password` Description: Allows the authenticated user to update their account password.

Expected Payload:
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```
Expected Response: 200 OK
