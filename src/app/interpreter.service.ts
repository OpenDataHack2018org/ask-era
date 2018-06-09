import { Injectable } from '@angular/core';
import {ClimateVariable} from "./climate.variable";
import {ClimateResult} from "./climate.result";

@Injectable({
  providedIn: 'root'
})
export class InterpreterService {

  constructor() {

  }

  interpret(result: ClimateResult): string {

  }
}
