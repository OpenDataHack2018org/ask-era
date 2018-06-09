import {Range} from "./range";
import {GeoCoordinates} from "./geo.coordinates";
import {ClimateVariable} from "./climate.variable";
export interface Query {
  dateRange: Range<Date>;
  geoCoordinates: GeoCoordinates;
  variable: ClimateVariable;
}
