import { TestBed } from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { BASE_API_URL } from 'src/providerToken';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: BASE_API_URL, useValue: "http://hello.fake-url.com" },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
    
  });
  
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fetch services onInit', () => {
    const httpTesting = TestBed.inject(HttpTestingController);
    const fixture = TestBed.createComponent(AppComponent);

    httpTesting.expectNone(req => req.method === 'GET');
    
    // OnInit
    fixture.detectChanges()
    const req = httpTesting.expectOne('http://hello.fake-url.com/services', 'Request to load the services');
    expect(req.request.method).toBe('GET')
    httpTesting.verify();
  });

});
