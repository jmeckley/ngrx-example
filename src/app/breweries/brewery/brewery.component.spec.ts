import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryComponent } from './brewery.component';
import { Brewery, IBrewery } from '..';

describe('BreweryComponent', () => {
  let brewery: IBrewery;
  let component: BreweryComponent;
  let fixture: ComponentFixture<BreweryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    brewery = new Brewery({
      name: 'the brewery', 
      website_url: 'http://www.thebrewery.com',
      street: '123 front st',
      city: 'Harrisburg',
      state: 'PA',
      postal_code: '12345'
    });

    fixture = TestBed.createComponent(BreweryComponent);
    
    component = fixture.componentInstance;
    component.brewery = brewery;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendered', () => {

    let compiled: HTMLElement;

    beforeEach(() => {
      compiled = fixture.debugElement.nativeElement;
    });

    it('should render brewery name in anchor tag', () => {
      const actual = compiled.querySelector('div > a').textContent;
      
      expect(actual).toBe(brewery.name);
    });

    it('should render brewery name as link to the website', () => {
      const actual = compiled.querySelector('div > a').getAttribute('href');
      
      expect(actual).toBe(brewery.website_url);
    });

    it('should render the brewery address', () => {
      const actual = compiled.querySelector('address').textContent;
      
      expect(actual).toBe('123 front stHarrisburg, PA 12345');
    });

    it('should render return link', () => {
      const actual = compiled.querySelector('nav > a').getAttribute('routerLink');
      
      expect(actual).toBe('/breweries');
    });
  });
});
