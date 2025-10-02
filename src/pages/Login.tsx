import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const animateText = (text: string, setter: (value: string) => void) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setter(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
    animateText("fastion.dev.br", setEmail);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
    animateText("*******", setPassword);
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card/95 backdrop-blur-sm shadow-2xl border-border/50 animate-scale-in">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            FASTION
          </h1>
          <p className="text-muted-foreground">Bem-vindo ao futuro da moda</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="Clique para preencher automaticamente"
              value={email}
              onFocus={handleEmailFocus}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50 border-border/50 focus:border-primary transition-all duration-300 hover:border-primary/50"
            />
          </div>

          <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <label className="text-sm font-medium text-foreground">Senha</label>
            <Input
              type="password"
              placeholder="Clique para preencher automaticamente"
              value={password}
              onFocus={handlePasswordFocus}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50 border-border/50 focus:border-primary transition-all duration-300 hover:border-primary/50"
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={!email || !password}
            className="w-full bg-gradient-primary hover:bg-gradient-accent text-white font-semibold py-6 rounded-lg shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ animationDelay: "0.3s" }}
          >
            ENTRAR
          </Button>

          <p className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            ✨ Demonstração - Clique nos campos para preenchimento automático
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30">
          <div className="flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold shadow-glow">
              F
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">FASTION App</p>
              <p className="text-xs text-muted-foreground">Versão Demo</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
