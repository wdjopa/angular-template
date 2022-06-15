import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  all_reviews : any = [];
  company: any;
  companySubscription: Subscription;
  storage_url: string;


  constructor(private navigationService: NavigationService, private configService: ConfigService) {
    this.storage_url = this.configService.storage;
  }



  ngOnDestroy() {
    this.companySubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company;
        this.all_reviews = company.reviews.filter(avis => avis.client)
        setTimeout(()=>{
          window["set_testimonial_slider"]()
        }, 1000)

      }
    });
    this.navigationService.emitCompany();
  }


  getTotalStars(avis, pos): any {
    if (pos === 0)
      return new Array(parseInt(avis.note.toString().split('.')[pos]))
    else
      return new Array(1)
  }

}
