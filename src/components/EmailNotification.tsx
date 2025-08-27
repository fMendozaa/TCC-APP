import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function EmailNotification() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const sendEmail = async () => {
    if (!email || !name) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha email e nome",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Chama a edge function
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: { 
          email, 
          name, 
          type: 'confirmation' 
        }
      });

      if (error) throw error;

      // Salva no banco
      const { error: dbError } = await supabase
        .from('email_notifications')
        .insert({
          user_id: crypto.randomUUID(), // Temporário até implementar auth
          email,
          type: 'confirmation',
          status: 'sent',
          sent_at: new Date().toISOString()
        });

      if (dbError) console.warn('DB save error:', dbError);

      setSent(true);
      toast({
        title: "Email enviado! ✅",
        description: `Confirmação enviada para ${email}`,
      });
    } catch (error: any) {
      console.error('Email error:', error);
      toast({
        title: "Erro ao enviar email",
        description: "Verifique se a API key do Resend está configurada",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <Card className="p-6 bg-gradient-card shadow-card border-border/50 text-center">
        <Check className="w-12 h-12 mx-auto mb-4 text-green-500" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Email Enviado!</h3>
        <p className="text-muted-foreground">Verifique sua caixa de entrada em {email}</p>
        <Button 
          variant="outline" 
          onClick={() => { setSent(false); setEmail(""); setName(""); }}
          className="mt-4"
        >
          Enviar outro email
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-card shadow-card border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Teste de Email</h3>
      </div>
      
      <div className="space-y-4">
        <Input
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-background border-border"
        />
        
        <Input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background border-border"
        />
        
        <Button 
          onClick={sendEmail}
          disabled={isLoading || !email || !name}
          className="w-full bg-gradient-primary hover:bg-gradient-accent text-white shadow-glow"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enviando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Enviar Email de Confirmação
            </div>
          )}
        </Button>
      </div>
    </Card>
  );
}