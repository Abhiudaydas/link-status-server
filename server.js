const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // npm install node-fetch

const app = express();
app.use(cors());
app.use(express.json());

app.post("/check-links", async (req, res) => {
  const urls = req.body.urls || [];
  const results = [];

  for (const url of urls) {
    try {
      const response = await fetch(url, { method: "HEAD", redirect: "manual" });
      results.push({ url, status: response.status });
    } catch (err) {
      results.push({ url, status: "Error / Blocked" });
    }
  }

  res.json(results);
});

app.listen(process.env.PORT || 3000, () => console.log("Server running"));
