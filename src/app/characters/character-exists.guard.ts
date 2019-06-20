import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { ICharacter } from './state/character';
import { filter, take, map, catchError } from 'rxjs/operators';
import { LoadCharacter } from './state/characters.actions';

import { CharactersState } from './state/characters.reducers';
import { getCharacterSuccess } from './state';

@Injectable()
export class CharacterExistsGuard implements CanActivate {
    private loaded = false;

    constructor(private store: Store<CharactersState>) {
        this.store.select(getCharacterSuccess).subscribe(character => this.loaded = this.exists(character));
    }

    waitToLoad(): Observable<boolean> {
        return this.store.pipe(
            select(getCharacterSuccess),
            filter(character => this.exists(character)),
            take(1),
            map(character => true), 
            catchError(err=> of(false))
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        if (this.loaded) return of(true);

        this.store.dispatch(new LoadCharacter(route.params.id));

        return this.waitToLoad();
    }

    private exists(character: ICharacter): boolean {
        return character !== null || character !== undefined;
    }
}
