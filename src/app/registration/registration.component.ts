import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registration } from '../shared/registration';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  registration: Registration;
  @ViewChild('rform') registrationFormDirective;


  constructor(
    private reg: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  formErrors = {
    'firstname': '',
    'lastname': '',
    'username': '',
    'password': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
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
    'email': {
      'required': 'Email is required',
      'email': 'Email not in valid format'
    },
  }



  createForm(): void {
    this.registrationForm = this.reg.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      email: ['', [Validators.required, Validators.email]],
    });
  }


  onSubmit() {
    this.registration = this.registrationForm.value;
    console.log(this.registration);
    this.registrationForm.reset();
  }
}
