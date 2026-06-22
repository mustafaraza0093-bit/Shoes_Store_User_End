import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../core/services/cart.service';
import { ConditionRibbonComponent } from '../../shared/components/condition-ribbon/condition-ribbon.component';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule, ConditionRibbonComponent],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent implements OnInit {
  isOpen = false;
  items: CartItem[] = [];
  subtotal = 0;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartService.isDrawerOpen$().subscribe(open => this.isOpen = open);
    this.cartService.getItems().subscribe(items => {
      this.items = items;
      this.subtotal = this.cartService.getSubtotal();
    });
  }

  close() { this.cartService.closeDrawer(); }

  incrementQty(item: CartItem) {
    this.cartService.updateQuantity(item.product.id, item.size, item.quantity + 1);
  }

  decrementQty(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.product.id, item.size, item.quantity - 1);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item.product.id, item.size);
  }
}
