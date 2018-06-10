import {Range} from "./range";
export interface ClimateVariableState extends Range<number>{
  average: number;
  normalized: number;
}


