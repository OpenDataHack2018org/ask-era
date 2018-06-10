import {Range} from "./range";
import {GeoCoordinates} from "./geo.coordinates";
import {ClimateVariable} from "./climate.variable";
import { GoogleResultEntry} from "./google.result";
export interface Query {
  dateRange: Range<Date>;
  geoCoordinates: GeoCoordinates;
  googleResult: GoogleResultEntry;
  variable: ClimateVariable;
}
