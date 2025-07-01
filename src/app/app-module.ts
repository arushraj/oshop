import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { BsNavbar } from './bs-navbar/bs-navbar';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AngularMaterialComponentsModule } from './angular-material-module';
import { provideHttpClient } from '@angular/common/http';
import { MyOrders } from './my-orders/my-orders';
import { OrderSuccess } from './order-success/order-success';
import { CheckOut } from './check-out/check-out';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { Products } from './products/products';
import { Login } from './login/login';
import { Home } from './home/home';
import { ReactiveFormsModule } from '@angular/forms';
import { Confirmdialog } from './common/confirmdialog/confirmdialog';

@NgModule({
  declarations: [
    App,
    BsNavbar,
    Home,
    Login,
    Products,
    ShoppingCart,
    CheckOut,
    OrderSuccess,
    MyOrders,
    Confirmdialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialComponentsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  bootstrap: [App]
})
export class AppModule { }
