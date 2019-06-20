import { reducer, CharactersState } from './characters.reducers';
import { ISearchCriteria, ICharacter } from './character';
import { LoadCharacters, LoadCharactersSuccess, LoadCharactersFail, LoadCharacter, LoadCharacterSuccess, LoadCharacterFail, ClearCurrentCharacter } from './characters.actions';
import { IPagedResults } from '../../pagedResults';

describe('Character reducer', () => {

  let state: CharactersState;

  beforeEach(() => {
    state = {
      errors: {},
      searchCriteria: {pageIndex: 0, pageSize: 10},
      results: {items: [], loading: false}
    };
  });

  it('should create an instance', () => {
    expect(reducer).toBeTruthy();
  });
  
  describe('load characters', () => {

    it('should return search criteria', () => {
      const criteria: ISearchCriteria = {
        pageIndex: 1,
        pageSize: 20,
      };
  
      const expected: CharactersState = {
          ...state,
          searchCriteria: criteria,
      };
  
      const result = reducer(state, new LoadCharacters(criteria));
      expect(result).toEqual(expected);
    });
    
  });

  describe('load characters success', () => {
    it('should return search results', () => {
      const results: IPagedResults<ICharacter> = {
        items:[{id:1, name:'ironman'}],
        loading: false
      };
      
      const expected: CharactersState = {
          ...state,
          results: results
      };

      const result = reducer(state, new LoadCharactersSuccess(results));
      expect(result).toEqual(expected);
    });
  });

  describe('load characters fail', () => {
    it('should return error message', () => {
      const error:string = 'error';
      
      const expected: CharactersState = {
          ...state,
          errors: {message: error}
      };

      const result = reducer(state, new LoadCharactersFail(error));
      expect(result).toEqual(expected);
    });
  });

  describe('load character', () => {

    it('should return the character id', () => {
      const id = 1;
  
      const expected: CharactersState = {
          ...state,
          currentCharacterId: id,
      };
  
      const result = reducer(state, new LoadCharacter(id));
      expect(result).toEqual(expected);
    });
    
  });

  describe('load character success', () => {
    it('should return the character details', () => {
      const character: ICharacter = {
        id:1, 
        name:'ironman'
      };
      
      const expected: CharactersState = {
          ...state,
          currentCharacter: character
      };

      const result = reducer(state, new LoadCharacterSuccess(character));
      expect(result).toEqual(expected);
    });
  });

  describe('load character fail', () => {
    it('should return error message', () => {
      const error:string = 'error';
      
      const expected: CharactersState = {
          ...state,
          errors: {message: error}
      };

      const result = reducer(state, new LoadCharacterFail(error));
      expect(result).toEqual(expected);
    });
  });

  describe('clear character', () => {
    it('should set character and character id to null', () => {
      state.currentCharacter = {id:1, name:'name'};
      state.currentCharacterId = 1;
      
      const expected: CharactersState = {
          ...state,
          currentCharacter: null,
          currentCharacterId: null
      };

      const result = reducer(state, new ClearCurrentCharacter());
      expect(result).toEqual(expected);
    });
  });
});
