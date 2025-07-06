const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const headlines = [
  "Why Cake & Co is Mumbai's Sweetest Spot in 2025",
  "Discover the Magic Behind Mumbai’s Favorite Bakery",
  "Mumbai’s Hidden Gem for Cake Lovers",
  "Top 5 Reasons to Visit Cake & Co Today",
  "Experience Dessert Delight at Cake & Co",
];

app.post("/business-data", (req, res) => {
  const { name, location } = req.body;
  const response = {
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 200 + 50),
    headline: headlines[Math.floor(Math.random() * headlines.length)],
  };
  res.json(response);
});

app.get("/regenerate-headline", (req, res) => {
  const headline = headlines[Math.floor(Math.random() * headlines.length)];
  res.json({ headline });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
