import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { ApiService } from './api.service';
import { provideHttpClient } from '@angular/common/http';
import { BASE_API_URL } from 'src/providerToken';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BASE_API_URL, useValue: "http://hello.fake-url.com" },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
