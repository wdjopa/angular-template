import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart: any = { total: 0, produitCommandes : []}
  company: any;
  companySubscription: Subscription;
  error: string;

  constructor(private navigationService: NavigationService, private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
    this.navigationService.emitCompany();

  }

  ngAfterViewInit(): void {
    window["load_slicknav"]()
  }
}
