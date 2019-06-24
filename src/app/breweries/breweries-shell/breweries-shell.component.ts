import { Component, OnInit } from '@angular/core';
import { IBrewery, ISearchCriteria } from '..';
import { Observable } from 'rxjs';
import { IPagedResults } from 'src/app/pagedResults';
import { Store, select } from '@ngrx/store';

import * as fromBreweries from '../state';
import * as actions from '../state/brewery.actions';

@Component({
  selector: 'app-breweries-shell',
  templateUrl: './breweries-shell.component.html',
  styleUrls: ['./breweries-shell.component.scss']
})
export class BreweriesShellComponent implements OnInit {

  pageTitle = 'Breweries';
  criteria$: Observable<ISearchCriteria>;
  results$: Observable<IPagedResults<IBrewery>>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromBreweries.State>) {}

  ngOnInit() {
    this.store.dispatch(new actions.ReloadBreweries());

    this.results$ = this.store.pipe(select(fromBreweries.getBreweriesSuccess));
    this.errorMessage$ = this.store.pipe(select(fromBreweries.getBreweriesError));
    this.criteria$ = this.store.pipe(select(fromBreweries.getBreweries));
  }

  view(brewery: IBrewery) {
    this.store.dispatch(new actions.ClearCurrentBrewery());
    this.store.dispatch(new actions.NavigateToBreweryRoute(brewery.id));
  }

  query(criteria: ISearchCriteria) {
    this.store.dispatch(new actions.LoadBreweries(criteria));
  }
}
