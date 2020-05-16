import { Component, OnInit, ViewChild, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private router: Router,
    @Inject('BaseURL')public BaseURL) { }

  ngOnInit(): void {
  }


  logoutClicked() {
    // this.global.me = new User();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cartid');
    this.router.navigate(['/user']);
  }
}
