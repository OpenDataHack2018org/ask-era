import { Injectable } from '@angular/core';
import {GeoCoordinates} from "./geo.coordinates";
import {environment} from "../environments/environment";
import {GoogleGeometry, GoogleResult, GoogleResultEntry} from "./google.result";
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

  async getGoogleResult(input: string): Promise<GoogleResultEntry> {
    const response = await this.httpUtils
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${environment.googleApiKey}`) as GoogleResult;
    if(response.status === "OK") {
      return response.results[0];
    } else {
      throw new Error(`${response.error_message}`);
    }
  }
}
