import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product!: Product; //Recibir datos
  @Output() addToCartClick = new EventEmitter<Product>(); //Enviar resultado del producto seleccionado
  
  constructor() { }
  ngOnInit(): void {}

  onClick(): void{
    this.addToCartClick.emit(this.product);
  }
}
//COMPONENTE DE HIJO DE PRODUCTS