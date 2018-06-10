/**
 * Interprets a value for the climate variable state to present to the user e.g. low cloud = "Sunny"
 */
import { Injectable } from '@angular/core';
import {ClimateResult} from "./climate.result";
import {ResultJson} from "./result.json";
import {ClimateVariable} from "./climate.variable";
import {isArray} from "util";
import {ResultMessage} from "./result.message";
import {Range} from "./range";
import {StateDescription} from "./state.description";
import {Date as SugarDate} from "sugar";
import {Query} from "./query";
@Injectable({
  providedIn: 'root'
})
export class InterpreterService {

  thresholds: Record<ClimateVariable, Range<number>>;
  descriptions: Record<ClimateVariable, StateDescription>;
  constructor() {
    this.thresholds = {
      [ClimateVariable.Temperature]: {min: 283, max: 303},
      [ClimateVariable.WindSpeed]: {min: 0.2, max: 5},
      [ClimateVariable.TotalCloudCover]: {min: 0.2, max: 0.8},
      [ClimateVariable.TotalPrecipitation]: {min: 0.01/1000, max: 1/1000}
    };
    this.descriptions = {
      [ClimateVariable.Temperature]: {low: "cold", medium: "warm", high: "hot"},
      [ClimateVariable.WindSpeed]: {low: "calm", medium: "moderately windy", high: "very windy"},
      [ClimateVariable.TotalCloudCover]: {low: "sunny", medium: "moderately cloudy", high: "very cloudy"},
      [ClimateVariable.TotalPrecipitation]: {low: "dry", medium: "raining lightly", high: "rainy"}
    };
  }

  parseData(variable: ClimateVariable, resultJson: ResultJson): ClimateResult {
    let result = resultJson as ResultMessage[][];
    if(!isArray(resultJson[0])) {
      result = [resultJson] as ResultMessage[][];
    }
    let averageSum = 0;
    let maxVal = Number.MIN_SAFE_INTEGER;
    let minVal = Number.MAX_SAFE_INTEGER;
    for(const messages of result) {
      const minValue = messages.find(message => message.key === "minimum").value as number;
      minVal = Math.min(minValue,  minVal);

      const maxValue = messages.find(message => message.key === "maximum").value as number;
      maxVal = Math.max(maxValue, maxVal);

      const averageValue = messages.find(message => message.key === "average").value as number;
      averageSum += averageValue;
    }

    const average = averageSum / result.length;
    const range = this.thresholds[variable];
    const normalizedValue = (average - range.min) / (range.max - range.min);

    return {
      variable,
      state: {
        min: minVal,
        max: maxVal,
        average,
        normalized: normalizedValue
      }
    };

  }

  interpret(result: ClimateResult, query: Query): string {

    const description = this.descriptions[result.variable];
    const norm = result.state.normalized;
    let descriptionWord = description.low;
    if(norm > 0 && norm < 1 ) {
      descriptionWord = description.medium;
    } else if(norm > 1) {
      descriptionWord = description.high;
    }


    const dateString = new SugarDate(Math.round((query.dateRange.max.getTime() + query.dateRange.min.getTime())/2))
      .medium();

    return `It was ${descriptionWord} in ${query.googleResult.formatted_address} on ${dateString}`;
  }
}
