import { Injectable } from '@angular/core';
import {AwsService} from "./aws.service";
import {Query} from "./query";
import {Client} from "@djabry/cdsapi";
import {GeoService} from "./geo.service";

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private awsService: AwsService,
              private geoService: GeoService,
              private cdsClient: Client) {

  }

  async createQuery(input: string): Promise<Query> {

  }

}
