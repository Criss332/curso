import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/curso/services/shopping-cart.services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'] 
})
export class DetailsComponent implements OnInit {
  total$ = this.shoppingCartSvc.totalAction$
  cart$ = this.shoppingCartSvc.cartSubject$

  constructor(private shoppingCartSvc: ShoppingCartService) { }
  ngOnInit(): void {
  }

}
