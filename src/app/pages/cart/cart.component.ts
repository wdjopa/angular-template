import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  breadcrumbs = [{ "name": "Accueil", "link": "/accueil" }]
  discount_code: string = "";
  cart: any = { total: 0, produitCommandes: [] }
  company: any;
  companySubscription: Subscription;
  error: string;
  cartSubscription: Subscription;
  totalElement: number;

  constructor(private navigationService: NavigationService, private route: ActivatedRoute, private dataService: DataService,
    private router: Router) {
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe()
  }
  ngOnInit(): void {
    this.cartSubscription = this.navigationService.cartSubject.subscribe(panier => {
      this.cart = { ...panier };
      this.cart.produitCommandes = this.cart.produitCommandes.map(pC => {
        let properties_printed = pC.properties ? Object.keys(pC.properties).map(prop => {
          return prop + ": " + Object.keys(pC.properties[prop]).join(", ")
        }) : undefined
        return {
          ...pC, properties_printed
        }
      })
      this.discount_code = this.cart?.discount?.code || ''
      this.totalElement = panier.produitCommandes.reduce((total, pdC) => {
        return total + pdC.quantity
      }, 0)
    })
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
    // this.cartSubscription = 
  }

  ngAfterViewInit(): void {
    this.navigationService.emitCompany();
    this.navigationService.emitCart();

  }

  applyDiscountCode() {
    this.dataService.checkDiscountCode(this.discount_code, this.navigationService.cart.subtotal).subscribe((response) => {
      let cart = this.navigationService.cart
      cart.discount = response.reduction;
      this.navigationService.updateCart(cart)
      this.navigationService.openSnackBar("Votre réduction est valide : " + response.message, "FERMER");

    }, (response) => {
      this.navigationService.openSnackBar(response.error.message, "FERMER");
    });
  }

  addQuantity(productInCart) {
    let cart = this.navigationService.cart;
    let found = false;
    cart.produitCommandes.forEach(pC => {
      if (pC.produit.id === productInCart.produit.id && pC.complement === productInCart.complement && pC.price === productInCart.price) {
        pC.quantity++
        found = true;
      }
    })
    if (!found) {
      cart.produitCommandes.push(productInCart)
    }
    this.navigationService.updateCart(cart);
  }

  reduceQuantity(productInCart) {
    let cart = this.navigationService.cart;
    let new_cart_pc = []
    cart.produitCommandes.forEach((pC) => {
      if (pC.produit.id === productInCart.produit.id && pC.complement === productInCart.complement && pC.price === productInCart.price) {
        pC.quantity--
      }
      if (pC.quantity > 0)
        new_cart_pc.push(pC)
    })
    cart.produitCommandes = new_cart_pc;
    // console.log(cart)
    this.navigationService.updateCart(cart);
  }

  removeProduct(productInCart) {
    let cart = this.navigationService.cart;
    let new_cart_pc = []
    cart.produitCommandes = cart.produitCommandes.filter((pC) => {
      if (pC.produit.id === productInCart.produit.id && pC.price === productInCart.price){
        return false;
      }
      return true;
      // if (pC.produit.id !== productInCart.produit.id && pC.complement === productInCart.complement && pC.price === productInCart.price)
      //   new_cart_pc.push(pC)
    })
    // cart.produitCommandes = new_cart_pc;
    this.navigationService.updateCart(cart);
  }

}
