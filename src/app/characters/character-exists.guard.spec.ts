import { CharacterExistsGuard } from './character-exists.guard';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { CharactersState } from './state/characters.reducers';
import { Store, MemoizedSelector } from '@ngrx/store';
import { ICharacter } from './state/character';

describe('CharacterExistsGuard', () => {
  let sut: CharacterExistsGuard;
  let route: ActivatedRouteSnapshot;
  let store: MockStore<CharactersState>;
  let getCharacterSelector: MemoizedSelector<CharactersState, ICharacter>;

  beforeEach(() => {
    const state = { 
      results: null,
      errors: null,
      searchCriteria: null,
      currentCharacter: null,
      currentCharacterId: null,
    };

    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState: state}),
        CharacterExistsGuard
      ]
    });

    store = TestBed.get(Store);

    route = new ActivatedRouteSnapshot();
    route.params = {id: 1};

    sut = TestBed.get(CharacterExistsGuard);
  });

  it('should create an instance', () => {
    expect(sut).toBeTruthy();
  });

  describe('canActivate', () => {
    xit('when character is not loaded returns false', () => {
      store.overrideSelector(getCharacterSelector, null);

      const expected = cold('a|', { a: false });
   
      expect(sut.canActivate(route)).toBeObservable(expected);
    });

    xit('when character is loaded returns true', () => {
      store.overrideSelector(getCharacterSelector, {id:1, name:''});
 
      const expected = cold('a|', { a: true });
   
      expect(sut.canActivate(route)).toBeObservable(expected);
    });

    xit('when there is an exception returns false', () => {
      store.overrideSelector(getCharacterSelector, {id:0, name:''});

      const expected = cold('a#', { a: false });
   
      expect(sut.canActivate(route)).toBeObservable(expected);
    });
  });
});
