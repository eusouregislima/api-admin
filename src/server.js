const express = require("express");
const cors = require("cors");
const routes = require("./routes.js");
const port = process.env.PORT || 8080;

require("./database/mongooseConnection.js");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Acess-Control-Allow-Origin", "*");
  res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());
app.use(routes);

app.use((err, res) => {
  if (err instanceof Error) {
    return res.status(404).json({
      error: err.message,
    })
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})

app.listen(port, () => console.log(`Server listening on port ${port}`));

