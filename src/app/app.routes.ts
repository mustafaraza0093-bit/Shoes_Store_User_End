import { Routes } from '@angular/router';
import { StoreLayoutComponent } from './layout/store-layout/store-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'shop',
        loadComponent: () => import('./modules/shop/listing/listing.component').then(m => m.ListingComponent)
      },
      {
        path: 'shop/:category',
        loadComponent: () => import('./modules/shop/listing/listing.component').then(m => m.ListingComponent)
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./modules/shop/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./modules/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'checkout',
        loadComponent: () => import('./modules/checkout/checkout.component').then(m => m.CheckoutComponent)
      },
      {
        path: 'auth/login',
        loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'auth/register',
        loadComponent: () => import('./modules/auth/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'account',
        loadComponent: () => import('./modules/account/account.component').then(m => m.AccountComponent)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];
