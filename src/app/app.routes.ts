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
        loadComponent: () => import('./modules/listing/listing.component').then(m => m.ListingComponent) 
      }
    ]
  }
];
