import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

import { CharactersService } from './characters-service.service';
import { IPagedResults } from '../pagedResults';
import { ICharacter } from './state/character';

describe('CharactersService', () => {
  let sut: CharactersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharactersService]
    });
    
    httpTestingController = TestBed.get(HttpTestingController);
    
    sut = TestBed.get(CharactersService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('query should return page of characters', () => {
    const expected = <IPagedResults<ICharacter>>{
      items: [{id:1, name: 'name'}],
      loading: false,
    }

    sut.query({pageIndex: 0, pageSize:10}).subscribe(result => expect(result).toEqual(expected));

    const req = httpTestingController.expectOne(`https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=10&offset=0&apikey=ebdee8e76ad36b82d00317c821623194`);
    expect(req.request.method).toEqual('GET');
    req.flush(expected);
  });
});
