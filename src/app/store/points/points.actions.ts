import {createAction, props} from '@ngrx/store';

// Action to update the points of a user
export const updatePoints = createAction(
  '[Points] Update Points',
  props<{ userId: string; points: number }>()
);

// Action to get the points of a user
export const getAllPoints = createAction(
  '[Points] Get Points',
  props<{ userId: string; points: number }>()
);

// Action to get the points of a user successfully
/*
export const getPointsSuccess = createAction(
  '[Points] Get Points Success',
  props<{ userId: string; points: number }>()
);
*/
