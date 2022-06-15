import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from 'src/app/app-routing.module';

import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { LogoutComponent } from 'src/app/auth/logout/logout.component';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import { CatalogComponent } from 'src/app/pages/catalog/catalog.component';
import { CheckoutComponent } from 'src/app/pages/checkout/checkout.component';
import { FourOhFourComponent } from 'src/app/pages/four-oh-four/four-oh-four.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { CollectionsComponent } from 'src/app/pages/collections/collections.component';
import { CollectionComponent } from 'src/app/pages/collection/collection.component';
import { ProduitComponent } from 'src/app/pages/produit/produit.component';
import { AccountComponent } from 'src/app/pages/client/account/account.component';
import { CommandesComponent } from 'src/app/pages/client/commandes/commandes.component';
import { ReviewComponent } from 'src/app/modal/review/review.component';
import { LoaderComponent } from 'src/app/modal/loader/loader.component';
import { HeaderComponent } from 'src/app/partials/header/header.component';
import { FooterComponent } from 'src/app/partials/footer/footer.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppPasswordDirective } from 'src/app/directives/app-password.directive';

import { DataService } from 'src/app/services/data.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { CartGuard } from 'src/app/guard/cart.guard';
import { UserService } from 'src/app/services/user.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { SeoService } from 'src/app/services/seo.service';
import { SubheaderComponent } from 'src/app/partials/subheader/subheader.component';
import { TeamComponent } from 'src/app/subpages/team/team.component';
import { TestimonialComponent } from 'src/app/subpages/testimonial/testimonial.component';
import { HeroComponent } from 'src/app/subpages/hero/hero.component';
import { AboutComponent } from 'src/app/subpages/about/about.component';
import { CollectionDetailComponent } from 'src/app/subpages/collection-detail/collection-detail.component';
import { ReservationComponent } from 'src/app/subpages/reservation/reservation.component';
import { GalleryComponent } from 'src/app/subpages/gallery/gallery.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { BreadcrumbComponent } from 'src/app/subpages/breadcrumb/breadcrumb.component';
import { ShopSectionComponent } from 'src/app/subpages/shop-section/shop-section.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
import { RelatedProductsComponent } from 'src/app/subpages/related-products/related-products.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { CartHeaderComponent } from 'src/app/partials/components/cart-header/cart-header.component';
import { AdressesComponent } from 'src/app/pages/client/adresses/adresses.component';
import { ParametresComponent } from 'src/app/pages/client/parametres/parametres.component';
import { AdressesAddComponent } from './pages/client/adresses-add/adresses-add.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { LottieModule } from 'ngx-lottie';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { DetailComponent } from './pages/blogs/detail/detail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PasswordForgottenComponent } from './pages/password-forgotten/password-forgotten.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaymentComponent } from './modal/payment/payment.component';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}



const appRoutes: Routes = [
  {
    path: "", redirectTo: '/accueil', pathMatch: 'full' , data: {
      title: 'Accueil',
      description: 'Osez commander chez Genuka Ecommerce Website - Plus de 1000 plats et menus livrés chez vous | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "accueil", component: HomeComponent, data: {
      title: 'Accueil',
      description: 'Osez commander chez Genuka Ecommerce Website - Plus de 1000 plats et menus livrés chez vous | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  { path: "password_forgotten", component: PasswordForgottenComponent },
  { path: "deconnexion", canActivate: [AuthGuard], component: LogoutComponent },
  {
    path: "connexion", component: LoginComponent, data: {
      title: 'Connexion',
      description: 'Connectez-vous et commandez parmi plus de 1000 plats et menus livrés chez vous | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "inscription", component: RegisterComponent, data: {
      title: 'Inscription',
      description: 'Inscrivez-vous et commandez parmi plus de 1000 plats et menus livrés chez vous | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "collections", component: CollectionsComponent, data: {
      title: 'Nos collections',
      description: 'Découvrez et commandez parmi plus de 1000 plats et menus livrés chez vous | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "collections/:collection", component: CollectionComponent, data: {
      title: 'Collection',
      description: 'Découvrez et commandez parmi plus de 1000 plats et menus livrés chez vous | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "catalogue", component: CatalogComponent, data: {
      title: 'Tous nos produits',
      description: 'Découvrez et commandez parmi plus de 1000 plats et menus livrés chez vous | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "produits/:produit", component: ProduitComponent, data: {
      title: 'Produit detail',
      description: 'Découvrez et commandez parmi plus de 1000 plats et menus livrés chez vous | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },

  {
    path: "blogs", component: BlogsComponent, data: {
      title: 'Nos articles de blog',
      description: 'Découvrez et commandez parmi plus de 1000 plats et menus livrés chez vous | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "blogs/:blog_slug", component: DetailComponent, data: {
      title: 'Article',
      description: 'Découvrez et commandez parmi plus de 1000 plats et menus livrés chez vous | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },

  { path: "panier", component: CartComponent },
  { path: "thank-you", component: ThankYouComponent },
  {
    path: "contact", component: ContactComponent, data: {
      title: 'Contact',
      description: 'Découvrez et commandez parmi plus de 1000 plats et menus livrés chez vous | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }
  },
  {
    path: "caisse", canActivate: [AuthGuard], component: CheckoutComponent, data: {
      title: 'Checkout',
      description: 'Finalisez votre paiement | Genuka Ecommerce Website',
      ogImage: 'https://express.lamaterservice.com/assets/img/banner/banner-3.jpg'
    }},
  // { path: "caisse", canActivate: [CartGuard, AuthGuard],  component: CheckoutComponent },
  // { path: "compte/:slug", canActivate: [AuthGuard], component: AccountComponent },
  {
    path: "compte", canActivate: [AuthGuard], component: AccountComponent, children: [
      { path: '', redirectTo: '/compte/commandes', pathMatch: "full" },
      { path: 'commandes', component: CommandesComponent },
      { path: 'parametres', component: ParametresComponent },
      { path: 'adresses', component: AdressesComponent },
      { path: 'adresses/add', component: AdressesAddComponent },
      { path: 'adresses/edit/:addressId', component: AdressesAddComponent },
    ]
  },
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
    CatalogComponent,
    ProduitComponent,
    AccountComponent,
    CommandesComponent,
    ReviewComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    AppPasswordDirective,
    SubheaderComponent,
    TeamComponent,
    TestimonialComponent,
    HeroComponent,
    AboutComponent,
    CollectionDetailComponent,
    ReservationComponent,
    GalleryComponent,
    BreadcrumbComponent,
    ShopSectionComponent,
    ContactComponent,
    RelatedProductsComponent,
    CartHeaderComponent,
    AdressesComponent,
    ParametresComponent,
    AdressesAddComponent,
    ThankYouComponent,
    BlogsComponent,
    SocialLinksComponent,
    DetailComponent,
    CarouselComponent,
    PasswordForgottenComponent,
    PaginationComponent,
    PaymentComponent
  ],

  entryComponents: [
    LoaderComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }), 
    NgxSkeletonLoaderModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IvyCarouselModule,
    MatCheckboxModule,
    MatSnackBarModule,
    CarouselModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy', initialNavigation: 'enabled' }),
    LottieModule.forRoot({ player: playerFactory }),
    BrowserAnimationsModule
  ],
  providers: [
    DataService,
    SeoService,
    UserService,
    NavigationService,
    AuthGuard,
    CartGuard,
    PaymentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
