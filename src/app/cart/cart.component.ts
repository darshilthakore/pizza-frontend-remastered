import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/cartitem';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartitems: CartItem[];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService) { }



  ngOnInit(): void {
    this.cartService.getItems() 
      .subscribe(response => {
        console.log("response:", response);
        this.cartitems = response;
      });
  }

}
