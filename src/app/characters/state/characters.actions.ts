import { Action } from '@ngrx/store';
import { IPagedResults } from '../../pagedResults';
import { ICharacter, ISearchCriteria } from './character';

export enum CharactersActionTypes {
  LoadCharacters = '[Characters][Load] Load Characters',
  ReloadCharacters = '[Characters][Load] Reload Characters',
  LoadCharactersSuccess = '[Characters][Load] Load Characters Success',
  LoadCharactersFail = '[Characters][Load] Load Characters Failure',
  ViewCharacter = '[Character][View] View Character',
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
export class ViewCharacter implements Action {
  readonly type = CharactersActionTypes.ViewCharacter;
  constructor(public character: ICharacter) { }
}

export type CharactersActions = LoadCharacters | ReloadCharacters | LoadCharactersSuccess | LoadCharactersFail | ViewCharacter;