import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import { BreweryShellComponent } from './brewery-shell.component';
import { BreweryComponent } from '../brewery/brewery.component';
import { State } from '../state';
import { Brewery } from '..';


describe('BreweryShellComponent', () => {
  let state: State;
  let component: BreweryShellComponent;
  let fixture: ComponentFixture<BreweryShellComponent>;

  beforeEach(async(() => {
    state = {
      breweries: {
        searchCriteria: null,
        results: null,
        current: {id: 1, item: new Brewery(), loaded: true},
        errors: { message: 'error message'}
      }
    }
    TestBed.configureTestingModule({
      declarations: [ 
        BreweryShellComponent,
        BreweryComponent
      ],
      providers: [
        provideMockStore({initialState: state})
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

  describe('init', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should set brewery', () => {
      const expected = cold('(a)', {a: state.breweries.current.item})
      
      expect(component.brewery$).toBeObservable(expected);
    });
  
    it('should set error message', () => {
      const expected = cold('(a)', {a: state.breweries.errors.message})
  
      expect(component.errorMessage$).toBeObservable(expected);
    });
  });
});
