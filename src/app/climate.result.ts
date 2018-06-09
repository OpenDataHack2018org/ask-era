import {ClimateVariable} from "./climate.variable";
import {ClimateVariableState} from "./climate.variable.state";

export interface ClimateResult {
  variable: ClimateVariable;
  state: ClimateVariableState;
}
