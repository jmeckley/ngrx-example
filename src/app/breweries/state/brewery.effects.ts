import * as fromBreweries from './index';
import * as breweryActions from './brewery.actions';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { mergeMap, map, catchError, debounceTime, withLatestFrom, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BreweriesService } from '../breweries.service';

const SEARCH_DEBOUNCE_TIME_MS = 250;

@Injectable()
export class BreweryEffects {
    constructor(
        private actions$: Actions,
        private store: Store<fromBreweries.State>,
        private service: BreweriesService,
        private router: Router
      ) { }

    private searchCriteriaStream$ = this.store.select(mf => mf.breweries.searchCriteria);

    @Effect()
    loadSearchResults$: Observable<Action> = this.actions$
        .pipe(debounceTime(SEARCH_DEBOUNCE_TIME_MS))
        .pipe(
            ofType(breweryActions.BreweryActionTypes.LoadBreweries), 
            mergeMap(this.getBreweries.bind(this)), 
            catchError(this.getBreweriesFailed.bind(this))
        );

    @Effect()
    reloadSearch$: Observable<Action> = this.actions$.pipe(
        ofType(breweryActions.BreweryActionTypes.ReloadBreweries), 
        withLatestFrom(this.searchCriteriaStream$), 
        map(([, criteria]) => new breweryActions.LoadBreweries(criteria))
    );

    @Effect()
    getBrewery$: Observable<Action> = this.actions$.pipe(
        ofType(breweryActions.BreweryActionTypes.LoadBrewery), 
        mergeMap(this.getBrewery.bind(this)), 
        catchError((err) => of(new breweryActions.LoadBreweryFail(err)))
    );

    @Effect({ dispatch: false })
    navigateToBrewery$ = this.actions$.pipe(
        ofType(breweryActions.BreweryActionTypes.NavigateToBreweryRoute),
        map((action: breweryActions.NavigateToBreweryRoute) => action.breweryId),
        tap(id => this.router.navigate([`breweries/${id}`]))
    );

    private getBrewery(action: breweryActions.LoadBrewery): Observable<breweryActions.LoadBrewerySuccess> {
        return this.service.get(action.breweryId).pipe(map((result) => new breweryActions.LoadBrewerySuccess(result)));
    }

    private getBreweries(action: breweryActions.LoadBreweries): Observable<breweryActions.LoadBreweriesSuccess> {
        return this.service.query(action.payload).pipe(map((results) => new breweryActions.LoadBreweriesSuccess(results)));
    }

    private getBreweriesFailed(err: any): Observable<breweryActions.LoadBreweriesFail> {
        return of(new breweryActions.LoadBreweriesFail(err));
    }
}
