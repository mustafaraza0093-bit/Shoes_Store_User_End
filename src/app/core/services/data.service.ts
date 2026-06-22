import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin, of, catchError } from 'rxjs';
import { Product, Brand, Category } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/articles`).pipe(
      map(articles => articles.map(article => this.mapArticleToProduct(article)))
    );
  }

  getProductById(slug: string): Observable<Product | undefined> {
    return forkJoin({
      article: this.http.get<any>(`${this.apiUrl}/articles/${slug}`),
      reviews: this.getProductReviews(slug),
      condition: this.getProductCondition(slug)
    }).pipe(
      map(({ article, reviews, condition }) => {
        const product = this.mapArticleToProduct(article);
        product.reviews = reviews;
        if (condition) {
          product.conditionReport = condition;
        }
        return product;
      }),
      catchError(() => of(undefined))
    );
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}/brands`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getFlashSaleProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/articles/flash-sale`).pipe(
      map(articles => articles.map(article => this.mapArticleToProduct(article)))
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/articles/featured`).pipe(
      map(articles => articles.map(article => this.mapArticleToProduct(article)))
    );
  }

  getProductReviews(slug: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/articles/${slug}/reviews`).pipe(
      catchError(() => of([]))
    );
  }

  addProductReview(id: string, payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/articles/${id}/reviews`, payload);
  }

  getProductCondition(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articles/${slug}/condition`).pipe(
      catchError(() => of(undefined))
    );
  }

  // Maps backend Article to UI Product model (satisfies UI expectations for missing data)
  private mapArticleToProduct(article: any): Product {
    return {
      ...article,
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'], // Mocked until Inventory API integration per-product
      inStockSizes: ['UK 7', 'UK 8', 'UK 9'],
      originalPrice: article.sellingPrice ? article.sellingPrice + 2000 : undefined, // Just for UI demo
      reviews: [] // Mocked
    };
  }
}
