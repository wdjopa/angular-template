import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent implements OnInit {
  company: any;
  companySubscription: Subscription;

  constructor(private navigationService: NavigationService) {


  }
  ngOnInit(): void {

    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
    this.navigationService.emitCompany();

  }

  // ngOnDestroy() {
  //   if (this.companySubscription)
  //     this.companySubscription.unsubscribe();
  // }

}
