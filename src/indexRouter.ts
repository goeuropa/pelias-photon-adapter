import express, { Router } from "express";

import { peliasPhotonAdapter } from "./controller";

const indexRouter: Router = express.Router({ strict: false, caseSensitive: true });

//* Pelias - Komoot Photon Adapter
indexRouter.get("/v1/autocomplete", peliasPhotonAdapter);

export default indexRouter;
