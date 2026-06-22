import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="navbar">
      <div class="container nav-container">
        <a routerLink="/" class="brand">Sole & Story</a>
        <nav class="links">
          <a routerLink="/shop">New Releases</a>
          <a routerLink="/shop" [queryParams]="{ condition: 'pre-owned' }">Pre-Owned</a>
          <a routerLink="/brands">Brands</a>
        </nav>
        <div class="actions">
          <button class="cart-btn">Cart (0)</button>
        </div>
      </div>
    </header>
  `,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {}
