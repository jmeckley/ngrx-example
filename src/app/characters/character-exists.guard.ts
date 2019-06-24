import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { filter, take, map, catchError } from 'rxjs/operators';

import { LoadCharacter } from './state/characters.actions';
import { getCharacterSuccess, State } from './state';

@Injectable()
export class CharacterExistsGuard implements CanActivate {
    private loaded = false;

    constructor(private store: Store<State>) {
        this.store.select(getCharacterSuccess).subscribe(_ => this.loaded = _.loaded);
     }

     waitToLoad(): Observable<boolean> {
        return this.store.pipe(
            select(getCharacterSuccess),
            map(_ => _.loaded), 
            filter(loaded => loaded),
            take(1),
            catchError(err => of(false))
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
        if (this.loaded) return true;
        
        this.store.dispatch(new LoadCharacter(route.params.id));

        return this.waitToLoad();
    }
}
