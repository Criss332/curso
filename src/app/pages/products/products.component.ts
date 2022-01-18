import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import {tap} from 'rxjs/operators';
import { Product } from './interfaces/product.interface';
import { ShoppingCartService } from 'src/app/curso/services/shopping-cart.services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  /*propiedad*/products!: Product[]; 

  constructor(private productSvc: ProductsService, private shoppingCartSvc: ShoppingCartService ){ }

  ngOnInit(): void {//llamar un observable
    
    this.productSvc.getProducts()
    .pipe(
      tap((products: Product[]) => this.products = products)
    )
    .subscribe();
  }
  addToCart(product:Product): void{
    this.shoppingCartSvc.updateCart(product);
  }
}
//COMPONENTE PADRE