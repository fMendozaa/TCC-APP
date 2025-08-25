import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Trash2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export function AI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Bem-vindo ao TrendFy. Como posso ajudar com tendências hoje?',
      isUser: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        isUser: true
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Ótima pergunta sobre tendências! Com base no que vejo atualmente, posso sugerir algumas combinações incríveis para você. Que tipo de look você está procurando?',
          isUser: false
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Olá! Bem-vindo ao TrendFy. Como posso ajudar com tendências hoje?',
        isUser: false
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">TRENDFY</h1>
          <h2 className="text-xl font-semibold">AI</h2>
        </div>
        <p className="text-white/90">Converse com a nossa AI</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Clear Chat Button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="border-border hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-[80%] p-4 ${
                message.isUser 
                  ? 'bg-gradient-primary text-white shadow-glow' 
                  : 'bg-gradient-card shadow-card border-border/50'
              }`}>
                <p className={message.isUser ? 'text-white' : 'text-foreground'}>
                  {message.text}
                </p>
              </Card>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="fixed bottom-20 left-4 right-4">
          <Card className="p-4 bg-gradient-card shadow-card border-border/50">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite uma mensagem..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-background border-border"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-primary hover:bg-gradient-accent text-white shadow-glow"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}