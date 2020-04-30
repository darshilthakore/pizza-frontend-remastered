import { Injectable } from '@angular/core';
import { Item } from '../shared/item';
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
}
