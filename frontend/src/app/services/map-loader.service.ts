import { Injectable, computed, inject, signal } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GMAPS_API_KEY } from 'src/providerToken';

export const enum LibLoadedState {
  INIT = "INIT",
  LOADING = "LOADING",
  LOADED = "LOADED",
  FAILED = "FAILED"
}


@Injectable({
  providedIn: 'root'
})
export class MapLoaderService {
  private mapsKey = inject(GMAPS_API_KEY)
  private state = signal<LibLoadedState>(LibLoadedState.INIT)
  private shouldLoad = computed(() => this.state() !== LibLoadedState.LOADING && this.state() !== LibLoadedState.LOADED)
  private loader = new Loader({
    apiKey: this.mapsKey,
    version: "weekly",
  });

  loaded = computed(() => this.state() === LibLoadedState.LOADED);
  failed = computed(() => this.state() === LibLoadedState.FAILED);

  load() {
    if (this.shouldLoad()) {
      this.state.set(LibLoadedState.LOADING)
      this.loader.importLibrary("maps")
        .then(_ => { this.state.set(LibLoadedState.LOADED) })
        .catch(_ => { this.state.set(LibLoadedState.FAILED) })
    }
  }
}
