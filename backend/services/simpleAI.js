class SimpleAIService {
    constructor() {
        this.responses = {
            greetings: [
                "Hello! I'm your AI assistant. How can I help you today?",
                "Hi there! What would you like to chat about?",
                "Hey! I'm here to help. What's on your mind?",
                "Greetings! How may I assist you?"
            ],
            questions: [
                "That's an interesting question! Let me think about that.",
                "I understand you're curious about that. Here's what I think...",
                "Great question! Based on what I know...",
                "That's a thoughtful inquiry. Let me help you with that."
            ],
            compliments: [
                "Thank you so much! You're very kind.",
                "I appreciate the kind words!",
                "That's very nice of you to say!",
                "Thank you! I'm glad I could help."
            ],
            help: [
                "I can help you with various tasks like answering questions, having conversations, analyzing text, and more!",
                "I'm here to assist with questions, provide information, or just chat!",
                "I can help with text analysis, conversations, answering questions, and much more."
            ],
            fallback: [
                "I'm still learning, but I'd be happy to help you explore that topic!",
                "That's interesting! Could you tell me more about what you're looking for?",
                "I understand you're asking about something. Could you provide more details?",
                "Let me try to help you with that. Can you give me more context?"
            ]
        };
    }

    async generateResponse(prompt, context = []) {
        try {
            const lowerPrompt = prompt.toLowerCase();

            // Greeting detection
            if (this.containsAny(lowerPrompt, ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'])) {
                return this.getRandomResponse('greetings');
            }

            // Question detection
            if (this.containsAny(lowerPrompt, ['what', 'how', 'why', 'when', 'where', 'who', '?'])) {
                return this.getRandomResponse('questions') + this.generateContextualResponse(prompt);
            }

            // Compliment detection
            if (this.containsAny(lowerPrompt, ['thank', 'thanks', 'good', 'great', 'awesome', 'amazing', 'helpful'])) {
                return this.getRandomResponse('compliments');
            }

            // Help detection
            if (this.containsAny(lowerPrompt, ['help', 'assist', 'support', 'what can you do'])) {
                return this.getRandomResponse('help');
            }

            // Time/date requests
            if (this.containsAny(lowerPrompt, ['time', 'date', 'today', 'now'])) {
                return `The current date and time is: ${new Date().toLocaleString()}`;
            }

            // Math calculations
            if (this.containsAny(lowerPrompt, ['calculate', 'math', '+', '-', '*', '/', 'equals'])) {
                return this.handleMathQuery(prompt);
            }

            // Weather (mock response)
            if (this.containsAny(lowerPrompt, ['weather', 'temperature', 'rain', 'sunny', 'cloudy'])) {
                return "I'd love to help with weather information! For real-time weather data, I'd recommend checking a weather service like weather.com or your local weather app.";
            }

            // Programming help
            if (this.containsAny(lowerPrompt, ['code', 'programming', 'javascript', 'python', 'html', 'css', 'react', 'vue', 'node'])) {
                return "I can help with programming questions! What specific coding challenge are you working on? I can provide guidance on JavaScript, web development, and more.";
            }

            // Default contextual response
            return this.getRandomResponse('fallback');

        } catch (error) {
            return "I'm having trouble processing that right now. Could you try rephrasing your question?";
        }
    }

    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }

    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    generateContextualResponse(prompt) {
        const words = prompt.toLowerCase().split(' ');
        const keyWords = words.filter(word => word.length > 3);

        if (keyWords.length > 0) {
            const randomKey = keyWords[Math.floor(Math.random() * keyWords.length)];
            return ` I notice you mentioned "${randomKey}". That's definitely worth discussing!`;
        }

        return "";
    }

    handleMathQuery(prompt) {
        // Simple math evaluation (be careful with eval in production!)
        try {
            // Extract numbers and basic operations
            const mathExpression = prompt.match(/[\d+\-*/().]+/g);
            if (mathExpression) {
                const expression = mathExpression.join('');
                // Only allow basic math operations for security
                if (/^[\d+\-*/().]+$/.test(expression)) {
                    const result = eval(expression);
                    return `The result is: ${result}`;
                }
            }
            return "I can help with basic math! Try asking me something like 'what is 2 + 2?' or 'calculate 10 * 5'";
        } catch (error) {
            return "I couldn't solve that math problem. Try a simpler calculation!";
        }
    }

    async analyzeSentiment(text) {
        try {
            const lowerText = text.toLowerCase();
            let score = 0;

            // Positive words
            const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like', 'happy', 'joy', 'awesome', 'perfect'];
            const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'sad', 'angry', 'horrible', 'worst', 'disgusting'];

            positiveWords.forEach(word => {
                if (lowerText.includes(word)) score += 1;
            });

            negativeWords.forEach(word => {
                if (lowerText.includes(word)) score -= 1;
            });

            const sentiment = score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';

            return {
                score: score,
                sentiment: sentiment,
                confidence: Math.min(Math.abs(score) * 0.3, 1),
                analysis: `The text appears to be ${sentiment} with a score of ${score}`
            };
        } catch (error) {
            throw new Error(`Sentiment analysis error: ${error.message}`);
        }
    }

    async summarizeText(text) {
        try {
            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

            if (sentences.length <= 2) {
                return text;
            }

            // Simple extractive summarization - pick first sentence and longest sentence
            const firstSentence = sentences[0].trim();
            const longestSentence = sentences.reduce((longest, current) =>
                current.length > longest.length ? current : longest
            ).trim();

            if (firstSentence === longestSentence) {
                return firstSentence + '.';
            }

            return firstSentence + '. ' + longestSentence + '.';
        } catch (error) {
            throw new Error(`Summarization error: ${error.message}`);
        }
    }

    async analyzeImage(imageBuffer) {
        try {
            // Mock image analysis - in a real app, you'd use a proper image recognition service
            const mockAnalyses = [
                "I can see this appears to be an image. For detailed image analysis, I'd recommend using a specialized image recognition service.",
                "This looks like an interesting image! Unfortunately, I don't have advanced image recognition capabilities yet.",
                "I can detect that you've uploaded an image. For detailed analysis, consider using Google Vision API or similar services.",
                "Image received! While I can't analyze it in detail right now, I can help you with text-based questions about images."
            ];

            return mockAnalyses[Math.floor(Math.random() * mockAnalyses.length)];
        } catch (error) {
            return "I'm having trouble analyzing this image. Please make sure it's a valid image file.";
        }
    }

    async translateText(text, targetLang = 'en') {
        // Mock translation
        const mockTranslations = {
            'es': 'Translation to Spanish would go here',
            'fr': 'Translation to French would go here',
            'de': 'Translation to German would go here',
            'it': 'Translation to Italian would go here'
        };

        return mockTranslations[targetLang] || `Translation to ${targetLang}: ${text}`;
    }
}

module.exports = new SimpleAIService();
