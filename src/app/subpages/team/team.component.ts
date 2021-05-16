import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {


  companySubscription: Subscription;
  company: any;

  constructor(private navigationService: NavigationService) {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
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
