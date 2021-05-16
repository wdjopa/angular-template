import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

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


  OnSubmit(form: NgForm) {

  }
  

}
