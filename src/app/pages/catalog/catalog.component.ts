import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  breadcrumbs = [{ "name": "Accueil", "link": "/accueil" }]
  companySubscription: Subscription;
  constructor(private navigationService: NavigationService, private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        // this.products = company.produits;
        this.titleService.setTitle("Catalogue | " + company.name);
        this.metaTagService.addTags([
          { name: 'description', content: 'Consultez notre catalogue de produits | ' + company.name + ". " + company.description },
          { name: 'keywords', content: 'Ecommerce, Genuka, ' },
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
