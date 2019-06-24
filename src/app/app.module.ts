import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CharactersModule } from './characters/characters.module';
import { CharactersRoutingModule } from './characters/characters-routing.module';
import { reducers } from './state/app.reducer';
import { environment } from 'src/environments/environment';
import { BreweriesShellComponent } from './breweries/breweries-shell/breweries-shell.component';
import { BreweriesComponent } from './breweries/breweries/breweries.component';
import { BreweryComponent } from './breweries/brewery/brewery.component';
import { BreweryShellComponent } from './breweries/brewery-shell/brewery-shell.component';

@NgModule({
  declarations: [
    AppComponent,
    BreweriesShellComponent,
    BreweriesComponent,
    BreweryComponent,
    BreweryShellComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CharactersRoutingModule,
    NgbModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    CharactersModule,
    StoreDevtoolsModule.instrument({
      name: 'sample app Devtools',
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
