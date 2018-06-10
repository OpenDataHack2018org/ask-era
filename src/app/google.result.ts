export interface GoogleResult {
  error_message: string;
  results: GoogleResultEntry[];
  status: string;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface GoogleResultEntry {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: GoogleGeometry;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Bounds {
  northeast: LatLng;
  southwest: LatLng;
}

export interface GoogleGeometry {
  bounds: Bounds;
  location: LatLng;
  location_type: string;
  viewport: Bounds;
}
