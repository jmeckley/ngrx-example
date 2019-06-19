import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { cold } from 'jasmine-marbles';

import * as CharacterActions from './characters.actions';
import { CharactersEffects } from './characters.effects';
import { CharactersService } from '../characters-service.service';
import { Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { reducer, CharactersState } from './characters.reducers';
import { Observable, of } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

describe('CharactersEffects', () => {
  let actions$: Observable<any>;
  let state: CharactersState;
  let service: jasmine.SpyObj<CharactersService>;
  let router: jasmine.SpyObj<Router>;
  let sut: CharactersEffects;

  beforeEach(() => {
    service = jasmine.createSpyObj<CharactersService>(['query']);
    router = jasmine.createSpyObj<Router>(['navigate']);
    state = {
      searchCriteria: {pageIndex: 0, pageSize: 10},
      results:{items:[], loading: false},
      errors:{}
    };

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        {
          provide: CharactersService,
          useValue: service
        },
        {
          provide: Router,
          useValue: router
        },
        CharactersEffects
      ],
      imports: [
          StoreModule.forRoot({}),
          StoreModule.forFeature('characters', reducer)
      ]
    });
    
    sut = TestBed.get(CharactersEffects);
  });

  it('should create an instance', () => {
    expect(sut).toBeTruthy();
  });

  describe(`loadSearchResults`, () => {
    
    describe(`Success`, () => {
        it('should return list of characters', () => {
            const action = new CharacterActions.LoadCharacters(state.searchCriteria);
            const completion = new CharacterActions.LoadCharactersSuccess(state.results);

            actions$ = of(action);
            const response = cold('-a|', { a: state.results });
            const expected = cold('-b|', { b: completion });
            service.query.and.returnValue(response);

            expect(sut.loadSearchResults$).toBeObservable(expected);
        });
    });

    describe(`Fail`, () => {
      xit('should return error message', () => {
          const action = new CharacterActions.LoadCharacters(state.searchCriteria);
          const completion = new CharacterActions.LoadCharactersFail(state.errors.message = 'error');

          actions$ = of(action);
          const response = cold('-a#', { a: state.results = null });
          const expected = cold('-b|', { b: completion });
          service.query.and.returnValue(expected);

          expect(sut.loadSearchResults$).toBeObservable(expected);
      });
    });
  });
});
