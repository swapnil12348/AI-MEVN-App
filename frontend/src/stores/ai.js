import { defineStore } from 'pinia'
import axios from 'axios'

export const useAIStore = defineStore('ai', {
  state: () => ({
    conversations: [],
    currentConversation: null,
    loading: false,
    error: null
  }),

  actions: {
    async sendMessage(message) {
      this.loading = true
      try {
        const response = await axios.post('/api/ai/chat', { message })
        this.conversations.push({
          user: message,
          ai: response.data.response,
          timestamp: new Date()
        })
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to send message'
      } finally {
        this.loading = false
      }
    }
  }
})
