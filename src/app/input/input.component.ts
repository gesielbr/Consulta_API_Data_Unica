import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @ViewChild('containerInput') containerInput!: ElementRef<HTMLElement>;

  @Input('inicial') valorInicial: number = 0;
  @Input() step: number = 1;
  @Input() maxValorInicial = 100;
  @Input() minValorInicial = 0;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Output() onChangeValorInicial = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  somar() {

    if(this.disabled) {
      return;
    }

    if((this.valorInicial + this.step) <= this.maxValorInicial) {
      this.valorInicial += this.step;
      this.onChangeValorInicial.emit(this.valorInicial);
    }
  }

  diminuir() {

    if(this.disabled) {
      return;
    }

    if((this.valorInicial - this.step) >= this.minValorInicial) {
      this.valorInicial -= this.step;
      this.onChangeValorInicial.emit(this.valorInicial);
    }
  }

  onFocus(event: Event) {
    this.containerInput.nativeElement.classList.add('xxx');
  }

  onBlur(event: Event) {
    this.containerInput.nativeElement.classList.remove('xxx');
  }

  ehValido(event: any) {

    if(event.target.value < this.minValorInicial) {
      event.target.value = this.minValorInicial;
      return;
    }

    if(event.target.value > this.maxValorInicial) {
      event.target.value = this.maxValorInicial;
      return;
    }

    this.valorInicial = event.target.value;
    this.onChangeValorInicial.emit(this.valorInicial);
  }
}
