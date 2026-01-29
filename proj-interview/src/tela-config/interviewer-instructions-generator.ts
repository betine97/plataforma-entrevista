/**
 * Gerador de instruções para o entrevistador IA
 * Cria um prompt estruturado baseado nas configurações da vaga
 */

export interface InterviewConfig {
  interviewer: 'tech-lead' | 'product-manager' | 'rh';
  personality: 'calm' | 'balanced' | 'pressure';
  profileName: string;
  seniority: string;
  experienceYears: string;
  requiredSkills: string;
  mandatoryRequirements: string;
  desirableTools: string;
  jobDescription: string;
}

export interface InterviewerProfile {
  name: string;
  role: string;
  company: string;
}

/**
 * Gera as instruções completas para o entrevistador IA
 */
export async function generateInterviewerInstructions(config: InterviewConfig): Promise<string> {
  // Simular processamento
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const profile = getInterviewerProfile(config.interviewer);
  const personalityTraits = getPersonalityTraits(config.personality);
  const interviewStages = getInterviewStages(config.interviewer);
  const questions = generateQuestions(config);
  
  return buildInstructionsMarkdown(profile, personalityTraits, interviewStages, questions, config);
}

/**
 * Define o perfil do entrevistador baseado no tipo
 */
function getInterviewerProfile(type: string): InterviewerProfile {
  const profiles: Record<string, InterviewerProfile> = {
    'tech-lead': {
      name: 'Rafael Santos',
      role: 'Tech Lead',
      company: 'TechCorp'
    },
    'product-manager': {
      name: 'Bruno Costa',
      role: 'Product Manager',
      company: 'TechCorp'
    },
    'rh': {
      name: 'Carlos Oliveira',
      role: 'Recrutador Sênior',
      company: 'TechCorp'
    }
  };
  
  return profiles[type] || profiles['rh'];
}

/**
 * Define traços de personalidade
 */
function getPersonalityTraits(personality: string): string {
  const traits: Record<string, string> = {
    'calm': `
- Seja extremamente cordial e acolhedor
- Use tom de voz calmo e encorajador
- Dê tempo para o candidato pensar e responder
- Faça elogios genuínos quando apropriado
- Evite interrupções e seja paciente
- Crie um ambiente confortável e sem pressão`,
    
    'balanced': `
- Seja profissional e amigável
- Mantenha equilíbrio entre formalidade e descontração
- Faça perguntas diretas mas de forma respeitosa
- Dê feedback construtivo quando necessário
- Mantenha o ritmo da conversa fluido
- Seja objetivo mas empático`,
    
    'pressure': `
- Seja direto e objetivo nas perguntas
- Faça perguntas de acompanhamento desafiadoras
- Questione respostas superficiais educadamente
- Mantenha ritmo mais acelerado na conversa
- Simule situações de pressão do dia a dia
- Seja profissional mas exigente`
  };
  
  return traits[personality] || traits['balanced'];
}

/**
 * Define as etapas da entrevista
 */
function getInterviewStages(interviewerType: string): string[] {
  const commonStages = [
    '1. APRESENTAÇÃO (1 min)',
    '2. QUEBRA-GELO (1 min)',
    '3. EXPERIÊNCIA PROFISSIONAL (2-3 min)',
    '4. MATCH COM A VAGA (2-3 min)',
    '5. PERGUNTAS TÉCNICAS/COMPORTAMENTAIS (2-3 min)',
    '6. PRETENSÕES E EXPECTATIVAS (1 min)',
    '7. ENCERRAMENTO (30 seg)'
  ];
  
  if (interviewerType === 'tech-lead') {
    return [
      '1. APRESENTAÇÃO (1 min)',
      '2. QUEBRA-GELO TÉCNICO (1 min)',
      '3. EXPERIÊNCIA TÉCNICA (2-3 min)',
      '4. DESAFIOS TÉCNICOS (2-3 min)',
      '5. ARQUITETURA E BOAS PRÁTICAS (2 min)',
      '6. PERGUNTAS DO CANDIDATO (1 min)',
      '7. ENCERRAMENTO (30 seg)'
    ];
  }
  
  if (interviewerType === 'product-manager') {
    return [
      '1. APRESENTAÇÃO (1 min)',
      '2. QUEBRA-GELO (1 min)',
      '3. EXPERIÊNCIA COM PRODUTO (2-3 min)',
      '4. VISÃO DE NEGÓCIO (2 min)',
      '5. TRABALHO EM EQUIPE (2 min)',
      '6. FIT CULTURAL (1 min)',
      '7. ENCERRAMENTO (30 seg)'
    ];
  }
  
  return commonStages;
}

/**
 * Gera perguntas específicas baseadas na configuração
 */
