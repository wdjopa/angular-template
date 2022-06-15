import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit {

  company: any;
  companySubscription: Subscription;
  relatedProducts: any;
  relatedProductsSubscription: Subscription;
  storage_url: string;


  constructor(private navigationService: NavigationService, private configService: ConfigService, private route: ActivatedRoute, private router: Router) {
    this.storage_url = this.configService.storage;
  }



  ngOnDestroy() {
    this.relatedProductsSubscription.unsubscribe()
  }

  ngOnInit(): void {
    let product_id;
    // this.router.events.subscribe((val) => {
    //   // see also 
    //   this.navigationService.emitCompany();
    //   product_id = this.route.snapshot.params['produit'];
    // });

    this.relatedProductsSubscription = this.navigationService.relatedProductsSubject.subscribe(relatedProducts => {
      if (relatedProducts) {
        this.relatedProducts = relatedProducts;
        // // console.log(relatedProducts)
        setTimeout(() => {
          window["set_related_product_slider"]()
        }, 1000);
      }
    });
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
        if(company.produits){
          let produits = company.produits?.filter(produit => produit.id === parseInt(product_id))
          if(produits.length > 0)
          this.navigationService.emitRelatedProducts(produits[0]);
        }
      }
    });
    product_id = this.route.snapshot.params['produit'];
    this.navigationService.emitCompany();
  }

  getUrl(product) {
    let url = product.medias.length > 0 ? product.medias[0].link : 'https://via.placeholder.com/400?text=no%20icon'
    return "url('" + url + "')";
  }

  ngAfterViewInit(): void {
    // window["set_related_product_slider"]()
  }
}
