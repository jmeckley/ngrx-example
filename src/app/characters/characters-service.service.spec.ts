import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

import { CharactersService, IMarvelResponse } from './characters-service.service';
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
    const response = <IMarvelResponse> {
      code: 200,
      status: 'ok',
      copyright: '',
      attributionText: '',
      attributionHTML: '',
      data: {
        limit: 10,
        offset: 10,
        total: 300,
        count: 4,
        results: [{id:1, name: 'name', thumbnail: {path: 'image', extension: 'png'}}]
      },
      etag: ''
    };
    const expected = <IPagedResults<ICharacter>>{
      items: [{id:1, name: 'name'}],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      totalItems: 300
    }

    sut.query({pageIndex: 0, pageSize:10}).subscribe(result => expect(result).toEqual(expected));

    const req = httpTestingController.expectOne(`https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=10&offset=0&apikey=ebdee8e76ad36b82d00317c821623194`);
    expect(req.request.method).toEqual('GET');
    req.flush(response);
  });

  it('get should return character', () => {
    const marvelCharacter = {id:1, name: 'name', thumbnail: {path: 'image', extension: 'png'}};
    const expected = {id:1, name: 'name', imageUrl: 'image.png'};

    sut.get(1).subscribe(result => expect(result).toEqual(expected));

    const req = httpTestingController.expectOne(`https://gateway.marvel.com:443/v1/public/characters/1?apikey=ebdee8e76ad36b82d00317c821623194`);
    expect(req.request.method).toEqual('GET');
    req.flush(marvelCharacter);
  });
});
