import { Injectable } from '@angular/core';
import {AwsService} from "./aws.service";
import {Query} from "./query";
import {GeoService} from "./geo.service";
import * as Comprehend from "aws-sdk/clients/comprehend";
import {Date as SugarDate} from "sugar";
import {QueryError} from "./query.error";
import {Entity} from "aws-sdk/clients/comprehend";
import {ClimateVariable} from "./climate.variable";
import * as tokenizer from "string-tokenizer";
import * as stemmer from "en-stemmer";

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  stems: Record<ClimateVariable, string[]>;

  constructor(private awsService: AwsService,
              private geoService: GeoService) {
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

    const stems = tokenizer(input).map(word => stemmer.stemmer(word));

    return Object.keys(this.stems).find(variable => {
      const validStems = this.stems[variable] as string[];
      return !!validStems.find(validStem => stems.indexOf(validStem) > -1);
    }) as ClimateVariable;

  }

  async createQuery(input: string): Promise<Query> {

    const comprehend = await this.awsService.getService(Comprehend);
    const data = await comprehend.detectEntities({Text: input, LanguageCode: "en"}).promise();
    const entites = data.Entities.sort((e1, e2) => e2.Score - e1.Score);
    const dates = this.toDates(entites);
    const locations = this.toLocations(entites);
    if(!dates.length) {
      throw new Error(QueryError.NoDatesFound);
    }
    if(!locations.length) {
      throw new Error(QueryError.NoLocationsFound);
    }

    // Choose date and location with highest score
    const coordinates = await this.geoService.getGeoCoordinates(locations[0]);

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
      geoCoordinates: coordinates,
      variable: climateVariable
    };

  }

}
