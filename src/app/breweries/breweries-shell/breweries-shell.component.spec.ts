import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweriesShellComponent } from './breweries-shell.component';

describe('BreweriesShellComponent', () => {
  let component: BreweriesShellComponent;
  let fixture: ComponentFixture<BreweriesShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweriesShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweriesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
