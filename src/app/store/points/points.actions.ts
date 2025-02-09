import { createAction, props } from '@ngrx/store';

export const updatePoints = createAction(
  '[Points] Update Points',
  props<{ userId: string; points: number }>() // Ajout de userId
);
