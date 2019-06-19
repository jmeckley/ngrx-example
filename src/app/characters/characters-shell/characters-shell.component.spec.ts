import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersShellComponent } from './characters-shell.component';
import { CharactersComponent } from '../characters/characters.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../state/characters.reducers';

describe('CharactersShellComponent', () => {
  let component: CharactersShellComponent;
  let fixture: ComponentFixture<CharactersShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ 
            CharactersShellComponent,
            CharactersComponent,
        ],
        imports: [
          NgbModule,
          StoreModule.forRoot({}),
          StoreModule.forFeature('characters', reducer)
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
