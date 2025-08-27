import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  name: string;
  type: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, type }: EmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "TRENDFY <onboarding@resend.dev>",
      to: [email],
      subject: type === 'confirmation' ? "Bem-vindo ao TRENDFY!" : "Notificação TRENDFY",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">TRENDFY</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px;">Moda e Estilo</p>
          </div>
          
          <div style="background: white; padding: 40px 20px; border-radius: 0 0 12px 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">Olá, ${name}! 👋</h2>
            
            ${type === 'confirmation' ? `
              <p style="color: #555; line-height: 1.6; font-size: 16px; margin: 0 0 20px 0;">
                Seja bem-vindo ao TRENDFY! Sua conta foi criada com sucesso e você já pode começar a explorar as últimas tendências da moda.
              </p>
              
              <div style="background: linear-gradient(135deg, #f3f4f6, #e5e7eb); padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">O que você pode fazer agora:</h3>
                <ul style="color: #555; margin: 10px 0; padding-left: 20px;">
                  <li>Explorar o feed social</li>
                  <li>Conversar com nossa AI</li>
                  <li>Encontrar lojas próximas</li>
                  <li>Personalizar suas configurações</li>
                </ul>
              </div>
            ` : `
              <p style="color: #555; line-height: 1.6; font-size: 16px; margin: 0 0 20px 0;">
                Você tem uma nova notificação do TRENDFY! Acesse o aplicativo para ver as últimas atualizações.
              </p>
            `}
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://trendfy.app" style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);">
                Abrir TRENDFY
              </a>
            </div>
            
            <p style="color: #888; font-size: 14px; text-align: center; margin: 30px 0 0 0;">
              TRENDFY - Sua plataforma de moda e estilo<br>
              © 2025 TRENDFY. Todos os direitos reservados.
            </p>
          </div>
        </div>
      `,
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