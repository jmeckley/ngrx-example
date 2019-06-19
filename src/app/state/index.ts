import { createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from './app.reducer';

export  const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');