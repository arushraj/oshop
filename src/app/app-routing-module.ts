import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Products } from './products/products';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { CheckOut } from './check-out/check-out';
import { OrderSuccess } from './order-success/order-success';
import { MyOrders } from './my-orders/my-orders';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'shopping-cart', component: ShoppingCart },
  { path: 'login', component: Login },
  { path: 'check-out', component: CheckOut, canActivate: [AuthGuard] },
  { path: 'order-success', component: OrderSuccess, canActivate: [AuthGuard] },
  { path: 'my-orders', component: MyOrders, canActivate: [AuthGuard] },

  { path: 'admin', loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule) },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
