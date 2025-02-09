import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './points.reducer';

export const selectPointsFeature = createFeatureSelector<State>('points');

export const selectTotalPoints = createSelector(
  selectPointsFeature,
  (state) => state.points
);
