import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreweriesShellComponent } from './breweries-shell/breweries-shell.component';
import { BreweryShellComponent } from './brewery-shell/brewery-shell.component';
import { BreweryExistsGuard } from './brewery-exists.guard';

const routes: Routes = [
  {
    path:  'breweries',
    component: BreweriesShellComponent,
    children: [
      { 
        path: ':id', 
        component: BreweryShellComponent, 
        canActivate: [BreweryExistsGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[BreweryExistsGuard]
})
export class BreweriesRoutingModule { }
