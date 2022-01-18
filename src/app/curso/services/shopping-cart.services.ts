import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';
@Injectable(
    {providedIn:'root'}
)

export class ShoppingCartService{
    products: Product[] = [];//Array se va ir guardando todos los productos que se añadan al carrito
    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);
    
    get cartSubject$() : Observable<Product[]> {//Observables 
        return this.cartSubject.asObservable();
    }
    
    get totalAction$() : Observable<number> {//Observables
        return this.totalSubject.asObservable();
    }
    
    get quantityAction$() : Observable<number> {//Observables 
        return this.quantitySubject.asObservable();
    }
    //Metodo intermedio Public
    updateCart(product: Product): void{
        this.addToCart(product);
        this.quantityProducts();
        this.calcTotal();
    }
    resetCart(): void{
        this.cartSubject.next([]);
        this.totalSubject.next(0);
        this.quantitySubject.next(0);
        this.products = [];
    }
    
    //metodo privado//busca el producto en el carrito
    private addToCart(product: Product): void{
        const isProductInCart = this.products.find(prod => prod.id === product.id);

        if (isProductInCart) {
            isProductInCart.qty++;
        } else {
             this.products.push({...product, qty: 1});
        }
        this.cartSubject.next(this.products);
    }
    private quantityProducts(): void {//cantidad de articuls añadidos al carrito
        const quantity = this.products.reduce((acc,prod)=>acc += prod.qty, 0);
        this.quantitySubject.next(quantity);
    }
    private calcTotal(): void{ //total precio de compras
        const total = this.products.reduce((acc,prod)=>acc += (prod.price * prod.qty), 0);
        this.totalSubject.next(total);
    }
    
}