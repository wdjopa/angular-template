import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  companySubscription: Subscription;
  company: any;
  about: any = {};
  title = '';

  constructor(private navigationService: NavigationService, private titleService: Title,
    private metaTagService: Meta) {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company;
        this.title = 'Commandez vos produits chez ' + this.company.name;
        this.titleService.setTitle(this.title);
        this.metaTagService.addTags([
          { name: 'description', content: 'Commandez vos produits chez ' + this.company.name+". "+this.company.description },
          { name: 'keywords', content: 'Ecommerce, Genuka, ' },
          { name: 'robots', content: 'index, follow' },
          { name: 'author', content: 'Genuka.com' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'og:title', content: 'Commandez vos produits chez '+this.company.name },
          { name: 'og:site_name', content: this.company.name },
          { name: 'og:description', content: this.company.description },
          { name: 'og:url', content: this.company.website ? this.company.website.includes("http") ? this.company.website : 'https://'+this.company.website: window.location.href },
          { name: 'og:image', content: this.company.logo },
          { name: 'date', content: this.company.created_at, scheme: 'YYYY-MM-DD' },
        ]);
        setTimeout(() => {
          window["nice_select"]();
        }, 1000);

      }
    });
  }

  ngOnInit(): void {

 
    this.navigationService.emitCompany()
  }

  ngOnDestroy() {
    this.companySubscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    window["nice_select"]();
  }

}
