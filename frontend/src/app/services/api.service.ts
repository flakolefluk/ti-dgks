import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { BASE_API_URL } from '../../providerToken';

type ApiResponseItem = {
  latitude: string, longitude: string, person_name: string, service_name: string, id: number
}

export type Point = {
  position: { lat: number, lng: number }, personName: string, serviceName: string, id: number
}

function toPoint(item: ApiResponseItem): Point {
  return {
    id: item.id,
    personName: item.person_name,
    serviceName: item.service_name,
    position: {
      lat: parseFloat(item.latitude),
      lng: parseFloat(item.longitude)
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApiUrl = inject(BASE_API_URL)
  
  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get<ApiResponseItem[]>(`${this.baseApiUrl}/services`).pipe(map(pointList => pointList.map(toPoint)))
  }
}
