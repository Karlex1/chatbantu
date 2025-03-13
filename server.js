
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const API_KEY = process.env.GOOGLE_API_KEY;

app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({
            error: "Message is required"
        })
    }
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            { contents: [{ parts: [{ text: message }] }] }
        );
        const botResponse = response.data.candidates[0]?.content?.parts[0]?.text || "No response";
        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get response' });

    }
});

app.listen(PORT,()=>console.log(`Server is Running at ${PORT}`))