import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Products } from './products/products';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { CheckOut } from './check-out/check-out';
import { OrderSuccess } from './order-success/order-success';
import { MyOrders } from './my-orders/my-orders';
import { AdminProducts } from './admin/admin-products/admin-products';
import { AdminOrders } from './admin/admin-orders/admin-orders';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'shopping-cart', component: ShoppingCart },
  { path: 'check-out', component: CheckOut, },
  { path: 'order-success', component: OrderSuccess },
  { path: 'my-orders', component: MyOrders },
  { path: 'login', component: Login },
  { path: 'admin/products', component: AdminProducts },
  { path: 'admin/orders', component: AdminOrders },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
