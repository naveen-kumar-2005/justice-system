
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, ChatMessage } from '../types';
import { askLegalAssistant } from '../services/geminiService';
import { Icon } from './shared/Icon';
import Spinner from './shared/Spinner';
import BackButton from './shared/BackButton';

interface ChatViewProps {
  navigateTo: (view: View) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ navigateTo }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await askLegalAssistant(input);
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError('Failed to get a response from the AI. Please try again.');
      const errorMessage: ChatMessage = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-150px)]">
      <div className="flex items-center mb-4">
        <BackButton onClick={() => navigateTo(View.DASHBOARD)} />
        <h2 className="text-3xl font-bold text-brand-gold-200 ml-4">AI Legal Assistant</h2>
      </div>
      <div className="flex-grow bg-brand-gray-800 rounded-lg p-4 overflow-y-auto border border-brand-gold-900 shadow-inner">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 my-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && <Icon name="scale" className="w-8 h-8 text-brand-gold-500 flex-shrink-0 mt-1" />}
            <div className={`max-w-lg p-3 rounded-lg ${msg.sender === 'user' ? 'bg-brand-gold-700 text-white' : 'bg-brand-gray-700 text-gray-200'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
            {msg.sender === 'user' && <Icon name="user" className="w-8 h-8 text-brand-gold-200 flex-shrink-0 mt-1" />}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 my-4">
            <Icon name="scale" className="w-8 h-8 text-brand-gold-500 flex-shrink-0 mt-1" />
            <div className="max-w-lg p-3 rounded-lg bg-brand-gray-700 text-gray-200 flex items-center">
              <Spinner />
              <span className="ml-2">AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      {error && <p className="text-red-400 text-center mt-2">{error}</p>}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a legal question, e.g., 'Summarize IPC Section 420'"
          className="flex-grow p-3 bg-brand-gray-700 text-white rounded-lg border border-brand-gray-600 focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="p-3 bg-brand-gold-600 text-white rounded-lg hover:bg-brand-gold-700 disabled:bg-brand-gray-600 disabled:cursor-not-allowed flex items-center justify-center w-14 h-14"
        >
          {isLoading ? <Spinner /> : <Icon name="send" className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default ChatView;
