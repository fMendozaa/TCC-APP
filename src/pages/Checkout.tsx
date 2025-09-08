import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/hooks/useCurrency";

export function Checkout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { currency, formatPrice, convertPrice } = useCurrency();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    city: '',
    state: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePurchase = async () => {
    console.log('🛒 Iniciando processo de compra...');
    console.log('📦 Itens no carrinho:', items);
    console.log('📋 Dados do formulário:', formData);
    
    if (!formData.email || !formData.name) {
      console.log('❌ Campos obrigatórios não preenchidos');
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o email e nome para continuar.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      console.log('⏱️ Simulando processamento de pagamento...');
      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Enviar email real usando Supabase Edge Function
      const orderData = {
        orderId: `TR-${Date.now()}`,
        items,
        total: finalTotal,
        customerEmail: formData.email,
        customerName: formData.name
      };
      
      console.log('📧 Enviando email com dados:', orderData);
      
      // Chamar função de envio de email
      const { supabase } = await import("@/integrations/supabase/client");
      
      console.log('📤 Chamando edge function send-email...');
      const emailResponse = await supabase.functions.invoke('send-email', {
        body: {
          to: formData.email,
          subject: `Confirmação de Pedido ${orderData.orderId} - TRENDFY`,
          type: 'delivery',
          customerName: formData.name,
          orderDetails: {
            total: finalTotal.toFixed(2),
            items: items.length,
            orderId: orderData.orderId
          }
        }
      });

      console.log('📧 Resposta do email:', emailResponse);
      
      if (emailResponse.error) {
        console.error('❌ Erro ao enviar email:', emailResponse.error);
        toast({
          title: "Email não enviado",
          description: "Compra realizada, mas houve um problema ao enviar o email de confirmação.",
          variant: "destructive"
        });
      } else {
      console.log('✅ Email enviado com sucesso!');
        toast({
          title: "Compra realizada com sucesso! 🎉",
          description: `Email de confirmação enviado para ${formData.email}`,
        });
      }

      // Salvar pedido no banco de dados
      console.log('💾 Salvando pedido no banco...');
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        
        const orderData = {
          user_id: '550e8400-e29b-41d4-a716-446655440000', // ID do usuário demo com UUID válido
          customer_name: formData.name,
          customer_email: formData.email,
          total_amount: finalTotal,
          currency: currency.code,
          status: 'completed',
          items: JSON.parse(JSON.stringify(items)) // Converter para JSON
        };

        const { error: orderError } = await supabase
          .from('orders')
          .insert(orderData);

        if (orderError) {
          console.error('❌ Erro ao salvar pedido:', orderError);
        } else {
          console.log('✅ Pedido salvo com sucesso!');
        }
      } catch (error) {
        console.error('❌ Erro ao salvar pedido:', error);
      }
      
      console.log('🧹 Limpando carrinho...');
      clearCart();
      navigate('/account');
      
    } catch (error) {
      console.error('Erro no processamento da compra:', error);
      toast({
        title: "Erro na compra",
        description: "Houve um problema ao processar sua compra. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const total = getTotalPrice();
  const shipping = convertPrice(15.90);
  const finalTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-gradient-primary p-6 text-white">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/market')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>
        </div>
        
        <div className="p-6 text-center">
          <Card className="p-8 bg-gradient-card shadow-card border-border/50">
            <h3 className="text-xl font-semibold text-foreground mb-2">Carrinho vazio</h3>
            <p className="text-muted-foreground mb-4">Adicione alguns produtos para continuar</p>
            <Button 
              onClick={() => navigate('/market')}
              className="bg-gradient-primary hover:bg-gradient-accent text-white shadow-glow"
            >
              Ir às compras
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/market')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Finalizar Compra</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Resumo do Pedido */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Resumo do Pedido</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-foreground font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-primary font-semibold">
                  {formatPrice(item.priceValue * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="text-foreground">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frete:</span>
              <span className="text-foreground">{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-foreground">Total:</span>
              <span className="text-primary">{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </Card>

        {/* Dados de Entrega */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Dados de Entrega</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email para entrega *</Label>
              <Input 
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Digite seu email"
                className="bg-background border-border"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Nome completo *</Label>
              <Input 
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Seu nome completo"
                className="bg-background border-border"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Telefone</Label>
              <Input 
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(11) 99999-9999"
                className="bg-background border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cep" className="text-foreground">CEP</Label>
              <Input 
                id="cep"
                value={formData.cep}
                onChange={(e) => handleInputChange('cep', e.target.value)}
                placeholder="00000-000"
                className="bg-background border-border"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-foreground">Endereço</Label>
              <Input 
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Rua, avenida..."
                className="bg-background border-border"
              />
            </div>
          </div>
        </Card>

        {/* Dados de Pagamento */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Pagamento</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-foreground">Nome no cartão</Label>
              <Input 
                id="cardName"
                value={formData.cardName}
                onChange={(e) => handleInputChange('cardName', e.target.value)}
                placeholder="Como está no cartão"
                className="bg-background border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-foreground">Número do cartão</Label>
              <Input 
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                placeholder="0000 0000 0000 0000"
                className="bg-background border-border"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-foreground">Validade</Label>
                <Input 
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  placeholder="MM/AA"
                  className="bg-background border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                <Input 
                  id="cvv"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  placeholder="000"
                  className="bg-background border-border"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Segurança */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span className="text-sm">Pagamento 100% seguro e criptografado</span>
        </div>

        {/* Finalizar Compra */}
        <Button 
          onClick={handlePurchase}
          disabled={isProcessing}
          className="w-full bg-gradient-primary hover:bg-gradient-accent text-white font-semibold py-4 rounded-lg shadow-glow transition-all duration-300 hover:scale-[0.98]"
        >
          {isProcessing ? (
            <span>Processando pagamento...</span>
          ) : (
            <span>Finalizar Compra - {formatPrice(finalTotal)}</span>
          )}
        </Button>
      </div>
    </div>
  );
}
