# 🎤 Setup do Projeto Interview

## 📋 Pré-requisitos

1. Node.js instalado
2. API Key do Google Gemini

## 🔧 Configuração

### 1. Instalar dependências

```bash
cd proj-interview
npm install
```

### 2. Configurar API Key

Edite o arquivo `.env.local` e adicione sua API key do Gemini:

```env
VITE_GEMINI_API_KEY=sua_api_key_aqui
```

Para obter uma API key:
1. Acesse https://aistudio.google.com/app/apikey
2. Crie uma nova API key
3. Copie e cole no arquivo `.env.local`

### 3. Executar o projeto

```bash
npm run dev
```

## 🎯 Funcionalidades

### Tela de Configuração (config-screen)
- Configuração inicial da entrevista
- Seleção de parâmetros

### Tela de Entrevista (interview-screen)
- **Esfera 3D Interativa**: Visualização em tempo real do áudio
- **Gravação de Áudio**: Captura sua voz via microfone
- **IA Gemini**: Processa e responde suas respostas
- **Controles**:
  - ▶️/⏸ Pausar/Retomar
  - 🎤 Iniciar/Parar gravação
  - ← Voltar para configuração

## 🎨 Componentes Integrados

A esfera visual do `function-core` foi totalmente integrada no `interview-screen.ts`:

- ✅ Frontend (esfera 3D com Three.js)
- ✅ Backend (análise de áudio, shaders, processamento)
- ✅ Connector (integração com Gemini AI)
- ✅ Controles de áudio funcionais

## 🔊 Como Funciona

1. Clique no botão de microfone para iniciar a gravação
2. Fale sua resposta
3. A esfera reage ao seu áudio em tempo real
4. A IA Gemini processa e responde
5. A esfera também reage ao áudio da resposta da IA

## 🐛 Troubleshooting

### Esfera não aparece
- Verifique se o arquivo `piz_compressed.exr` está em `/public/`
- Abra o console do navegador para ver erros

### Áudio não funciona
- Verifique se a API key está configurada corretamente
- Permita acesso ao microfone quando solicitado
- Verifique o console para mensagens de erro

### Erro de API Key
- Certifique-se de que a API key é válida
- Verifique se o arquivo `.env.local` está na raiz do `proj-interview`
- Reinicie o servidor de desenvolvimento após alterar o `.env.local`
