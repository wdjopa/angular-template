import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.scss']
})
export class CollectionDetailComponent implements OnInit {

  @Input('collection') collection_id: number;

  products: any[] = [];
  collection: any;
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
        let collections = company.collections.filter(collection => collection.id === this.collection_id)
        this.collection = collections[0]
        this.products = this.collection.produits;
        this.company = company;
        console.log(this.collection)
      }
    });
    this.navigationService.emitCompany();

    setTimeout(() => {
      // window["nice_select"]();
      // this.resetJSMethod();
    }, 2000);
  }

  addToCart(id) {
    console.log(id)
  }


  getUrl(product) {
    let url = product.medias.length > 0 ? product.medias[0].link : 'https://delicesmilly.com/img/logo.png'
    return "url('" + url + "')";

  }
}
