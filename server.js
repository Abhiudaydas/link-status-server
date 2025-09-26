import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/check-links", async (req, res) => {
  const { urls } = req.body;

  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        // Try HEAD first
        let response = await fetch(url, { method: "HEAD" });

        // Fall back to GET if HEAD fails
        if (!response.ok || response.status === 405) {
          response = await fetch(url, { method: "GET" });
        }

        return {
          url,
          status: response.ok
            ? response.status.toString()
            : response.status || "Error / Blocked",
        };
      } catch (err) {
        console.error(`Error fetching ${url}:`, err.message);
        return { url, status: "Error / Blocked" };
      }
    })
  );

  res.json(results);
});

// Use Render-assigned PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
