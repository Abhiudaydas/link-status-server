// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/check-links", async (req, res) => {
  const { urls } = req.body;
  const results = [];

  for (const url of urls) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      results.push({ url, status: response.status });
    } catch (error) {
      results.push({ url, status: "Error / Blocked" });
    }
  }

  res.json(results);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
