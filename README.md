
[README.md](https://github.com/user-attachments/files/23840641/README.md)
# Glouz Acessórios — Projeto Completo (Wireframe)

Este pacote contém:
- `frontend/` — app React (Vite) com Tailwind; wireframe navegável.
- `backend/` — webhook Flask para receber notificações de pagamento (mock).
- Instruções de deploy para Netlify / Vercel e como configurar InfinitePay.

## 1) Executar localmente

### Frontend
```
cd frontend
npm install
npm run dev
```

### Backend (webhook)
```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export INFINITEPAY_SECRET='sua_chave'
python webhook.py
```

## 2) Integrar InfinitePay (Link Integrado)
- No painel da InfinitePay, gere seu `handle` e configure a URL de retorno (ex: `https://seu-dominio.com/checkout/retorno`) e o webhook apontando para `https://seu-backend.com/webhook`.
- No frontend, no botão de pagamento, gere a `checkout_url` usando os parâmetros exigidos (items, reference_id, redirect_url, etc). Para segurança, monte os parâmetros sensíveis no backend e retorne a URL ao frontend.

Exemplo (fluxo recomendado):
1. Frontend chama `POST /create-order` no seu backend com os itens.
2. Backend cria o pedido interno, monta os parâmetros e chama a API da InfinitePay ou monta o Link Integrado com seu `handle`.
3. Backend responde com `checkout_url`.
4. Frontend redireciona o cliente para `checkout_url`.
5. InfinitePay notifica via webhook (configurado no painel) para `/webhook` e também redireciona para `redirect_url` configurada.

## 3) Deploy (rápido)
### Vercel (frontend)
- Conectar repositório GitHub/GitLab contendo a pasta `frontend`.
- Build command: `npm run build`
- Output directory: `dist`
- Add env vars if needed.

### Netlify
- Conectar repositório.
- Build command: `npm run build`
- Publish directory: `dist`

### Backend (webhook)
- Pode ser implantado em Heroku, Render, Railway, or a server of choice.
- Configure a variável de ambiente `INFINITEPAY_SECRET` e exponha HTTPS.

## 4) Link de acesso direto (como obter)
Após deploy:
- Seu site ficará disponível em algo como `https://seu-projeto.vercel.app` ou `https://seu-projeto.netlify.app`.
- O link direto de checkout será criado dinamicamente pela InfinitePay (`checkout_url`) para cada pedido.
- No painel da InfinitePay, configure `redirect_url` para a sua página de agradecimento (`/thank-you`), que mostrará o status do pedido.

## Observações de segurança
- Nunca exponha `handle` e `INFINITEPAY_SECRET` no frontend.
- Valide sempre as assinaturas dos webhooks.

## Próximos passos que eu posso fazer para você
- Gerar o repositório GitHub pronto e (opcional) conectar e fazer deploy automático para Vercel (preciso de acesso ao seu GitHub ou permissões).
- Customizar o layout com imagens reais, textos, e política de trocas.
- Implementar rota `create-order` no backend que chama a API da InfinitePay e retorna `checkout_url`.

