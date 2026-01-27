# 🎯 Interview AI - Sistema de Entrevistas com IA

Sistema de entrevistas automatizadas com IA, desenvolvido com Lit, TypeScript e Vite.

## 📁 Estrutura

```
proj-interview/
├── src/
│   ├── tela-config/          # Tela de configuração
│   │   └── config-screen.ts
│   ├── tela-interview/       # Tela de entrevista
│   │   └── interview-screen.ts
│   ├── app.ts                # Orquestrador principal
│   └── main.ts               # Entry point
├── index.html
├── package.json
└── vite.config.ts
```

## 🚀 Como usar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🎨 Telas

### 1. Tela de Configuração (`tela-config/`)
- Nome do candidato
- Cargo/Posição
- Nível de dificuldade (Junior/Pleno/Sênior)
- Duração da entrevista (15-60 min)

### 2. Tela de Entrevista (`tela-interview/`)
- Orbe de IA animado
- Timer da entrevista
- Controles de gravação
- Barra de progresso
- Navegação entre perguntas

## 🎨 Design

- Dark mode minimalista
- Gradientes modernos
- Ícones emoji
- Animações suaves
- Glassmorphism
