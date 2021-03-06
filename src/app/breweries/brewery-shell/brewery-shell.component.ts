import { Component, OnInit } from '@angular/core';
import { IBrewery } from '..';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromBreweries from '../state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-brewery-shell',
  templateUrl: './brewery-shell.component.html',
  styleUrls: ['./brewery-shell.component.scss']
})
export class BreweryShellComponent implements OnInit {

  pageTitle = 'Brewery';
  brewery$: Observable<IBrewery>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromBreweries.State>) {}

  ngOnInit() {
    this.brewery$ = this.store.pipe(select(fromBreweries.getBrewerySuccess), map(_ => _.item));
    this.errorMessage$ = this.store.pipe(select(fromBreweries.getBreweryError));
  }

}
