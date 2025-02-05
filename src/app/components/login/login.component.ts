import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private userService: UserService, private router: Router ){
  }

  ngOnInit() {
    this.userService.loadUsers();
    this.userService.initializeCollectors();
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(user => {
      if (user) {
        console.log('Connexion réussie', user);
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }

}
