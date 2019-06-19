import * as fromCharacters from './index';

describe(`charactersSelectors`, () => {

  let defaultState: fromCharacters.State;
  
  beforeEach(() => {
    defaultState = {
      router: null,
      characters: {
        currentCharacter: {id:1, name:'name'},
        searchCriteria: {pageIndex: 0, pageSize: 10},
        results: {items:[{id:1, name:'ironman'}, {id:2, name:'black widow'}], loading: false},
        errors: {}
      }
    };
  });

  it('should not have errors', () => {
    const result = fromCharacters.getCharactersError(defaultState);
    expect(result).not.toBeDefined();
  });

  it('should have search criteria defined', () => {
    const result = fromCharacters.getCharacters(defaultState);
    expect(result.pageIndex).toBe(0);
    expect(result.pageSize).toBe(10);
  });

  it('should have two characters', () => {
    const result = fromCharacters.getCharactersSuccess(defaultState);
    expect(result.items.length).toBe(2);
  });

  it('should have the current character', () => {
    const result = fromCharacters.viewCharacter(defaultState);
    expect(result).toBe(defaultState.characters.currentCharacter);
  });

});
