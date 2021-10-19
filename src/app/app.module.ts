import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MealsService } from './services/meals.service';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CooksComponent } from './components/cooks/cooks.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TextInputComponent } from './shared/text-input/text-input.component';
import { AcoountService } from './services/acoount.service';
import { CookService } from './services/cook.service';
import { CookMealsComponent } from './components/dashboard/cook-meals/cook-meals.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment.prod';
import { OrdersComponent } from './components/dashboard/orders/orders.component';
import { AddCourierComponent } from './components/dashboard/add-courier/add-courier.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourierService } from './services/courier.service';
import { CourierProfileComponent } from './components/dashboard/courier-profile/courier-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavBarComponent,
    CheckoutComponent,
    DashboardComponent,
    ShoppingCartComponent,
    CooksComponent,
    RegisterComponent,
    LoginComponent,
    TextInputComponent,
    CookMealsComponent,
    ProfileComponent,
    OrdersComponent,
    AddCourierComponent,
    CourierProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
   // ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [MealsService,AcoountService,CookService, CourierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
