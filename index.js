const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(require('./routes'))

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server listening on port " + port);
});