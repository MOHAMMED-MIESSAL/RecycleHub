import {Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from "./components/home/home.component";
import {authGuard} from './guards/auth.guard';
import {CreateRequestComponent} from './components/collection-request/create-request/create-request.component';
import {MyRequestComponent} from "./components/collection-request/my-request/my-request.component";
import {EditRequestComponent} from "./components/collection-request/edit-request/edit-request.component";
import {ViewProfileComponent} from "./components/profile/view-profile/view-profile.component";
import {UpdateProfileComponent} from "./components/profile/update-profile/update-profile.component";

export const routes: Routes = [

  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'request/add', component: CreateRequestComponent, canActivate: [authGuard]},
  {path: 'request/my-request', component: MyRequestComponent, canActivate: [authGuard]},
  {path: 'request/edit/:id', component: EditRequestComponent, canActivate: [authGuard]},
  {path: 'profile', component: ViewProfileComponent, canActivate: [authGuard]},
  {path: 'profile/edit', component: UpdateProfileComponent, canActivate: [authGuard]},
  {path: '**', redirectTo: 'login'}

];
