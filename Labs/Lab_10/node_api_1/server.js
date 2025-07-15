const express = require("express");
const app = express();
const port = 3000;

app.get("/healthcheck", (req, res) => {
  console.log("healthcheck_node_js");
  res.send("API 1 is healthy");
});

app.listen(port, () => {
  console.log(`API 1 listening on port ${port}`);
});
