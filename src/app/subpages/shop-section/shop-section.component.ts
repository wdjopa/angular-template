import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-shop-section',
  templateUrl: './shop-section.component.html',
  styleUrls: ['./shop-section.component.scss']
})
export class ShopSectionComponent implements OnInit {

  products: any;
  collections: any[] = [];
  company: any;
  companySubscription: Subscription;
  filters: any = { search: "", collection: "" };
  pagination: any = {};
  productsSubscription: Subscription;
  collectionsSubscription : Subscription;
  constructor(private navigationService: NavigationService, private dataService: DataService) {
  }

  ngOnDestroy() {
    this.companySubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        // this.products = company.produits;
        this.company = company;

      }
    });
    this.navigationService.emitCompany();

    this.getCollections()
    this.getProducts()
  }

  getCollections(route = undefined) {
    this.productsSubscription = this.dataService.getCollections(undefined, 1000).subscribe((response: any) => {
      this.collections = response.data
    })
  }

  getProducts(route = undefined) {
    this.productsSubscription = this.dataService.getProducts(route).subscribe((response: any) => {
      this.products = response.data.map(product => {
        return { ...product, url: 'url(' + (product.medias.length > 0 ? product.medias[0].thumb : '') + ')' }
      });
      this.pagination = { "links": response.links, "meta": response.meta, "total_pages": new Array(response.meta.last_page).fill(0).map((_, i) => i + 1) };
    })
  }

  resetJSMethod() {
    // window["set_bg"]();
    // window["set_hero"]()
  }

  getUrl(product) {
    let url = product.medias.length > 0 ? product.medias[0].thumb : 'https://via.placeholder.com/400?text=no%20icon'
    return "url('" + url + "')";
  }

  updateList(value) {
    if (value === "") {
      this.products = this.company.produits;
    } else {
      switch (value) {
        case "name_asc":
          this.products = this.company.produits.sort((a, b) => {
            if (a.name > b.name)
              return 1
            else return -1
          })
          break;
        case "name_desc":
          this.products = this.company.produits.sort((a, b) => {
            if (a.name < b.name)
              return 1
            else return -1
          })
          break;
        case "price_desc":
          this.products = this.company.produits.sort((a, b) => {
            if (a.price < b.price)
              return 1
            else return -1
          })
          break;
        case "price_asc":
          this.products = this.company.produits.sort((a, b) => {
            if (a.price > b.price)
              return 1
            else return -1
          })
          break;

        default:
          break;
      }
    }
    this.filters.order = value

  }

  updateCollection(value) {
    if (value === "") {
      this.products = this.company.produits;
    } else {
      this.products = this.company.produits.filter(product => JSON.stringify(product).toLowerCase().includes(value.toLowerCase()))
    }
    this.filters.collection = value
  }

  search(value) {
    if (value === "") {
      this.products = this.company.produits;
    } else {
      let products = this.company.produits.filter(product => JSON.stringify(product).toLowerCase().includes(this.filters.collection.toLowerCase()))
      this.products = products.filter(product => JSON.stringify(product).toLowerCase().includes(value.toLowerCase()))
    }
    this.filters.search = value
  }


  addToCart(id) {
    // // console.log(id)
  }


  ngAfterViewInit(): void {
    // this.resetJSMethod();
  }
}
