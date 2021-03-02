import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-shop-section',
  templateUrl: './shop-section.component.html',
  styleUrls: ['./shop-section.component.scss']
})
export class ShopSectionComponent implements OnInit {

  products: any[];

  constructor(private navigationService: NavigationService) { }


  ngOnInit(): void {
    this.products = this.navigationService.getCompanyDetails();
    // console.log(this.navigationService.compa)
  }


  ngAfterViewInit(): void {
    window["set_bg"]();
    window["nice_select"]();
  }
}
