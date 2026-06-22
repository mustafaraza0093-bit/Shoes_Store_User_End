import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AnnouncementBarComponent } from '../announcement-bar/announcement-bar.component';
import { CartDrawerComponent } from '../cart-drawer/cart-drawer.component';
import { CartService } from '../../core/services/cart.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-store-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AnnouncementBarComponent,
    CartDrawerComponent,
  ],
  templateUrl: './store-layout.component.html',
  styleUrl: './store-layout.component.scss'
})
export class StoreLayoutComponent implements OnInit {
  constructor(private cartService: CartService, private dataService: DataService) {}

  ngOnInit() {
    // Pre-populate cart with demo items
    this.dataService.getProducts().subscribe(products => {
      this.cartService.prePopulate(products);
    });
  }
}
