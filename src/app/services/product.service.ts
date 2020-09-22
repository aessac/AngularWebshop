import { ICategory } from './../interfaces/ICategory';
import { IMovie } from './../interfaces/IMovie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
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

  //Get Category data
  getCategoryData(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/categories').pipe(
      catchError(this.handleError<ICategory[]>('getCategoryData', []))
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
}
