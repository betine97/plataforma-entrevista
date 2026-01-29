import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

interface Candidate {
  id: string;
  name: string;
  currentRole: string;
  experience: string;
  stacks: string[];
  lastInterview: string;
  averageScore: number;
  totalInterviews: number;
  status: 'active' | 'inactive';
}

interface TrainingStats {
  candidateName: string;
  totalInterviews: number;
  averageScore: number;
  lastInterview: string;
  improvement: number; // Percentual de melhoria
}

@customElement('rh-screen')
export class RHScreen extends LitElement {
  @state() private activeTab: 'candidates' | 'training' = 'candidates';
  @state() private searchQuery = '';
  
  // Mock data - em produção viria de uma API
  private candidates: Candidate[] = [
    {
      id: '1',
      name: 'Eron Silva',
      currentRole: 'Desenvolvedor Full Stack',
      experience: '3-5 anos',
      stacks: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
      lastInterview: '15/01/2025',
      averageScore: 8.5,
      totalInterviews: 3,
      status: 'active'
    },
    {
      id: '2',
      name: 'Marina Costa',
      currentRole: 'Engenheira de Dados',
      experience: '5+ anos',
      stacks: ['Python', 'Spark', 'AWS', 'SQL'],
      lastInterview: '12/01/2025',
      averageScore: 9.0,
      totalInterviews: 5,
      status: 'active'
    },
    {
      id: '3',
      name: 'Carlos Mendes',
      currentRole: 'Desenvolvedor Frontend',
      experience: '1-2 anos',
      stacks: ['React', 'JavaScript', 'CSS'],
      lastInterview: '08/01/2025',
      averageScore: 7.2,
      totalInterviews: 2,
      status: 'active'
    },
    {
      id: '4',
      name: 'Ana Paula',
      currentRole: 'DevOps Engineer',
      experience: '3-5 anos',
      stacks: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
      lastInterview: '20/12/2024',
      averageScore: 8.8,
      totalInterviews: 4,
      status: 'inactive'
    }
  ];

  private trainingStats: TrainingStats[] = [
    {
      candidateName: 'Eron Silva',
      totalInterviews: 3,
      averageScore: 8.5,
      lastInterview: '15/01/2025',
      improvement: 15
    },
    {
      candidateName: 'Marina Costa',
      totalInterviews: 5,
      averageScore: 9.0,
      lastInterview: '12/01/2025',
      improvement: 8
    },
    {
      candidateName: 'Carlos Mendes',
      totalInterviews: 2,
      averageScore: 7.2,
      lastInterview: '08/01/2025',
      improvement: 22
    },
    {
      candidateName: 'Ana Paula',
      totalInterviews: 4,
      averageScore: 8.8,
      lastInterview: '20/12/2024',
      improvement: 12
    }
  ];

  private downloadCV(candidateName: string) {
    alert(`Download do CV de ${candidateName} será implementado em breve!`);
  }

  private viewProfile(candidateId: string) {
    alert(`Visualizar perfil completo do candidato ${candidateId}`);
  }

