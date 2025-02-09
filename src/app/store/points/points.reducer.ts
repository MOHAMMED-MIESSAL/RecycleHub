// points.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { updatePoints } from './points.actions';

// Définition de l'interface pour l'état
export interface State {
  points: number;
}

// État initial
export const initialState: State = {
  points: 0,  // L'utilisateur commence avec 0 points
};

// Création du reducer
export const pointsReducer = createReducer(
  initialState,
  // Action pour mettre à jour les points
  on(updatePoints, (state, { points }) => ({ ...state, points }))
);

// Vous pouvez également ajouter des actions de réinitialisation ou autres si nécessaire
