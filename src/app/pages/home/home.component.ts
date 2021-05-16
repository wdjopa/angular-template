import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  companySubscription: Subscription;
  company: any;
  about: any = {};
  constructor(private navigationService: NavigationService) {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company;
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
