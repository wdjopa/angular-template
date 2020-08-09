import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FourOhFourComponent } from './pages/four-oh-four/four-oh-four.component';
import { HomeComponent } from './pages/home/home.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { ProduitComponent } from './pages/produit/produit.component';
import { AccountComponent } from './pages/client/account/account.component';
import { CommandesComponent } from './pages/client/commandes/commandes.component';
import { ReviewComponent } from './modal/review/review.component';
import { LoaderComponent } from './modal/loader/loader.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { AppPasswordDirective } from './directives/app-password.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    CartComponent,
    CheckoutComponent,
    FourOhFourComponent,
    HomeComponent,
    CollectionsComponent,
    CollectionComponent,
    ProduitComponent,
    AccountComponent,
    CommandesComponent,
    ReviewComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    AppPasswordDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
