import { Injectable } from '@angular/core';
import { Item } from '../shared/item';
import { Category } from '../shared/category';
import { Topping } from '../shared/topping';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token
    });
    return { headers: httpHeaders};
  }  
  
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(baseURL + 'api/items', this.getAuthHeaders());
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(baseURL + 'api/categories', this.getAuthHeaders());
  }

  getToppings(): Observable<Topping[]> {
    return this.http.get<Topping[]>(baseURL + 'api/toppings', this.getAuthHeaders());
  }
  

}
