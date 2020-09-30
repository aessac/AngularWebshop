import { ICategory } from '../../interfaces/ICategory';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface ICategoryService {
  getCategoryData(): Observable<ICategory[]>;
  getCategoryById(catId: number): Observable<ICategory>;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryService {

  constructor(private httpClient: HttpClient) { }

  //Get Category data
  getCategoryData(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/categories')
  }

  getCategoryById(catId: number): Observable<ICategory> {
    return this.httpClient.get<ICategory>('https://medieinstitutet-wie-products.azurewebsites.net/api/categories/' + catId);
  }
}
