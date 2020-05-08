import { Component, OnInit, ViewChild, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { Item } from '../shared/item';
import { Category } from '../shared/category';
import { Topping } from '../shared/topping';

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
  
  constructor(
    private router: Router,
    private menuService: MenuService,
    @Inject('BaseURL')public BaseURL) { }
    

  ngOnInit(): void {

    if ( localStorage.getItem('token') && localStorage.getItem('user')) {
      //this.global.me = JSON.parse(localStorage.getItem('user'));
      console.log("im in if cond on home.comp.ts")
      this.getItems();
      this.getCategories();
      this.getToppings();
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

  // updatePrice(args) {
  //   console.log("inside updatePrice");
  //   console.log(args);
  // }

  logoutClicked() {
    // this.global.me = new User();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('usercart');
    this.router.navigate(['/user']);
  }
}
