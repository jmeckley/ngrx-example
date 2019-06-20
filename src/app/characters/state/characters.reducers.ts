import { CharactersActions, CharactersActionTypes } from './characters.actions';
import { IPagedResults } from '../../pagedResults';
import { ICharacter, ISearchCriteria } from './character';

export interface CharactersState {
    currentCharacterId?: number;
    currentCharacter?: ICharacter;
    searchCriteria: ISearchCriteria;
    results: IPagedResults<ICharacter>;
    errors: {
      message?: string;
    };
  }

const initialState: CharactersState = {
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
                currentCharacterId: null,
                currentCharacter: null,
            };
        case CharactersActionTypes.LoadCharacter:
            return {
                ...state,
                currentCharacterId: action.characterId,
            };
        case CharactersActionTypes.LoadCharacterSuccess:
            return {
                ...state,
                currentCharacter: action.character,
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