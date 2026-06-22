import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AnnouncementBarComponent } from '../announcement-bar/announcement-bar.component';
import { CartDrawerComponent } from '../cart-drawer/cart-drawer.component';
import { CartService } from '../../core/services/cart.service';
import { DataService } from '../../core/services/data.service';
import { Subscription, filter } from 'rxjs';

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
export class StoreLayoutComponent implements OnInit, OnDestroy {
  announcementVisible = true;
  private routerSub!: Subscription;

  constructor(
    private cartService: CartService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    // Pre-populate cart with demo items
    this.dataService.getProducts().subscribe(products => {
      this.cartService.prePopulate(products);
    });

    // Scroll to top on navigation
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
  }

  ngOnDestroy() {
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  onAnnouncementDismiss() {
    this.announcementVisible = false;
  }
}
