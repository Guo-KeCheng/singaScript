const express = require("express");
const logger = require("morgan");
const run = require("./run");
const submit = require("./submit");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(
  cors({
    origin: "https://singa-script.vercel.app/",
  })
);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/run", run);
app.use("/submit", submit);

app.listen(port, function () {
  console.log(
    `Starting a server on port ${port} at http://localhost:${port}/ ...`
  );
  console.log(`Press Ctrl + C or equivalent to stop the server/`);
});
