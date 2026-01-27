/**
 * Analisador de descrição de vaga
 * Extrai informações estruturadas de um texto livre sobre uma vaga
 */

export interface JobDetails {
  profileName: string;           // Nome do perfil/cargo procurado
  seniority: string;              // Nível de senioridade
  experienceYears: string;        // Tempo de experiência necessário
  requiredSkills: string;         // Skills obrigatórias
  mandatoryRequirements: string;  // Requisitos obrigatórios
  desirableTools: string;         // Ferramentas/tecnologias desejáveis
}

/**
 * Analisa a descrição da vaga e extrai informações estruturadas
 */
export async function analyzeJobDescription(description: string): Promise<JobDetails> {
  // Simular processamento (em produção, aqui seria uma chamada para API de IA)
  await new Promise(resolve => setTimeout(resolve, 2000));

  const lowerDesc = description.toLowerCase();
  
  return {
    profileName: extractProfileName(description),
    seniority: extractSeniority(lowerDesc),
    experienceYears: extractExperienceYears(lowerDesc),
    requiredSkills: extractRequiredSkills(description, lowerDesc),
    mandatoryRequirements: extractMandatoryRequirements(description),
    desirableTools: extractDesirableTools(description, lowerDesc)
  };
}

/**
 * Extrai o nome do perfil/cargo procurado
 */
function extractProfileName(description: string): string {
  const lowerDesc = description.toLowerCase();
  
  // Lista de cargos específicos para identificar
  const specificRoles = [
    // Engenharia de Software
    { keywords: ['engenheiro de software', 'software engineer'], title: 'Engenheiro de Software' },
    { keywords: ['desenvolvedor full stack', 'full stack developer', 'fullstack'], title: 'Desenvolvedor Full Stack' },
    { keywords: ['desenvolvedor frontend', 'frontend developer', 'front-end'], title: 'Desenvolvedor Frontend' },
    { keywords: ['desenvolvedor backend', 'backend developer', 'back-end'], title: 'Desenvolvedor Backend' },
    { keywords: ['desenvolvedor mobile', 'mobile developer'], title: 'Desenvolvedor Mobile' },
    { keywords: ['desenvolvedor react', 'react developer'], title: 'Desenvolvedor React' },
    { keywords: ['desenvolvedor node', 'node developer'], title: 'Desenvolvedor Node.js' },
    
    // Dados
    { keywords: ['engenheiro de dados', 'data engineer'], title: 'Engenheiro de Dados' },
    { keywords: ['cientista de dados', 'data scientist'], title: 'Cientista de Dados' },
    { keywords: ['analista de dados', 'data analyst'], title: 'Analista de Dados' },
    { keywords: ['engenheiro de machine learning', 'ml engineer'], title: 'Engenheiro de Machine Learning' },
    
    // Arquitetura e Liderança
    { keywords: ['arquiteto de software', 'software architect'], title: 'Arquiteto de Software' },
    { keywords: ['arquiteto de soluções', 'solutions architect'], title: 'Arquiteto de Soluções' },
    { keywords: ['tech lead', 'líder técnico', 'technical lead'], title: 'Tech Lead' },
    { keywords: ['engineering manager', 'gerente de engenharia'], title: 'Gerente de Engenharia' },
    
    // DevOps e Infraestrutura
    { keywords: ['engenheiro devops', 'devops engineer'], title: 'Engenheiro DevOps' },
    { keywords: ['engenheiro de infraestrutura', 'infrastructure engineer'], title: 'Engenheiro de Infraestrutura' },
    { keywords: ['sre', 'site reliability engineer'], title: 'Site Reliability Engineer' },
    { keywords: ['engenheiro de cloud', 'cloud engineer'], title: 'Engenheiro de Cloud' },
    
    // Qualidade
    { keywords: ['engenheiro de qa', 'qa engineer', 'quality assurance'], title: 'Engenheiro de QA' },
    { keywords: ['analista de testes', 'test analyst'], title: 'Analista de Testes' },
    
    // Design e Produto
    { keywords: ['ui designer', 'designer de interface'], title: 'UI Designer' },
    { keywords: ['ux designer', 'designer de experiência'], title: 'UX Designer' },
    { keywords: ['product manager', 'gerente de produto'], title: 'Product Manager' },
    { keywords: ['product owner', 'dono do produto'], title: 'Product Owner' },
    
    // Segurança
    { keywords: ['engenheiro de segurança', 'security engineer'], title: 'Engenheiro de Segurança' },
    { keywords: ['analista de segurança', 'security analyst'], title: 'Analista de Segurança' }
  ];

  // Tentar encontrar cargo específico
  for (const role of specificRoles) {
    if (role.keywords.some(keyword => lowerDesc.includes(keyword))) {
      return role.title;
    }
  }

  // Padrões para extrair do texto
  const patterns = [
    /(?:vaga|posição|cargo|oportunidade)\s+(?:de|para|como)?\s*:?\s*([^\n.]+)/i,
    /(?:buscamos|procuramos)\s+(?:um|uma)?\s*([^\n.]+?)(?:\s+para|\s+com|\s+que|\.)/i,
    /perfil\s*:?\s*([^\n.]+)/i
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match && match[1]) {
      const extracted = match[1].trim().replace(/[.,;:]/g, '');
      // Se extraiu algo razoável, retornar
      if (extracted.length > 5 && extracted.length < 80) {
        return extracted;
      }
    }
  }

  // Tentar inferir pela tecnologia principal mencionada
  const techInference = [
    { tech: ['react', 'reactjs'], role: 'Desenvolvedor React' },
    { tech: ['angular'], role: 'Desenvolvedor Angular' },
    { tech: ['vue', 'vuejs'], role: 'Desenvolvedor Vue.js' },
    { tech: ['node', 'nodejs'], role: 'Desenvolvedor Node.js' },
    { tech: ['python', 'django', 'flask'], role: 'Desenvolvedor Python' },
    { tech: ['java', 'spring'], role: 'Desenvolvedor Java' },
    { tech: ['c#', 'csharp', '.net'], role: 'Desenvolvedor .NET' },
    { tech: ['ios', 'swift'], role: 'Desenvolvedor iOS' },
    { tech: ['android', 'kotlin'], role: 'Desenvolvedor Android' },
    { tech: ['react native', 'flutter'], role: 'Desenvolvedor Mobile' },
    { tech: ['aws', 'azure', 'gcp', 'cloud'], role: 'Engenheiro de Cloud' },
    { tech: ['docker', 'kubernetes', 'devops'], role: 'Engenheiro DevOps' },
    { tech: ['data', 'dados', 'analytics'], role: 'Engenheiro de Dados' }
  ];

  for (const inference of techInference) {
    if (inference.tech.some(tech => lowerDesc.includes(tech))) {
      return inference.role;
    }
  }

  // Fallback genérico
  return 'Engenheiro de Software';
}

