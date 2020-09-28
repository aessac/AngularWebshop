import { IOrderAdmin } from './../../interfaces/IOrderAdmin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface IOrderService {
  getOrdersData(): Observable<IOrderAdmin[]>;
  deleteOrderData(orderId: number): Observable<IOrderAdmin[]>;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService implements IOrderService {

  constructor(private httpClient: HttpClient) { }

  //Get orders data for admin
  getOrdersData(): Observable<IOrderAdmin[]> {
    return this.httpClient.get<IOrderAdmin[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=777').pipe(
      catchError(this.handleError<IOrderAdmin[]>('getOrdersData', []))
    );
  }

  //Delete an order
  deleteOrderData(orderId: number): Observable<IOrderAdmin[]> {
    return this.httpClient.delete<IOrderAdmin[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders/' + orderId).pipe(
      catchError(this.handleError<IOrderAdmin[]>('deleteOrdersData', []))
    );
  }

  //Handle get error
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
