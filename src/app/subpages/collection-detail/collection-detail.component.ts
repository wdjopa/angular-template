import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
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
  collectionSubscription: Subscription;
  filters: any = { search: "", collection: "" };


  constructor(private navigationService: NavigationService, private dataService: DataService,) {
  }



  ngOnDestroy() {
    this.companySubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.collectionSubscription = this.dataService.getCollection(this.collection_id).subscribe(collection => {
      this.collection = collection
      this.products = this.collection.produits.map(product => {
        let url = product.medias.length > 0 ? product.medias[0].link : null;
        product.url = url ? url : 'https://shop.mystore.africa/logobusiness.svg';
        return product;
      }
      );
    }, err => {

    })
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company;
      }
    });
    this.navigationService.emitCompany();
  }

}
