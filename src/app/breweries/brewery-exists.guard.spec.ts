import { BreweryExistsGuard } from './brewery-exists.guard';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { Store, MemoizedSelector } from '@ngrx/store';
import { Brewery, IBrewery } from '.';
import { BreweriesState } from './state/brewery.reducers';
import { State, getBrewerySuccess } from './state';
import { ICurrent } from '../pagedResults';

describe('BreweryExistsGuard', () => {
  let sut: BreweryExistsGuard;
  let route: ActivatedRouteSnapshot;
  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            breweries: {
              current: {
                id: null,
                item: null, 
                loaded: false
              }
            }
          }
        }),
        BreweryExistsGuard
      ]
    });

    store = TestBed.get(Store);

    route = new ActivatedRouteSnapshot();
    route.params = {id: 1};

    sut = TestBed.get(BreweryExistsGuard);
  });

  it('should create an instance', () => {
    expect(sut).toBeTruthy();
  });

  describe('canActivate', () => {
    let state: BreweriesState;
    let current: ICurrent<IBrewery>;
    let selector: MemoizedSelector<object, ICurrent<IBrewery>>;

    beforeEach(() => {
      current = {id: null, item: null, loaded: false};
      state = {
        current: current,
        results: null,
        searchCriteria: null,
        errors:{},
      };

      store.setState({breweries: state});
      selector = store.overrideSelector(getBrewerySuccess, current);
    });

    it('when brewery is not loaded returns false', () => {
      const expected = cold('(a|)', { a: false });

      selector.setResult(current);

      expect(sut.canActivate(route)).toBeObservable(expected);
    });

    it('when brewery is loaded returns true', () => {
      const expected = cold('(a|)', { a: true });

      current.loaded = true;
      selector.setResult(current);
      
      expect(sut.canActivate(route)).toBeObservable(expected);
    });

    xit('when there is an exception returns false', () => {
      const expected = cold('(a|)', { a: false });
   
      expect(sut.canActivate(route)).toBeObservable(expected);
    });
  });
});
