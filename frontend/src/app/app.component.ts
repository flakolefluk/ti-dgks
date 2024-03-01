import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonApp, IonContent } from '@ionic/angular/standalone';
import { MapsComponent } from './maps/maps.component';
import { ApiService, Point } from './services/api.service';
import { type Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonContent, MapsComponent, AsyncPipe],
})
export class AppComponent implements OnInit {
  private apiService = inject(ApiService);
  pointList$!: Observable<Point[]>

  ngOnInit() {
    this.pointList$ = this.apiService.getServices();
  }
}
