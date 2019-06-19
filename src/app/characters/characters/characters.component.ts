import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICharacter, ISearchCriteria } from '../state/character';
import { IPagedResults } from '../../pagedResults';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  @Input() results: IPagedResults<ICharacter>;
  @Input() criteria: ISearchCriteria;
  @Output() pageChanged = new EventEmitter<ISearchCriteria>();
  @Output() viewCharacter = new EventEmitter<ICharacter>();

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

  view(charcater: ICharacter) {
    this.viewCharacter.emit(charcater);
  }

}
