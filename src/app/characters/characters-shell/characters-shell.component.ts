import { Component, OnInit } from '@angular/core';
import { ISearchCriteria, ICharacter } from '../state/character';
import { Observable } from 'rxjs';
import { IPagedResults } from '../../pagedResults';
import { Store, select } from '@ngrx/store';

import * as fromCharacters from '../state';
import * as actions from '../state/characters.actions';

@Component({
  selector: 'app-characters-shell',
  templateUrl: './characters-shell.component.html',
  styleUrls: ['./characters-shell.component.scss']
})
export class CharactersShellComponent implements OnInit {

  pageTitle = 'Marvel Characters';
  criteria$: Observable<ISearchCriteria>;
  results$: Observable<IPagedResults<ICharacter>>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromCharacters.State>) {}

  ngOnInit() {
    this.store.dispatch(new actions.ReloadCharacters());

    this.results$ = this.store.pipe(select(fromCharacters.getCharactersSuccess));
    this.errorMessage$ = this.store.pipe(select(fromCharacters.getCharactersError));
    this.criteria$ = this.store.pipe(select(fromCharacters.getCharacters));
  }

  view(id: number) {
    alert('implement view character');
    //this.store.dispatch(new actions.ClearCurrentpolicy());
    //this.store.dispatch(new actions.ViewCharacter(id));
  }

  goTo(criteria: ISearchCriteria) {
    this.store.dispatch(new actions.LoadCharacters(criteria));
  }

  query(criteria: ISearchCriteria) {
    this.store.dispatch(new actions.LoadCharacters(criteria));
  }
}
