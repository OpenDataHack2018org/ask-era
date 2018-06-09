import { Injectable } from '@angular/core';
import {GeoCoordinates} from "./geo.coordinates";

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor() {

  }

  async getGeoCoordinates(input: string): Promise<GeoCoordinates> {

  }
}
