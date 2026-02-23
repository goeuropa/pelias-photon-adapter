import { PeliasFeature, PhotonFeature, PhotonProperties } from "./Interfaces";

export function mapPhotonLayer(photonType: string): string {
  const layerMap: Record<string, string> = {
    house: "house",
    building: "house",
    street: "street",
    road: "street",
    locality: "locality",
    district: "district",
    city: "city",
    town: "city",
    county: "county",
    state: "state",
    country: "country",
  };
  return layerMap[photonType.toLowerCase()] || "other";
}

function buildLabel(props: PhotonProperties): string {
  const parts: string[] = [];
  const name = props.name || props.street || "";
  if (name) parts.push(name);

  if (props.housenumber) parts.push(props.housenumber);
  const street = props.street;
  if (street && street !== name) parts.push(street);

  const city = props.city || props.town || props.village;
  if (city) parts.push(city);

  if (props.county) parts.push(props.county || "");

  if (props.state) parts.push(props.state || "");
  if (props.country) parts.push(props.country || "");

  return parts.filter(Boolean).join(", ") || "";
}

export const photonToPelias = (photonFeatures: PhotonFeature[]): PeliasFeature[] => {
  return photonFeatures.map((feature) => {
    const props = feature.properties;
    const [lon, lat] = feature.geometry.coordinates;

    // Map Photon category to Pelias layer
    const layer = mapPhotonLayer(props.category || props.type || "");

    // Generate Pelias-style ID
    const id = `${props.osm_type}:${props.osm_id}`;
    const gid = `openstreetmap:${props.osm_type}/${props.osm_id}`;

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [lon, lat],
      },
      properties: {
        id: id,
        gid: gid,
        layer: layer,
        source: "openstreetmap",
        source_id: String(props.osm_id || ""),
        name: props.name || props.street || "",
        locality: props.city || props.town || props.village,
        localadmin: props.district || props.suburb,
        region: props.state,
        country: props.country,
        country_a: props.countrycode?.toUpperCase(),
        street: props.street,
        housenumber: props.housenumber,
        postcode: props.postcode,
        label: buildLabel(props),
        type: props.type || layer,
        lon,
        lat,
        country_gid: `openstreetmap:country/${props.countrycode}`,
        accuracy: "point",
        category: [layer],
      },
      bbox: props?.extent as number[],
    };
  });
};
