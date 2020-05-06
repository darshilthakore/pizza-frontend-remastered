import { Injectable } from '@angular/core';
import { CartItem } from '../shared/cartitem';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public mysubject = new Subject();
  constructor() { }
  items: CartItem[] = [];

  getItems(): Observable<CartItem[]> {
    return of<CartItem[]>(this.items.map(item => item));
  }

  addToCart(product: CartItem) {
    this.items.push(product);
  }

}
