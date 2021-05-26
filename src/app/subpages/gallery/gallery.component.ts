import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  companySubscription: Subscription;
  company: any;
  socials: any = []
  constructor(private navigationService: NavigationService) {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company;
        this.socials = this.company?.datas?.settings?.social ? Object.keys(this.company?.datas?.settings?.social).map(network => {
          return {
            network: network,
            link: this.company?.datas?.settings?.social[network]
          }
        }) : [];
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
