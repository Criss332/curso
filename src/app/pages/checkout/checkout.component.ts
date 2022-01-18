import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Details, Order } from 'src/app/curso/interfaces/order.interface';
import { Store } from 'src/app/curso/interfaces/stores.interface';
import { DataService } from 'src/app/curso/services/data.service';
import { ShoppingCartService } from 'src/app/curso/services/shopping-cart.services';
import { Product } from '../products/interfaces/product.interface';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    name: 'cristian',
    store: '',
    shippingAddress: '', 
    city: ''
  }
  isDelivery = true;
  cart: Product[] = [];
  stores: Store[] = []
  constructor(
    private dataSvc: DataService, 
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private productSvc: ProductsService,
  ) { }

  ngOnInit(): void { 
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }
  onPickupOrDelivery(value: boolean): void{
    this.isDelivery = value;
  }
  onSubmit({value: formData}: NgForm): void {
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
      .pipe(
        tap(res => console.log('Order ->', res)),
        switchMap(({id:orderId})=>{
          const details = this.prepareDetails();
          return this.dataSvc.saveDetailsOrder({ details, orderId });
        }),
        tap(() => this.router.navigate(['/checkout/thank-you-page'])),
        delay(500),
        tap(()=> this.shoppingCartSvc.resetCart())
      )
      .subscribe()
  }
  private getStores(): void { 
    this.dataSvc.getStores()
      .pipe( 
        tap((stores: Store[]) => this.stores = stores)) 
      .subscribe();
  }
  private getCurrentDay(): string{
    return new Date().toLocaleDateString()
  }
  private prepareDetails(): Details[]{
    const details: Details[] = [];
    this.cart.forEach((product: Product) => {
      const {id:productId, name:productName, qty:quantity, stock} = product;
      const updateStock = (stock - quantity);
      this.productSvc.updateStock(productId, updateStock)
        .pipe(
          tap(() =>details.push({productId, productName, quantity}))  
        )
          .subscribe()
      
    })
    return details;
  }
  private getDataCart(): void{
    this.shoppingCartSvc.cartSubject$
    .pipe(
      tap((products: Product[])=> this.cart = products)
    )
    .subscribe()

  }
}