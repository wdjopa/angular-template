import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  price_in_eur: any = -1;
  price_in_usd: any = -1;
  price_in_xaf: any = -1;
  err: any = {}
  loading: any = false

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    private paymentsService: PaymentsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data?.company?.devise?.code?.toLowerCase() === "xaf") {
      this.price_in_xaf = data?.command?.montant;
      this.price_in_usd = data.company?.datas?.settings?.currencies_converter["xaf-to-usd"] * data?.command?.montant;
      this.price_in_eur = data.company?.datas?.settings?.currencies_converter["xaf-to-eur"] * data?.command?.montant;
    }
    else if (data?.company?.devise?.code?.toLowerCase() === "eur") {
      this.price_in_eur = data?.command?.montant;
      this.price_in_usd = data.company?.datas?.settings?.currencies_converter["xaf-to-usd"] * data?.command?.montant;
    }
    else if (data?.company?.devise?.code?.toLowerCase() === "usd") {
      this.price_in_usd = data?.command?.montant;
      this.price_in_eur = data.company?.datas?.settings?.currencies_converter["xaf-to-eur"] * data?.command?.montant;
    }
    // console.log("PaymentComponent > ", data)
  }

  onNoClick(): void {
    this.dialogRef.close({ success: false });
  }

  close(){
    this.dialogRef.close({ success: false });
  }

  onSubmit(form: NgForm) {
    this.err = {}
    this.loading = true;
    const { tel, operateur } = form.value;
    if (!tel?.trim() || !operateur?.trim() || !tel.includes("+")) {
      this.err = { message: "Sélectionnez un opérateur et entrez votre numéro avec l'indicatif (+237)" }
      this.loading = false;
      return;
    } else {
      console.clear()
      this.paymentsService.payByMobileMoney({ tel : tel.replace("+",""), operateur, amount: this.price_in_xaf, command: this.data?.command }).subscribe(resp => {
        this.dialogRef.close({ success : true, resp });
      }, (err) => {
        console.error(err)
        this.err = {message : "Une erreur est survenue, veuillez réessayer avec un autre numéro"}
        this.loading = false;
      });
      // 
    }

  }

  ngOnInit(): void {
  }

}
