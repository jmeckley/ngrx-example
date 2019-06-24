import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryShellComponent } from './brewery-shell.component';

describe('BreweryShellComponent', () => {
  let component: BreweryShellComponent;
  let fixture: ComponentFixture<BreweryShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
