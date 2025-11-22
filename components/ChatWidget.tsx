import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'intro', role: 'model', text: 'Hello. I am Kai. How can I assist you with Alex\'s work today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'model',
          text: "I encountered a temporary issue. Please try again.",
          isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-6 w-[90vw] md:w-[380px] h-[550px] bg-[#1c1c1e]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-slide-up origin-bottom-right ring-1 ring-white/5">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Sparkles size={14} className="text-white fill-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-[#1c1c1e] rounded-full"></div>
                </div>
                <div>
                    <h3 className="text-base font-semibold text-white tracking-tight">Kai</h3>
                    <p className="text-[10px] font-medium text-blue-400 uppercase tracking-wider">AI Assistant</p>
                </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-apple-blue text-white rounded-[20px] rounded-br-[4px]'
                      : 'bg-[#2c2c2e] text-gray-100 rounded-[20px] rounded-bl-[4px]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-[#2c2c2e] px-4 py-3 rounded-[20px] rounded-bl-[4px] flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-gray-400" />
                        <span className="text-sm text-gray-400">Kai is thinking...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-5 bg-[#1c1c1e]/50 border-t border-white/5 backdrop-blur-md">
            <div className="relative group">
                <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="w-full bg-[#2c2c2e] border border-transparent group-hover:border-white/10 transition-colors rounded-full py-3.5 pl-5 pr-14 text-white placeholder-gray-500 focus:ring-2 focus:ring-apple-blue/50 focus:outline-none text-[15px]"
                />
                <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-apple-blue rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
                >
                <Send size={16} className={inputValue.trim() ? "ml-0.5" : ""} />
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button (Siri Orb Style) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-500 ${
            isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Gradient Orb */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 animate-spin-slow blur-sm opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute inset-0.5 rounded-full bg-black/90 flex items-center justify-center z-10">
            <Sparkles size={24} className="text-white group-hover:scale-110 transition-transform duration-300" />
        </div>
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </button>
    </div>
  );
};

export default ChatWidget;