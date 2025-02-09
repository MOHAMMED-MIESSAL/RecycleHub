// points.service.ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  private localStorageKey = 'userPoints';

  constructor() {}

  getUserPoints(userId: string) {
    const userPoints = JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
    return of(userPoints[userId] || 0);
  }

  updateUserPoints(userId: string, newPoints: number) {
    const userPoints = JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
    userPoints[userId] = newPoints;
    localStorage.setItem(this.localStorageKey, JSON.stringify(userPoints));
    return of(userPoints[userId]);
  }
}
