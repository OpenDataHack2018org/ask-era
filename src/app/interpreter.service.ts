/**
 * Interprets a value for the climate variable state to present to the user e.g. low cloud = "Sunny"
 */
import { Injectable } from '@angular/core';
import {ClimateResult} from "./climate.result";
import {ResultJson} from "./result.json";
import {ClimateVariable} from "./climate.variable";
import {isArray} from "util";
import {ResultMessage} from "./result.message";

@Injectable({
  providedIn: 'root'
})
export class InterpreterService {

  constructor() {
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

    return {
      variable,
      state: {
        min: minVal,
        max: maxVal,
        average,
        normalized: average
      }
    };

  }

  interpret(result: ClimateResult): string {
    return `${result.variable}=${result.state.normalized}`;
  }
}
