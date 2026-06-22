import { Component, OnInit, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService, User } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Input() announcementVisible = true;

  cartCount = 0;
  isScrolled = false;
  isMobileMenuOpen = false;
  isSearchOpen = false;
  isBrandsMenuOpen = false;
  isAccountMenuOpen = false;
  searchQuery = '';
  searchResults: Product[] = [];
  brandSearchResults: { name: string; id: string; count: number }[] = [];
  currentUser: User | null = null;
  allProducts: Product[] = [];

  brands = [
    { id: 'nike', name: 'Nike', count: 18 },
    { id: 'adidas', name: 'Adidas', count: 14 },
    { id: 'converse', name: 'Converse', count: 9 },
    { id: 'vans', name: 'Vans', count: 7 },
    { id: 'reebok', name: 'Reebok', count: 5 },
    { id: 'new-balance', name: 'New Balance', count: 6 },
    { id: 'puma', name: 'Puma', count: 8 },
    { id: 'yeezy', name: 'Yeezy', count: 4 },
    { id: 'skechers', name: 'Skechers', count: 7 },
    { id: 'bata', name: 'Bata', count: 5 },
  ];

  navLinks = [
    { label: 'Male', route: '/shop/male' },
    { label: 'Female', route: '/shop/female' },
    { label: 'Boys', route: '/shop/boys' },
    { label: 'Kids', route: '/shop/kids' },
  ];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getItems().subscribe(items => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    });
    this.authService.getUser().subscribe(user => {
      this.currentUser = user;
    });
    this.dataService.getProducts().subscribe(products => {
      this.allProducts = products;
      // Update brand counts from actual data
      this.brands.forEach(b => {
        b.count = products.filter(p => p.brand.toLowerCase().replace(' ', '-') === b.id).length;
      });
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 80;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) {
      this.searchQuery = '';
      this.searchResults = [];
      this.brandSearchResults = [];
    }
  }

  onSearch(query: string) {
    this.searchQuery = query;
    if (query.length > 1) {
      const q = query.toLowerCase();
      this.searchResults = this.allProducts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      ).slice(0, 5);
      this.brandSearchResults = this.brands.filter(b =>
        b.name.toLowerCase().includes(q)
      );
    } else {
      this.searchResults = [];
      this.brandSearchResults = [];
    }
  }

  openCart() {
    this.cartService.openDrawer();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleBrandsMenu() {
    this.isBrandsMenuOpen = !this.isBrandsMenuOpen;
  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  navigateToBrand(brandId: string) {
    this.isBrandsMenuOpen = false;
    this.isMobileMenuOpen = false;
    this.router.navigate(['/shop'], { queryParams: { brand: brandId } });
  }

  logout() {
    this.authService.logout();
    this.isAccountMenuOpen = false;
    this.router.navigate(['/']);
  }

  navigateTo(route: string) {
    this.isMobileMenuOpen = false;
    this.router.navigate([route]);
  }

  goToProduct(productId: string) {
    this.isSearchOpen = false;
    this.searchQuery = '';
    this.searchResults = [];
    this.brandSearchResults = [];
    this.router.navigate(['/product', productId]);
  }
}
