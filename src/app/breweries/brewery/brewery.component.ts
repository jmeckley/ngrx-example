import { Component, OnInit, Input } from '@angular/core';
import { IBrewery, Brewery } from '..';

@Component({
  selector: 'app-brewery',
  templateUrl: './brewery.component.html',
  styleUrls: ['./brewery.component.scss']
})
export class BreweryComponent implements OnInit {

  @Input() brewery: IBrewery;
  @Input() errorMessage: string;

  constructor() { }

  ngOnInit() {
    if (this.brewery === undefined) {
      this.brewery = new Brewery();
    }
  }

}