/**
 * Extrai o nível de senioridade
 */
function extractSeniority(lowerDesc: string): string {
  const seniorityMap = [
    { keywords: ['sênior', 'senior', 'sr.', 'experiente', 'avançado'], level: 'Sênior' },
    { keywords: ['pleno', 'mid-level', 'intermediário', 'pl.', 'mid'], level: 'Pleno' },
    { keywords: ['júnior', 'junior', 'jr.', 'iniciante'], level: 'Júnior' },
    { keywords: ['tech lead', 'líder técnico', 'lead'], level: 'Tech Lead' },
    { keywords: ['staff', 'principal', 'especialista'], level: 'Especialista' },
    { keywords: ['trainee', 'estagiário', 'estágio'], level: 'Trainee/Estágio' }
  ];

  for (const { keywords, level } of seniorityMap) {
    if (keywords.some(keyword => lowerDesc.includes(keyword))) {
      return level;
    }
  }

  return 'Pleno';
}

/**
 * Extrai tempo de experiência necessário
 */
function extractExperienceYears(lowerDesc: string): string {
  // Padrões para identificar anos de experiência
  const patterns = [
    /(\d+)\s*(?:\+|ou mais)?\s*anos?\s+de\s+experiência/i,
    /experiência\s+de\s+(\d+)\s*(?:\+|ou mais)?\s*anos?/i,
    /mínimo\s+de\s+(\d+)\s*anos?/i,
    /pelo menos\s+(\d+)\s*anos?/i,
    /(\d+)\+\s*anos?/i
  ];

  for (const pattern of patterns) {
    const match = lowerDesc.match(pattern);
    if (match && match[1]) {
      const years = parseInt(match[1]);
      if (years === 1) return '1 ano';
      if (match[0].includes('+') || match[0].includes('ou mais')) {
        return `${years}+ anos`;
      }
      return `${years} anos`;
    }
  }

  // Inferir pela senioridade
  if (lowerDesc.includes('sênior') || lowerDesc.includes('senior')) {
    return '5+ anos';
  }
  if (lowerDesc.includes('pleno') || lowerDesc.includes('mid')) {
    return '3-5 anos';
  }
  if (lowerDesc.includes('júnior') || lowerDesc.includes('junior')) {
    return '1-2 anos';
  }

  return '3+ anos';
}

/**
 * Extrai skills obrigatórias
 */
