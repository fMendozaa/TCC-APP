-- Criar um usuário demo com UUID válido
INSERT INTO public.profiles (user_id, username, email)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Demo User', 'demo@trendfy.com')
ON CONFLICT (user_id) DO NOTHING;