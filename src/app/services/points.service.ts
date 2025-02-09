import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private localStorageKey = 'userPoints';

  constructor() {}

  // Récupérer les points d'un utilisateur depuis le localStorage
  getUserPoints(userId: string) {
    const userPoints = JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
    return of(userPoints[userId] || 0);
  }

  // Mettre à jour les points d'un utilisateur dans le localStorage
  updateUserPoints(userId: string, newPoints: number) {
    const userPoints = JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
    const currentPoints = userPoints[userId] || 0; // Récupère les points existants

    // Ajoute les nouveaux points
    userPoints[userId] = currentPoints + newPoints;

    // Sauvegarde les points dans localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(userPoints));

    return of(userPoints[userId]);
  }
}
