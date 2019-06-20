import * as fromCharacters from './index';
import * as charactersActions from './characters.actions';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { mergeMap, map, catchError, debounceTime, withLatestFrom, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
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
        .pipe(
            ofType(charactersActions.CharactersActionTypes.LoadCharacters), 
            mergeMap(this.getCharacters.bind(this)), 
            catchError(this.getCharactersFailed.bind(this))
        );

    @Effect()
    reloadSearch$: Observable<Action> = this.actions$.pipe(
        ofType(charactersActions.CharactersActionTypes.ReloadCharacters), 
        withLatestFrom(this.searchCriteriaStream$), 
        map(([, criteria]) => new charactersActions.LoadCharacters(criteria))
    );

    @Effect()
    getCharacter$: Observable<Action> = this.actions$.pipe(
        ofType(charactersActions.CharactersActionTypes.LoadCharacter), 
        mergeMap(this.getCharacter.bind(this)), 
        catchError((err) => of(new charactersActions.LoadCharacterFail(err)))
    );

    @Effect( { dispatch: false })
    navigateToCharacter$ = this.actions$.pipe(
        ofType(charactersActions.CharactersActionTypes.NavigateToCharacterRoute),
        map((action: charactersActions.NavigateToCharacterRoute) => action.characterId),
        tap(id => this.router.navigate([`characters/${id}`]))
    );

    private getCharacter(action: charactersActions.LoadCharacter): Observable<charactersActions.LoadCharacterSuccess> {
        return this.service.get(action.characterId).pipe(map((result) => new charactersActions.LoadCharacterSuccess(result)));
    }

    private getCharacters(action: charactersActions.LoadCharacters): Observable<charactersActions.LoadCharactersSuccess> {
        return this.service.query(action.payload).pipe(map((results) => new charactersActions.LoadCharactersSuccess(results)));
    }

    private getCharactersFailed(err: any): Observable<charactersActions.LoadCharactersFail> {
        return of(new charactersActions.LoadCharactersFail(err));
    }
}
