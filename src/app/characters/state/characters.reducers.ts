import { CharactersActions, CharactersActionTypes } from './characters.actions';
import { IPagedResults, ICurrent } from '../../pagedResults';
import { ICharacter, ISearchCriteria } from './character';

export interface CharactersState {
    current: ICurrent<ICharacter>;
    searchCriteria: ISearchCriteria;
    results: IPagedResults<ICharacter>;
    errors: {
      message?: string;
    };
  }

const initialState: CharactersState = {
    current: {id: null, item: null, loaded: false},
    searchCriteria: {pageIndex: 0, pageSize: 10},
    results: {
        items: [],
        loading: false,
    },
    errors: {}
}

export function reducer(state = initialState, action: CharactersActions): CharactersState {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case CharactersActionTypes.ClearCurrentCharacter:
            return {
                ...state,
                current: {
                    id: null,
                    item: null,
                    loaded: false
                }
            };
        case CharactersActionTypes.LoadCharacter:
            return {
                ...state,
                current: {
                    ...state.current,
                    id: action.characterId,
                    item: null,
                    loaded: false
                }
            };
        case CharactersActionTypes.LoadCharacterSuccess:
            return {
                ...state,
                current: {
                    ...state.current,
                    item: action.character,
                    loaded: true
                }
            };
        case CharactersActionTypes.LoadCharacters:
            return {
                ...state,
                searchCriteria: action.payload,
            };
        case CharactersActionTypes.LoadCharactersSuccess:
            return {
                ...state,
                results: action.characters,
            };
        case CharactersActionTypes.LoadCharacterFail:
        case CharactersActionTypes.LoadCharactersFail:
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