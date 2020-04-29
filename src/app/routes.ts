import { Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', component: RegistrationComponent, outlet: 'right'},
    {path: '', component: LoginComponent, outlet: 'left'}

];