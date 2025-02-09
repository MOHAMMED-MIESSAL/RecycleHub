import {createReducer, on} from '@ngrx/store';
import {updatePoints, getAllPoints} from './points.actions';

// Define the shape of the state
interface UserPoints {
  [userId: string]: number;
}

// Define the initial state
export interface State {
  points: UserPoints;
}

// Define the initial state
export const initialState: State = {
  points: {},
};

// Define the reducer
export const pointsReducer = createReducer(
  initialState,
  on(updatePoints, (state, {userId, points}) => ({
    ...state,
    points: {
      ...state.points,
      [userId]: (state.points[userId] || 0) + points
    }
  })),

  on(getAllPoints, (state, {userId, points}) => ({
    ...state,
    points: {
      ...state.points,
      [userId]: points
    }
  }))
);
