import { createReducer, on } from '@ngrx/store';
import { updatePoints } from './points.actions';

interface UserPoints {
  [userId: string]: number; // Points associés à chaque utilisateur
}

export interface State {
  points: UserPoints; // Dictionnaire des points par utilisateur
}

export const initialState: State = {
  points: {}, // Aucun utilisateur n'a de points initialement
};

export const pointsReducer = createReducer(
  initialState,
  on(updatePoints, (state, { userId, points }) => {
    const currentPoints = state.points[userId] || 0;  // Récupère les points actuels de l'utilisateur (0 si inexistant)
    const updatedPoints = {
      ...state.points,
      [userId]: currentPoints + points  // Ajoute les nouveaux points aux points existants
    };

    // Retourne l'état mis à jour avec les points additionnés
    return {
      ...state,
      points: updatedPoints
    };
  })
);
