import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
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
  loading: boolean = false;
  bigImg: any = {};

  constructor(private navigationService: NavigationService, private route: ActivatedRoute, private dataService: DataService, private metaTagService: Meta, private titleService: Title,
    private router: Router,
  ) {
  }

  ngOnDestroy(): void {
    this.companySubscription.unsubscribe()
  }


  ngOnInit(): void {
    let id = this.route.snapshot.params['produit'];
    this.route.params.subscribe(params => {
      id = params['produit'];
      // this.navigationService.emitCompany();
      this.loading = true;
      this.dataService.getProduct(id).subscribe((product: any) => {
        this.bigImg = product.medias.length > 0 ? product.medias[0] : ''
        this.loading = false;
        this.titleService.setTitle("Produit | " + product.name);
        this.metaTagService.addTags([
          { name: 'description', content: 'Commandez nos produits | ' + product.name + ". " + product.description },
          { name: 'keywords', content: 'Ecommerce, MyStore, ' + product.name.split(" ").join(", ") + product?.description?.split(" ").join(", ") },
          { name: 'og:title', content: product.name },
          { name: 'og:image', content: product.medias[0].link },
          { name: 'date', content: product.created_at, scheme: 'YYYY-MM-DD' },
          { name: 'og:description', content: 'Consultez notre catalogue de produits' },
        ]);

        this.produit = product
        this.produit.variants.forEach(variant => {
          let options = variant.options.map(option => {
            return { ...option, disabled: false }
          })
          return { ...variant, options }
        })
        this.produitCommande.produit = this.produit
        this.produitCommande.price = this.produit.price;
        this.unitPrice = this.produit.price;
        this.navigationService.emitRelatedProducts(this.produit);
      }, (err) => {
        this.loading = false;
      })
      // this.initialiseState(); // reset and set based on new parameter this time
    });

    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
        this.metaTagService.addTags([
          { name: 'robots', content: 'index, follow' },
          { name: 'author', content: 'MyStore.africa' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'og:site_name', content: company.name },
          { name: 'og:url', content: window.location.href },

        ]);
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
    if (!found) {
      this.produitCommande.add_to_cart_date = new Date();

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

    this.produitCommande.properties = this.selected_variants;
    // console.log(this.produit, this.selected_variants)
  }
  setBigImg(id) {
    this.bigImg = this.produit.medias.filter(media => media.id === id)[0]
  }
  ngAfterViewInit(): void {
    window["load_pro_qty"]()
  }

}