  private get filteredCandidates() {
    if (!this.searchQuery) return this.candidates;
    
    const query = this.searchQuery.toLowerCase();
    return this.candidates.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.currentRole.toLowerCase().includes(query) ||
      c.stacks.some(s => s.toLowerCase().includes(query))
    );
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      background: #000000;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .wrapper {
      max-width: 1600px;
      margin: 0 auto;
      padding: 60px 40px 100px;
    }

    .header {
      margin-bottom: 60px;
    }

    .title {
      font-size: 56px;
      font-weight: 300;
      letter-spacing: 12px;
      color: #666666;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .subtitle {
      font-size: 12px;
      letter-spacing: 3px;
      color: #444444;
      text-transform: uppercase;
    }

    .tabs {
      display: flex;
      gap: 24px;
      margin-bottom: 40px;
      border-bottom: 1px solid #1a1a1a;
    }

    .tab {
      padding: 16px 32px;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: #666666;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tab:hover {
      color: #888888;
    }

    .tab.active {
      color: #ffffff;
      border-bottom-color: #ffffff;
    }

    .search-bar {
      margin-bottom: 40px;
    }

    .search-input {
      width: 100%;
      max-width: 500px;
      padding: 18px 0;
      background: transparent;
      border: none;
      border-bottom: 1px solid #333333;
      color: #ffffff;
      font-size: 16px;
      outline: none;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      border-bottom-color: #888888;
    }

    .search-input::placeholder {
      color: #333333;
    }

    .candidates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 24px;
    }

    .candidate-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid #2a2a2a;
      border-radius: 12px;
      padding: 24px;
      transition: all 0.3s ease;
      position: relative;
    }

    .candidate-card:hover {
      border-color: #3a3a3a;
      transform: translateY(-2px);
    }

    .candidate-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .candidate-name {
      font-size: 16px;
      color: #ffffff;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .candidate-role {
      font-size: 11px;
      color: #888888;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .status-badge.active {
      background: rgba(107, 207, 127, 0.1);
      color: #6bcf7f;
      border: 1px solid rgba(107, 207, 127, 0.3);
    }

    .status-badge.inactive {
      background: rgba(255, 255, 255, 0.05);
      color: #666666;
      border: 1px solid #333333;
    }

    .candidate-info {
      margin-bottom: 16px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 11px;
    }

    .info-label {
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .info-value {
      color: #ffffff;
    }

    .stacks-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }

    .stack-tag {
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid #333333;
      border-radius: 12px;
      color: #888888;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .score-display {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      padding: 12px;
      background: rgba(74, 158, 255, 0.05);
      border-radius: 8px;
    }

    .score-number {
      font-size: 28px;
      font-weight: 300;
      color: #4a9eff;
    }

    .score-details {
      flex: 1;
    }

    .score-label {
      font-size: 9px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .score-meta {
      font-size: 10px;
      color: #888888;
    }

    .card-actions {
      display: flex;
      gap: 12px;
    }

    .action-btn {
      flex: 1;
      padding: 12px;
      background: transparent;
      border: 1px solid #333333;
      border-radius: 6px;
      color: #666666;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .action-btn:hover {
      border-color: #666666;
      color: #888888;
    }

    .action-btn.primary {
      border-color: #ffffff;
      color: #ffffff;
    }

    .action-btn.primary:hover {
      background: #ffffff;
      color: #000000;
    }

    .training-stats {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .stat-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid #2a2a2a;
      border-radius: 12px;
      padding: 24px;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
      gap: 24px;
      align-items: center;
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      border-color: #3a3a3a;
    }

    .stat-name {
      font-size: 14px;
      color: #ffffff;
      font-weight: 500;
    }

    .stat-value {
      text-align: center;
    }

    .stat-number {
      font-size: 24px;
      font-weight: 300;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 9px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .improvement-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 500;
    }

    .improvement-badge.positive {
      background: rgba(107, 207, 127, 0.1);
      color: #6bcf7f;
    }

    .improvement-badge.neutral {
      background: rgba(255, 217, 61, 0.1);
      color: #ffd93d;
    }

    @media (max-width: 1024px) {
      .candidates-grid {
        grid-template-columns: 1fr;
      }

      .stat-card {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .stat-value {
        text-align: left;
      }
    }
  `;

  render() {
    return html`
      <div class="wrapper">
        <div class="header">
          <div class="title">RH</div>
          <div class="subtitle">Gestão de Colaboradores e Treinamentos</div>
        </div>

        <div class="tabs">
          <button 
            class="tab ${this.activeTab === 'candidates' ? 'active' : ''}"
            @click=${() => this.activeTab = 'candidates'}>
            Colaboradores
          </button>
          <button 
            class="tab ${this.activeTab === 'training' ? 'active' : ''}"
            @click=${() => this.activeTab = 'training'}>
            Monitoramento de Treinamentos
          </button>
        </div>

        ${this.activeTab === 'candidates' ? html`
          <div class="search-bar">
            <input 
              type="text" 
              class="search-input"
              placeholder="BUSCAR POR NOME, CARGO OU TECNOLOGIA"
              .value=${this.searchQuery}
              @input=${(e: any) => this.searchQuery = e.target.value} />
          </div>

          <div class="candidates-grid">
            ${this.filteredCandidates.map(candidate => html`
              <div class="candidate-card">
                <div class="candidate-header">
                  <div>
                    <div class="candidate-name">${candidate.name}</div>
                    <div class="candidate-role">${candidate.currentRole}</div>
                  </div>
                  <div class="status-badge ${candidate.status}">
                    ${candidate.status === 'active' ? 'Ativo' : 'Inativo'}
                  </div>
                </div>

                <div class="candidate-info">
                  <div class="info-row">
                    <span class="info-label">Experiência</span>
                    <span class="info-value">${candidate.experience}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Última Entrevista</span>
                    <span class="info-value">${candidate.lastInterview}</span>
                  </div>
                </div>

                <div class="stacks-list">
                  ${candidate.stacks.map(stack => html`
                    <span class="stack-tag">${stack}</span>
                  `)}
                </div>

                <div class="score-display">
                  <div class="score-number">${candidate.averageScore}</div>
                  <div class="score-details">
                    <div class="score-label">Média Geral</div>
                    <div class="score-meta">${candidate.totalInterviews} entrevistas realizadas</div>
                  </div>
                </div>

                <div class="card-actions">
                  <button class="action-btn" @click=${() => this.viewProfile(candidate.id)}>
                    Ver Perfil
                  </button>
                  <button class="action-btn primary" @click=${() => this.downloadCV(candidate.name)}>
                    Baixar CV
                  </button>
                </div>
              </div>
            `)}
          </div>
        ` : html`
          <div class="training-stats">
            ${this.trainingStats.map(stat => html`
              <div class="stat-card">
                <div class="stat-name">${stat.candidateName}</div>
                
                <div class="stat-value">
                  <div class="stat-number">${stat.totalInterviews}</div>
                  <div class="stat-label">Entrevistas</div>
                </div>

                <div class="stat-value">
                  <div class="stat-number">${stat.averageScore}</div>
                  <div class="stat-label">Média</div>
                </div>

                <div class="stat-value">
                  <div class="improvement-badge ${stat.improvement >= 10 ? 'positive' : 'neutral'}">
                    ↑ ${stat.improvement}%
                  </div>
                  <div class="stat-label">Melhoria</div>
                </div>

                <div class="stat-value">
                  <div class="stat-label">Última</div>
                  <div style="font-size: 11px; color: #888888; margin-top: 4px;">
                    ${stat.lastInterview}
                  </div>
                </div>
              </div>
            `)}
          </div>
        `}
      </div>
    `;
  }
}
