const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyD0bCVx_E7GiSBf9rQApLsthwoBsVkaSkU");

router.post("/chatBot", async (req, res) => {
  const prompt = req.body.prompt;

  console.log(prompt);

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    const generatedText = result.response.text().trim();

    return res.status(200).json({ text: generatedText });
  } catch (error) {
    console.error("Error generating text:", error);
    return res
      .status(500)
      .json({ error: "Error generating text from Gemini AI" });
  }
});

module.exports = router;
