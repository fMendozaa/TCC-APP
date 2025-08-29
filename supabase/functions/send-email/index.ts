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
    const { to, subject, html, text, type, customerName, orderDetails }: EmailRequest = await req.json();

    console.log("Sending email to:", to, "Subject:", subject, "Type:", type);

    let emailContent = html || text || "";
    
    // Generate email content based on type
    if (type === 'delivery' && orderDetails) {
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">TRENDFY</h1>
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
              TRENDFY - Sua plataforma de moda e estilo<br>
              © 2025 TRENDFY. Todos os direitos reservados.
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
            <strong>Equipe TRENDFY</strong>
          </p>
        </div>
      `;
    } else {
      // Default email template
      emailContent = html || `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">TRENDFY</h1>
          <p>Olá ${customerName || 'Cliente'},</p>
          <p>Esta é uma notificação do TRENDFY.</p>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "TRENDFY <onboarding@resend.dev>",
      to: ["fabriciosono596@gmail.com"], // Usando email verificado do Resend
      subject: `${subject} - Para: ${to}`,
      html: emailContent + `<p><strong>Email original destino:</strong> ${to}</p>`,
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