import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, BookOpen, Loader2 } from 'lucide-react';
import { Badge } from './UIComponents';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  isReflection?: boolean;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hello! I am the Panaversity AI. Highlight any text in the book to ask specific questions, or ask me anything about the course.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selection, setSelection] = useState<string | null>(null);
  const [selectionCoords, setSelectionCoords] = useState<{ x: number, y: number } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Selection Detection Logic
  useEffect(() => {
    const handleSelection = () => {
      const sel = window.getSelection();
      if (sel && sel.toString().trim().length > 0) {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelection(sel.toString());
        setSelectionCoords({
          x: rect.left + (rect.width / 2),
          y: rect.top + window.scrollY - 50
        });
      } else {
        setSelection(null);
        setSelectionCoords(null);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // 2. Handler for "Ask about selection"
  const handleSelectionAsk = () => {
    setIsOpen(true);
    setInput(`Explain this context: "${selection?.substring(0, 50)}..."`);
    // Clear selection UI but keep text for context
    setSelectionCoords(null);
  };

  // 3. Messaging Logic (Mocking the FastAPI /query endpoint)
  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
    setSelection(null); // Clear selection context after send

    // SIMULATED FETCH to Backend
    // In production: await fetch('http://localhost:8000/query', ...)
    setTimeout(() => {
      const isContextQuery = newMessage.content.includes("Explain this context");
      
      const mockResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: isContextQuery 
          ? "Based on the selected text, the author is emphasizing the shift from factory-model education to personalized, agentic learning paths. This aligns with the Spec-Kit Plus philosophy defined in Chapter 3."
          : "The ReflectionAgent checks the quality of all answers. Based on Chapter 6, we use a multi-agent architecture where the QueryAgent retrieves data from Qdrant, and the ReflectionAgent scores the output.",
        sources: isContextQuery ? ['Selected Text'] : ['Chapter 3', 'Chapter 6'],
        isReflection: true
      };
      
      setMessages(prev => [...prev, mockResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Selection Bubble */}
      {selectionCoords && !isOpen && (
        <div 
          className="fixed z-50 animate-in fade-in zoom-in duration-200"
          style={{ left: selectionCoords.x, top: selectionCoords.y, transform: 'translateX(-50%)' }}
        >
          <button 
            onClick={handleSelectionAsk}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors font-medium text-sm"
          >
            <Sparkles size={16} />
            Ask AI
          </button>
        </div>
      )}

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)}
            className="p-4 bg-primary-600 text-white rounded-full shadow-2xl hover:bg-primary-700 transition-all hover:scale-105"
          >
            <MessageSquare size={24} />
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[600px] bg-white dark:bg-[#1b1b1d] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gray-50 dark:bg-[#242526] border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold text-gray-800 dark:text-gray-100">Panaversity Agent</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-[#161618]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-br-none' 
                      : 'bg-gray-100 dark:bg-[#242526] text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {msg.content}
                  {msg.sources && (
                    <div className="mt-2 pt-2 border-t border-gray-200/20 flex flex-wrap gap-1">
                      {msg.sources.map((src, i) => (
                        <span key={i} className="flex items-center text-[10px] uppercase tracking-wider opacity-70">
                          <BookOpen size={10} className="mr-1" /> {src}
                        </span>
                      ))}
                    </div>
                  )}
                  {msg.isReflection && (
                    <div className="mt-1 flex justify-end">
                         <span className="text-[10px] text-green-500 flex items-center gap-1">
                           <Sparkles size={10} /> Verified by ReflectionAgent
                         </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-[#242526] p-3 rounded-2xl rounded-bl-none flex items-center gap-2 text-gray-500 text-sm">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="animate-pulse">Querying Vector DB...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 bg-gray-50 dark:bg-[#242526] border-t border-gray-200 dark:border-gray-800">
            {selection && (
               <div className="mb-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg flex justify-between items-center">
                  <span className="text-xs text-blue-700 dark:text-blue-300 truncate max-w-[250px]">Context: "{selection}"</span>
                  <button type="button" onClick={() => setSelection(null)} className="text-blue-500 hover:text-blue-700"><X size={12}/></button>
               </div>
            )}
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="w-full pl-4 pr-12 py-3 bg-white dark:bg-[#1b1b1d] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white text-sm"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-1.5 bg-primary-600 text-white rounded-lg disabled:opacity-50 hover:bg-primary-700 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
