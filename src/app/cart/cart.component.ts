import { Component, OnInit, ViewChild, Inject, Injector, Input } from '@angular/core';
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
  
  @Input() cart;
  // cartitems: CartItem[];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    @Inject('BaseURL')public BaseURL) { }


  ngOnInit(): void {

    // this.cartService.getItems().subscribe( response => {
    //   this.cart = {
    //     cartitems: response['cartitems'],
    //     id: response['id'],
    //     grand_total : response['grand_total'],
    //     user : response['user']
    // }
    // })

    this.cartService.mysubject.subscribe((value) => {
      console.log(value);
      this.cartService.getItems().subscribe(response => {
        console.log("Response in cart comp:", response);
        
        this.cart = {
          cartitems: response['cartitems'],
          id: response['id'],
          grand_total : response['grand_total'],
          user : response['user']
      }

        console.log("Cart is:", this.cart);
        // this.cart.cartitems = this.cartitems;

        // for ( var item of response) {
        //   this.subtotal += item.total;
        // }

        // console.log("Subtotal:", this.subtotal);

      });

    });

    // this.cartService.mysubject.next('Data Changed');

  }


  decrementQuantity(cartitemid) {
    console.log(cartitemid);
    this.cartService.decrementItem(cartitemid)
      .subscribe( response => {
        console.log(response);
        this.cartService.mysubject.next(response);
      });
    
    // this.cartService.mysubject.next('Data Changed');


  }
  
  incrementQuantity(cartitemid) {
    console.log(cartitemid);
    this.cartService.incrementItem(cartitemid)
      .subscribe( response => {
        console.log(response);
        this.cartService.mysubject.next(response);
      });
   
    // this.cartService.mysubject.next('Data Changed');
  
  }

}