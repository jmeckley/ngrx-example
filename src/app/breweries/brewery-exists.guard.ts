import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { filter, take, map, catchError } from 'rxjs/operators';

import { getBrewerySuccess, State } from './state';
import { LoadBrewery } from './state/brewery.actions';

@Injectable()
export class BreweryExistsGuard implements CanActivate {
    private loaded = false;

    constructor(private store: Store<State>) { 
        this.store.select(getBrewerySuccess).subscribe(_ => this.loaded = _.loaded);
    }

    waitToLoad(): Observable<boolean> {
        return this.store.pipe(
            select(getBrewerySuccess),
            map(current => current.loaded), 
            filter(loaded => loaded),
            take(1),
            catchError(err => of(false))
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
        if (this.loaded) return true;
        
        this.store.dispatch(new LoadBrewery(route.params.id));

        return this.waitToLoad();
    }
}
