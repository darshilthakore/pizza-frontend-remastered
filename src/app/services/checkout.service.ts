import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token
    });
    return { headers: httpHeaders};
  }
  
  makePayment() {
    return this.http.post(baseURL + 'api/checkout/', this.getAuthHeaders());
  }

  fetchSession() {
    return this.http.post(baseURL + 'api/checkout/', this.getAuthHeaders());
  }

}
