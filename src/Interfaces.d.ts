interface PhotonProperties {
  osm_id?: number;
  osm_type?: string;
  osm_key?: string;
  osm_value?: string;
  name?: string;
  street?: string;
  housenumber?: string;
  postcode?: string;
  city?: string;
  country?: string;
  state?: string;
  countrycode?: string;
  lon?: number;
  lat?: number;
  category?: string;
  type?: string;
  town?: string;
  village?: string;
  extent: number[];
  [key: string]: any;
}

export interface PhotonFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: PhotonProperties;
}

export interface PeliasFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    id?: string;
    gid?: string;
    name: string;
    local_name?: string;
    label: string;
    type: string;
    category?: string[];
    layer?: string;
    lon?: number;
    lat?: number;
    alpha3?: string;
    country_gid: string;
    population?: number;
    accuracy: string;
    source: string;
    source_id: string;
    locality?: string;
    localadmin?: string;
    region?: string;
    country?: string;
    country_a?: string;
    street?: string;
    housenumber?: string;
    postalcode?: string;
    confidence?: number;
    [key: string]: any;
  };
  bbox: number[];
}
