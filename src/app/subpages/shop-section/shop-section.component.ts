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

  products: any[] = [];
  company: any;
  companySubscription: Subscription;
  filters: any = { search: "", collection: "" };


  constructor(private navigationService: NavigationService) {
  }



  ngOnDestroy() {
    this.companySubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {

        this.products = company.produits;
        this.company = company;
      }
    });
    this.navigationService.emitCompany();

    setTimeout(() => {
      // window["nice_select"]();
      this.resetJSMethod();
    }, 2000);
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

  resetJSMethod() {
    // window["set_bg"]();
    // window["set_hero"]()
  }

  getUrl(product) {
    let url = product.medias.length > 0 ? product.medias[0].link : 'https://delicesmilly.com/img/logo.png'
    return "url('" + url + "')";

  }

  addToCart(id) {
    // console.log(id)
  }


  ngAfterViewInit(): void {
    // this.resetJSMethod();
  }
}
