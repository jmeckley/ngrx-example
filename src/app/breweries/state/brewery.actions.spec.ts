import { BreweryActionTypes, LoadBreweries, LoadBreweriesFail, LoadBreweriesSuccess, ReloadBreweries, LoadBrewery, LoadBrewerySuccess, LoadBreweryFail, NavigateToBreweryRoute, ClearCurrentBrewery } from './brewery.actions';
import { Brewery } from '..';

describe('LoadBreweries', () => {
  it('should create an instance', () => {
    expect(new LoadBreweries({pageIndex: 0, pageSize: 10})).toBeTruthy();
  });
});

describe('ReloadBreweries', () => {
  it('should create an instance', () => {
    expect(new ReloadBreweries()).toBeTruthy();
  });
});

describe('LoadBreweriesFail', () => {
  it('should create an instance', () => {
    expect(new LoadBreweriesFail('failure')).toBeTruthy();
  });
});

describe('LoadBreweriesSuccess', () => {
  it('should create an instance', () => {
    expect(new LoadBreweriesSuccess({items:[], loading: false})).toBeTruthy();
  });
});

describe('LoadBrewery', () => {
  it('should create an instance', () => {
    expect(new LoadBrewery(1)).toBeTruthy();
  });
});

describe('LoadBrewerySuccess', () => {
  it('should create an instance', () => {
    expect(new LoadBrewerySuccess(new Brewery())).toBeTruthy();
  });
});

describe('LoadBreweryFail', () => {
  it('should create an instance', () => {
    expect(new LoadBreweryFail('error')).toBeTruthy();
  });
});

describe('NavigateToBreweryRoute', () => {
  it('should create an instance', () => {
    expect(new NavigateToBreweryRoute(1)).toBeTruthy();
  });
});

describe('ClearCurrentBrewery', () => {
  it('should create an instance', () => {
    expect(new ClearCurrentBrewery()).toBeTruthy();
  });
});

describe('BreweryActionTypes', () => {
  it('should define Load', () => {
    expect(BreweryActionTypes.LoadBreweries).toBe('[Breweries][Load] Load Breweries');
  });

  it('should define Load Failure', () => {
    expect(BreweryActionTypes.LoadBreweriesFail).toBe('[Breweries][Load] Load Breweries Failure');
  });

  it('should define Load Success', () => {
    expect(BreweryActionTypes.LoadBreweriesSuccess).toBe('[Breweries][Load] Load Breweries Success');
  });

  it('should define Load Success', () => {
    expect(BreweryActionTypes.ReloadBreweries).toBe('[Breweries][Load] Reload Breweries');
  });

  it('should define Load Brewery', () => {
    expect(BreweryActionTypes.LoadBrewery).toBe('[Brewery][Load] Load Brewery');
  });

  it('should define Load Brewery Success', () => {
    expect(BreweryActionTypes.LoadBrewerySuccess).toBe('[Brewery][Load] Load Brewery Success');
  });

  it('should define Load Brewery Fail', () => {
    expect(BreweryActionTypes.LoadBreweryFail).toBe('[Brewery][Load] Load Brewery Failure');
  });

  it('should define Navigate to Brewery Route', () => {
    expect(BreweryActionTypes.NavigateToBreweryRoute).toBe('[Brewery][Navigate] To Brewery');
  });

  it('should define Clear Current Brewery', () => {
    expect(BreweryActionTypes.ClearCurrentBrewery).toBe('[Brewery][Load] Clear Brewery');
  });
});
