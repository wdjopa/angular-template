import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  companySubscription: Subscription;
  company: any;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['rte4561r', 'azeaze'],
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };

  constructor(private navigationService: NavigationService) {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company;
        // window["set_bg"]()
        setTimeout(() => {
          window["set_hero"]()
        }, 2000);

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
    if (this.company) {
      window["set_hero"]()
    }

  }


}
