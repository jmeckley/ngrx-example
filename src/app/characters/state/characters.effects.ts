import * as fromCharacters from './index';
import * as charactersActions from './characters.actions';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { mergeMap, map, catchError, debounceTime, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IPagedResults } from '../../pagedResults';
import { ICharacter } from './character';
import { CharactersService } from '../characters-service.service';

const SEARCH_DEBOUNCE_TIME_MS = 250;

@Injectable()
export class CharactersEffects {
    constructor(
        private actions$: Actions,
        private store: Store<fromCharacters.State>,
        private service: CharactersService,
        private router: Router
      ) { }

    private searchCriteriaStream$ = this.store.select(mf => mf.characters.searchCriteria);

    @Effect()
    loadSearchResults$: Observable<Action> = this.actions$
    .pipe(debounceTime(SEARCH_DEBOUNCE_TIME_MS))
    .pipe(ofType(charactersActions.CharactersActionTypes.LoadCharacters), mergeMap(this.getCharacters.bind(this)), catchError(this.getCharactersFailed.bind(this)));

    @Effect()
    reloadSearch$: Observable<Action> = this.actions$.pipe(
        ofType(charactersActions.CharactersActionTypes.ReloadCharacters), 
        withLatestFrom(this.searchCriteriaStream$), 
        map(([, criteria]) => new charactersActions.LoadCharacters(criteria))
    );

    private getCharacters(action: charactersActions.LoadCharacters): Observable<charactersActions.LoadCharactersSuccess> {
        return this.service.query(action.payload).pipe(map(this.transform));
    }

    private transform(results: IPagedResults<ICharacter>): charactersActions.LoadCharactersSuccess {
        return new charactersActions.LoadCharactersSuccess(results);
    }

    private getCharactersFailed(err: any): Observable<charactersActions.LoadCharactersFail> {
        return of(new charactersActions.LoadCharactersFail(err));
    }
}
