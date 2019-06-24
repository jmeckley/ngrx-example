import * as fromBrewerys from './index';
import { Brewery } from '..';

describe(`brewerysSelectors`, () => {

  let defaultState: fromBrewerys.State;
  
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
      const result = fromBrewerys.getBreweries(defaultState);
      expect(result.pageIndex).toBe(0);
      expect(result.pageSize).toBe(10);
    });

    it('error should not have errors', () => {
      const result = fromBrewerys.getBreweriesError(defaultState);
      expect(result).not.toBeDefined();
    });

    it('success should have two brewerys', () => {
      const result = fromBrewerys.getBreweriesSuccess(defaultState);
      expect(result.items.length).toBe(2);
    });
  });

  describe('Get Brewery', () => {
    it('should have search criteria defined', () => {
      const result = fromBrewerys.getBrewery(defaultState);
      expect(result).toBe(defaultState.breweries.currentBreweryId);
    });

    it('error should not have errors', () => {
      const result = fromBrewerys.getBreweryError(defaultState);
      expect(result).not.toBeDefined();
    });

    it('success should have two brewerys', () => {
      const result = fromBrewerys.getBrewerySuccess(defaultState);
      expect(result).toBe(defaultState.breweries.currentBrewery);
    });
  });

});
