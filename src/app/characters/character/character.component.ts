import { Component, OnInit, Input } from '@angular/core';
import { ICharacter } from '../state/character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() character: ICharacter;
  @Input() errorMessage: string;

  constructor() { }

  ngOnInit() {
    if (this.character === undefined) {
      this.character = { id:null, name:null };
    }
  }

}
