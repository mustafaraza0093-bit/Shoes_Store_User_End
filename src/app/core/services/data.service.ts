import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, Brand } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private products: Product[] = [];
  private brands: Brand[] = [];

  constructor() {
    this.initializeBrands();
    this.initializeProducts();
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  getBrands(): Observable<Brand[]> {
    return of(this.brands);
  }

  getFlashSaleProducts(): Observable<Product[]> {
    return of(this.products.filter(p => p.isFlashSale));
  }
  
  getFeaturedProducts(): Observable<Product[]> {
    // Return first 8 new arrivals
    return of(this.products.filter(p => p.condition === 'NEW').slice(0, 8));
  }

  private initializeBrands() {
    const brandNames = ['Nike', 'Adidas', 'Converse', 'Vans', 'Reebok', 'New Balance', 'Puma', 'Yeezy', 'Skechers', 'Bata'];
    this.brands = brandNames.map(name => ({
      id: name.toLowerCase().replace(' ', '-'),
      name: name,
      productCount: Math.floor(Math.random() * 20) + 5
    }));
  }

  private initializeProducts() {
    const dummyDescription = "The Nike Air Force 1 '07 is a timeless icon in street footwear. First introduced in 1982, it combines a low-top silhouette with Nike's Air cushioning technology for all-day comfort. The clean white leather upper with a perforated toe box keeps things fresh, while the chunky midsole gives that classic elevated look.";
    const dummyReviews = [
      { id: '1', author: 'Ali Khan', rating: 5, date: '12 Jun 2026', text: 'Amazing shoes! Very comfortable.' },
      { id: '2', author: 'Saad Ahmed', rating: 4, date: '15 Jun 2026', text: 'Good condition as described, fits perfectly.' },
      { id: '3', author: 'Hamza Bilal', rating: 5, date: '18 Jun 2026', text: 'Prompt delivery, genuine product.' }
    ];

    const conditionReport = {
      grade: 'Good (8/10)',
      inspectedDate: '18 Jun 2026',
      sole: 8,
      upper: 9,
      insole: 8,
      laces: 10,
      stitching: 9,
      notes: 'Worn approximately 5 times. Stored in original box.',
      originalBox: true
    };

    const placeholderImg = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop';
    const placeholderImg2 = 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop';
    const images = [placeholderImg, placeholderImg2, placeholderImg, placeholderImg];

    // Male Products (12)
    this.products.push({ id: 'm1', name: "Air Force 1 '07", brand: 'Nike', category: 'Male', condition: 'NEW', price: 12500, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'], images, description: dummyDescription, reviews: dummyReviews });
    this.products.push({ id: 'm2', name: 'Stan Smith', brand: 'Adidas', category: 'Male', condition: 'NEW', price: 9800, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], images, description: dummyDescription, reviews: dummyReviews });
    this.products.push({ id: 'm3', name: 'Jordan 1 Retro High', brand: 'Nike', category: 'Male', condition: 'NEW', price: 21000, originalPrice: 28000, sizes: ['UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 8', 'UK 9', 'UK 10'], images, description: dummyDescription, reviews: dummyReviews, isFlashSale: true });
    this.products.push({ id: 'm4', name: 'Old Skool Black', brand: 'Vans', category: 'Male', condition: 'PRE-OWNED', price: 4500, sizes: ['UK 8', 'UK 9'], inStockSizes: ['UK 8', 'UK 9'], images, description: dummyDescription, conditionReport, reviews: dummyReviews });
    this.products.push({ id: 'm5', name: 'Chuck Taylor High', brand: 'Converse', category: 'Male', condition: 'NEW', price: 7200, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'], images, description: dummyDescription, reviews: dummyReviews });
    this.products.push({ id: 'm6', name: 'Ultraboost 22', brand: 'Adidas', category: 'Male', condition: 'NEW', price: 22500, sizes: ['UK 8', 'UK 9', 'UK 10', 'UK 11'], inStockSizes: ['UK 8', 'UK 9', 'UK 10', 'UK 11'], images, description: dummyDescription, reviews: dummyReviews });
    this.products.push({ id: 'm7', name: 'Classic Leather', brand: 'Reebok', category: 'Male', condition: 'NEW', price: 8600, sizes: ['UK 7', 'UK 8', 'UK 9'], inStockSizes: ['UK 7', 'UK 8', 'UK 9'], images, description: dummyDescription, reviews: dummyReviews });
    this.products.push({ id: 'm8', name: 'Foam Runner', brand: 'Yeezy', category: 'Male', condition: 'PRE-OWNED', price: 18375, originalPrice: 24500, sizes: ['UK 9', 'UK 10'], inStockSizes: ['UK 9', 'UK 10'], images, description: dummyDescription, conditionReport, reviews: dummyReviews, isFlashSale: true });
    this.products.push({ id: 'm9', name: '574 Core', brand: 'New Balance', category: 'Male', condition: 'NEW', price: 14200, sizes: ['UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 8', 'UK 9', 'UK 10'], images, description: dummyDescription, reviews: dummyReviews });
    this.products.push({ id: 'm10', name: 'Dunk Low', brand: 'Nike', category: 'Male', condition: 'NEW', price: 12375, originalPrice: 16500, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'], images, description: dummyDescription, reviews: dummyReviews, isFlashSale: true });
    this.products.push({ id: 'm11', name: 'Suede Classic', brand: 'Puma', category: 'Male', condition: 'NEW', price: 7800, sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], inStockSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], images, description: dummyDescription, reviews: dummyReviews });
    this.products.push({ id: 'm12', name: 'Slip-On Pro', brand: 'Vans', category: 'Male', condition: 'PRE-OWNED', price: 3200, sizes: ['UK 8', 'UK 9'], inStockSizes: ['UK 8', 'UK 9'], images, description: dummyDescription, conditionReport, reviews: dummyReviews });

    // Flash sale generic items
    this.products.push({ id: 'm13', name: 'NMD R1', brand: 'Adidas', category: 'Male', condition: 'NEW', price: 13500, originalPrice: 18000, sizes: ['UK 8', 'UK 9', 'UK 10'], inStockSizes: ['UK 8', 'UK 9', 'UK 10'], images, description: dummyDescription, reviews: dummyReviews, isFlashSale: true });

    // Generate remaining Female, Boys, Kids products
    for (let i = 1; i <= 10; i++) {
      this.products.push({
        id: `f${i}`, name: `Female Style ${i}`, brand: 'Nike', category: 'Female', condition: i % 3 === 0 ? 'PRE-OWNED' : 'NEW',
        price: 8000 + (i * 1000), sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'], inStockSizes: ['UK 5', 'UK 6'], images, description: dummyDescription, reviews: dummyReviews, conditionReport: i % 3 === 0 ? conditionReport : undefined
      });
    }
    for (let i = 1; i <= 8; i++) {
      this.products.push({
        id: `b${i}`, name: `Boy Style ${i}`, brand: 'Adidas', category: 'Boys', condition: i % 4 === 0 ? 'PRE-OWNED' : 'NEW',
        price: 5000 + (i * 500), sizes: ['UK 1', 'UK 2', 'UK 3'], inStockSizes: ['UK 2'], images, description: dummyDescription, reviews: dummyReviews, conditionReport: i % 4 === 0 ? conditionReport : undefined
      });
    }
    for (let i = 1; i <= 8; i++) {
      this.products.push({
        id: `k${i}`, name: `Kid Style ${i}`, brand: 'Skechers', category: 'Kids', condition: 'NEW',
        price: 4000 + (i * 300), sizes: ['UK 10K', 'UK 11K', 'UK 12K'], inStockSizes: ['UK 11K'], images, description: dummyDescription, reviews: dummyReviews
      });
    }
  }
}
