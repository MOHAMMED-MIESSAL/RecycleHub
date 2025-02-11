import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isParticular = false;
  isCollector = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.isParticular = this.authService.checkUserRole();
    this.isCollector = this.authService.checkCollectorRole();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('loggedInUser');
  }

  logout() {
    this.authService.logout();
  }
}
