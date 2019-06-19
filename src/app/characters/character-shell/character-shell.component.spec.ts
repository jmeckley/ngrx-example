import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterShellComponent } from './character-shell.component';

describe('CharacterShellComponent', () => {
  let component: CharacterShellComponent;
  let fixture: ComponentFixture<CharacterShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterShellComponent ]
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
