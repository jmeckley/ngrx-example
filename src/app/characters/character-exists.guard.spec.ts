import { CharacterExistsGuard } from './character-exists.guard';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { CharactersState } from './state/characters.reducers';
import { Store, MemoizedSelector } from '@ngrx/store';
import { State, getCharacterSuccess } from './state';
import { ICurrent } from '../pagedResults';
import { ICharacter } from './state/character';

describe('CharacterExistsGuard', () => {
  let sut: CharacterExistsGuard;
  let route: ActivatedRouteSnapshot;
  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            characters: {
              current: {
                id: null, 
                item: null, 
                loaded: false
              },
            }
          }
        }),
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
    
    let current: ICurrent<ICharacter>;
    let selector: MemoizedSelector<object, ICurrent<ICharacter>>;

    beforeEach(() => {
      current = {id: null, item: null, loaded: false};

      store.setState({
        characters: {
          current: current,
          results: null,
          searchCriteria: null,
          errors:{},
        }
      });

      selector = store.overrideSelector(getCharacterSuccess, current);
    });

    it('when character is not loaded returns false', () => {
      const expected = cold('(a|)', { a: false });

      selector.setResult(current);

      expect(sut.canActivate(route)).toBeObservable(expected);
    });

    it('when character is loaded returns true', () => {
      const expected = cold('(a|)', { a: true });

      current.loaded = true;
      selector.setResult(current);
   
      expect(sut.canActivate(route)).toBeObservable(expected);
    });

    xit('when there is an exception returns false', () => {
      const expected = cold('(a#)', { a: false });
   
      expect(sut.canActivate(route)).toBeObservable(expected);
    });
  });
});
