
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Trash2, Bot, User } from "lucide-react";
import OpenAI from 'openai';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou a IA do TrendFy, especialista em moda e tendências! Como posso te ajudar hoje? Posso sugerir looks, combinar peças, falar sobre tendências atuais ou ajudar você a encontrar seu estilo pessoal! ✨',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const openai = new OpenAI({
        apiKey: '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',
        dangerouslyAllowBrowser: true
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Você é uma IA especialista em moda e tendências chamada TrendFy AI. Seja amigável, criativa e dê sugestões práticas sobre moda, estilo, combinações de roupas e tendências atuais. Use emojis ocasionalmente para ser mais expressiva. Responda sempre em português."
          },
          ...messages.slice(-5).map(msg => ({
            role: msg.isUser ? "user" as const : "assistant" as const,
            content: msg.text
          })),
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      });

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.choices[0]?.message?.content || "Desculpe, não consegui processar sua mensagem. Tente novamente!",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Erro na API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Ops! Houve um problema com a conexão. Tente novamente mais tarde. 😅",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Olá! Sou a IA do TrendFy, especialista em moda e tendências! Como posso te ajudar hoje? ✨',
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-card rounded-lg shadow-card border border-border/50 mx-4 mb-4">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-gradient-primary rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">TrendFy AI</h3>
              <p className="text-xs text-white/80">Especialista em Moda</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button 
              onClick={clearChat}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background" ref={messagesEndRef}>
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <Bot className="w-12 h-12 mx-auto mb-4 text-primary/50" />
            <p className="text-lg font-medium mb-2">Olá! Sou a TrendFy AI</p>
            <p className="text-sm">Estou aqui para ajudar com dicas de moda, tendências e estilo!</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            {!message.isUser && (
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-glow">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-[75%] rounded-xl p-4 shadow-sm ${
                message.isUser
                  ? "bg-gradient-primary text-white"
                  : "bg-card text-card-foreground border border-border/50"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
              <span className={`text-xs opacity-70 mt-2 block ${message.isUser ? 'text-white/70' : 'text-muted-foreground'}`}>
                {message.timestamp.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
            
            {message.isUser && (
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 shadow-glow">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-card text-card-foreground border border-border/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
                </div>
                <span className="text-xs text-muted-foreground">TrendFy AI está digitando...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-4 rounded-b-lg">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Pergunte sobre moda, tendências, dicas de estilo..."
              className="pl-4 pr-12 py-3 rounded-xl border-border/50 focus:border-primary bg-background text-foreground"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                size="sm"
                className="bg-gradient-primary hover:bg-gradient-accent text-white rounded-full w-8 h-8 p-0 shadow-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-2">
          <p className="text-xs text-muted-foreground">
            {messages.length > 0 ? `${messages.length} mensagens na conversa` : "Digite sua pergunta e pressione Enter"}
          </p>
        </div>
      </div>
    </div>
  );
}
