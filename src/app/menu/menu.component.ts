import { Component, OnInit, ViewChild, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { Item } from '../shared/item';
import { Category } from '../shared/category';
import { Topping } from '../shared/topping';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/cart';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: Item[];
  categories: Category[];
  toppings: Topping[];
  selectedValue: number;
  cart: Cart;
  
  constructor(
    private router: Router,
    private menuService: MenuService,
    private cartService: CartService,
    @Inject('BaseURL')public BaseURL) { }
    

  ngOnInit(): void {

    if ( localStorage.getItem('token') && localStorage.getItem('user')) {
      //this.global.me = JSON.parse(localStorage.getItem('user'));
      console.log("im in if cond on home.comp.ts")
      this.getItems();
      this.getCategories();
      this.getToppings();
      this.getCart();
    } else {
      console.log("im in else cond on home.comp.ts")

      this.router.navigate(['/user']);
    }

  }

  getCategories() {
    this.menuService.getCategories().subscribe(
      response => {
        console.log(response);
        this.categories = response;
      }
    );
  }

  getItems() {
    this.menuService.getItems().subscribe(
      response => {
        console.log(response);
        this.items = response;
      }
    );
  }

  getToppings() {
    this.menuService.getToppings().subscribe(
      response => {
        console.log(response);
        this.toppings = response;
      }
    );

  }

  getCart() {
    this.cartService.getItems().subscribe( response => {
      this.cart = {
        cartitems: response['cartitems'],
        id: response['id'],
        grand_total : response['grand_total'],
        user : response['user']
    }
    })
  }

  // updatePrice(args) {
  //   console.log("inside updatePrice");
  //   console.log(args);
  // }

  logoutClicked() {
    // this.global.me = new User();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cartid');
    this.router.navigate(['/user']);
  }
}
