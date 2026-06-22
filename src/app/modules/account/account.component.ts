import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, User, Order } from '../../core/services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  user: User | null = null;
  orders: Order[] = [];
  activeTab = 'orders';
  expandedOrder: string | null = null;
  
  currentPassword = '';
  newPassword = '';
  passwordMessage = '';
  passwordError = false;
  isUpdatingPassword = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe(u => this.user = u);
    this.authService.getOrders().subscribe(o => this.orders = o);
  }

  toggleOrderDetails(orderId: string) {
    this.expandedOrder = this.expandedOrder === orderId ? null : orderId;
  }

  updatePassword() {
    if (!this.currentPassword || !this.newPassword) return;
    this.isUpdatingPassword = true;
    this.authService.updatePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.passwordMessage = 'Password updated successfully!';
        this.passwordError = false;
        this.currentPassword = '';
        this.newPassword = '';
        this.isUpdatingPassword = false;
      },
      error: (err) => {
        this.passwordMessage = err.error?.message || 'Failed to update password.';
        this.passwordError = true;
        this.isUpdatingPassword = false;
      }
    });
  }

  logout() { this.authService.logout(); }
}
