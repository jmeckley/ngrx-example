import { CharactersActionTypes, LoadCharacters, LoadCharactersFail, LoadCharactersSuccess, ReloadCharacters, LoadCharacter, LoadCharacterSuccess, LoadCharacterFail, NavigateToCharacterRoute, ClearCurrentCharacter } from './characters.actions';

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

describe('LoadCharacter', () => {
  it('should create an instance', () => {
    expect(new LoadCharacter(1)).toBeTruthy();
  });
});

describe('LoadCharacterSuccess', () => {
  it('should create an instance', () => {
    expect(new LoadCharacterSuccess({id: 1, name: 'name'})).toBeTruthy();
  });
});

describe('LoadCharacterFail', () => {
  it('should create an instance', () => {
    expect(new LoadCharacterFail('error')).toBeTruthy();
  });
});

describe('NavigateToCharacterRoute', () => {
  it('should create an instance', () => {
    expect(new NavigateToCharacterRoute(1)).toBeTruthy();
  });
});

describe('ClearCurrentCharacter', () => {
  it('should create an instance', () => {
    expect(new ClearCurrentCharacter()).toBeTruthy();
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

  it('should define Load Character', () => {
    expect(CharactersActionTypes.LoadCharacter).toBe('[Character][Load] Load Character');
  });

  it('should define Load Character Success', () => {
    expect(CharactersActionTypes.LoadCharacterSuccess).toBe('[Character][Load] Load Character Success');
  });

  it('should define Load Character Fail', () => {
    expect(CharactersActionTypes.LoadCharacterFail).toBe('[Character][Load] Load Character Failure');
  });

  it('should define Navigate to Character Route', () => {
    expect(CharactersActionTypes.NavigateToCharacterRoute).toBe('[Character][Navigate] To Character');
  });

  it('should define Clear Current Character', () => {
    expect(CharactersActionTypes.ClearCurrentCharacter).toBe('[Character][Load] Clear Character');
  });
});
