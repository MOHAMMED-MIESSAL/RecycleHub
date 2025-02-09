import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PointsService } from '../../services/points.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    NavbarComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <h1>Home</h1>
    <p>Points: {{ points$ | async }}</p>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  points$!: Observable<number>;

  constructor(private pointsService: PointsService) {}

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser?.id;

    if (userId) {
      this.pointsService.getUserPoints(userId); // Get points from localStorage
      this.points$ = this.pointsService.getUserPoints(userId);
    }
  }
}
