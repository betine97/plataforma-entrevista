# 🏗️ Arquitetura Visual da Integração

## 📊 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                    INTERVIEW-SCREEN.TS                       │
│                  (proj-interview/src/)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              UI CUSTOMIZADA                           │  │
│  │  • Timer de entrevista                                │  │
│  │  • Info do candidato                                  │  │
│  │  • Indicador de progresso                             │  │
│  │  • Botões de controle                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         AUDIO CONNECTOR (function-core)              │  │
│  │  • Gerencia sessão Gemini AI                         │  │
│  │  • Processa áudio (input/output)                     │  │
│  │  • Callbacks para status/erro                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │      <gdm-ai-sphere> (function-core)                 │  │
│  │  • Renderiza esfera 3D                               │  │
│  │  • Recebe inputNode/outputNode                       │  │
│  │  • Anima baseado em áudio                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Ciclo de Vida da Entrevista

```
┌─────────────┐
│   CONFIG    │  Usuário preenche dados
│   SCREEN    │  (nome, cargo, duração)
└──────┬──────┘
       │ start-interview event
       ↓
┌─────────────┐
│  INTERVIEW  │  1. Cria AudioConnector
│   SCREEN    │  2. Inicializa sessão Gemini
│             │  3. Renderiza esfera
│             │  4. Inicia timer
└──────┬──────┘
       │
       ├─→ [Usuário clica Record]
       │   ├─→ connector.startRecording()
       │   ├─→ Captura microfone
       │   └─→ Envia áudio para Gemini
       │
       ├─→ [Gemini responde]
       │   ├─→ Recebe áudio da IA
       │   ├─→ Reproduz no outputNode
       │   └─→ Esfera anima
       │
       ├─→ [Timer expira]
       │   └─→ Volta para CONFIG
       │
       └─→ [Usuário clica End]
           └─→ Volta para CONFIG
```

## 🎨 Hierarquia de Componentes

```
interview-app (app.ts)
│
├─→ config-screen
│   └─→ Formulário de configuração
│
└─→ interview-screen ⭐ NOVO
    │
    ├─→ Overlay UI (nativo)
    │   ├─→ Header (candidato + timer)
    │   ├─→ Footer (controles)
    │   └─→ Progress indicator
    │
    └─→ <gdm-ai-sphere> (function-core)
        │
        ├─→ Three.js Scene
        │   ├─→ Camera
        │   ├─→ Sphere Mesh
        │   ├─→ Shaders
        │   └─→ Post-processing
        │
        └─→ Audio Analysers
            ├─→ Input Analyser
            └─→ Output Analyser
```

## 📦 Dependências entre Módulos

```
interview-screen.ts
    │
    ├─→ AudioConnector (function-core)
    │   │
    │   ├─→ @google/genai
    │   │   └─→ Gemini AI API
    │   │
    │   └─→ audio-utils.ts
    │       └─→ Encode/decode áudio
    │
    └─→ <gdm-ai-sphere> (function-core)
        │
        ├─→ three.js
        │   ├─→ Scene, Camera, Renderer
        │   ├─→ EXRLoader (HDR)
        │   └─→ Post-processing
        │
        ├─→ Analyser (backend/audio)
        │   └─→ Processa frequências
        │
        ├─→ sphere-shader.ts
        │   └─→ Vertex shader customizado
        │
        └─→ audio-broadcaster.ts
            └─→ Distribui dados de áudio
```

## 🎯 Fluxo de Áudio

```
┌──────────────┐
│  MICROFONE   │
└──────┬───────┘
       │ MediaStream
       ↓
┌──────────────────────┐
│  ScriptProcessor     │  Captura PCM chunks
│  (AudioConnector)    │  16kHz, mono
└──────┬───────────────┘
       │ PCM data
       ↓
┌──────────────────────┐
│   Gemini AI API      │  Processa voz
│   (WebSocket)        │  Gera resposta
└──────┬───────────────┘
       │ Audio response
       ↓
┌──────────────────────┐
│  AudioBuffer         │  Decodifica áudio
│  (24kHz)             │  da resposta
└──────┬───────────────┘
       │
       ├─→ outputNode ──→ Speakers (reproduz)
       │
       └─→ Analyser ────→ Esfera (visualiza)
                          ├─→ Escala
                          ├─→ Rotação
                          └─→ Shader uniforms
```

## 🔌 Pontos de Integração

### 1. AudioConnector → Interview Screen
```typescript
connector.setCallbacks({
  onStatusChange: (status) => this.status = status,
  onErrorChange: (error) => this.error = error
});
```

### 2. AudioConnector → Esfera
```typescript
<gdm-ai-sphere
  .inputNode=${connector.inputNode}
  .outputNode=${connector.outputNode}>
</gdm-ai-sphere>
```

### 3. Interview Screen → Config Screen
```typescript
// Volta para config
this.dispatchEvent(new CustomEvent('back-to-config'));
```

## 🎨 Layout Visual

```
┌─────────────────────────────────────────────────────────┐
│  CANDIDATE NAME              POSITION • LEVEL    00:30  │ ← Header
├─────────────────────────────────────────────────────────┤
│                                                          │
│                                                          │
│                      ╭─────────╮                        │
│                     ╱           ╲                       │
│                    │   ESFERA   │                       │ ← Esfera 3D
│                     ╲           ╱                       │  (tela cheia)
│                      ╰─────────╯                        │
│                                                          │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                    ○ ○ ○ ● ○                           │ ← Progress
├─────────────────────────────────────────────────────────┤
│         [END]         ⬤ [REC]         [RESET]          │ ← Footer
└─────────────────────────────────────────────────────────┘
```

## 📝 Checklist de Implementação

- [x] Criar `interview-screen.ts`
- [x] Importar `AudioConnector` do function-core
- [x] Importar `<gdm-ai-sphere>` do function-core
- [x] Implementar UI customizada (timer, header, footer)
- [x] Gerenciar estado de gravação
- [x] Implementar timer de duração
- [x] Adicionar indicador de progresso
- [ ] Testar integração completa
- [ ] Adicionar variável de ambiente (VITE_GEMINI_API_KEY)
- [ ] Verificar arquivo .exr está no public/

## 🚀 Próximos Passos

1. **Testar a integração:**
   ```bash
   cd proj-interview
   npm run dev
   ```

2. **Verificar assets:**
   - Confirmar que `public/piz_compressed.exr` existe
   - Verificar se o caminho está correto

3. **Adicionar funcionalidades:**
   - Sistema de perguntas/respostas
   - Gravação da entrevista
   - Análise de sentimento
   - Relatório final

4. **Otimizações:**
   - Lazy loading da esfera
   - Preload de assets
   - Error boundaries
   - Loading states
