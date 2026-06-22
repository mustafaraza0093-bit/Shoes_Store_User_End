import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  flashSaleProducts: Product[] = [];
  featuredProducts: Product[] = [];
  
  // Countdown timer
  private countdownInterval: any;
  countdownHours = 2;
  countdownMinutes = 47;
  countdownSeconds = 33;
  private totalSeconds = 0;

  categories = [
    { label: 'Male', route: '/shop/male', count: '120+', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop' },
    { label: 'Female', route: '/shop/female', count: '80+', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop' },
    { label: 'Boys', route: '/shop/boys', count: '45+', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=600&auto=format&fit=crop' },
    { label: 'Kids', route: '/shop/kids', count: '32+', image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=600&auto=format&fit=crop' },
  ];

  brands = ['Nike', 'Adidas', 'Converse', 'Vans', 'Reebok', 'New Balance', 'Puma', 'Yeezy', 'Skechers', 'Bata'];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getFlashSaleProducts().subscribe(p => this.flashSaleProducts = p.slice(0, 4));
    this.dataService.getFeaturedProducts().subscribe(p => this.featuredProducts = p.slice(0, 8));
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  startCountdown() {
    // Randomize around 2-3 hours
    this.totalSeconds = (2 * 3600) + (47 * 60) + 33;
    this.updateDisplay();
    this.countdownInterval = setInterval(() => {
      this.totalSeconds--;
      if (this.totalSeconds < 0) this.totalSeconds = 3 * 3600;
      this.updateDisplay();
    }, 1000);
  }

  updateDisplay() {
    this.countdownHours = Math.floor(this.totalSeconds / 3600);
    this.countdownMinutes = Math.floor((this.totalSeconds % 3600) / 60);
    this.countdownSeconds = this.totalSeconds % 60;
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
