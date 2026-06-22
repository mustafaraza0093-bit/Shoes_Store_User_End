export interface ProductImage {
  id?: string;
  url: string;
  altText?: string;
  isPrimary?: boolean;
  sortOrder?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug?: string;
  logoUrl?: string;
  description?: string;
  isActive?: boolean;
  productCount?: number;
  createdAt?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  condition: string;
  sku?: string;
  sellingPrice: number;
  originalPrice?: number; // Not in backend schema but needed for UI sale badge
  shippingCost?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  brand: Brand | any;
  category: Category | any;
  images: ProductImage[];
  totalStock?: number;

  // Added for UI compatibility (Missing from API)
  sizes: string[];
  inStockSizes: string[];
  reviews: Review[];
  conditionReport?: {
    grade: string;
    score: string;
    inspectedDate: string;
    inspectorName: string;
    metrics: {
      sole: number;
      upper: number;
      insole: number;
      laces: number;
      stitching: number;
    };
    defects: string[];
    photos: string[];
    originalBox: boolean;
    notes: string;
    articleId: string;
  };
  isFlashSale?: boolean;
}

