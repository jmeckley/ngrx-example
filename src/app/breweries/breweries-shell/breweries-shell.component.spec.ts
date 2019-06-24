import { async, ComponentFixture, TestBed, flush, fakeAsync } from '@angular/core/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreweriesComponent } from '../breweries/breweries.component';
import { IBrewery, Brewery } from '..';

describe('BreweriesComponent', () => {
  let component: BreweriesComponent;
  let fixture: ComponentFixture<BreweriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweriesComponent ],
      imports: [ NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweriesComponent);
    
    component = fixture.componentInstance;
    component.criteria = {pageIndex: 0, pageSize: 10};
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changePage', () => {
    it('should emit new search criteria', fakeAsync(() => {
      component.pageChanged.subscribe(actual => expect(actual).toEqual({pageIndex: 1, pageSize: 10}));
      
      component.changePage(2);
    }));
  });

  describe('view', () =>{
    it('should emit brewery', fakeAsync(() => {
      let brewery: IBrewery = new Brewery();

      component.viewBrewery.subscribe(actual => expect(actual).toEqual(brewery));
      
      component.view(brewery);
    }));
  });
});
