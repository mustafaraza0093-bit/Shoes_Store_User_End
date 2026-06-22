import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User, Order } from '../../core/services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  user: User | null = null;
  orders: Order[] = [];
  activeTab = 'orders';
  expandedOrder: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe(u => this.user = u);
    this.authService.getOrders().subscribe(o => this.orders = o);
  }

  toggleOrderDetails(orderId: string) {
    this.expandedOrder = this.expandedOrder === orderId ? null : orderId;
  }

  logout() { this.authService.logout(); }
}
