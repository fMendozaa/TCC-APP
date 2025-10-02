import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    if (!email) {
      animateText("fastion.dev.br", setEmail);
    }
  };

  const handlePasswordFocus = () => {
    if (!password) {
      animateText("*******", setPassword);
    }
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Design - Inspired by reference image */}
      <div className="lg:hidden w-full flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-glow mb-4">
              <span className="text-3xl font-bold text-white">F</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">FASTION</h1>
            <p className="text-sm text-muted-foreground">Bem-vindo de volta</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onFocus={handleEmailFocus}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-2xl bg-muted/30 border-0 text-base placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onFocus={handlePasswordFocus}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 rounded-2xl bg-muted/30 border-0 text-base placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-primary pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!email || !password}
              className="w-full h-14 rounded-2xl bg-gradient-primary hover:bg-gradient-accent text-white font-semibold text-base shadow-glow transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Login
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Demonstração • Clique nos campos para preencher
            </p>
          </div>

          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Versão Demo • FASTION 2025
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Design - Split screen with image */}
      <div className="hidden lg:flex w-full">
        {/* Left Side - Image/Branding */}
        <div className="w-1/2 bg-gradient-primary flex items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzRoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0yLTJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0tMiAydjJoMnYtMmgtMnptMC0ydjJoMnYtMmgtMnptMi0ydjJoMnYtMmgtMnptMC0ydjJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="relative z-10 text-center text-white space-y-6 max-w-md">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm shadow-2xl mb-8">
              <span className="text-5xl font-bold">F</span>
            </div>
            <h1 className="text-5xl font-bold">FASTION</h1>
            <p className="text-xl text-white/80">
              Seu estilo, suas escolhas, sua moda
            </p>
            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Tendências em tempo real</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>IA especializada em moda</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Lojas próximas a você</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 flex items-center justify-center p-12 bg-background">
          <Card className="w-full max-w-md p-10 bg-card border-border/50 shadow-2xl animate-scale-in">
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Bem-vindo!</h2>
                <p className="text-muted-foreground">Entre para continuar</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onFocus={handleEmailFocus}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-background border-border/50 focus:border-primary transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Senha</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onFocus={handlePasswordFocus}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-background border-border/50 focus:border-primary transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleLogin}
                  disabled={!email || !password}
                  className="w-full h-12 bg-gradient-primary hover:bg-gradient-accent text-white font-semibold shadow-glow transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Entrar
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  ✨ Versão demonstrativa • Clique nos campos para preenchimento automático
                </p>
              </div>

              <div className="pt-6 border-t border-border/30">
                <p className="text-center text-xs text-muted-foreground">
                  FASTION © 2025 • Todos os direitos reservados
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
