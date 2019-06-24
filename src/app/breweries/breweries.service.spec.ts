import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

import { BreweriesService } from './breweries.service';
import { IPagedResults } from '../pagedResults';
import { IBrewery, Brewery } from '.';

describe('BreweriesService', () => {
  let sut: BreweriesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BreweriesService]
    });
    
    httpTestingController = TestBed.get(HttpTestingController);
    
    sut = TestBed.get(BreweriesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('query should return page of breweries', () => {
    const breweries = [new Brewery()];
    const expected = <IPagedResults<IBrewery>>{
      items: breweries,
      loading: false,
      pageIndex: 0,
      pageSize: 10,
      totalItems: 100
    }

    sut.query({pageIndex: 0, pageSize:10}).subscribe(result => expect(result).toEqual(expected));

    const req = httpTestingController.expectOne(`https://api.openbrewerydb.org/breweries?sort=name&page=1&per_page=10`);
    expect(req.request.method).toEqual('GET');
    req.flush(breweries);
  });

  it('get should return character', () => {
    const expected = new Brewery();

    sut.get(1).subscribe(result => expect(result).toEqual(expected));

    const req = httpTestingController.expectOne(`https://api.openbrewerydb.org/breweries/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(expected);
  });
});
