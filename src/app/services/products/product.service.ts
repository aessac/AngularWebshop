import { IMovie } from '../../interfaces/IMovie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchResult: IMovie[] = [];

  constructor(private httpClient: HttpClient) { }

  //Get Movie list from API
  getMovieData(): Observable<IMovie[]> {
    return this.httpClient.get<IMovie[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products').pipe(
      catchError(this.handleError<IMovie[]>('getMovieData', []))
    );
  }

  //Handle get error
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //Get search function
  getSearchData(searchString): Observable<IMovie[]> {
    return this.httpClient.get<IMovie[]>('http://medieinstitutet-wie-products.azurewebsites.net/api/search/?searchText=' + searchString);
  }

  //Post products to API
  addProduct(product): Observable<any> {
    return this.httpClient.post<any>('http://medieinstitutet-wie-products.azurewebsites.net/api/orders', product)
      .pipe(
        catchError(this.handleError('addProduct', product))
      );
  }
}
