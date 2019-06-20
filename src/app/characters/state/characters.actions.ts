import { Action } from '@ngrx/store';
import { IPagedResults } from '../../pagedResults';
import { ICharacter, ISearchCriteria } from './character';

export enum CharactersActionTypes {
  LoadCharacters = '[Characters][Load] Load Characters',
  ReloadCharacters = '[Characters][Load] Reload Characters',
  LoadCharactersSuccess = '[Characters][Load] Load Characters Success',
  LoadCharactersFail = '[Characters][Load] Load Characters Failure',
  LoadCharacter = '[Character][Load] Load Character',
  LoadCharacterSuccess = '[Character][Load] Load Character Success',
  LoadCharacterFail = '[Character][Load] Load Character Failure',
  ClearCurrentCharacter = '[Character][Load] Clear Character',
  NavigateToCharacterRoute = '[Character][Navigate] To Character',
}

export class LoadCharacters implements Action {
  readonly type = CharactersActionTypes.LoadCharacters;
  constructor(public payload: ISearchCriteria) { }
}
export class ReloadCharacters implements Action {
  readonly type = CharactersActionTypes.ReloadCharacters;
}
export class LoadCharactersSuccess implements Action {
  readonly type = CharactersActionTypes.LoadCharactersSuccess;
  constructor(public characters: IPagedResults<ICharacter>) { }
}
export class LoadCharactersFail implements Action {
  readonly type = CharactersActionTypes.LoadCharactersFail;
  constructor(public error: string) { }
}

export class LoadCharacter implements Action {
  readonly type = CharactersActionTypes.LoadCharacter;
  constructor(public characterId: number) { }
}
export class LoadCharacterSuccess implements Action {
  readonly type = CharactersActionTypes.LoadCharacterSuccess;
  constructor(public character: ICharacter) { }
}
export class LoadCharacterFail implements Action {
  readonly type = CharactersActionTypes.LoadCharacterFail;
  constructor(public error: string) { }
}

export class NavigateToCharacterRoute implements Action {
  readonly type = CharactersActionTypes.NavigateToCharacterRoute;
  constructor(public characterId: number) { }
}

export class ClearCurrentCharacter implements Action {
  readonly type = CharactersActionTypes.ClearCurrentCharacter;
  constructor() { }
}

export type CharactersActions = LoadCharacters | ReloadCharacters | LoadCharactersSuccess | LoadCharactersFail | LoadCharacter | LoadCharacterSuccess | LoadCharacterFail | NavigateToCharacterRoute | ClearCurrentCharacter;