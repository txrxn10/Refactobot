require('dotenv').config();
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is correctly set in .env
});

exports.analyzeCode = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        // ✅ Read uploaded file content
        const filePath = path.join(__dirname, '..', req.file.path);
        const code = fs.readFileSync(filePath, 'utf8');

        // ✅ Send the code to OpenAI for analysis
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: "Analyze this code and suggest improvements." }, { role: "user", content: code }],
            max_tokens: 200,
        });

     
        fs.unlinkSync(filePath);

        res.json({ suggestions: response.choices[0].message.content });
    } catch (err) {
        console.error("Error processing code:", err);
        res.status(500).json({ error: "Failed to analyze code" });
    }
};
