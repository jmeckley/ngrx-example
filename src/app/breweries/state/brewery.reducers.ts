import { BreweriesActions, BreweryActionTypes } from './brewery.actions';
import { IPagedResults } from '../../pagedResults';
import { IBrewery, ISearchCriteria } from '..';

export interface BreweriesState {
    currentBreweryId?: number;
    currentBrewery?: IBrewery;
    searchCriteria: ISearchCriteria;
    results: IPagedResults<IBrewery>;
    errors: {
      message?: string;
    };
  }

const initialState: BreweriesState = {
    searchCriteria: {pageIndex: 0, pageSize: 10},
    results: {
        items: [],
        loading: false,
    },
    errors: {}
}

export function reducer(state = initialState, action: BreweriesActions): BreweriesState {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case BreweryActionTypes.ClearCurrentBrewery:
            return {
                ...state,
                currentBreweryId: null,
                currentBrewery: null,
            };
        case BreweryActionTypes.LoadBrewery:
            return {
                ...state,
                currentBreweryId: action.breweryId,
            };
        case BreweryActionTypes.LoadBrewerySuccess:
            return {
                ...state,
                currentBrewery: action.brewery,
            };
        case BreweryActionTypes.LoadBreweries:
            return {
                ...state,
                searchCriteria: action.payload,
            };
        case BreweryActionTypes.LoadBreweriesSuccess:
            return {
                ...state,
                results: action.brewerys,
            };
        case BreweryActionTypes.LoadBreweryFail:
        case BreweryActionTypes.LoadBreweriesFail:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    message: action.error
                }
            };

        default:
            return state;
    }
}