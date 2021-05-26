import { Component, OnInit } from '@angular/core';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/animations/thanks.json',
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '500px',
    margin: '0 auto',
  };
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
