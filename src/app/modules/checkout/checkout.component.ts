import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  step = 1; // 1: Delivery, 2: Review, 3: Confirm
  items: CartItem[] = [];
  subtotal = 0;
  discount = 0;
  shipping = 250;
  promoCode: string | null = null;
  orderNumber = '#ORD-' + Math.floor(1000 + Math.random() * 9000);

  selectedAddress = 'home';
  addresses = [
    { id: 'home', label: 'Home', street: '14-B, Gulberg III, Lahore', province: 'Punjab, 54000', phone: '0321-4567890' },
    { id: 'office', label: 'Office', street: '23 MM Alam Road, Lahore', province: 'Punjab, 54660', phone: '0321-9876543' },
  ];

  promoInput = '';
  promoMessage = '';
  promoError = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getItems().subscribe(items => { this.items = items; this.subtotal = this.cartService.getSubtotal(); });
    this.cartService.getDiscount().subscribe(d => { this.discount = d; this.subtotal = this.cartService.getSubtotal(); });
    this.cartService.getPromoCode().subscribe(code => {
      this.promoCode = code;
      this.shipping = code === 'FREESHIP' ? 0 : 250;
    });
  }

  get grandTotal(): number { return Math.max(0, this.subtotal - this.discount + this.shipping); }

  getSelectedAddress() { return this.addresses.find(a => a.id === this.selectedAddress); }

  nextStep() { if (this.step < 3) this.step++; }
  prevStep() { if (this.step > 1) this.step--; }

  applyPromo() {
    if (!this.promoInput) return;
    this.cartService.applyCoupon(this.promoInput).subscribe(res => {
      this.promoMessage = res.message;
      this.promoError = !res.success;
      if (res.success) {
        this.promoInput = '';
      }
    });
  }

  placeOrder() {
    this.cartService.placeOrder(this.selectedAddress, 'Checkout notes').subscribe(() => {
      this.step = 3;
    });
  }
}
