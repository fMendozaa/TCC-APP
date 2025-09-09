import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  type?: 'delivery' | 'contact' | 'confirmation';
  customerName?: string;
  orderDetails?: {
    total: string;
    items: number;
    orderId: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Small delay to prevent spam
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { to, subject, html, text, type, customerName, orderDetails }: EmailRequest = await req.json();

    console.log("Sending email to:", to, "Subject:", subject, "Type:", type);

    let emailContent = html || text || "";
    
    // Generate email content based on type
    if (type === 'delivery' && orderDetails) {
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">FASTION</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px;">🚚 Pedido Confirmado!</p>
          </div>
          
          <div style="background: white; padding: 40px 20px; border-radius: 0 0 12px 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">Olá, ${customerName || 'Cliente'}! 👋</h2>
            
            <p style="color: #555; line-height: 1.6; font-size: 16px; margin: 0 0 20px 0;">
              Seu pedido foi confirmado e está sendo preparado para envio! 
            </p>
            
            <div style="background: linear-gradient(135deg, #f3f4f6, #e5e7eb); padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">📦 Detalhes do Pedido:</h3>
              <p style="margin: 5px 0; color: #555;"><strong>Número:</strong> ${orderDetails.orderId}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Itens:</strong> ${orderDetails.items} produto(s)</p>
              <p style="margin: 5px 0; color: #555;"><strong>Total:</strong> R$ ${orderDetails.total}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Previsão de entrega:</strong> 3-5 dias úteis</p>
            </div>
            
            <p style="color: #555; line-height: 1.6; font-size: 16px; margin: 20px 0;">
              Você receberá atualizações sobre o status da entrega por email.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);">
                Acompanhar Pedido
              </p>
            </div>
            
            <p style="color: #888; font-size: 14px; text-align: center; margin: 30px 0 0 0;">
              FASTION - Sua plataforma de moda e estilo<br>
              © 2025 FASTION. Todos os direitos reservados.
            </p>
          </div>
        </div>
      `;
    } else if (type === 'contact') {
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            📧 Mensagem Recebida!
          </h1>
          <p>Olá ${customerName || 'Cliente'},</p>
          <p>Recebemos sua mensagem e retornaremos em breve!</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Nossa equipe de suporte analisará sua solicitação e entrará em contato dentro de 24 horas.</p>
          </div>
          
          <hr style="margin: 30px 0; border: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            Atenciosamente,<br>
            <strong>Equipe FASTION</strong>
          </p>
        </div>
      `;
    } else {
      // Beautiful confirmation email template
      emailContent = html || `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc;">
          <!-- Header with gradient -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 16px 16px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 36px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
              ✨ FASTION
            </h1>
            <p style="color: rgba(255,255,255,0.95); margin: 12px 0 0 0; font-size: 18px; font-weight: 300;">
              Confirmação de Email
            </p>
          </div>
          
          <!-- Main content -->
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: linear-gradient(135deg, #667eea, #764ba2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);">
                <span style="font-size: 40px;">📧</span>
              </div>
            </div>
            
            <h2 style="color: #1a202c; margin: 0 0 24px 0; font-size: 28px; text-align: center; font-weight: 600;">
              Olá, ${customerName || 'Cliente'}! 👋
            </h2>
            
            <p style="color: #4a5568; line-height: 1.7; font-size: 16px; margin: 0 0 24px 0; text-align: center;">
              Seu email foi confirmado com sucesso! Agora você está conectado ao mundo da moda e estilo da 
              <strong style="color: #667eea;">FASTION</strong>.
            </p>
            
            <!-- Features section -->
            <div style="background: linear-gradient(135deg, #f7fafc, #edf2f7); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #2d3748; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">🎉 O que você pode fazer agora:</h3>
              <ul style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li style="margin-bottom: 8px;">🛍️ Explorar nossa coleção exclusiva</li>
                <li style="margin-bottom: 8px;">💖 Salvar seus favoritos</li>
                <li style="margin-bottom: 8px;">🚚 Receber atualizações sobre entregas</li>
                <li style="margin-bottom: 8px;">✨ Descobrir tendências em primeira mão</li>
              </ul>
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 35px 0;">
              <a href="#" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                🚀 Começar a Comprar
              </a>
            </div>
            
            <!-- Social proof -->
            <div style="background: linear-gradient(135deg, #f0fff4, #f7fafc); padding: 20px; border-radius: 12px; margin: 30px 0; text-align: center; border: 1px solid #e2e8f0;">
              <p style="color: #4a5568; margin: 0; font-size: 14px; line-height: 1.5;">
                <strong style="color: #667eea;">+10.000</strong> pessoas já confiam na FASTION para suas compras de moda ❤️
              </p>
            </div>
            
            <!-- Footer -->
            <div style="border-top: 1px solid #e2e8f0; padding-top: 25px; margin-top: 35px; text-align: center;">
              <p style="color: #a0aec0; font-size: 14px; margin: 0 0 10px 0; line-height: 1.5;">
                FASTION - Onde estilo encontra tecnologia<br>
                Transformando a forma como você compra moda
              </p>
              <p style="color: #cbd5e0; font-size: 12px; margin: 0;">
                © 2025 FASTION. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "FASTION <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);