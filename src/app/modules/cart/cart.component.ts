import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  subtotal = 0;
  discount = 0;
  promoCode: string | null = null;
  couponInput = '';
  couponMessage = '';
  couponSuccess = false;
  shipping = 250;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartService.getItems().subscribe(items => {
      this.items = items;
      this.subtotal = this.cartService.getSubtotal();
    });
    this.cartService.getDiscount().subscribe(d => {
      this.discount = d;
      this.subtotal = this.cartService.getSubtotal();
    });
    this.cartService.getPromoCode().subscribe(code => {
      this.promoCode = code;
      if (code === 'FREESHIP') this.shipping = 0;
      else this.shipping = 250;
    });
  }

  incrementQty(item: CartItem) { this.cartService.updateQuantity(item.product.id, item.size, item.quantity + 1); }
  decrementQty(item: CartItem) {
    if (item.quantity > 1) this.cartService.updateQuantity(item.product.id, item.size, item.quantity - 1);
    else this.removeItem(item);
  }
  removeItem(item: CartItem) { this.cartService.removeItem(item.product.id, item.size); }

  applyCoupon() {
    const result = this.cartService.applyCoupon(this.couponInput);
    this.couponMessage = result.message;
    this.couponSuccess = result.success;
  }

  get grandTotal(): number {
    return Math.max(0, this.subtotal - this.discount + this.shipping);
  }
}
