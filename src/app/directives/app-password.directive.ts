import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[seePassword]'
})
export class AppPasswordDirective {
  private _shown = false;
  constructor(private el: ElementRef) {
    this.setup();
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = `<small style="cursor:pointer" class="accent">Masquer le mot de passe</small>`;
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = `<small style="cursor:pointer" class="accent">Voir le mot de passe</small>`;
    }
  }

  setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.innerHTML = `<small style="cursor:pointer" class="accent">Voir le mot de passe</small>`;
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }
}
