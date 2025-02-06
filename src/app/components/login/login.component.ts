import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "../navbar/navbar.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, CommonModule, NavbarComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(user => {
      if (user) {
        this.router.navigate(['/request/add']);
      } else {
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }

}
