# 🚀 Guia Rápido - Integração da Esfera

## ✅ O que foi feito

Criei o componente `interview-screen.ts` que integra:
- ✅ Esfera 3D do `function-core`
- ✅ Backend de áudio (Gemini AI)
- ✅ UI customizada para entrevista

## 📁 Arquivos Criados

```
proj-interview/
├── src/tela-interview/
│   └── interview-screen.ts          ⭐ NOVO - Tela de entrevista
├── INTEGRACAO-ESFERA.md             📚 Documentação detalhada
├── ARQUITETURA-VISUAL.md            🏗️ Diagramas e fluxos
└── GUIA-RAPIDO.md                   🚀 Este arquivo
```

## 🎯 Como Funciona

### Abordagem Escolhida: **Importação Direta**

```typescript
// interview-screen.ts importa diretamente do function-core:

import {AudioConnector} from '../../../function-core/src/connectors/audio-connector';
import '../../../function-core/src/frontend/sphere/ai-sphere';
```

**Por quê?**
- ✅ Controle total do layout
- ✅ UI customizada para entrevista
- ✅ Reutiliza toda a lógica de áudio
- ✅ Mantém a esfera visual intacta

## 🔧 Configuração Necessária

### 1. Variável de Ambiente

Crie/edite o arquivo `.env.local`:

```bash
# proj-interview/.env.local
VITE_GEMINI_API_KEY=sua_chave_aqui
```

### 2. Verificar Dependências

Ambos os projetos devem ter as mesmas versões:

```json
{
  "@google/genai": "^1.15.0",
  "lit": "^3.3.0",
  "three": "^0.176.0"
}
```

### 3. Assets

O arquivo `piz_compressed.exr` já está em:
- ✅ `proj-interview/public/piz_compressed.exr`

## 🚀 Como Testar

```bash
cd proj-interview
npm install  # Se ainda não instalou
npm run dev
```

Acesse: `http://localhost:5173`

## 🎮 Fluxo de Uso

1. **Tela de Config** → Preenche dados do candidato
2. **Clica "Start Interview"** → Vai para tela de entrevista
3. **Tela de Interview:**
   - Esfera aparece em tela cheia
   - Timer começa a contar
   - Clica no botão central para gravar
   - Fala com a IA
   - IA responde (esfera anima)
4. **Fim:** Timer expira ou clica "End Interview"

## 📊 Componentes Reutilizados

### Do function-core:

| Componente | Função | Localização |
|------------|--------|-------------|
| `AudioConnector` | Gerencia Gemini AI + áudio | `connectors/audio-connector.ts` |
| `<gdm-ai-sphere>` | Esfera 3D visual | `frontend/sphere/ai-sphere.ts` |
| `Analyser` | Analisa frequências | `backend/audio/analyser.ts` |
| `sphere-shader` | Shader da esfera | `backend/shaders/sphere-shader.ts` |
| `audio-utils` | Encode/decode áudio | `backend/utils/audio-utils.ts` |

### Novos no interview-screen:

- ✅ Timer de duração
- ✅ Header com info do candidato
- ✅ Indicador de progresso
- ✅ Controles customizados
- ✅ Layout específico

## 🎨 Estrutura do Interview Screen

```typescript
interview-screen.ts
│
├─ Estado
│  ├─ isRecording: boolean
│  ├─ status: string
│  ├─ error: string
│  ├─ timeRemaining: number
│  └─ currentQuestion: number
│
├─ Lógica
│  ├─ initializeInterview()    // Cria AudioConnector
│  ├─ startTimer()              // Inicia contagem
│  ├─ toggleRecording()         // Liga/desliga gravação
│  ├─ endInterview()            // Finaliza e volta
│  └─ cleanup()                 // Limpa recursos
│
└─ UI
   ├─ Header (candidato + timer)
   ├─ Esfera 3D (tela cheia)
   ├─ Progress indicator
   └─ Footer (controles)
```

## 🔄 Alternativas Futuras

### Opção A: Componente Completo
Se quiser usar o componente pronto do function-core:

```typescript
import '../../../function-core/src/app';

html`<gdm-live-audio></gdm-live-audio>`
```

**Prós:** Zero configuração
**Contras:** Menos flexibilidade

### Opção B: Dependência NPM
Para produção, transformar em pacote:

```json
{
  "dependencies": {
    "@audio-orb/function-core": "file:../function-core"
  }
}
```

```typescript
import '@audio-orb/function-core';
```

**Prós:** Melhor organização
**Contras:** Requer build do function-core

## 🐛 Troubleshooting

### Esfera não aparece
- ✅ Verificar se `piz_compressed.exr` está em `public/`
- ✅ Verificar console do navegador
- ✅ Verificar se Three.js está instalado

### Áudio não funciona
- ✅ Verificar `VITE_GEMINI_API_KEY` no `.env.local`
- ✅ Verificar permissão do microfone no navegador
- ✅ Verificar console para erros de WebSocket

### Imports não funcionam
- ✅ Verificar caminhos relativos (`../../../function-core/...`)
- ✅ Verificar se function-core está na pasta correta
- ✅ Rodar `npm install` em ambos os projetos

## 📝 Próximas Melhorias

### Funcionalidades:
- [ ] Sistema de perguntas predefinidas
- [ ] Gravação da entrevista completa
- [ ] Transcrição em tempo real
- [ ] Análise de sentimento
- [ ] Relatório final com score

### UI/UX:
- [ ] Animações de transição
- [ ] Feedback visual de gravação
- [ ] Indicador de volume
- [ ] Modo escuro/claro
- [ ] Responsividade mobile

### Técnico:
- [ ] Error boundaries
- [ ] Loading states
- [ ] Retry logic
- [ ] Offline support
- [ ] Testes unitários

## 📚 Documentação Completa

- **INTEGRACAO-ESFERA.md** - Explicação detalhada das opções
- **ARQUITETURA-VISUAL.md** - Diagramas e fluxos
- **function-core/ESTRUTURA-EXPLICADA.md** - Arquitetura do core

## 💡 Dicas

1. **Desenvolvimento:** Use a importação direta (atual)
2. **Produção:** Migre para dependência NPM
3. **Customização:** Edite apenas `interview-screen.ts`
4. **Core:** Não modifique `function-core` diretamente

## 🎯 Resumo

Você agora tem:
- ✅ Esfera 3D funcionando no interview-screen
- ✅ Backend de áudio integrado (Gemini AI)
- ✅ UI customizada para entrevista
- ✅ Timer e controles
- ✅ Documentação completa

**Próximo passo:** Testar e adicionar funcionalidades específicas da entrevista!
