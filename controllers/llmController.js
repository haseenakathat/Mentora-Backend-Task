const axios = require("axios");

exports.summarize = async (req, res) => {

  const { text } = req.body;

  if (!text) return res.status(400).json({ message: "Text required" });

  if (text.length < 50)
    return res.status(400).json({ message: "Text too short" });

  if (text.length > 10000)
    return res.status(413).json({ message: "Text too large" });

  try {
    let response;
    let model;

    // Use Gemini generateContent with a current model name
    if (process.env.GEMINI_API_KEY) {
      response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Summarize this text in 3-5 bullet points:\n\n${text}`
                }
              ]
            }
          ]
        }
      );
      model = "gemini-2.5-flash";
    } else if (process.env.OPENAI_API_KEY) {
      response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Summarize this text in 3-5 bullet points: ${text}`
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
          }
        }
      );
      model = "gpt-4o-mini";
    } else {
      return res.status(500).json({ message: "No LLM API key configured" });
    }

    let summary;
    if (model === "gemini-2.5-flash") {
      summary = response.data.candidates[0].content.parts[0].text;
    } else if (model === "gpt-4o-mini") {
      summary = response.data.choices[0].message.content;
    } else {
      summary = "";
    }

    res.json({
      summary,
      model
    });

  } catch (err) {
    console.error("LLM Error:", err.response?.data || err.message);
    res.status(502).json({
      message: "LLM service failed",
      error: err.message
    });

  }
};