import { TestBed } from '@angular/core/testing';

import { GMAPS_API_KEY } from '../../providerToken';
import { MapLoaderService } from './map-loader.service';

describe('MapLoaderService', () => {
  let service: MapLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GMAPS_API_KEY, useValue: "someApiToken" }
      ]
    });
    service = TestBed.inject(MapLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
