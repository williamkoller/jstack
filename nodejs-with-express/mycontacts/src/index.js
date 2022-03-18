const express = require('express');
const routers = require('./routes');
require('dotenv').config();

const port = process.env.PORT;
const appUrl = process.env.APP_URL;

const app = express();

app.use(routers);

app.listen(port, () => console.log(`Server started at ${appUrl}:${port}`));
