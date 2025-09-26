import express from "express";
import fetch from "node-fetch"; // if you use node-fetch
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // 👈 THIS IS CRUCIAL to parse JSON bodies

app.post("/check-links", async (req, res) => {
  const { urls } = req.body; // 👈 expects an array called `urls`

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: "Invalid request: urls is required" });
  }

  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return { url, status: response.status };
      } catch (e) {
        return { url, status: "Error / Blocked" };
      }
    })
  );

  res.json(results);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
