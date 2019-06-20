import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterShellComponent } from './character-shell.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../state/characters.reducers';
import { CharacterComponent } from '../character/character.component';

describe('CharacterShellComponent', () => {
  let component: CharacterShellComponent;
  let fixture: ComponentFixture<CharacterShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CharacterShellComponent,
        CharacterComponent
      ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('characters', reducer)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
