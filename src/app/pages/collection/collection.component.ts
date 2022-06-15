import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  breadcrumbs = [{ "name": "Accueil", "link": "/accueil" }]
  companySubscription: Subscription;
  loading: boolean = false;
  products: any;
  collection: any;

  constructor(private navigationService: NavigationService, private dataService: DataService, private route: ActivatedRoute, private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {
    let collection_id = this.route.snapshot.params['collection'];
    this.route.params.subscribe(params => {
      collection_id = params['collection'];
      this.loading = true;
      this.companySubscription = this.navigationService.companySubject.subscribe(company => {
        // this.dataService.getCompanyCollection({ company_id: company.id, collection_id }).subscribe((collection: any) => {
          
        // })
      })
    });
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        // this.products = company.produits;
        this.titleService.setTitle("Details collections | " + company.name);
        this.metaTagService.addTags([
          { name: 'description', content: 'Consultez les produits de la collection ' + this.collection?.name },
          { name: 'keywords', content: 'Ecommerce, Genuka, Collections ' },
          { name: 'robots', content: 'index, follow' },
          { name: 'author', content: 'Genuka.com' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'og:title', content: 'Consultez le catalogue de produits de ' + company.name },
          { name: 'og:site_name', content: company.name },
          { name: 'og:description', content: 'Consultez notre catalogue de produits' },
          { name: 'og:url', content: window.location.href },
          { name: 'og:image', content: company.logo },
          { name: 'date', content: company.created_at, scheme: 'YYYY-MM-DD' },
        ]);
      }

    });
  }

}
