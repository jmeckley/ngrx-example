import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';

import { BreweryShellComponent } from './brewery-shell.component';
import { BreweryComponent } from '../brewery/brewery.component';
import { reducer } from '../state/brewery.reducers';


describe('BreweryShellComponent', () => {
  let component: BreweryShellComponent;
  let fixture: ComponentFixture<BreweryShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        BreweryShellComponent,
        BreweryComponent
      ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('breweries', reducer)
      ]
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
