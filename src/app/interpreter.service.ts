/**
 * Interprets a value for the climate variable state to present to the user e.g. low cloud = "Sunny"
 */
import { Injectable } from '@angular/core';
import {ClimateResult} from "./climate.result";
import {ResultJson} from "./result.json";

@Injectable({
  providedIn: 'root'
})
export class InterpreterService {

  constructor() {

  }

  parseData(resultJson: ResultJson): ClimateResult {
    throw new Error("Not implemented yet");
  }

  interpret(result: ClimateResult): string {
    throw new Error("Not implemented yet");
  }
}
