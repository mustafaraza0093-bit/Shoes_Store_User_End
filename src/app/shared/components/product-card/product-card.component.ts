import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { ConditionRibbonComponent } from '../condition-ribbon/condition-ribbon.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ConditionRibbonComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  
  selectedSize: string | null = null;
  currentImageIndex = 0;
  isWishlisted = false;
  
  // For Add to Cart button animation
  btnText = 'Select Size';
  isAdding = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.updateBtnText();
  }

  selectSize(size: string, event: Event) {
    event.stopPropagation();
    if (!this.isSizeInStock(size)) return;
    
    this.selectedSize = size;
    this.updateBtnText();
  }

  isSizeInStock(size: string): boolean {
    return this.product.inStockSizes.includes(size);
  }

  updateBtnText() {
    if (!this.selectedSize) {
      this.btnText = 'Select Size';
    } else {
      this.btnText = `Add ${this.selectedSize} to Cart`;
    }
  }

  addToCart(event: Event) {
    event.stopPropagation();
    if (!this.selectedSize || this.isAdding) return;

    this.isAdding = true;
    this.btnText = 'Adding...';
    
    // Simulate API delay/animation
    setTimeout(() => {
      this.cartService.addItem(this.product, this.selectedSize!);
      this.btnText = '✓ Added';
      
      setTimeout(() => {
        this.isAdding = false;
        this.selectedSize = null;
        this.updateBtnText();
      }, 1500);
    }, 400);
  }

  toggleWishlist(event: Event) {
    event.stopPropagation();
    this.isWishlisted = !this.isWishlisted;
  }

  navigateToDetails() {
    this.router.navigate(['/product', this.product.id]);
  }
}
