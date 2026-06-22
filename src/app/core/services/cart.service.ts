import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = new BehaviorSubject<CartItem[]>([]);
  private isDrawerOpen = new BehaviorSubject<boolean>(false);
  private discount = new BehaviorSubject<number>(0);
  private promoCode = new BehaviorSubject<string | null>(null);

  constructor() {
    // We could pre-populate the cart here for the demo as requested.
  }

  // Pre-populate cart after DataService is injected or manually from home/app
  prePopulate(products: Product[]) {
    if (this.items.value.length === 0 && products.length >= 3) {
      this.items.next([
        { product: products.find(p => p.id === 'm1')!, size: 'UK 9', quantity: 1 },
        { product: products.find(p => p.id === 'm2')!, size: 'UK 8', quantity: 1 },
        { product: products.find(p => p.id === 'm4')!, size: 'UK 9', quantity: 1 }
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
    return this.items.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getDiscount(): Observable<number> {
    return this.discount.asObservable();
  }
  
  getPromoCode(): Observable<string | null> {
    return this.promoCode.asObservable();
  }

  applyCoupon(code: string): { success: boolean, message: string } {
    if (code.toUpperCase() === 'SUMMER15') {
      const sub = this.getSubtotal();
      if (sub >= 2000) {
        this.promoCode.next('SUMMER15');
        this.discount.next(sub * 0.15);
        return { success: true, message: 'SUMMER15 applied — 15% off!' };
      } else {
        return { success: false, message: 'Order must be above PKR 2000.' };
      }
    } else if (code.toUpperCase() === 'FREESHIP') {
       this.promoCode.next('FREESHIP');
       return { success: true, message: 'Free shipping applied!' };
    }
    return { success: false, message: 'This code is invalid or expired.' };
  }

  private recalculateDiscount() {
    if (this.promoCode.value === 'SUMMER15') {
      const sub = this.getSubtotal();
      this.discount.next(sub >= 2000 ? sub * 0.15 : 0);
      if (sub < 2000) this.promoCode.next(null);
    }
  }

  clearCart() {
    this.items.next([]);
    this.discount.next(0);
    this.promoCode.next(null);
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
