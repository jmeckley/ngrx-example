import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../state/brewery.reducers';
import { BreweriesShellComponent } from '../breweries-shell/breweries-shell.component';
import { BreweriesComponent } from '../breweries/breweries.component';

describe('BreweriesShellComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});