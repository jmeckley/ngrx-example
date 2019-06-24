import * as fromBreweries from './state';
import { Brewery } from '.';

describe(`brewerysSelectors`, () => {

  let defaultState: fromBreweries.State;
  
  beforeEach(() => {
    defaultState = {
      router: null,
      breweries: {
        currentBreweryId: 100,
        currentBrewery: new Brewery(),
        searchCriteria: {pageIndex: 0, pageSize: 10},
        results: {items:[new Brewery(), new Brewery()], loading: false},
        errors: {}
      }
    };
  });

  describe('Get Brewerys', () => {
    it('should have search criteria defined', () => {
      const result = fromBreweries.getBreweries(defaultState);
      expect(result.pageIndex).toBe(0);
      expect(result.pageSize).toBe(10);
    });

    it('error should not have errors', () => {
      const result = fromBreweries.getBreweriesError(defaultState);
      expect(result).not.toBeDefined();
    });

    it('success should have two brewerys', () => {
      const result = fromBreweries.getBreweriesSuccess(defaultState);
      expect(result.items.length).toBe(2);
    });
  });

  describe('Get Brewery', () => {
    it('should have search criteria defined', () => {
      const result = fromBreweries.getBrewery(defaultState);
      expect(result).toBe(defaultState.breweries.currentBreweryId);
    });

    it('error should not have errors', () => {
      const result = fromBreweries.getBreweryError(defaultState);
      expect(result).not.toBeDefined();
    });

    it('success should have two brewerys', () => {
      const result = fromBreweries.getBrewerySuccess(defaultState);
      expect(result).toBe(defaultState.breweries.currentBrewery);
    });
  });

});
