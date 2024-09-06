const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://sih-hackathon.vercel.app"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

const chatBot = require("./controllers/chatBot");

app.use("/api/v1/bot", chatBot);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
