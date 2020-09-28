import { ICategory } from '../../interfaces/ICategory';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ICategoryService {
  getCategoryData(): Observable<ICategory[]>;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryService {

  constructor(private httpClient: HttpClient) { }

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
}
