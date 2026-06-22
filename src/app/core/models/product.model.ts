export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Male' | 'Female' | 'Boys' | 'Kids';
  condition: 'NEW' | 'PRE-OWNED';
  price: number;
  originalPrice?: number; // For sale items
  sizes: string[];
  inStockSizes: string[];
  images: string[];
  description?: string;
  conditionReport?: {
    grade: string;
    inspectedDate: string;
    sole: number;
    upper: number;
    insole: number;
    laces: number;
    stitching: number;
    notes: string;
    originalBox: boolean;
  };
  reviews: Review[];
  isFlashSale?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  productCount: number;
}
