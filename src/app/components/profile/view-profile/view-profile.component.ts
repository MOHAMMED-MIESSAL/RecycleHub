import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from "@angular/common";
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  userId?: number;
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      const parsedUser = JSON.parse(user);

      if (parsedUser.id !== undefined) {
        this.userId = parsedUser.id;
        this.userService.getUserById(this.userId!).subscribe(user => {
          this.user = user;
        });
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }


  deleteUser() {
    if (!this.userId) return;

    this.userService.deleteUser(this.userId).subscribe(() => {
      localStorage.removeItem('loggedInUser');
      this.router.navigate(['/login']);
    });
  }
}
