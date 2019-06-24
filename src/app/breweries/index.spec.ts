import * as fromBreweries from './state';
import { Brewery } from '.';

describe(`brewerySelectors`, () => {

  let defaultState: fromBreweries.State;
  
  beforeEach(() => {
    defaultState = {
      router: null,
      breweries: {
        current:{id: 100, item: new Brewery(), loaded: true},
        searchCriteria: {pageIndex: 0, pageSize: 10},
        results: {items:[new Brewery(), new Brewery()], loading: false},
        errors: {}
      }
    };
  });

  describe('Get Breweries', () => {
    it('should have search criteria defined', () => {
      const result = fromBreweries.getBreweries(defaultState);
      expect(result.pageIndex).toBe(0);
      expect(result.pageSize).toBe(10);
    });

    it('error should not have errors', () => {
      const result = fromBreweries.getBreweriesError(defaultState);
      expect(result).not.toBeDefined();
    });

    it('success should have two breweries', () => {
      const result = fromBreweries.getBreweriesSuccess(defaultState);
      expect(result.items.length).toBe(2);
    });
  });

  describe('Get Brewery', () => {
    it('should have search criteria defined', () => {
      const result = fromBreweries.getBrewery(defaultState);
      expect(result).toBe(defaultState.breweries.current.id);
    });

    it('error should not have errors', () => {
      const result = fromBreweries.getBreweryError(defaultState);
      expect(result).not.toBeDefined();
    });

    it('success should have two breweries', () => {
      const result = fromBreweries.getBrewerySuccess(defaultState);
      expect(result).toBe(defaultState.breweries.current);
    });
  });

});
