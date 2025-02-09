import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../store/points/points.reducer';
import { updatePoints } from '../../store/points/points.actions';
import {AsyncPipe} from "@angular/common"; // Importez l'action


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    AsyncPipe
  ],
  template: `
    <h1>Home</h1>
    <p>Points: {{ points$ | async }}</p>
    <button (click)="addPoints()">Add 100 Points</button>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'RecycleHub';

  points$: Observable<number>; // Observable pour les points

  constructor(private store: Store<{ points: State }>) {
    this.points$ = this.store.select(state => state?.points?.points ?? 0);
  }

  // Méthode pour dispatcher une action pour mettre à jour les points
  addPoints() {
    this.store.dispatch(updatePoints({ points: 100 }));
  }

}
