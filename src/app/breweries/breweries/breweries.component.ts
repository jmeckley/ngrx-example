import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBrewery, ISearchCriteria } from '..';
import { IPagedResults } from 'src/app/pagedResults';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})
export class BreweriesComponent implements OnInit {

  @Input() results: IPagedResults<IBrewery>;
  @Input() criteria: ISearchCriteria;
  @Output() pageChanged = new EventEmitter<ISearchCriteria>();
  @Output() viewBrewery = new EventEmitter<IBrewery>();

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);

    if (this.results === undefined) {
      this.results = { items: [], loading: false };
    }
  }

  changePage(page: number) {
    this.pageChanged.emit({...this.criteria, pageIndex: page - 1});
  }

  view(brewery: IBrewery) {
    this.viewBrewery.emit(brewery);
  }

}
