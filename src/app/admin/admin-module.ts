import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminProducts } from './admin-products/admin-products';
import { AuthGuard } from '../services/auth-guard';
import { AdminAuthGuard } from '../services/admin-auth-guard';
import { AdminOrders } from './admin-orders/admin-orders';
import { ProductForm } from './product-form/product-form';
import { AngularMaterialComponentsModule } from '../angular-material-module';

const routes: Routes = [
  { path: 'products/:id', component: AdminProducts, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'products', component: AdminProducts, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'orders', component: AdminOrders, canActivate: [AuthGuard, AdminAuthGuard] },
];

@NgModule({
  declarations: [
    AdminProducts,
    AdminOrders,
    ProductForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
