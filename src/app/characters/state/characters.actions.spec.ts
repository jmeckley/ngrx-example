import { CharactersActionTypes, LoadCharacters, LoadCharactersFail, LoadCharactersSuccess, ReloadCharacters } from './characters.actions';

describe('LoadCharacters', () => {
  it('should create an instance', () => {
    expect(new LoadCharacters({pageIndex: 0, pageSize: 10})).toBeTruthy();
  });
});

describe('ReloadCharacters', () => {
  it('should create an instance', () => {
    expect(new ReloadCharacters()).toBeTruthy();
  });
});

describe('LoadCharactersFail', () => {
  it('should create an instance', () => {
    expect(new LoadCharactersFail('failure')).toBeTruthy();
  });
});

describe('LoadCharactersSuccess', () => {
  it('should create an instance', () => {
    expect(new LoadCharactersSuccess({items:[], loading: false})).toBeTruthy();
  });
});

describe('CharactersActionTypes', () => {
  it('should define Load', () => {
    expect(CharactersActionTypes.LoadCharacters).toBe('[Characters][Load] Load Characters');
  });

  it('should define Load Failure', () => {
    expect(CharactersActionTypes.LoadCharactersFail).toBe('[Characters][Load] Load Characters Failure');
  });

  it('should define Load Success', () => {
    expect(CharactersActionTypes.LoadCharactersSuccess).toBe('[Characters][Load] Load Characters Success');
  });

  it('should define Load Success', () => {
    expect(CharactersActionTypes.ReloadCharacters).toBe('[Characters][Load] Reload Characters');
  });
});
