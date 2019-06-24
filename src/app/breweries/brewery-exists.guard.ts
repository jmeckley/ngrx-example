import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { filter, take, map, catchError } from 'rxjs/operators';

import { getBrewerySuccess } from './state';
import { BreweriesState } from './state/brewery.reducers';
import { LoadBrewery } from './state/brewery.actions';
import { IBrewery } from '.';

@Injectable()
export class BreweryExistsGuard implements CanActivate {
    private loaded = false;

    constructor(private store: Store<BreweriesState>) {
        this.store.select(getBrewerySuccess).subscribe(brewery => this.loaded = this.exists(brewery));
    }

    waitToLoad(): Observable<boolean> {
        return this.store.pipe(
            select(getBrewerySuccess),
            filter(brewery => this.exists(brewery)),
            take(1),
            map(brewery => true), 
            catchError(err=> of(false))
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        if (this.loaded) return of(true);

        this.store.dispatch(new LoadBrewery(route.params.id));

        return this.waitToLoad();
    }

    private exists(brewery: IBrewery): boolean {
        return brewery !== null || brewery !== undefined;
    }
}
