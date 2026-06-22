import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product.model';
import { ConditionRibbonComponent } from '../../../shared/components/condition-ribbon/condition-ribbon.component';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ConditionRibbonComponent, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  selectedSize: string | null = null;
  selectedImageIndex = 0;
  activeTab = 'description';
  isAdding = false;
  btnText = 'Select a Size';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getProductById(params['id']).subscribe(product => {
        this.product = product || null;
        this.selectedSize = null;
        this.selectedImageIndex = 0;
        this.activeTab = 'description';
        this.btnText = 'Select a Size';
        if (product) {
          this.dataService.getProducts().subscribe(all => {
            this.relatedProducts = all
              .filter(p => p.brand === product.brand && p.id !== product.id)
              .slice(0, 4);
          });
        }
      });
    });
  }

  selectSize(size: string) {
    if (!this.isSizeInStock(size)) return;
    this.selectedSize = size;
    this.btnText = `Add ${size} to Cart — PKR ${this.product?.price.toLocaleString()}`;
  }

  isSizeInStock(size: string): boolean {
    return this.product?.inStockSizes.includes(size) ?? false;
  }

  addToCart() {
    if (!this.product || !this.selectedSize || this.isAdding) return;
    this.isAdding = true;
    this.btnText = '✓ Added to Cart!';
    this.cartService.addItem(this.product, this.selectedSize);
    setTimeout(() => {
      this.isAdding = false;
      this.btnText = `Add ${this.selectedSize} to Cart — PKR ${this.product?.price.toLocaleString()}`;
    }, 2000);
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  getStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  getConditionBar(value: number): string {
    return `${value * 10}%`;
  }
}
