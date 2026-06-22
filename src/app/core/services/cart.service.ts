import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl;
  private items = new BehaviorSubject<CartItem[]>([]);
  private isDrawerOpen = new BehaviorSubject<boolean>(false);
  private discount = new BehaviorSubject<number>(0);
  private promoCode = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  // Pre-populate cart after DataService is injected or manually from home/app
  prePopulate(products: Product[]) {
    if (this.items.value.length === 0 && products.length >= 3) {
      this.items.next([
        { product: products.find(p => p.id === 'm1') || products[0], size: 'UK 9', quantity: 1 },
        { product: products.find(p => p.id === 'm2') || products[1], size: 'UK 8', quantity: 1 }
      ]);
    }
  }

  getItems(): Observable<CartItem[]> {
    return this.items.asObservable();
  }

  addItem(product: Product, size: string, quantity: number = 1) {
    const currentItems = this.items.value;
    const existing = currentItems.find(i => i.product.id === product.id && i.size === size);
    if (existing) {
      existing.quantity += quantity;
      this.items.next([...currentItems]);
    } else {
      this.items.next([...currentItems, { product, size, quantity }]);
    }
    this.openDrawer();
  }

  removeItem(productId: string, size: string) {
    const currentItems = this.items.value;
    this.items.next(currentItems.filter(i => !(i.product.id === productId && i.size === size)));
    this.recalculateDiscount();
  }

  updateQuantity(productId: string, size: string, quantity: number) {
    const currentItems = this.items.value;
    const item = currentItems.find(i => i.product.id === productId && i.size === size);
    if (item) {
      item.quantity = quantity;
      this.items.next([...currentItems]);
      this.recalculateDiscount();
    }
  }

  getSubtotal(): number {
    return this.items.value.reduce((total, item) => total + (item.product.sellingPrice * item.quantity), 0);
  }

  getDiscount(): Observable<number> {
    return this.discount.asObservable();
  }
  
  getPromoCode(): Observable<string | null> {
    return this.promoCode.asObservable();
  }

  applyCoupon(code: string): Observable<{ success: boolean, message: string }> {
    const orderValue = this.getSubtotal();
    return this.http.post<any>(`${this.apiUrl}/promotions/validate`, { couponCode: code, orderValue }).pipe(
      map(res => {
        // Assuming backend returns some discount amount or valid status
        this.promoCode.next(code);
        this.discount.next(res.discountAmount || (orderValue * 0.15)); // Fallback to 15% if backend doesn't give amount
        return { success: true, message: 'Coupon applied successfully!' };
      }),
      catchError(err => {
        return of({ success: false, message: err.error?.message || 'Invalid or expired coupon.' });
      })
    );
  }

  private recalculateDiscount() {
    // If a promo code is applied, we could re-validate it here or just drop it. 
    // Dropping for simplicity if cart changes.
    if (this.promoCode.value) {
      this.promoCode.next(null);
      this.discount.next(0);
    }
  }

  clearCart() {
    this.items.next([]);
    this.discount.next(0);
    this.promoCode.next(null);
  }

  placeOrder(addressId: string, notes?: string): Observable<any> {
    const items = this.items.value.map(i => ({
      articleId: i.product.id,
      sizeId: i.size, // Size string used as sizeId temporarily
      quantity: i.quantity
    }));

    const payload = {
      addressId,
      items,
      couponCode: this.promoCode.value,
      notes
    };

    return this.http.post<any>(`${this.apiUrl}/orders`, payload).pipe(
      tap(() => this.clearCart())
    );
  }

  // Drawer state
  isDrawerOpen$(): Observable<boolean> {
    return this.isDrawerOpen.asObservable();
  }

  openDrawer() {
    this.isDrawerOpen.next(true);
  }

  closeDrawer() {
    this.isDrawerOpen.next(false);
  }
}
