import { Request, RequestHandler, Response } from "express";
import axios from "axios";

import { photonToPelias } from "./utils";

//* Pelias - Komoot Photon Adapter
export const peliasPhotonAdapter: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  // console.log("req.ip:", req.ip);

  const PHOTON_URL = process.env.PHOTON_URL as string;
  // console.log("photonUrl:", photonUrl);

  try {
    const params = new URLSearchParams(req.query as any);
    // console.log("params:", params);

    // Required params from Geocode Earth
    const text = params.get("text") as string;
    // console.log("text:", text);
    if (!text) {
      return res.status(400).json({ error: "Text parameter required" });
    }

    // Parse boundary rect (optional)
    let bbox: string | undefined;
    const minLat = params.get("boundary.rect.min_lat");
    const minLon = params.get("boundary.rect.min_lon");
    const maxLat = params.get("boundary.rect.max_lat");
    const maxLon = params.get("boundary.rect.max_lon");

    if (minLat && minLon && maxLat && maxLon) {
      bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
    }
    // console.log("bbox:", bbox);

    // Build Photon query
    const photonParams = new URLSearchParams({
      q: text,
      limit: String(process.env.limit),
      lang: process.env.lang as string,
    });

    if (bbox) {
      photonParams.append("bbox", bbox);
    }

    const photonUrl: string = `${PHOTON_URL}?${photonParams.toString()}`;
    // console.log("photonUrl:", photonUrl);
    //* eg: https://photon.komoot.io/api?q=Poz&limit=10&lang=en&bbox=16.63853%2C52.135783499999995%2C17.214888%2C52.6782445

    const { status, data: photonData } = await axios.get(photonUrl);
    {
      if (status !== 200) {
        throw new Error(`Photon API error: ${status}`);
      }
    }
    // console.log("photonData:", photonData);

    // Translate response format
    const peliasFeatures = photonToPelias(photonData.features || []);
    // console.log("peliasFeatures:", peliasFeatures);

    // Pelias autocomplete response format
    const peliasResponse = {
      geocoding: {
        version: "0.2",
        attribution: "Photon via Proxy Adapter",
        timestamp: Date.now(),
      },
      type: "FeatureCollection",
      features: peliasFeatures,
      bbox: bbox?.split(",")?.map((elem: string) => Number(elem)),
    };
    // console.log("peliasResponse:", peliasResponse);

    return res.status(200).json(peliasResponse);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
