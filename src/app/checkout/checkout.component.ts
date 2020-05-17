import { Component, OnInit, ViewChild, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';
declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  sessionId;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    @Inject('BaseURL')public BaseURL) { }

  ngOnInit(): void {
    this.checkoutService.fetchSession()
      .subscribe( response => {
        this.sessionId = response['id'];
      })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  

  pay() {
    const stripe = Stripe('pk_test_q0DdrQ8ujFSByhHwyhYmkqQ700esdMVMWI');
    var sessionId;
    stripe.redirectToCheckout({
      sessionId: this.sessionId
    });
    
  }

  logoutClicked() {
    // this.global.me = new User();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cartid');
    this.router.navigate(['/user']);
  }
}
