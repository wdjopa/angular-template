import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  produitCommande: any = { produit: undefined, price: undefined, quantity: 1, complement: "", note: "" };
  produit: any;
  company: any;
  companySubscription: Subscription;
  error: string;
  selected_variants: any = {};
  unitPrice: any = 0;
  breadcrumbs = [{ "name": "Accueil", "link": "/accueil" }, { "name": "Nos produits", "link": "/catalogue" }]

  constructor(private navigationService: NavigationService, private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['produit'];
    this.route.params.subscribe(params => {
      id = params['produit'];
      this.navigationService.emitCompany();

      // this.initialiseState(); // reset and set based on new parameter this time
    });
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
        let produits = company.produits.filter(produit => produit.id === parseInt(id))
        if (produits.length === 0) {
          this.router.navigate(["/catalogue"]);
        }
        this.produit = produits[0]
        this.produit.variants.forEach(variant => {
          let options = variant.options.map(option => {
            return { ...option, disabled: false }
          })
          return { ...variant, options }
        })
        this.produitCommande.produit = this.produit
        this.produitCommande.price = this.produit.price;
        this.unitPrice = this.produit.price;
        console.log("emit related products")
        this.navigationService.emitRelatedProducts(this.produit);
      }
    });
    this.navigationService.emitCompany();

  }

  updateQuantity(quantity) {
    this.produitCommande.quantity = parseInt(this.produitCommande.quantity) + parseInt(quantity);
    if (this.produitCommande.quantity < 1) {
      this.produitCommande.quantity = 1
    }
    this.updatePrice()
    //  ; produitCommande.quantity =
    //   produitCommande.quantity < 0 ? 0 : produitCommande.quantity
  }

  updatePrice() {
    this.produitCommande.price = this.unitPrice * this.produitCommande.quantity;
  }

  addToCart() {
    let cart = this.navigationService.cart;
    let found = false;
    cart.produitCommandes.forEach(pC => {
      if (pC.produit.id === this.produitCommande.produit.id && pC.complement === this.produitCommande.complement) {
        pC.quantity += this.produitCommande.quantity
        found = true;
      }
    })
    if(!found){
      cart.produitCommandes.push(this.produitCommande)
    } 
    this.navigationService.openSnackBar("Votre produit a bien été ajouté au panier", "FERMER")
    this.navigationService.updateCart(cart);
  }

  addVariant(option, variante, e): void {
    console.clear()
    if (!this.selected_variants[variante.name]) {
      this.selected_variants[variante.name] = {}
    }
    if (e.checked) {
      this.selected_variants[variante.name][option.name] = option.additionnal_fee
    } else {
      delete this.selected_variants[variante.name][option.name]
    }
    // console.log(Object.keys(this.selected_variants[variante.name]), variante.max_choices)

    if (Object.keys(this.selected_variants[variante.name]).length >= variante.max_choices) {
      variante.options = variante.options.map(opt => {
        opt.disabled = true;
        if (Object.keys(this.selected_variants[variante.name]).includes(opt.name)) {
          opt.disabled = false;
        }
        return opt;
      })
    } else {
      variante.options = variante.options.map(opt => {
        opt.disabled = false;
        return opt;
      })
    }

    this.unitPrice = this.produit.price
    Object.keys(this.selected_variants).forEach(variante_name => {
      Object.keys(this.selected_variants[variante_name]).forEach(option_name => {
        this.unitPrice += this.selected_variants[variante_name][option_name]
      })
    })

    this.updatePrice()

    // Update product variants for options changed
    this.produit.variants = this.produit.variants.map(variant => {
      if (variante.name === variant.name) return variante;
      else return variant;
    })
  }

  ngAfterViewInit(): void {
    window["load_pro_qty"]()
  }

  ngOnDestroy(): void {
    this.companySubscription.unsubscribe()
  }

}
