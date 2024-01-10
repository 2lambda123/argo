"use strict";

const fs = require('fs');

const express = require("express");

const routes = require("./routes");
const plugin = require("./plugin");
const { log } = require("./util");

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

app.listen(port, () => {
    log(`Server setup complete`);
}).on("error", (err) => {
    util.log(err);
});

plugin.startBridge();

const errorLogs = fs.readFileSync('src/client/error-logs.txt', 'utf8');
console.log(errorLogs);
