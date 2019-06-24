import { reducer, BreweriesState } from './brewery.reducers';
import { ISearchCriteria, IBrewery, Brewery } from '../';
import { LoadBreweries, LoadBreweriesSuccess, LoadBreweriesFail, LoadBrewery, LoadBrewerySuccess, LoadBreweryFail, ClearCurrentBrewery } from './brewery.actions';
import { IPagedResults } from '../../pagedResults';

describe('Brewery reducer', () => {

  let state: BreweriesState;

  beforeEach(() => {
    state = {
      errors: {},
      searchCriteria: {pageIndex: 0, pageSize: 10},
      results: {items: [], loading: false}
    };
  });

  it('should create an instance', () => {
    expect(reducer).toBeTruthy();
  });
  
  describe('load breweries', () => {

    it('should return search criteria', () => {
      const criteria: ISearchCriteria = {
        pageIndex: 1,
        pageSize: 20,
      };
  
      const expected: BreweriesState = {
          ...state,
          searchCriteria: criteria,
      };
  
      const result = reducer(state, new LoadBreweries(criteria));
      expect(result).toEqual(expected);
    });
    
  });

  describe('load breweries success', () => {
    it('should return search results', () => {
      const results: IPagedResults<IBrewery> = {
        items:[new Brewery()],
        loading: false
      };
      
      const expected: BreweriesState = {
          ...state,
          results: results
      };

      const result = reducer(state, new LoadBreweriesSuccess(results));
      expect(result).toEqual(expected);
    });
  });

  describe('load breweries fail', () => {
    it('should return error message', () => {
      const error:string = 'error';
      
      const expected: BreweriesState = {
          ...state,
          errors: {message: error}
      };

      const result = reducer(state, new LoadBreweriesFail(error));
      expect(result).toEqual(expected);
    });
  });

  describe('load brewery', () => {

    it('should return the brewery id', () => {
      const id = 1;
  
      const expected: BreweriesState = {
          ...state,
          currentBreweryId: id,
      };
  
      const result = reducer(state, new LoadBrewery(id));
      expect(result).toEqual(expected);
    });
    
  });

  describe('load brewery success', () => {
    it('should return the brewery details', () => {
      const brewery: IBrewery = new Brewery();
      
      const expected: BreweriesState = {
          ...state,
          currentBrewery: brewery
      };

      const result = reducer(state, new LoadBrewerySuccess(brewery));
      expect(result).toEqual(expected);
    });
  });

  describe('load brewery fail', () => {
    it('should return error message', () => {
      const error:string = 'error';
      
      const expected: BreweriesState = {
          ...state,
          errors: {message: error}
      };

      const result = reducer(state, new LoadBreweryFail(error));
      expect(result).toEqual(expected);
    });
  });

  describe('clear brewery', () => {
    it('should set brewery and brewery id to null', () => {
      state.currentBrewery = new Brewery();
      state.currentBreweryId = 1;
      
      const expected: BreweriesState = {
          ...state,
          currentBrewery: null,
          currentBreweryId: null
      };

      const result = reducer(state, new ClearCurrentBrewery());
      expect(result).toEqual(expected);
    });
  });
});
