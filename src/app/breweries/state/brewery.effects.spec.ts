import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { cold } from 'jasmine-marbles';

import * as BreweryActions from './brewery.actions';
import { BreweryEffects } from './brewery.effects';
import { BreweriesService } from '../breweries.service';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer, BreweriesState } from './brewery.reducers';
import { Observable, of } from 'rxjs';
import { Brewery } from '..';

describe('BreweriesEffects', () => {
  let actions$: Observable<any>;
  let state: BreweriesState;
  let service: jasmine.SpyObj<BreweriesService>;
  let router: jasmine.SpyObj<Router>;
  let sut: BreweryEffects;

  beforeEach(() => {
    service = jasmine.createSpyObj<BreweriesService>(['query', 'get']);
    router = jasmine.createSpyObj<Router>(['navigate']);
    state = {
      searchCriteria: null,
      results: null,
      errors: null
    };

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        {
          provide: BreweriesService,
          useValue: service
        },
        {
          provide: Router,
          useValue: router
        },
        BreweryEffects
      ],
      imports: [
          StoreModule.forRoot({}),
          StoreModule.forFeature('breweries', reducer)
      ]
    });
    
    sut = TestBed.get(BreweryEffects);
  });

  it('should create an instance', () => {
    expect(sut).toBeTruthy();
  });

  describe(`loadSearchResults`, () => {

    beforeEach(() => {
      state.searchCriteria = {pageIndex: 0, pageSize: 10};
    });
    
    describe(`Success`, () => {
        it('should return list of brewerys', () => {
            state.results = {items:[], loading: false};

            const action = new BreweryActions.LoadBreweries(state.searchCriteria);
            const completion = new BreweryActions.LoadBreweriesSuccess(state.results);

            actions$ = of(action);
            const response = cold('-a|', { a: state.results });
            const expected = cold('-b|', { b: completion });
            service.query.and.returnValue(response);

            expect(sut.loadSearchResults$).toBeObservable(expected);
        });
    });

    describe(`Fail`, () => {
      xit('should return error message', () => {
          state.errors.message = 'error';

          const action = new BreweryActions.LoadBreweries(state.searchCriteria);
          const completion = new BreweryActions.LoadBreweriesFail(state.errors.message);

          actions$ = of(action);
          const response = cold('-a#', { a: state.results = null });
          const expected = cold('-b|', { b: completion });
          service.query.and.returnValue(expected);

          expect(sut.loadSearchResults$).toBeObservable(expected);
      });
    });
  });

  describe(`getBrewery`, () => {

    beforeEach(() => {
      state.currentBreweryId = 1;
    });
    
    describe(`Success`, () => {
        it('should return brewery', () => {
            state.currentBrewery = new Brewery();

            const action = new BreweryActions.LoadBrewery(state.currentBreweryId);
            const completion = new BreweryActions.LoadBrewerySuccess(state.currentBrewery);

            actions$ = of(action);
            const response = cold('-a|', { a: state.currentBrewery });
            const expected = cold('-b|', { b: completion });
            service.get.and.returnValue(response);

            expect(sut.getBrewery$).toBeObservable(expected);
        });
    });

    describe(`Fail`, () => {
      xit('should return error message', () => {
          state.errors.message = 'error'

          const action = new BreweryActions.LoadBrewery(state.currentBreweryId);
          const completion = new BreweryActions.LoadBreweryFail(state.errors.message);

          actions$ = of(action);
          const response = cold('-a#', { a: state.currentBrewery = null });
          const expected = cold('-b|', { b: completion });
          service.get.and.returnValue(expected);

          expect(sut.getBrewery$).toBeObservable(expected);
      });
    });
  });

  describe('Navigate to Brewery', () => {
    it('should navigate to the brewery route', () => { 
        state.currentBreweryId = 1;

        const action = new BreweryActions.NavigateToBreweryRoute(state.currentBreweryId);
        
        actions$ = of(action);
        sut.navigateToBrewery$.subscribe();

        expect(router.navigate).toHaveBeenCalledWith(['brewerys/1']);
    });
  });
});
