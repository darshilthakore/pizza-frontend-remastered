import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/cartitem';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { map, catchError } from 'rxjs/operators';
import { Cart } from '../shared/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart; 
  cartitems: CartItem[];
  subtotal = 0;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService) { }



  ngOnInit(): void {

    this.cartService.mysubject.subscribe((value) => {
      console.log(value);
      this.cartService.getItems().subscribe(response => {
        console.log("Response in cart comp:", response);
        this.cartitems = response;

        for ( var item of response) {
          this.subtotal += item.total;
        }

        console.log("Subtotal:", this.subtotal);

      });
    });
  }

  // increaseQuantity(cartitem) {
  //   this.cartService.incrementItem(cartitem).subscribe 
  // }
 


}