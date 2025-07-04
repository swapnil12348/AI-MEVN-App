const express = require('express');
const multer = require('multer');
const SimpleAIService = require('../services/simpleAI');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Chat endpoint
router.post('/chat', async (req, res) => {
    try {
        const { message, context } = req.body;
        const response = await SimpleAIService.generateResponse(message, context);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Sentiment analysis endpoint
router.post('/sentiment', async (req, res) => {
    try {
        const { text } = req.body;
        const analysis = await SimpleAIService.analyzeSentiment(text);
        res.json({ analysis });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Text summarization endpoint
router.post('/summarize', async (req, res) => {
    try {
        const { text } = req.body;
        const summary = await SimpleAIService.summarizeText(text);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Image analysis endpoint
router.post('/analyze-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image provided' });
        }

        const analysis = await SimpleAIService.analyzeImage(req.file.buffer);
        res.json({ analysis });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ status: 'AI service is running!', timestamp: new Date().toISOString() });
});

module.exports = router;
