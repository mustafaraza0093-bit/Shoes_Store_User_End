import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id?: string;
  fullName?: string;
  name?: string; // fallback
  email: string;
  phone?: string;
  role?: string;
}

export interface Order {
  id: string;
  status: string;
  subtotal: number;
  shippingTotal: number;
  discountTotal: number;
  grandTotal: number;
  placedAt: string;
  items: any[];
  itemsCount?: number; // UI fallback
  total?: number; // UI fallback
  date?: string; // UI fallback
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    this.checkSession();
  }

  private checkSession() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.getMe().subscribe({
        next: (user) => this.currentUser.next(this.mapUser(user)),
        error: () => this.logout()
      });
    }
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/me`);
  }

  getUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(res => {
        if (res.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
          this.currentUser.next(this.mapUser(res.user));
        }
      })
    );
  }

  register(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, payload).pipe(
      tap(res => {
        if (res.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
          this.currentUser.next(this.mapUser(res.user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.currentUser.next(null);
  }

  updatePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/users/profile/password`, { currentPassword, newPassword });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/my-orders`).pipe(
      tap(orders => {
        // Add fallbacks for UI
        orders.forEach(o => {
          o.itemsCount = o.items ? o.items.length : 0;
          o.total = o.grandTotal;
          o.date = new Date(o.placedAt).toLocaleDateString();
        });
      })
    );
  }

  private mapUser(user: any): User {
    return {
      ...user,
      name: user.fullName // Map fullName to name for UI
    };
  }
}
