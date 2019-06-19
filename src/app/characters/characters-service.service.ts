import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISearchCriteria, ICharacter } from './state/character';
import { Observable } from 'rxjs';
import { IPagedResults } from '../pagedResults';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private apiKey = environment.apiKey;
  
  constructor(private http: HttpClient){ }

  query(criteria: ISearchCriteria): Observable<IPagedResults<ICharacter>> {
    const url = `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=${criteria.pageSize}&offset=${criteria.pageIndex*criteria.pageSize}&apikey=${this.apiKey}`;
    
    return this.http.get<IMarvelResponse>(url).pipe(map((response: IMarvelResponse): IMarvelResults => response.data)).pipe(map(this.toPageOfCharacters));
  }

  private toPageOfCharacters(data: IMarvelResults): IPagedResults<ICharacter> {
    return {
      items: data.results.map(this.toCharacter),
      loading: false,
      pageIndex: data.offset / data.limit,
      pageSize: data.limit,
      totalItems: data.total
    };
  }

  private toCharacter(character: IMarvelCharacter): ICharacter {
    const thumbnail = character.thumbnail;
    return {
      id: character.id,
      name: character.name,
      imageUrl: `${thumbnail.path}.${thumbnail.extension}`
    };
  }
}

interface IMarvelResults {
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: Array<IMarvelCharacter> 
}

interface IMarvelCharacter {
  id: number,
  name: string,
  description: string,
  modified: Date,
  resourceURI: string,
  urls: [
    {
      type: string,
      url: string
    }
  ],
  thumbnail: {
    path: string,
    extension: string
  },
  comics: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  },
  stories: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string,
        type: string
      }
    ]
  },
  events: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  },
  series: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  }
}

interface IMarvelResponse {
  code: number,
  status: string,
  copyright: string,
  attributionText: string,
  attributionHTML: string,
  data: IMarvelResults,
  etag: string
}
