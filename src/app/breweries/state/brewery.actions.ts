import { Action } from '@ngrx/store';
import { IPagedResults } from '../../pagedResults';
import { IBrewery, ISearchCriteria } from '../';

export enum BreweryActionTypes {
  LoadBreweries = '[Breweries][Load] Load Breweries',
  ReloadBreweries = '[Breweries][Load] Reload Breweries',
  LoadBreweriesSuccess = '[Breweries][Load] Load Breweries Success',
  LoadBreweriesFail = '[Breweries][Load] Load Breweries Failure',
  LoadBrewery = '[Brewery][Load] Load Brewery',
  LoadBrewerySuccess = '[Brewery][Load] Load Brewery Success',
  LoadBreweryFail = '[Brewery][Load] Load Brewery Failure',
  ClearCurrentBrewery = '[Brewery][Load] Clear Brewery',
  NavigateToBreweryRoute = '[Brewery][Navigate] To Brewery',
}

export class LoadBreweries implements Action {
  readonly type = BreweryActionTypes.LoadBreweries;
  constructor(public payload: ISearchCriteria) { }
}
export class ReloadBreweries implements Action {
  readonly type = BreweryActionTypes.ReloadBreweries;
}
export class LoadBreweriesSuccess implements Action {
  readonly type = BreweryActionTypes.LoadBreweriesSuccess;
  constructor(public brewerys: IPagedResults<IBrewery>) { }
}
export class LoadBreweriesFail implements Action {
  readonly type = BreweryActionTypes.LoadBreweriesFail;
  constructor(public error: string) { }
}

export class LoadBrewery implements Action {
  readonly type = BreweryActionTypes.LoadBrewery;
  constructor(public breweryId: number) { }
}
export class LoadBrewerySuccess implements Action {
  readonly type = BreweryActionTypes.LoadBrewerySuccess;
  constructor(public brewery: IBrewery) { }
}
export class LoadBreweryFail implements Action {
  readonly type = BreweryActionTypes.LoadBreweryFail;
  constructor(public error: string) { }
}

export class NavigateToBreweryRoute implements Action {
  readonly type = BreweryActionTypes.NavigateToBreweryRoute;
  constructor(public breweryId: number) { }
}

export class ClearCurrentBrewery implements Action {
  readonly type = BreweryActionTypes.ClearCurrentBrewery;
  constructor() { }
}

export type BreweriesActions = LoadBreweries | ReloadBreweries | LoadBreweriesSuccess | LoadBreweriesFail | LoadBrewery | LoadBrewerySuccess | LoadBreweryFail | NavigateToBreweryRoute | ClearCurrentBrewery;