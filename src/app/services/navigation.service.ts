import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from './data.service';
import { ConfigService } from '../services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import {  MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public cart: any = { subtotal: 0, total: 0, discount: undefined, produitCommandes: [] }
  private companies: any[];
  private company: any;
  private products: any;
  private relatedProducts: any = [];
  private firstCompanies: any[];
  private currentCompany: any = {};
  public cartSubject = new Subject<any>();
  public relatedProductsSubject = new Subject<any[]>();
  public companiesSubject = new Subject<any[]>();
  public companySubject = new Subject<any>();
  public productsSubject = new Subject<any>();
  public currentCompanySubject = new Subject<any>();
  public dataLoadedSubject = new Subject<boolean>();
  public promptCitySubject = new Subject<boolean>();

  constructor(private dataService: DataService, private configService: ConfigService,
    private _snackBar: MatSnackBar
  ) {
  }
  getCompanyDetails(): any {
    this.dataService.getCompanyByUrl().subscribe(company => {
      console.log("company", company)
      this.company = company;
      this.emitCompany();
      this.updateCart(this.cart)
    });
  }

  /**
   * Get product from currentCompany
   * @param id 
   */
  getProduit(id) {
    for (let produit of this.company.produits) {
      if (produit.id == id)
        return produit;
    }
  }

  emptyCart() {
    this.cart = { total: 0, produitCommandes: [] }

    localStorage.removeItem("cart");
    this.cartUpdated(false);
    if (this.companies.length > 0) {
      for (let company of this.companies) {
        if (company.id === this.currentCompany.id) {
          company.produits.forEach(element => {
            element.total = 0 // On met tous les compteurs de sélection à 0
          });
          this.currentCompany = company;
        }
      }
    }
    console.log("current", this.currentCompany)
    this.currentCompanySubject.next(this.currentCompany);
    this.currentCompany = {}
  }

  updateCart(cart) {
    this.cart = cart;

    // Calcul SousTotal
    this.cart.subtotal = 0
    cart.produitCommandes.forEach(pdC => {
      this.cart.subtotal += pdC.quantity * pdC.price
    })

    // Calcul Total
    this.cart.total = this.cart.subtotal;

    if (this.cart.discount) {
      let reduction_value = 0
      if (this.cart.discount.mesure === "pourcentage") {
        reduction_value = this.cart.subtotal * this.cart.discount.value / 100
      } else {
        reduction_value = this.cart.discount.value
      }
      this.cart.discount.discount_value = reduction_value
      this.cart.total -= reduction_value
    }

    if (this.company.tarif_livraison) {
      this.cart.total += parseFloat(this.company.tarif_livraison)
    }

    this.saveCart()
    this.cartUpdated();
    
  }

  openSnackBar(message: string, action: string, duration: number = 2000) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

  saveNoteCart(note) {
    this.cart.note = note;
    this.saveCart()
    this.cartUpdated();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  readCart() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  cartUpdated(read = true) {
    if (read) { // Si la fonction vient de empty cart, on n'a pas besoin de read
      this.readCart()
    }
    this.cartSubject.next(this.cart);
  }

  currentCompanyUpdated() {
    this.currentCompanySubject.next(this.currentCompany);
  }

  dataLoaded() {
    this.dataLoadedSubject.next(true);
  }

  emitCompany() {
    console.log("emit company ", this.company)
    this.companySubject.next(this.company);
  }

  emitCart() {
    this.readCart()
    this.cartSubject.next(this.cart);
  }

  emitRelatedProducts(product) {
    this.company.produits.forEach(produit => {
      product.collections.map(collection_name => {
        if (produit.collections.includes(collection_name)) {
          let { avis, collections, produits, medias, quartiers, reductions, villes, ...minimum_company } = this.company
          produit.company = minimum_company
          this.relatedProducts.push(produit);
        }
      })
    })
    this.relatedProductsSubject.next(this.relatedProducts.slice());
  }

  emitProducts() {
    this.productsSubject.next(this.products.slice());
  }

}
