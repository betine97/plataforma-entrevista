# 🎯 Integração da Esfera 3D no Projeto Interview

## 📋 Resumo

Este documento explica as diferentes formas de integrar o componente de esfera 3D e backend de áudio do `function-core` no `proj-interview`.

## 🎨 Arquitetura Atual

### Function-Core
```
function-core/
├── src/
│   ├── app.ts                    # Componente <gdm-live-audio> (orquestrador)
│   ├── connectors/
│   │   └── audio-connector.ts    # Gerencia Gemini AI + áudio
│   ├── frontend/
│   │   ├── sphere/
│   │   │   └── ai-sphere.ts      # Componente visual da esfera
│   │   └── ui/
│   │       └── audio-controls.ts # Botões de controle
│   └── backend/
│       ├── audio/                # Analysers de áudio
│       ├── shaders/              # Shaders da esfera
│       ├── services/             # Audio broadcaster
│       └── utils/                # Utilitários de áudio
```

## 🔧 Opções de Integração

### ✅ Opção 1: Importação Direta (IMPLEMENTADA)

**Vantagens:**
- Controle total sobre o layout
- Customização específica para entrevista
- Mantém a esfera + adiciona UI própria

**Implementação:**
```typescript
// interview-screen.ts
import {AudioConnector} from '../../../function-core/src/connectors/audio-connector';
import '../../../function-core/src/frontend/sphere/ai-sphere';

// Usa apenas a esfera visual + cria próprio AudioConnector
```

**Arquivos necessários:**
- ✅ `function-core/src/connectors/audio-connector.ts`
- ✅ `function-core/src/frontend/sphere/ai-sphere.ts`
- ✅ Todo `function-core/src/backend/` (dependências da esfera)

---

### 🎁 Opção 2: Usar Componente Completo

**Vantagens:**
- Zero configuração
- Reutiliza tudo do function-core
- Manutenção centralizada

**Implementação:**
```typescript
// interview-screen.ts
import '../../../function-core/src/app'; // Importa <gdm-live-audio>

// No render:
html`
  <gdm-live-audio></gdm-live-audio>
`
```

**Desvantagem:**
- Menos flexibilidade no layout
- Vem com os botões padrão do function-core

---

### 📦 Opção 3: Dependência Local (RECOMENDADA PARA PRODUÇÃO)

**Vantagens:**
- Melhor organização
- Versionamento independente
- Facilita deploy

**Implementação:**

1. **Configurar package.json:**
```json
// proj-interview/package.json
{
  "dependencies": {
    "@audio-orb/function-core": "file:../function-core"
  }
}
```

2. **Instalar:**
```bash
cd proj-interview
npm install
```

3. **Usar no código:**
```typescript
// interview-screen.ts
import '@audio-orb/function-core'; // Componente completo
// OU
import {AudioConnector} from '@audio-orb/function-core';
import '@audio-orb/function-core/sphere'; // Apenas esfera
```

---

## 🎯 Solução Implementada

A solução atual (`interview-screen.ts`) usa a **Opção 1** porque:

1. ✅ **Máxima flexibilidade** - Layout customizado para entrevista
2. ✅ **UI específica** - Timer, progresso, informações do candidato
3. ✅ **Controle total** - Gerencia quando iniciar/parar gravação
4. ✅ **Reutiliza o core** - Esfera e backend de áudio do function-core

### Componentes Reutilizados:
- `AudioConnector` - Gerencia Gemini AI e processamento de áudio
- `<gdm-ai-sphere>` - Componente visual da esfera 3D
- Todo o backend (shaders, analysers, utils)

### Componentes Novos:
- Layout específico para entrevista
- Timer de duração
- Informações do candidato
- Indicador de progresso
- Controles customizados

---

## 📁 Estrutura de Arquivos Necessários

### Arquivos que DEVEM existir no function-core:

```
function-core/src/
├── connectors/
│   └── audio-connector.ts        ✅ Usado diretamente
├── frontend/
│   └── sphere/
│       └── ai-sphere.ts          ✅ Usado diretamente
└── backend/
    ├── audio/
    │   ├── analyser.ts           ✅ Dependência da esfera
    │   └── index.ts
    ├── services/
    │   ├── audio-broadcaster.ts  ✅ Dependência da esfera
    │   └── index.ts
    ├── shaders/
    │   ├── sphere-shader.ts      ✅ Dependência da esfera
    │   └── index.ts
    └── utils/
        ├── audio-utils.ts        ✅ Usado pelo AudioConnector
        └── index.ts
```

### Arquivos do proj-interview:

```
proj-interview/src/
├── tela-interview/
│   └── interview-screen.ts       ✅ Novo componente criado
└── app.ts                        ✅ Já configurado para usar
```

---

## 🚀 Como Usar

### 1. Verificar dependências compartilhadas

Ambos os projetos precisam das mesmas versões:
```json
{
  "@google/genai": "^1.15.0",
  "lit": "^3.3.0",
  "three": "^0.176.0"
}
```

### 2. Configurar variável de ambiente

```bash
# proj-interview/.env.local
VITE_GEMINI_API_KEY=sua_chave_aqui
```

### 3. Executar

```bash
cd proj-interview
npm run dev
```

---

## 🎨 Customizações Possíveis

### Mudar comportamento da esfera:
Edite `function-core/src/frontend/sphere/ai-sphere.ts`

### Mudar lógica de áudio:
Edite `function-core/src/connectors/audio-connector.ts`

### Mudar UI da entrevista:
Edite `proj-interview/src/tela-interview/interview-screen.ts`

---

## 🔄 Migração Futura para Opção 3

Quando quiser publicar ou melhorar a organização:

1. Build do function-core:
```bash
cd function-core
npm run build
```

2. Publicar (npm/local):
```bash
npm link
# OU
npm publish
```

3. Instalar no proj-interview:
```bash
cd proj-interview
npm link @audio-orb/function-core
```

4. Atualizar imports:
```typescript
// De:
import '../../../function-core/src/...'

// Para:
import '@audio-orb/function-core/...'
```
