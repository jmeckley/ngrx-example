import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersShellComponent } from './characters-shell/characters-shell.component';
import { CharacterShellComponent } from './character-shell/character-shell.component';
import { CharacterExistsGuard } from './character-exists.guard';

const routes: Routes = [
  {
    path:  'characters',
    component: CharactersShellComponent,
    children: [
      { 
        path: ':id', 
        component: CharacterShellComponent, 
        canActivate: [CharacterExistsGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
