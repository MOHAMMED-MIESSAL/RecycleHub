import {Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from "./components/home/home.component";
import {authGuard} from './guards/auth.guard';



export const routes: Routes = [

  {path: 'home', component: HomeComponent , canActivate: [authGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login'}

];
