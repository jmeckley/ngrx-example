import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreweriesShellComponent } from './breweries-shell/breweries-shell.component';
import { BreweriesComponent } from './breweries/breweries.component';
import { BreweryShellComponent } from './brewery-shell/brewery-shell.component';
import { BreweryComponent } from './brewery/brewery.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BreweryEffects } from './state/brewery.effects';
import { reducer } from './state/brewery.reducers';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BreweriesShellComponent,
    BreweriesComponent,
    BreweryShellComponent,
    BreweryComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    StoreModule.forFeature('breweries', reducer),
    EffectsModule.forFeature([BreweryEffects]),
    HttpClientModule
  ]
})
export class BreweriesModule { }
