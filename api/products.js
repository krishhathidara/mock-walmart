// CommonJS handler so Vercel Node serverless treats it consistently with your other files
const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const filePath = path.join(process.cwd(), "data", "products.json");
    const json = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(json);

    const payload = Array.isArray(products)
      ? { storeName: "Walmart (Mock)", products }
      : products;

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json(payload);
  } catch (err) {
    console.error("❌ Failed to load products:", err);
    res.status(500).json({ error: "Failed to load products data" });
  }
};
