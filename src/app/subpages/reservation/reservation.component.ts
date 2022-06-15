import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  OnSubmit(form: NgForm) {
    const { name, tel, date, precisions } = form.value;
    let message = `Bonjour, je souhaite organiser un évènement avec vous. Je m'appelle ${name} et ce sera le ${date}. Vous pourrez me contacter au : ${tel}. Quelques précisions : ${precisions}`
    window.open('https://wa.me/'+this.company.tel+"?text="+message, "_blank");
  }
}
