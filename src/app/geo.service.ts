import { Injectable } from '@angular/core';
import {GeoCoordinates} from "./geo.coordinates";
import {environment} from "../environments/environment";
import {GoogleGeometry, GoogleResult} from "./google.result";
import {HttpUtilsService} from "./http.utils.service";

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  private client;

  constructor(private httpUtils: HttpUtilsService) {
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
    const response = await this.httpUtils
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=Toledo&key=${environment.googleApiKey}`) as GoogleResult;
    if(response.status === "OK") {
      const results = response.results;
      // Get the top result
      const result = results[0];
      return this.toGeoCoordinates(result.geometry);
    } else {
      throw new Error(`${response.status}`);
    }
  }
}
