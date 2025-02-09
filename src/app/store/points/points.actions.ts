import { createAction, props } from '@ngrx/store';

export const addPoints = createAction(
  '[Points] Add Points',
  props<{ wasteType: string; weight: number }>()
);

export const convertPoints = createAction(
  '[Points] Convert Points',
  props<{ points: number }>()
);

export const updatePoints = createAction(
  '[Points] Update Points',
  props<{ points: number }>()
);
