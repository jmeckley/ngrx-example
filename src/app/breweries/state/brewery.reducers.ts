import { BreweriesActions, BreweryActionTypes } from './brewery.actions';
import { IPagedResults, ICurrent } from '../../pagedResults';
import { IBrewery, ISearchCriteria, Brewery } from '..';

export interface BreweriesState {
    searchCriteria: ISearchCriteria;
    results: IPagedResults<IBrewery>;
    current: ICurrent<Brewery>;
    errors: {
      message?: string;
    };
  }

const initialState: BreweriesState = {
    searchCriteria: {pageIndex: 0, pageSize: 10},
    results: {items: [], loading: false},
    current: {item: null, id: null, loaded: false},
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
                current: {
                    id: null,
                    item: null,
                    loaded: false
                }
            };
        case BreweryActionTypes.LoadBrewery:
            
            return {
                ...state,
                current: {
                    ...state.current,
                    id: action.breweryId
                }
            };
        case BreweryActionTypes.LoadBrewerySuccess:
            return {
                ...state,
                current: {
                    ...state.current,
                    item: action.brewery,
                    loaded: true
                }
            };
        case BreweryActionTypes.LoadBreweries:
            return {
                ...state,
                searchCriteria: action.payload,
            };
        case BreweryActionTypes.LoadBreweriesSuccess:
            return {
                ...state,
                results: action.breweries,
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