function extractRequiredSkills(description: string, lowerDesc: string): string {
  const skills: string[] = [];

  // Skills técnicas comuns
  const technicalSkills = [
    // Linguagens
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Kotlin', 'Swift',
    // Frameworks/Libs Frontend
    'React', 'Vue', 'Angular', 'Next.js', 'Svelte',
    // Backend
    'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'ASP.NET',
    // Mobile
    'React Native', 'Flutter', 'iOS', 'Android',
    // Dados
    'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
    // Cloud/DevOps
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    // Outros
    'Git', 'REST API', 'GraphQL', 'Microservices', 'CI/CD'
  ];

  // Buscar skills mencionadas
  for (const skill of technicalSkills) {
    if (lowerDesc.includes(skill.toLowerCase())) {
      skills.push(skill);
    }
  }

  // Buscar em seções específicas
  const skillSections = [
    /(?:skills?|habilidades?|competências?)\s+(?:obrigatórias?|necessárias?|requeridas?)\s*:([^]*?)(?:\n\n|requisitos|desejável|$)/i,
    /(?:conhecimento|experiência)\s+(?:obrigatório|necessário|essencial)\s+(?:em|com)\s*:([^]*?)(?:\n\n|requisitos|desejável|$)/i
  ];

  for (const pattern of skillSections) {
    const match = description.match(pattern);
    if (match && match[1]) {
      const items = match[1]
        .split(/[•\-\*\n]/)
        .map(item => item.trim())
        .filter(item => item.length > 2 && item.length < 80)
        .slice(0, 5);
      
      skills.push(...items);
      break;
    }
  }

  if (skills.length === 0) {
    return 'Programação, Resolução de problemas, Trabalho em equipe';
  }

  // Remover duplicatas e limitar
  return [...new Set(skills)].slice(0, 8).join(', ');
}

/**
 * Extrai requisitos obrigatórios
 */
function extractMandatoryRequirements(description: string): string {
  const requirements: string[] = [];

  // Padrões para requisitos obrigatórios
  const patterns = [
    /requisitos?\s+obrigatórios?\s*:([^]*?)(?:\n\n|desejável|diferencial|$)/i,
    /(?:obrigatório|essencial|necessário)\s*:([^]*?)(?:\n\n|desejável|diferencial|$)/i,
    /(?:você deve|é necessário|precisa)\s+(?:ter|possuir)\s*:([^]*?)(?:\n\n|desejável|diferencial|$)/i
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match && match[1]) {
      const items = match[1]
        .split(/[•\-\*\n]/)
        .map(item => item.trim())
        .filter(item => item.length > 5 && item.length < 150)
        .slice(0, 5);
      
      requirements.push(...items);
      break;
    }
  }

  // Se não encontrou seção específica, buscar indicadores
  if (requirements.length === 0) {
    const indicators = [
      'graduação', 'formação', 'diploma', 'bacharelado',
      'experiência comprovada', 'experiência prévia',
      'inglês', 'fluente', 'avançado'
    ];

    const sentences = description.split(/[.!?]+/);
    for (const sentence of sentences) {
      const lower = sentence.toLowerCase();
      if (indicators.some(ind => lower.includes(ind))) {
        const trimmed = sentence.trim();
        if (trimmed.length > 10 && trimmed.length < 150) {
          requirements.push(trimmed);
          if (requirements.length >= 3) break;
        }
      }
    }
  }

  if (requirements.length === 0) {
    return 'Formação em área relacionada, Experiência comprovada na área';
  }

  return requirements.slice(0, 5).join('; ');
}

/**
 * Extrai ferramentas e tecnologias desejáveis
 */
function extractDesirableTools(description: string, lowerDesc: string): string {
  const tools: string[] = [];

  // Padrões para diferenciais/desejáveis
  const patterns = [
    /(?:desejável|diferencial|plus|bônus)\s*:([^]*?)(?:\n\n|benefícios|$)/i,
    /(?:será um diferencial|considerado um plus)\s*:([^]*?)(?:\n\n|benefícios|$)/i,
    /(?:nice to have|good to have)\s*:([^]*?)(?:\n\n|benefits|$)/i
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match && match[1]) {
      const items = match[1]
        .split(/[•\-\*\n]/)
        .map(item => item.trim())
        .filter(item => item.length > 3 && item.length < 100)
        .slice(0, 6);
      
      tools.push(...items);
      break;
    }
  }

  // Ferramentas/tecnologias comuns que podem ser desejáveis
  const commonTools = [
    'Jest', 'Testing Library', 'Cypress', 'Selenium',
    'Jenkins', 'GitLab CI', 'GitHub Actions',
    'Terraform', 'Ansible', 'Prometheus', 'Grafana',
    'Kafka', 'RabbitMQ', 'Elasticsearch',
    'Figma', 'Jira', 'Confluence'
  ];

  if (tools.length < 3) {
    for (const tool of commonTools) {
      if (lowerDesc.includes(tool.toLowerCase())) {
        tools.push(tool);
      }
    }
  }

  if (tools.length === 0) {
    return 'Certificações relevantes, Contribuições open source, Experiência com metodologias ágeis';
  }

  return [...new Set(tools)].slice(0, 6).join(', ');
}
