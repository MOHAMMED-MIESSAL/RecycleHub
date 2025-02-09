import {Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from "./components/home/home.component";
import {authGuard,} from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import {CreateRequestComponent} from './components/collection-request/create-request/create-request.component';
import {MyRequestComponent} from "./components/collection-request/my-request/my-request.component";
import {EditRequestComponent} from "./components/collection-request/edit-request/edit-request.component";
import {ViewProfileComponent} from "./components/profile/view-profile/view-profile.component";
import {UpdateProfileComponent} from "./components/profile/update-profile/update-profile.component";
import {RequestsListComponent} from "./components/collection-process/requests-list/requests-list.component";
import {ReservedRequestsComponent} from "./components/collection-process/reserved-requests/reserved-requests.component";
import {ConvertPointsComponent} from "./components/convert-points/convert-points.component";


export const routes: Routes = [

  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'request/add', component: CreateRequestComponent, canActivate: [authGuard,roleGuard], data: {role: 'particulier'}},
  {path: 'request/my-request', component: MyRequestComponent, canActivate: [authGuard,roleGuard], data: {role: 'particulier'}},
  {path: 'request/edit/:id', component: EditRequestComponent, canActivate: [authGuard,roleGuard], data: {role: 'particulier'}},
  {path: 'convert-points', component: ConvertPointsComponent, canActivate: [authGuard]},
  {path: 'profile', component: ViewProfileComponent, canActivate: [authGuard]},
  {path: 'profile/edit', component: UpdateProfileComponent, canActivate: [authGuard]},
  {path: 'collection-process', component: RequestsListComponent, canActivate: [authGuard,roleGuard], data: {role: 'collecteur'}},
  {path: 'collection-process/reserved-requests', component: ReservedRequestsComponent, canActivate: [authGuard, roleGuard], data: {role: 'collecteur'}},
  {path: '**', redirectTo: 'login'}

];
