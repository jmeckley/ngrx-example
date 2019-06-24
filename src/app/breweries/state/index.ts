import * as fromRoot from '../../state/app.reducer';
import * as fromBrewery from './brewery.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * Extends the app state to include the occupancy feature.
 * So the reference to PolicyState cannot be added to app.state.ts directly.
 */
export interface State extends fromRoot.AppState {
  breweries: fromBrewery.BreweriesState;
}

const getBreweryState = createFeatureSelector<fromBrewery.BreweriesState>('breweries');

export const getBrewery = createSelector(
  getBreweryState,
  state => state.currentBreweryId
);

export const getBrewerySuccess = createSelector(
  getBreweryState,
  state => state.currentBrewery
);

export const getBreweryError = createSelector(
  getBreweryState,
  state => state.errors.message
);

export const getBreweries = createSelector(
    getBreweryState,
    state => state.searchCriteria
);

export const getBreweriesSuccess = createSelector(
  getBreweryState,
  state => state.results
);

export const getBreweriesError = createSelector(
    getBreweryState,
    state => state.errors.message
);
