import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule, Store } from '@ngrx/store';
import { reducer } from '../state/brewery.reducers';
import { BreweriesShellComponent } from '../breweries-shell/breweries-shell.component';
import { BreweriesComponent } from '../breweries/breweries.component';
import { State } from '../state';
import * as actions from '../state/brewery.actions';
import { Brewery, IBrewery } from '..';

describe('BreweriesShellComponent', () => {
  let store: Store<State>;
  let component: BreweriesShellComponent;
  let fixture: ComponentFixture<BreweriesShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ 
            BreweriesShellComponent,
            BreweriesComponent,
        ],
        imports: [
          NgbModule,
          StoreModule.forRoot({}),
          StoreModule.forFeature('breweries', reducer)
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweriesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    store = TestBed.get(Store); 
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('init', () => {
    it('should dispatch ReloadBreweries action', () => {
      const action = new actions.ReloadBreweries();

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('query', () => {
    it('should dispatch LoadBreweries action', () => {
      const criteria = {pageIndex: 1, pageSize: 10};
      const action = new actions.LoadBreweries(criteria);

      component.query(criteria);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('view', () => {

    let brewery: IBrewery;
    
    beforeEach(() => {
      brewery = new Brewery({id: 1});
    });

    it('should dispatch NavigateToBreweries action', () => {
      const action = new actions.NavigateToBreweryRoute(brewery.id);

      component.view(brewery);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should dispatch ClearCurrentBrewery action', () => {
      const action = new actions.ClearCurrentBrewery();

      component.view(brewery);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});