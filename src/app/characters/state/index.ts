import * as fromRoot from '../../state/app.reducer';
import * as fromCharacters from './characters.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * Extends the app state to include the occupancy feature.
 * So the reference to PolicyState cannot be added to app.state.ts directly.
 */
export interface State extends fromRoot.AppState {
  characters: fromCharacters.CharactersState;
}

const getCharactersState = createFeatureSelector<fromCharacters.CharactersState>('characters');

export const getCharacter = createSelector(
  getCharactersState,
  state => state.current.id
);

export const getCharacterSuccess = createSelector(
  getCharactersState,
  state => state.current
);

export const getCharacterError = createSelector(
  getCharactersState,
  state => state.errors.message
);

export const getCharacters = createSelector(
    getCharactersState,
    state => state.searchCriteria
);

export const getCharactersSuccess = createSelector(
  getCharactersState,
  state => state.results
);

export const getCharactersError = createSelector(
    getCharactersState,
    state => state.errors.message
);
