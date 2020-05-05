import { Injectable } from '@angular/core';
import { CartItem } from '../shared/cartitem';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  items: CartItem[] = [];

  getItems(): Observable<CartItem[]> {
    return of(this.items.map(item => item));
  }

  addToCart(product: CartItem) {
    this.items.push(product);
  }

}
