import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from './data.service';
import { ConfigService } from '../services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public cart: any = { produits: [], total: 0, restaurant: null };
  private restaurants: any[];
  private company : any;
  private firstRestaurants: any[];
  private currentRestaurant: any = {};
  public cartSubject = new Subject<any>();
  public restaurantsSubject = new Subject<any[]>();
  public companySubject = new Subject<any>();
  public currentRestaurantSubject = new Subject<any>();
  public dataLoadedSubject = new Subject<boolean>();
  public promptCitySubject = new Subject<boolean>();

  constructor( private dataService: DataService, private configService: ConfigService, private _snackBar: MatSnackBar) {
  }


  getCompanyDetails(): any {
    this.dataService.getCompanyByUrl().subscribe(company => {
      this.company = company;
    });
  }


  getCompany(id) {
    if (this.cart && this.cart.restaurant && this.cart.restaurant.id == id)
      return this.cart.restaurant

    if (this.currentRestaurant.id == id)
      return this.currentRestaurant

    if (this.restaurants && this.restaurants.length > 0) {
      for (let restaurant of this.restaurants) {
        if (restaurant.id == id) {
          restaurant;
          return restaurant;
        }
      }
    } else {
      return false;
    }
  }


  calculatePrice(distance) {
    distance = distance * 1000 * 2; // Distance Aller retour en metres
    if (distance <= 1000) {
      return 500
    } else if (distance < 2500 && distance > 1000) {
      return 650
    } else {
      return 500 + (0.08 * distance)
    }
  }

  /**
   * 
   * 
   */
  getDistanceFromLatLonInKm({ lat1, lon1, lat2, lon2 }) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  getCompanyBySlug(slug) {
    if (this.cart && this.cart.restaurant && this.cart.restaurant.slug == slug)
      return this.cart.restaurant

    if (this.currentRestaurant.slug == slug)
      return this.currentRestaurant
    if (this.restaurants) {

      if (this.restaurants.length > 0) {
        for (let restaurant of this.restaurants) {
          if (restaurant.slug_express == slug) {
            restaurant;
            return restaurant;
          }
        }
      } else {
        return false;
      }
    }
  }


  /**
   * Get product from currentRestaurant
   * @param id 
   */
  getProduit(id) {
    for (let produit of this.currentRestaurant.produits) {
      if (produit.id == id)
        return produit;
    }
  }

  addOrRemoveProduct(id: number, restaurant: any, value, set = false) {
    if (!this.cart) {
      this.cart = { produits: [], total: 0, restaurant: null }
    }
    if (set && isNaN(value) || value > 1000) {

      console.log("Vous n'avez pas entré un nombre", value)

      this.cartUpdated();
      return
    }
    // On met à jour le restarant courant
    restaurant = this.getCompany(restaurant.id)

    let inside = false; // Permet de vérifier si un produit est déjà dans le panier ou pas
    let confirmation = true; // Confirmation pour le changement de restaurant.
    let retirer = false;
    // Vérifie si le restaurant est le meme ou différent, auquel cas, demander à l'utilisateur s'il souhaite changer de restaurant
    if (this.cart.restaurant != null && this.cart.restaurant.id != restaurant.id) {
      confirmation = confirm("Vous souhaitez annuler votre panier actuel ?")

      if (confirmation) {
        // Le client souhaite annuler son panier
        this.cart = { produits: [], total: 0, restaurant: null };
        if (this.currentRestaurant && this.currentRestaurant.id) {
          let r = this.getCompany(this.currentRestaurant.id)
          r.produits.forEach((product) => {
            product.total = 0
          })
        }
      } else {
        // Le client ne souhaite pas annuler son panier actuel
        return
      }
    }


    // Mise à jour du currentRestaurant
    this.currentRestaurant = { ...restaurant };
    let produit = this.getProduit(id) // On récupère le produit

    // On met à jour le produit
    produit.dateCommande = new Date()
    if (!set) {

      if (produit.total + value <= 0) {
        if (confirm("Voulez vous retirer ce produit")) {
          produit.total = 0
          retirer = true
        }
      } else {
        produit.total = produit.total + value;
      }
    } else {
      if (value <= 0) {
        if (confirm("Voulez vous retirer ce produit")) {
          produit.total = 0
          retirer = true
        }
      } else {
        produit.total = value;
      }
    }
    // On met à jour le produit dans le restaurant
    this.currentRestaurant.produits = this.currentRestaurant.produits.map((product) => {
      if (product.id == produit.id) {
        product = produit
      }
      return product
    })


    // On met à jour le produit dans le panier 
    this.cart.produits = this.cart.produits.map((product) => {

      if (product.id == produit.id) {
        product = produit
        inside = true;
      }
      return product;
    })
    if (!inside) {
      this.cart.produits.push(produit)
    }


    if (retirer) {
      // On retire le produit du panier
      let produits = []
      this.cart.produits.forEach((product) => {
        if (produit.id != product.id) {
          produits.push(product)
        }
      })
      this.cart.produits = produits;
    } else {
    }
    // On met à jour le prix total du panier
    this.cart.total = 0
    this.cart.produits.forEach((produit) => {
      this.cart.total += produit.total * produit.price
    })
    // On met à jour le restaurant
    this.cart.restaurant = this.currentRestaurant;

    this.currentRestaurantUpdated()
    this.saveCart()
    this.cartUpdated();
  }

  emptyCart() {
    this.cart = { produits: [], total: 0, restaurant: null }
    localStorage.removeItem("cart");
    this.cartUpdated(false);
    if (this.restaurants.length > 0) {
      for (let restaurant of this.restaurants) {
        if (restaurant.id === this.currentRestaurant.id) {
          restaurant.produits.forEach(element => {
            element.total = 0 // On met tous les compteurs de sélection à 0
          });
          this.currentRestaurant = restaurant;
        }
      }
    }
    console.log("current", this.currentRestaurant)
    this.currentRestaurantSubject.next(this.currentRestaurant);
    this.currentRestaurant = {}
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

  loadCart() {
    this.readCart();
    if (this.cart && this.cart.restaurant) {

      // Mise à jour des produits dans les restaurants
      for (let restaurant of this.restaurants) {
        if (restaurant.id == this.cart.restaurant.id) {
          restaurant.produits = this.cart.restaurant.produits;
          this.cart.restaurant = restaurant;
        }
      }
      this.currentRestaurant = this.cart.restaurant;

      this.cartUpdated()
      this.currentRestaurantUpdated()
    } else {
      this.cart = { produits: [], total: 0, restaurant: null }
    }
  }

  cartUpdated(read = true) {
    if (read) { // Si la fonction vient de empty cart, on n'a pas besoin de read
      this.readCart()
    }
    if (this.restaurants && this.cart && this.cart.restaurant) {

      // Mise à jour des données du restaurant
      for (let restaurant of this.restaurants) {
        if (restaurant.id == this.cart.restaurant.id) {
          // alert(JSON.stringify(restaurant))
          restaurant.produits = this.cart.restaurant.produits;
          this.cart.restaurant = restaurant;
        }
      }
    }
    this.cartSubject.next(this.cart);
  }

  currentRestaurantUpdated() {
    this.currentRestaurantSubject.next(this.currentRestaurant);
  }

  emitAllRestaurants() {
    this.restaurantsSubject.next(this.restaurants.slice());
  }

  dataLoaded() {
    this.dataLoadedSubject.next(true);
  }


}
