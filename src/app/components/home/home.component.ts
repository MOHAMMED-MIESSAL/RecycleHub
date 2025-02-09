import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../store/points/points.reducer';
import { updatePoints } from '../../store/points/points.actions';
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

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
  points$: Observable<number> = new Observable<number>(); // Initialisation avec un Observable vide

  constructor(private store: Store<{ points: State }>) {}

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser?.id;

    if (userId) {
      // Récupérer les points depuis localStorage
      const storedPoints = JSON.parse(localStorage.getItem('userPoints') || '{}');
      const userPoints = storedPoints[userId] || 0;

      // Mettre à jour le store avec les points récupérés
      this.store.dispatch(updatePoints({ userId, points: userPoints }));

      // Sélectionner les points pour l'utilisateur spécifié
      this.points$ = this.store.select(state => state?.points?.points[userId] ?? 0);
    }
  }

  addPoints() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser.id; // Récupérer l'ID de l'utilisateur connecté

    // Dispatch de l'action pour mettre à jour les points
    this.store.dispatch(updatePoints({ userId, points: 100 }));
  }
}
