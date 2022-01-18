import { HttpClient } from "@angular/common/http"; 
import { Injectable } from "@angular/core"; 
import { Observable } from "rxjs"; 
import { DetailsOrder, Order } from "../interfaces/order.interface";
import { Store } from "../interfaces/stores.interface"; 

@Injectable({ 
  providedIn: "root" //para que se pueda usar en otros componentes
})

export class DataService{
   private apiUrl = 'http://localhost:3000'; 
   constructor(private http: HttpClient ){} //inyectamos el servicio http

  getStores():Observable<Store[]>{  //observable que se pueda usar en otros componentes
    return this.http.get<Store[]>(`${this.apiUrl}/stores`);  //retorna un observable
  }
  saveOrder(order: Order):Observable<Order>{
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }
  saveDetailsOrder(details: DetailsOrder):Observable<DetailsOrder>{
    return this.http.post<DetailsOrder>(`${this.apiUrl}/detailsOrders`, details);
  }
} 