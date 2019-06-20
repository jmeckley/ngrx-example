import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacter } from '../state/character';
import { Store, select } from '@ngrx/store';

import * as fromCharacters from '../state';

@Component({
  selector: 'app-character-shell',
  templateUrl: './character-shell.component.html',
  styleUrls: ['./character-shell.component.scss']
})
export class CharacterShellComponent implements OnInit {

  pageTitle = 'Marvel Character';
  character$: Observable<ICharacter>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromCharacters.State>) {}

  ngOnInit() {
    this.character$ = this.store.pipe(select(fromCharacters.getCharacterSuccess));
    this.errorMessage$ = this.store.pipe(select(fromCharacters.getCharacterError));
  }

}
