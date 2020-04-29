import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Login } from '../shared/login';
import { RegistrationService } from '../services/registration.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login: Login;
  @ViewChild('lform') loginFormDirective;

  constructor(
    private log: FormBuilder,
    private loginService: RegistrationService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL')public BaseURL) {
      this.createForm();
     }

  ngOnInit(): void {
    if ( localStorage.getItem('token') && localStorage.getItem('account')) {
      
    }
  }

  formErrors = {
    'username': '',
    'password': '',
  };

  validationMessages = {
    'username': {
      'required': 'Username is required',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'password': {
      'required': 'Password is required',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
  }



  createForm(): void {
    this.loginForm = this.log.group({ 
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  
  }

  onLogin() {
    this.login = this.loginForm.value;
    // console.log(this.login);
    this.loginForm.reset({
      username: '',
      password: '',
    });
    this.loginFormDirective.resetForm();

    this.loginService.loginUser(this.login)
    .subscribe(
      response => {
        console.log(response);
        localStorage.setItem('token', response['token']);
      },
      error => {
        console.log('error', error);
      }
    );
  }


  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


}
