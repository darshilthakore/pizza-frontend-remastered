import { Component, OnInit, ViewChild, Inject, Injector } from '@angular/core';
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
  // cartitems: CartItem[];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    @Inject('BaseURL')public BaseURL) { }


  ngOnInit(): void {
    this.updateCart();

  }

  updateCart() {
    this.cartService.mysubject.subscribe((value) => {
      console.log(value);
      this.cartService.getItems().subscribe(response => {
        console.log("Response in cart comp:", response);
        
        let cartContent = new Cart();
        cartContent.cartitems = response['cartitems'];
        cartContent.id = response['id'];
        cartContent.grand_total = response['grand_total'];
        cartContent.user = response['user'];

        this.cart = cartContent;

        console.log("Cart is:", this.cart);
        // this.cart.cartitems = this.cartitems;

        // for ( var item of response) {
        //   this.subtotal += item.total;
        // }

        // console.log("Subtotal:", this.subtotal);

      });
    });
  }

  // increaseQuantity(cartitem) {
  //   this.cartService.incrementItem(cartitem).subscribe 
  // }
 


}