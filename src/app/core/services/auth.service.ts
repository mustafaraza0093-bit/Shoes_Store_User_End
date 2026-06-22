import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  phone?: string;
}

export interface Order {
  id: string;
  date: string;
  itemsCount: number;
  total: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>({
    name: 'Hamza Malik',
    email: 'hamza@gmail.com'
  }); // Mock logged in user as per prompt

  private mockOrders: Order[] = [
    { id: '#ORD-1022', date: '20 Jun 2026', itemsCount: 3, total: 24450, status: '✅ Delivered' },
    { id: '#ORD-1018', date: '12 Jun 2026', itemsCount: 1, total: 9800, status: '✅ Delivered' },
    { id: '#ORD-1014', date: '01 Jun 2026', itemsCount: 2, total: 21000, status: '✅ Delivered' },
  ];

  constructor() {}

  getUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.currentUser.value;
  }

  login(email: string, password: string): boolean {
    // Mock login
    this.currentUser.next({ name: 'Hamza Malik', email });
    return true;
  }

  logout() {
    this.currentUser.next(null);
  }

  getOrders(): Observable<Order[]> {
    return new BehaviorSubject(this.mockOrders).asObservable();
  }
}