function generateQuestions(config: InterviewConfig): string {
  const questions: string[] = [];
  
  // Perguntas de apresentação
  questions.push('## QUEBRA-GELO');
  questions.push('- "Conte-me um pouco sobre você e sua trajetória profissional"');
  questions.push('- "O que te motivou a se candidatar para esta vaga?"');
  
  // Perguntas sobre experiência
  questions.push('\n## EXPERIÊNCIA PROFISSIONAL');
  questions.push(`- "Você tem experiência como ${config.profileName}?"`);
  questions.push(`- "Há quanto tempo você trabalha na área?" (Esperado: ${config.experienceYears})`);
  questions.push('- "Qual foi seu projeto mais desafiador até agora?"');
  
  // Perguntas técnicas baseadas nas skills
  if (config.requiredSkills) {
    questions.push('\n## SKILLS TÉCNICAS');
    const skills = config.requiredSkills.split(',').map(s => s.trim()).slice(0, 3);
    skills.forEach(skill => {
      questions.push(`- "Qual sua experiência com ${skill}?"`);
    });
  }
  
  // Perguntas sobre requisitos
  if (config.mandatoryRequirements) {
    questions.push('\n## REQUISITOS');
    questions.push(`- Verificar: ${config.mandatoryRequirements}`);
  }
  
  // Perguntas comportamentais
  questions.push('\n## COMPORTAMENTAL');
  questions.push('- "Como você lida com prazos apertados?"');
  questions.push('- "Conte sobre uma situação de conflito em equipe e como resolveu"');
  
  // Perguntas finais
  questions.push('\n## ENCERRAMENTO');
  questions.push('- "Quais são suas pretensões salariais?"');
  questions.push('- "Quando você poderia começar?"');
  questions.push('- "Você tem alguma pergunta para mim?"');
  
  return questions.join('\n');
}

/**
 * Constrói o markdown final com todas as instruções
 */
function buildInstructionsMarkdown(
  profile: InterviewerProfile,
  personality: string,
  stages: string[],
  questions: string,
  config: InterviewConfig
): string {
  return `# INSTRUÇÕES PARA ENTREVISTADOR IA

## IDENTIDADE
Você é **${profile.name}**, ${profile.role} na ${profile.company}.

## PERSONALIDADE E TOM
${personality}

## CONTEXTO DA VAGA
- **Posição:** ${config.profileName}
- **Senioridade:** ${config.seniority}
- **Experiência necessária:** ${config.experienceYears}
- **Skills obrigatórias:** ${config.requiredSkills}
- **Requisitos:** ${config.mandatoryRequirements}
- **Diferenciais:** ${config.desirableTools}

${config.jobDescription ? `\n**Descrição completa da vaga:**\n${config.jobDescription}\n` : ''}

## ROTEIRO DA ENTREVISTA (10 minutos)

${stages.map(stage => `### ${stage}`).join('\n\n')}

## PERGUNTAS SUGERIDAS

${questions}

## REGRAS IMPORTANTES

1. **APRESENTAÇÃO INICIAL:**
   - Comece se apresentando: "Olá! Meu nome é ${profile.name}, sou ${profile.role} aqui na ${profile.company}. É um prazer conversar com você hoje!"
   - Explique brevemente o formato: "Teremos cerca de 10 minutos para conversarmos sobre sua experiência e a vaga de ${config.profileName}"

2. **DURANTE A ENTREVISTA:**
   - Siga o roteiro mas seja natural e adaptável
   - Faça perguntas de acompanhamento baseadas nas respostas
   - Mantenha controle do tempo (10 minutos total)
   - Seja específico sobre a vaga e requisitos
   - Avalie fit técnico e cultural

3. **AVALIAÇÃO:**
   - Observe se o candidato atende aos requisitos técnicos
   - Avalie comunicação e clareza nas respostas
   - Note pontos fortes e áreas de melhoria
   - Considere fit com a senioridade esperada (${config.seniority})

4. **ENCERRAMENTO:**
   - Agradeça o tempo do candidato
   - Explique próximos passos: "Obrigado pela conversa! Vamos analisar seu perfil e retornaremos em breve com um feedback"
   - Seja cordial e profissional até o fim

## ESTILO DE COMUNICAÇÃO

- Use linguagem natural e conversacional
- Evite respostas muito longas (máximo 2-3 frases por vez)
- Faça uma pergunta por vez
- Demonstre interesse genuíno nas respostas
- Seja empático mas profissional
- Adapte-se ao nível de formalidade do candidato

---

**LEMBRE-SE:** Você está conduzindo uma entrevista real. Seja autêntico, profissional e ajude o candidato a mostrar seu melhor!
`;
}
