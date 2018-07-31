// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

// Guards
import { AuthGuard } from '../shared/guards/auth.guard';

// Components
import { ShoppingCartPageComponent } from './pages/shopping-cart/shopping-cart-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { CheckOutPageComponent } from './pages/check-out/check-out-page.component';
import { OrderSuccessPageComponent } from './pages/order-success/order-success-page.component';
import { MyOrdersPageComponent } from './pages/my-orders/my-orders-page.component';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { OrderPageComponent } from './pages/order/order-page.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartPageComponent
      },
      {
        path: 'check-out',
        component: CheckOutPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'order-success/:id',
        component: OrderSuccessPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'my/orders',
        component: MyOrdersPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'order/:id',
        component: OrderPageComponent,
        canActivate: [AuthGuard]
      },
    ])
  ],
  declarations: [
    ShoppingCartPageComponent,
    HomePageComponent,
    CheckOutPageComponent,
    OrderSuccessPageComponent,
    MyOrdersPageComponent,
    ProductCatalogComponent,
    OrderPageComponent
  ]
})
export class ShoppingModule { }
