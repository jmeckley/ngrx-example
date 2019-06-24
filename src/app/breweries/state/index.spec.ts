import * as fromBrewerys from './index';
import { Brewery } from '..';

describe(`brewerySelectors`, () => {

  let defaultState: fromBrewerys.State;
  
  beforeEach(() => {
    defaultState = {
      breweries: {
        current: {id: 100, item: new Brewery(), loaded: true},
        searchCriteria: {pageIndex: 0, pageSize: 10},
        results: {items:[new Brewery(), new Brewery()], loading: false},
        errors: {}
      }
    };
  });

  describe('Get Breweries', () => {
    it('should have search criteria defined', () => {
      const result = fromBrewerys.getBreweries(defaultState);
      expect(result.pageIndex).toBe(0);
      expect(result.pageSize).toBe(10);
    });

    it('error should not have errors', () => {
      const result = fromBrewerys.getBreweriesError(defaultState);
      expect(result).not.toBeDefined();
    });

    it('success should have two breweries', () => {
      const result = fromBrewerys.getBreweriesSuccess(defaultState);
      expect(result.items.length).toBe(2);
    });
  });

  describe('Get Brewery', () => {
    it('should set current brewery id', () => {
      const result = fromBrewerys.getBrewery(defaultState);
      expect(result).toBe(defaultState.breweries.current.id);
    });

    it('error should have error message', () => {
      const result = fromBrewerys.getBreweryError(defaultState);
      expect(result).not.toBeDefined();
    });

    it('success should have current brewery', () => {
      const result = fromBrewerys.getBrewerySuccess(defaultState);
      expect(result).toBe(defaultState.breweries.current);
    });
  });

});
