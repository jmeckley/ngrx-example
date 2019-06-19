import { reducer, CharactersState } from './characters.reducers';
import { ISearchCriteria, ICharacter } from './character';
import { LoadCharacters, LoadCharactersSuccess, LoadCharactersFail } from './characters.actions';
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
  
  describe('load', () => {

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

  describe('load success', () => {
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

  describe('load fail', () => {
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
});
