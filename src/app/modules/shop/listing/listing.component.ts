import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../core/services/data.service';
import { Product } from '../../../core/models/product.model';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  
  // Active filters
  category: string | null = null;
  selectedBrands: string[] = [];
  selectedConditions: string[] = [];
  selectedSizes: string[] = [];
  priceMin = 1000;
  priceMax = 50000;
  sortOption = 'newest';
  brandFilter: string | null = null;
  
  // All unique values for filter UI
  allBrands: string[] = [];
  allSizes: string[] = [];

  brands = ['Nike', 'Adidas', 'Converse', 'Vans', 'Reebok', 'New Balance', 'Puma', 'Yeezy', 'Skechers', 'Bata'];
  conditions = ['NEW', 'PRE-OWNED'];
  sizes = ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];
  
  pageTitle = 'All Footwear';
  showFilters = false;

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.dataService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.route.params.subscribe(params => {
        this.category = params['category'] || null;
        if (this.category) {
          this.pageTitle = this.category.charAt(0).toUpperCase() + this.category.slice(1) + ' Footwear';
        } else {
          this.pageTitle = 'All Footwear';
        }
        this.route.queryParams.subscribe(qp => {
          this.brandFilter = qp['brand'] || null;
          if (this.brandFilter) {
            const brandName = this.brands.find(b => b.toLowerCase() === this.brandFilter);
            if (brandName) {
              this.selectedBrands = [brandName];
              this.pageTitle = brandName;
            }
          }
          if (qp['condition']) {
            this.selectedConditions = [qp['condition']];
          }
          this.applyFilters();
        });
      });
    });
  }

  applyFilters() {
    let result = [...this.allProducts];
    if (this.category) {
      result = result.filter(p => p.category.toLowerCase() === this.category!.toLowerCase());
    }
    if (this.selectedBrands.length > 0) {
      result = result.filter(p => this.selectedBrands.includes(p.brand));
    }
    if (this.selectedConditions.length > 0) {
      result = result.filter(p => this.selectedConditions.includes(p.condition));
    }
    if (this.selectedSizes.length > 0) {
      result = result.filter(p => p.inStockSizes.some(s => this.selectedSizes.includes(s)));
    }
    result = result.filter(p => p.price >= this.priceMin && p.price <= this.priceMax);
    
    if (this.sortOption === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (this.sortOption === 'price-desc') result.sort((a, b) => b.price - a.price);
    
    this.filteredProducts = result;
  }

  toggleBrand(brand: string) {
    const idx = this.selectedBrands.indexOf(brand);
    idx > -1 ? this.selectedBrands.splice(idx, 1) : this.selectedBrands.push(brand);
    this.applyFilters();
  }

  toggleCondition(cond: string) {
    const idx = this.selectedConditions.indexOf(cond);
    idx > -1 ? this.selectedConditions.splice(idx, 1) : this.selectedConditions.push(cond);
    this.applyFilters();
  }

  toggleSize(size: string) {
    const idx = this.selectedSizes.indexOf(size);
    idx > -1 ? this.selectedSizes.splice(idx, 1) : this.selectedSizes.push(size);
    this.applyFilters();
  }

  clearFilters() {
    this.selectedBrands = [];
    this.selectedConditions = [];
    this.selectedSizes = [];
    this.priceMin = 1000;
    this.priceMax = 50000;
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return this.selectedBrands.length > 0 || this.selectedConditions.length > 0 || this.selectedSizes.length > 0;
  }

  getBrandCount(brand: string): number {
    return this.allProducts.filter(p => p.brand === brand && (!this.category || p.category.toLowerCase() === this.category)).length;
  }
}
