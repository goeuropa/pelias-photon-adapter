# Pelias Photon Adapter

Adapter for Pelias autocomplete path that converts Photon's format data into Pelias's format data.

## Description

### General Info

The API provides an endpoint that intercepts the Pelias request, queries Photon, and converts the Photon data format to
Pelias format. This data is returned.

## Built With and Credits (main libraries only)

## Technologies Used

- **Backend**: Express.js, Node.js, axios, cors, helmet and esbuild. libraries.
- **Deployment**: See instructions below.

## Development

1. You must have [node.js](https://nodejs.org/en) installed.
2. Once you download the repository, you need to install the dependencies with the command: `npm install`
3. Copy .env file: `cp .env.example .env` and run: `npm run start`.
4. Finally, deploy the project.

## Deployment

1. Using node.js: copy **dist** folder, change folder: `cd dist` and run command: `node api.js`
2. Using PM2: copy **dist** folder, change folder: `cd dist` and run command: `pm2 start api.js` or
   `pm2 start ecosystem.config.js`

## License

[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0)
