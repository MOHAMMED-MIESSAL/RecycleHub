import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {updatePoints, getAllPoints} from '../store/points/points.actions';
import { selectUserPoints } from '../store/points/points.selectors';
import { State } from '../store/points/points.reducer';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private localStorageKey = 'userPoints';

  constructor(private store: Store<{ points: State }>) {}

  // Method to update user points
  updateUserPoints(userId: string, newPoints: number): Observable<number> {
    const userPoints = JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
    const currentPoints = userPoints[userId] || 0;
    userPoints[userId] = currentPoints + newPoints;
    localStorage.setItem(this.localStorageKey, JSON.stringify(userPoints));

    this.store.dispatch(updatePoints({ userId, points: newPoints }));

    return of(userPoints[userId]);
  }

  // Method to get all user points
  getUserPoints(userId: string): void {
    const userPoints = JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
    const points = userPoints[userId] || 0;

    this.store.dispatch(getAllPoints({ userId, points }));
  }

  // Method to select user points
  selectUserPoints(userId: string): Observable<number> {
    return this.store.select(selectUserPoints(userId));
  }
}
