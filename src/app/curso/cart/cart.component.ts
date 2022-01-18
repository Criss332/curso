import { Component } from "@angular/core";
import { ShoppingCartService } from "../services/shopping-cart.services";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
})
export class CartComponent {
    cart$ = this.shoppingCartSvc.cartSubject$;
    total$ = this.shoppingCartSvc.totalAction$;
    quantity$ = this.shoppingCartSvc.quantityAction$;
    
    constructor(private shoppingCartSvc: ShoppingCartService){

    }
}