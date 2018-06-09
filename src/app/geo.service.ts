import { Injectable } from '@angular/core';
import {GeoCoordinates} from "./geo.coordinates";
import {createClient} from "@google/maps";
import {environment} from "../environments/environment";
import {GoogleGeometry, GoogleResult} from "./google.result";

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  private client;

  constructor() {
    this.client = createClient({
      key: environment.googleApiKey
    });
  }

  toGeoCoordinates(geometry: GoogleGeometry): GeoCoordinates {
    return {
      latitude: {
        min: geometry.bounds.southwest.lat,
        max: geometry.bounds.northeast.lat
      },
      longitude: {
        min: geometry.bounds.southwest.lng,
        max: geometry.bounds.northeast.lng
      }
    };
  }

  async getGeoCoordinates(input: string): Promise<GeoCoordinates> {
    const response = await this.client.geocode({address: input}).asPromise() as GoogleResult;
    if(response.status === 200 && response.json.status === "OK") {
      const results = response.json.results;
      // Get the top result
      const result = results[0];
      return this.toGeoCoordinates(result.geometry);
    } else {
      throw new Error(response.json.error_message);
    }
  }
}
