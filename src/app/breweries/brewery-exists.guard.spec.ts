import { BreweryExistsGuard } from './brewery-exists.guard';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { Store, MemoizedSelector } from '@ngrx/store';
import { BreweriesState } from './state/brewery.reducers';
import { IBrewery, Brewery } from '.';

describe('BreweryExistsGuard', () => {
  let sut: BreweryExistsGuard;
  let route: ActivatedRouteSnapshot;
  let store: MockStore<BreweriesState>;
  let getBrewerySelector: MemoizedSelector<BreweriesState, IBrewery>;

  beforeEach(() => {
    const state = { 
      results: null,
      errors: null,
      searchCriteria: null,
      currentBrewery: null,
      currentBreweryId: null,
    };

    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState: state}),
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
    xit('when brewery is not loaded returns false', () => {
      store.overrideSelector(getBrewerySelector, null);

      const expected = cold('a|', { a: false });
   
      expect(sut.canActivate(route)).toBeObservable(expected);
    });

    xit('when brewery is loaded returns true', () => {
      store.overrideSelector(getBrewerySelector, new Brewery());
 
      const expected = cold('a|', { a: true });
   
      expect(sut.canActivate(route)).toBeObservable(expected);
    });

    xit('when there is an exception returns false', () => {
      store.overrideSelector(getBrewerySelector, new Brewery());

      const expected = cold('a#', { a: false });
   
      expect(sut.canActivate(route)).toBeObservable(expected);
    });
  });
});
