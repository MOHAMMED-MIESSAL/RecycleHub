// points.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { updatePoints, getAllPoints, convertPointsToVoucher } from './points.actions';

interface UserPoints {
  [userId: string]: number;
}

export interface State {
  points: UserPoints;
}

export const initialState: State = {
  points: {},
};

export const pointsReducer = createReducer(
  initialState,
  on(updatePoints, (state, { userId, points }) => ({
    ...state,
    points: {
      ...state.points,
      [userId]: (state.points[userId] || 0) + points,
    },
  })),

  on(getAllPoints, (state, { userId, points }) => ({
    ...state,
    points: {
      ...state.points,
      [userId]: points,
    },
  })),

  on(convertPointsToVoucher, (state, { userId, voucherType }) => {
    const currentPoints = state.points[userId] || 0;
    let pointsToDeduct = 0;

    // Définir les points à déduire en fonction du type de bon d'achat
    switch (voucherType) {
      case '50':
        pointsToDeduct = 100;
        break;
      case '120':
        pointsToDeduct = 200;
        break;
      case '350':
        pointsToDeduct = 500;
        break;
      default:
        pointsToDeduct = 0;
    }

    // Vérifier si l'utilisateur a suffisamment de points
    if (currentPoints >= pointsToDeduct) {
      return {
        ...state,
        points: {
          ...state.points,
          [userId]: currentPoints - pointsToDeduct,
        },
      };
    } else {
      // Si l'utilisateur n'a pas assez de points, ne rien faire
      return state;
    }
  })
);
