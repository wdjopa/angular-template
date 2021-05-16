import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  companySubscription: Subscription;
  company: any;

  constructor(private navigationService: NavigationService) {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company;
      }
    });
  }

  ngOnInit(): void {
    this.navigationService.emitCompany()
  }
  ngOnDestroy() {
    this.companySubscription.unsubscribe();
  }
}
