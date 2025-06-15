import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { environment } from '../environments/environment';

// import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { BsNavbar } from './bs-navbar/bs-navbar';
// import { Login } from './login/login';
// import { Home } from './home/home';
// import { Products } from './products/products';
// import { ShoppingCart } from './shopping-cart/shopping-cart';
// import { CheckOut } from './check-out/check-out';
// import { OrderSuccess } from './order-success/order-success';
// import { MyOrders } from './my-orders/my-orders';
// import { AdminProducts } from './admin/admin-products/admin-products';
// import { AdminOrders } from './admin/admin-orders/admin-orders';

@NgModule({
  declarations: [
    App,
    BsNavbar,
    // Login,
    // Home,
    // Products,
    // ShoppingCart,
    // CheckOut,
    // OrderSuccess,
    // MyOrders,
    // AdminProducts,
    // AdminOrders,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AngularFireModule.initializeApp(environment.firebase)
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  bootstrap: [App]
})
export class AppModule { }
