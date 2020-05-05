import { Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'user', component: UserComponent},
    // { path: 'user', component: UserComponent, children: [
    //     {
    //         path: '', component: RegistrationComponent, outlet:'right'
    //     },
    //     {
    //         path: '', component: LoginComponent, outlet:'left'
    //     },
    // ]},
    { path: 'home', component: MenuComponent},
];