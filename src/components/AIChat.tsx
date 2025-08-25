import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Trash2, Bot, User, Key } from "lucide-react";
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
  const [openaiKey, setOpenaiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(true);

  const sendMessage = async (text: string) => {
    if (!openaiKey.trim()) return;

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
        apiKey: openaiKey,
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
        text: "Ops! Houve um problema com a conexão. Verifique sua chave API ou tente novamente mais tarde. 😅",
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

  const activateAI = () => {
    if (openaiKey.trim()) {
      setShowKeyInput(false);
    }
  };

  if (showKeyInput) {
    return (
      <div className="p-6 space-y-4">
        <Card className="p-6 bg-gradient-card shadow-card border-border/50 text-center">
          <Bot className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Ativar IA Conversacional</h3>
          <p className="text-muted-foreground mb-4">
            Para conversar com nossa IA especialista em moda, você precisa de uma chave da OpenAI. 
            Visite <a href="https://openai.com/api/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">openai.com</a> e crie uma conta.
          </p>
          
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Cole sua chave API da OpenAI aqui..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="bg-background border-border"
            />
            <Button 
              onClick={activateAI}
              disabled={!openaiKey.trim()}
              className="bg-gradient-primary hover:bg-gradient-accent text-white shadow-glow"
            >
              <Key className="w-4 h-4 mr-2" />
              Ativar IA
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={clearChat}
          className="border-border hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-200px)]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.isUser 
                  ? 'bg-gradient-primary shadow-glow' 
                  : 'bg-gradient-accent shadow-glow'
              }`}>
                {message.isUser ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              
              <Card className={`p-4 ${
                message.isUser 
                  ? 'bg-gradient-primary text-white shadow-glow' 
                  : 'bg-gradient-card shadow-card border-border/50'
              }`}>
                <p className={`${message.isUser ? 'text-white' : 'text-foreground'} text-sm leading-relaxed`}>
                  {message.text}
                </p>
                <span className={`text-xs ${message.isUser ? 'text-white/70' : 'text-muted-foreground'} mt-2 block`}>
                  {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </Card>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <Card className="p-4 bg-gradient-card shadow-card border-border/50">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-muted-foreground text-sm">TrendFy está digitando...</span>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua pergunta sobre moda..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-background border-border"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-primary hover:bg-gradient-accent text-white shadow-glow"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}