import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './points.reducer';

export const selectPointsFeature = createFeatureSelector<State>('points');

export const selectUserPoints = (userId: string) =>
  createSelector(selectPointsFeature, (state) => state.points[userId] || 0);
