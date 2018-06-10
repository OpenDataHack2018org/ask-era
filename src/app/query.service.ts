import { Injectable } from '@angular/core';
import {AwsService} from "./aws.service";
import {Query} from "./query";
import {GeoService} from "./geo.service";
import * as Comprehend from "aws-sdk/clients/comprehend";
import {Date as SugarDate} from "sugar";
import {QueryError} from "./query.error";
import {Entity} from "aws-sdk/clients/comprehend";
import {ClimateVariable} from "./climate.variable";
import * as stemmer from "en-stemmer";
import {CdsClientService} from "./cds.client.service";
import {DataRequest} from "@djabry/cdsapi/src/data.request";
import {HttpUtilsService} from "./http.utils.service";
import {ResultJson} from "./result.json";
import {EntityExtractorService} from "./entity.extractor.service";
import * as KeywordExtractor from "keyword-extractor";
import {entityValue} from "aws-sdk/clients/health";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  stems: Record<ClimateVariable, string[]>;

  constructor(private awsService: AwsService,
              private geoService: GeoService,
              private cdsClient: CdsClientService,
              private httpUtils: HttpUtilsService,
              private snerEntityService: EntityExtractorService) {
    this.stems = {
      [ClimateVariable.Temperature]: ["hot", "cold", "warm", "freeze"],
      [ClimateVariable.TotalCloudCover]: ["sun", "cloud", "clear", "overcast"],
      [ClimateVariable.TotalPrecipitation]: ["wet", "rain"],
      [ClimateVariable.WindSpeed]: ["wind"]
    }

  }

  toDates(entites: Entity[]): Date[] {
    const minDate = new Date("2008-01-01");
    return entites.filter(entity => entity.Type === "DATE")
      .map(entity => SugarDate.create(entity.Text))
      .filter((date: Date) => date.getTime() >= minDate.getTime()) as Date[];
  }

  toLocations(entities: Entity[]): string[] {
    return entities
      .filter(entity => entity.Type === "LOCATION")
      .map(entity => entity.Text);
  }


  toVariable(input: string): ClimateVariable {

    const words = KeywordExtractor.extract(input, {
      language:"english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true
    });
    // Stems seem to produce unreliable results
    const stems = words.map(word => stemmer.stemmer(word));

    return Object.keys(this.stems).find(variable => {
      const validStems = this.stems[variable] as string[];
      return !!validStems.find(validStem => !!words.find(word => word.startsWith(validStem)));
    }) as ClimateVariable;

  }

  async createQuery(input: string): Promise<Query> {

     // const comprehend = await this.awsService.getService(Comprehend);
     // const data = await comprehend.detectEntities({Text: input, LanguageCode: "en"}).promise();
    // const entites = data.Entities.sort((e1, e2) => e2.Score - e1.Score);

    const snerEntites = await this.snerEntityService.extractEntities(input);
    const entities = this.snerEntityService.toAwsEntities(snerEntites).sort((e1, e2) => e2.Score - e1.Score);

    const dates = this.toDates(entities);
    const locations = this.toLocations(entities);
    if(!dates.length) {
      throw new Error(QueryError.NoDatesFound);
    }
    if(!locations.length) {
      throw new Error(QueryError.NoLocationsFound);
    }

    // Choose date and location with highest score
    const googleResult = await this.geoService.getGoogleResult(locations[0]);
    const geoCoordinates = this.geoService.toGeoCoordinates(googleResult.geometry);

    // Put dates into ascending order
    dates.sort((d1, d2) => d1.getTime() - d2.getTime());

    const climateVariable = this.toVariable(input);

    if(!climateVariable) {
      throw new Error(QueryError.NoVariableFound);
    }

    return {
      dateRange: {
        min: dates[0],
        max: dates[dates.length -1]
      },
      googleResult,
      geoCoordinates,
      variable: climateVariable
    };

  }

  toDataRequest(query: Query): DataRequest {
    throw new Error("Not implemented yet");
  }

  async runQuery(query: Query): Promise<ResultJson> {
    const request = this.toDataRequest(query);
    const gribLink = await this.cdsClient.requestGrib(request);
    const downloadLink = await this.cdsClient.requestJsonLink(gribLink);
    return await this.httpUtils.get(downloadLink.link);
  }


}
