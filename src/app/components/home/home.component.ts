import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PointsService} from '../../services/points.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {AsyncPipe, NgIf} from '@angular/common';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    NavbarComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  points$!: Observable<number>;
  isParticular = false;

  constructor(private pointsService: PointsService, private authService: AuthService) {
  }

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser?.id;
    this.isParticular = this.authService.checkUserRole();
    this.pointsService.getUserPoints(userId);
    this.points$ = this.pointsService.getUserPoints(userId);
  }


}
