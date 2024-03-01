import { TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, Component, signal } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { By } from '@angular/platform-browser';
import { GMAPS_API_KEY } from 'src/providerToken';
import { MapLoaderService } from '../services/map-loader.service';
import { MapsComponent } from './maps.component';
@Component({
  selector: 'google-map',
  template: '<p>Mocked Maps Component</p>',
  standalone: true,
  inputs: ["zoom", "center"]
})
class MockGoogleMapsComponent { }

describe('MapsComponent', () => {

  let fakeMapLoaderService: MapLoaderService;

  beforeEach(async () => {
    fakeMapLoaderService = jasmine.createSpyObj(
      'MapLoaderService',
      {

        load: () => Promise.resolve(),
        loaded: signal(false),
        error: () => true
      }
    );

    TestBed.overrideComponent(
      MapsComponent,
      {
        add: {
          schemas: [
            CUSTOM_ELEMENTS_SCHEMA
          ]
        },
        remove: {
          imports: [
            GoogleMap, MapMarker, MapInfoWindow,
          ],

        },
      }
    );
    await TestBed.configureTestingModule({
      imports: [MapsComponent],
      providers: [
        { provide: GMAPS_API_KEY, useValue: "someApiToken" }
      ],
    }).compileComponents();

  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MapsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should return placedholder by default', () => {
    let serv = TestBed.inject(MapLoaderService)
    const fixture = TestBed.createComponent(MapsComponent);
    const component = fixture.componentInstance;
    spyOn(serv, 'load').and.returnValue();
    fixture.detectChanges()
    const de = fixture.debugElement

    let skeleton = de.query(By.css('div.map-placeholder'))
    expect(skeleton).toBeTruthy()

  });

  it('should render google-map when loaded', () => {
    let serv = TestBed.inject(MapLoaderService)
    const fixture = TestBed.createComponent(MapsComponent);
    const component = fixture.componentInstance;

    spyOn(serv, 'load').and.returnValue();
    spyOn(serv, 'loaded').and.returnValue(true);

    fixture.detectChanges()
    const de = fixture.debugElement

    let map = de.query(By.css('google-map'))
    expect(map).toBeTruthy()

  });

  it('should render retry button when failed', () => {
    let serv = TestBed.inject(MapLoaderService)
    const fixture = TestBed.createComponent(MapsComponent);
    const component = fixture.componentInstance;

    spyOn(serv, 'load').and.returnValue();
    spyOn(serv, 'failed').and.returnValue(true);

    fixture.detectChanges()
    const de = fixture.debugElement


    let button = de.query(By.css('ion-button'))
    expect(button).toBeTruthy()
    expect(button.nativeElement.textContent).toBe("Retry")
  });
});
