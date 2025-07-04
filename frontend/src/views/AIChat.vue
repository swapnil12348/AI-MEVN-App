<template>
  <div class="ai-chat">
    <div class="chat-header">
      <h1>AI Chat Assistant</h1>
      <p>Have a conversation with our AI assistant</p>
    </div>

    <div class="chat-container">
      <div class="chat-messages" ref="chatMessages">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', message.type]"
        >
          <div class="message-content">
            <div class="message-text">{{ message.text }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
        <div v-if="isTyping" class="message ai typing">
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <form @submit.prevent="sendMessage">
          <div class="input-group">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              :disabled="isTyping"
              class="message-input"
            />
            <button
              type="submit"
              :disabled="!newMessage.trim() || isTyping"
              class="send-button"
            >
              <span v-if="!isTyping">Send</span>
              <span v-else>...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AIChat',
  data() {
    return {
      messages: [
        {
          id: 1,
          type: 'ai',
          text: 'Hello! I\'m your AI assistant. How can I help you today?',
          timestamp: new Date()
        }
      ],
      newMessage: '',
      isTyping: false,
      messageId: 2
    }
  },
  methods: {
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      // Add user message
      const userMessage = {
        id: this.messageId++,
        type: 'user',
        text: this.newMessage,
        timestamp: new Date()
      };

      this.messages.push(userMessage);
      const messageText = this.newMessage;
      this.newMessage = '';

      // Scroll to bottom
      this.$nextTick(() => {
        this.scrollToBottom();
      });

      // Show typing indicator
      this.isTyping = true;

      try {
        // Call AI API
        const response = await this.callAIAPI(messageText);

        // Add AI response
        const aiMessage = {
          id: this.messageId++,
          type: 'ai',
          text: response,
          timestamp: new Date()
        };

        this.messages.push(aiMessage);
      } catch (error) {
        console.error('Error calling AI API:', error);

        // Add error message
        const errorMessage = {
          id: this.messageId++,
          type: 'ai',
          text: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        };

        this.messages.push(errorMessage);
      } finally {
        this.isTyping = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },

    async callAIAPI(message) {
      // Replace with actual API call to your backend
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('AI API call failed');
      }

      const data = await response.json();
      return data.response || 'I\'m sorry, I couldn\'t process your request.';
    },

    scrollToBottom() {
      const container = this.$refs.chatMessages;
      container.scrollTop = container.scrollHeight;
    },

    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}
</script>

<style scoped>
.ai-chat {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-header {
  text-align: center;
  margin-bottom: 20px;
}

.chat-header h1 {
  color: #333;
  margin-bottom: 8px;
}

.chat-header p {
  color: #666;
  margin: 0;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f8f9fa;
}

.message {
  margin-bottom: 16px;
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.ai {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
}

.message.user .message-content {
  background: #007bff;
  color: white;
}

.message.ai .message-content {
  background: white;
  color: #333;
  border: 1px solid #e9ecef;
}

.message-text {
  margin-bottom: 4px;
  line-height: 1.4;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
}

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #666;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.chat-input {
  padding: 20px;
  background: white;
  border-top: 1px solid #e9ecef;
}

.input-group {
  display: flex;
  gap: 12px;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.message-input:focus {
  border-color: #007bff;
}

.send-button {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.send-button:hover:not(:disabled) {
  background: #0056b3;
}

.send-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .ai-chat {
    padding: 10px;
  }

  .message-content {
    max-width: 85%;
  }
}
</style>
