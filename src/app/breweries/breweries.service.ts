import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPagedResults } from '../pagedResults';
import { IBrewery, ISearchCriteria } from '.';

@Injectable({
  providedIn: 'root'
})
export class BreweriesService {

  constructor(private http: HttpClient){ }

  query(criteria: ISearchCriteria): Observable<IPagedResults<IBrewery>> {
    const url = `https://api.openbrewerydb.org/breweries?sort=+name&page=${criteria.pageIndex+1}&per_page=${criteria.pageSize}`;
    
    return this.http.get<Array<IBrewery>>(url).pipe(map(data => { 
      return {
        items: data,
        loading: false,
        pageIndex: criteria.pageIndex,
        pageSize: criteria.pageSize,
        totalItems: 100
      };
    }));
  }

  get(id: number): Observable<IBrewery> {
    const url = `https://api.openbrewerydb.org/breweries/${id}`;
    
    return this.http.get<IBrewery>(url);
  }

}
