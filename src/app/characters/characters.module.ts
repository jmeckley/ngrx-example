import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { CharactersShellComponent } from './characters-shell/characters-shell.component';
import { CharacterShellComponent } from './character-shell/character-shell.component';
import { reducer } from './state/characters.reducers';
import { CharactersEffects } from './state/characters.effects';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { CharactersComponent } from './characters/characters.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CharacterComponent } from './character/character.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CharactersShellComponent, 
    CharacterShellComponent, 
    CharactersComponent, CharacterComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    StoreModule.forFeature('characters', reducer),
    EffectsModule.forFeature([CharactersEffects]),
    HttpClientModule
  ]
})
export class CharactersModule { }
