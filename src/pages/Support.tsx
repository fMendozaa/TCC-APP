
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageCircle, Phone, Mail, HelpCircle, Bug, Star, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function Support() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!email || !subject || !message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mensagem enviada! ✅",
      description: "Nossa equipe entrará em contato em até 24 horas",
    });

    setMessage("");
    setEmail("");
    setSubject("");
    setCategory("");
  };

  const supportCategories = [
    { icon: Bug, title: "Reportar Bug", description: "Problemas técnicos ou funcionalidades que não funcionam" },
    { icon: HelpCircle, title: "Ajuda Geral", description: "Dúvidas sobre como usar o aplicativo" },
    { icon: Star, title: "Sugestão", description: "Ideias para melhorar o TRENDFY" },
    { icon: FileText, title: "Outros", description: "Outras questões ou feedback" }
  ];

  const contactMethods = [
    { icon: Mail, title: "Email", description: "suporte@trendfy.com", action: () => window.open('mailto:suporte@trendfy.com') },
    { icon: MessageCircle, title: "Chat", description: "Chat ao vivo (9h às 18h)", action: () => toast({ title: "Chat em breve!", description: "Funcionalidade sendo implementada" }) },
    { icon: Phone, title: "Telefone", description: "+55 11 9999-9999", action: () => window.open('tel:+5511999999999') }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/account')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Suporte</h1>
        </div>
        <p className="text-white/90">Como podemos ajudar você?</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          {supportCategories.map((category, index) => (
            <Card 
              key={index} 
              className="p-4 bg-gradient-card shadow-card border-border/50 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setCategory(category.title)}
            >
              <div className="text-center space-y-2">
                <category.icon className="w-8 h-8 mx-auto text-primary" />
                <h3 className="font-semibold text-foreground text-sm">{category.title}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Enviar Mensagem</h3>
          
          <div className="space-y-4">
            <Input
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-border"
            />
            
            <Input
              placeholder={category || "Assunto"}
              value={subject || category}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-background border-border"
            />
            
            <Textarea
              placeholder="Descreva seu problema ou dúvida..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-background border-border min-h-[120px]"
            />
            
            <Button 
              onClick={handleSubmit}
              className="w-full bg-gradient-primary hover:bg-gradient-accent text-white shadow-glow"
            >
              Enviar Mensagem
            </Button>
          </div>
        </Card>

        {/* Contact Methods */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Outras formas de contato</h3>
          
          <div className="space-y-3">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                onClick={method.action}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/10 transition-colors cursor-pointer"
              >
                <method.icon className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">{method.title}</h4>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* FAQ */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Perguntas Frequentes</h3>
          
          <div className="space-y-3">
            {[
              { q: "Como alterar minha senha?", a: "Vá em Configurações > Segurança > Alterar Senha" },
              { q: "Como funciona a AI?", a: "Nossa AI analisa tendências e sugere looks personalizados" },
              { q: "Posso usar offline?", a: "Algumas funcionalidades funcionam offline, mas recomendamos conexão com internet" }
            ].map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-3">
                <h4 className="font-medium text-foreground mb-1">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
