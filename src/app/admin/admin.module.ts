// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from '../shared/guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';

// Components
import { AdminOrdersPageComponent } from './pages/admin-orders/admin-orders-page.component';
import { AdminProductsPageComponent } from './pages/admin-products/admin-products-page.component';
import { AddProductPageComponent } from './pages/add-product/add-product-page.component';
import { EditProductPageComponent } from './pages/edit-product/edit-product-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/orders',
        component: AdminOrdersPageComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsPageComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/new',
        component: AddProductPageComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: EditProductPageComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
    ])
  ],
  declarations: [
    AdminOrdersPageComponent,
    AdminProductsPageComponent,
    AddProductPageComponent,
    EditProductPageComponent,
    ProductFormComponent
  ],
  providers: [
    AdminAuthGuard,
  ]
})
export class AdminModule { }
