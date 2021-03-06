import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppPasswordDirective } from './directives/app-password.directive';

import { DataService } from './services/data.service';
import { AuthGuard } from './guard/auth.guard';
import { CartGuard } from './guard/cart.guard';
import { UserService } from './services/user.service';
import { NavigationService } from './services/navigation.service';
import { SeoService } from './services/seo.service';



const appRoutes: Routes = [
  {
    path: "", component: HomeComponent, data: {
      title: 'Accueil',
      description: 'Osez commander chez La Mater Express - Plus de 1000 plats et menus livr??s chez vous | La Mater Express',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "accueil", component: HomeComponent, data: {
      title: 'Accueil',
      description: 'Osez commander chez La Mater Express - Plus de 1000 plats et menus livr??s chez vous | La Mater Express',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  { path: "deconnexion", canActivate: [AuthGuard], component: LogoutComponent },
  {
    path: "connexion", component: LoginComponent, data: {
      title: 'Connexion',
      description: 'Connectez-vous et commandez parmi plus de 1000 plats et menus livr??s chez vous | La Mater Express',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "inscription", component: RegisterComponent, data: {
      title: 'Inscription',
      description: 'Inscrivez-vous et commandez parmi plus de 1000 plats et menus livr??s chez vous | La Mater Express',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "collections", component: CollectionsComponent, data: {
      title: 'Nos collections',
      description: 'D??couvrez et commandez parmi plus de 1000 plats et menus livr??s chez vous | La Mater Express',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "collection/:collection", component: CollectionComponent, data: {
      title: 'Collection',
      description: 'D??couvrez et commandez parmi plus de 1000 plats et menus livr??s chez vous | La Mater Express',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "produits/:produit", component: ProduitComponent, data: {
      title: 'Produit detail',
      description: 'D??couvrez et commandez parmi plus de 1000 plats et menus livr??s chez vous | La Mater Express',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  { path: "panier", component: CartComponent },
  { path: "caisse", canActivate: [CartGuard, AuthGuard], component: CheckoutComponent },
  { path: "compte/:slug", canActivate: [AuthGuard], component: AccountComponent },
  { path: "compte", canActivate: [AuthGuard], component: AccountComponent },
  { path: "**", component: FourOhFourComponent },
];



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

  entryComponents: [
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [
    DataService,
    SeoService,
    UserService,
    NavigationService,
    AuthGuard,
    CartGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
