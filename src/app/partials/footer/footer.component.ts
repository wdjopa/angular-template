import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { version } from '../../../../package.json';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  version = version;
  company: any;
  companySubscription: Subscription;
  storage_url: string;

  constructor(
    private navigationService: NavigationService,
    private configService: ConfigService
  ) {
    this.storage_url = this.configService.storage;
  }

  ngOnDestroy() {
    this.companySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.companySubscription = this.navigationService.companySubject.subscribe(
      (company) => {
        if (company) {
          this.company = company;
        }
      }
    );
    this.navigationService.emitCompany();
  }
}
