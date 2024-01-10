/*
This file defines the Argo server, including the setup of routes, the listening of the server, and the startup of a plugin.
*/
"use strict";

const fs = require('fs');

const express = require("express");

const routes = require("./routes");
const plugin = require("./plugin");
const util = require("./util");

const app = express();
const port = routes.config.port;
const staticFiles = express.static;
const apiUrl = routes.config.apiUrl;

process.on("uncaughtException", err => {
    console.error(err.stack);
});

app.use(staticFiles(routes.config.staticFiles));
app.use("/node_modules", staticFiles(routes.config.vendorFiles));
app.use("/build", staticFiles(routes.config.buildFiles));
app.use(apiUrl, routes.apis);

app.listen(port, async () => {
    const ipaddress = await util.getIP();

    util.log(`Argo listening on http://${ipaddress}:${port}`);
    util.log(`Argo listening apis on http://${ipaddress}:${port}${apiUrl}`);
}).on("upgrade", async (request, socket, body) => {
    const ipaddress = await util.getIP();

    routes.stream.run(request, socket, body);

    util.log(`Argo streaming prices and events on ws://${ipaddress}:${port}${routes.config.streamUrl}`);
});

plugin.startBridge();

// Removed the reading of 'error-logs.txt' file

