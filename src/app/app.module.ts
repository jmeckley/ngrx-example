import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { reducers } from './state/app.reducer';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CharactersModule } from './characters/characters.module';
import { CharactersRoutingModule } from './characters/characters-routing.module';

import { BreweriesModule } from './breweries/breweries.module';
import { BreweriesRoutingModule } from './breweries/breweries-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CharactersModule,
    CharactersRoutingModule,
    BreweriesModule,
    BreweriesRoutingModule,
    NgbModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'sample app Devtools',
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
