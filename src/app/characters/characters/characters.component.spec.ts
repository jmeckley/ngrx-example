import { async, ComponentFixture, TestBed, flush, fakeAsync } from '@angular/core/testing';

import { CharactersComponent } from './characters.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ICharacter } from '../state/character';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersComponent ],
      imports: [ NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    
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
    it('should emit character id', fakeAsync(() => {
      let character: ICharacter = {id:1, name:'the hero'};

      component.viewCharacter.subscribe(actual => expect(actual).toEqual(character));
      
      component.view(character);
    }));
  });
});
