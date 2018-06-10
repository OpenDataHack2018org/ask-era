/**
 * Interprets a value for the climate variable state to present to the user e.g. low cloud = "Sunny"
 */
import { Injectable } from '@angular/core';
import {ClimateResult} from "./climate.result";
import {ResultJson} from "./result.json";
import {ClimateVariable} from "./climate.variable";

@Injectable({
  providedIn: 'root'
})
export class InterpreterService {

  constructor() {
  }

  parseData(variable: ClimateVariable, resultJson: ResultJson): ClimateResult {
   console.log(resultJson);
    throw new Error("Not implemented yet");
  }

  interpret(result: ClimateResult): string {
    throw new Error("Not implemented yet");
  }
}
