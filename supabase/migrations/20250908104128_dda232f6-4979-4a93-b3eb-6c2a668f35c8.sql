-- Verificar se o usuário demo existe, se não, criar
INSERT INTO public.profiles (user_id, username, email)
VALUES ('user-demo-123', 'Demo User', 'demo@trendfy.com')
ON CONFLICT (user_id) DO NOTHING;