import { Component, OnInit, ViewChild, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { Item } from '../shared/item';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: Item[];

  constructor(
    private router: Router,
    private menuService: MenuService,
    @Inject('BaseURL')public BaseURL) { }

  ngOnInit(): void {

    if ( localStorage.getItem('token') && localStorage.getItem('user')) {
      //this.global.me = JSON.parse(localStorage.getItem('user'));
      console.log("im in if cond on home.comp.ts")
      this.getItems();
    } else {
      console.log("im in else cond on home.comp.ts")

      this.router.navigate(['/user']);
    }

  }

  getItems() {
    this.menuService.getItems().subscribe(
      response => {
        console.log(response);
        this.items = response;
      }
    );
  }

  logoutClicked() {
    // this.global.me = new User();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/user']);
  }
}
