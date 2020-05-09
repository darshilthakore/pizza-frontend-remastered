import { Injectable } from '@angular/core';
import { CartItem } from '../shared/cartitem';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { Cart } from '../shared/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public mysubject = new Subject();
  private id = localStorage.getItem('cartid');
  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token
    });
    return { headers: httpHeaders};
  }
  

  // items: CartItem[] = [];

  // getItems(): Observable<CartItem[]> {
  //   return of<CartItem[]>(this.items.map(item => item));
  // }

  // addToCart(product: CartItem) {
  //   this.items.push(product);
  // }

  // createCart(cart: Cart): Observable<Cart> {
  //   return this.http.post<Cart>(baseURL + 'api/carts/', cart, this.getAuthHeaders());
  // }

  addToCart(cartitem: CartItem): Observable<CartItem> {
    console.log("making put request");
    return this.http.put<CartItem>(baseURL + 'api/carts/' + this.id + '/', cartitem, this.getAuthHeaders());
  }

  getItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(baseURL + 'api/carts/' + this.id, this.getAuthHeaders());
  }

  // getItems(): Observable<CartItem[]> {
  //   return this.http.get<CartItem[]>(baseURL + 'api/cart/')
  // }

}
