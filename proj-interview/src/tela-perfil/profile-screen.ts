import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('profile-screen')
export class ProfileScreen extends LitElement {
  @state() private name = '';
  @state() private currentRole = '';
  @state() private experience = '';
  @state() private stacks: string[] = [];
  @state() private stackInput = '';

  // Mock data para demonstração
  private recentInterviews = [
    { 
      date: '15/01/2025', 
      position: 'Frontend Developer', 
      score: 8.5, 
      interviewer: 'Tech Lead', 
      feedback: 'Excelente domínio de React e boas práticas',
      improvements: [
        { area: 'Performance', description: 'Otimização de renderização' },
        { area: 'Testes', description: 'Aumentar cobertura de testes' }
      ]
    },
    { 
      date: '10/01/2025', 
      position: 'Full Stack Developer', 
      score: 7.8, 
      interviewer: 'Product Manager', 
      feedback: 'Boa comunicação e visão de produto',
      improvements: [
        { area: 'Backend', description: 'Aprofundar em arquitetura de APIs' },
        { area: 'Comunicação', description: 'Melhorar explicações técnicas' }
      ]
    },
    { 
      date: '05/01/2025', 
      position: 'React Developer', 
      score: 9.0, 
      interviewer: 'Tech Lead', 
      feedback: 'Conhecimento técnico sólido e código limpo',
      improvements: [
        { area: 'Algoritmos', description: 'Praticar complexidade de tempo' }
      ]
    }
  ];

  private downloadCV() {
    // Placeholder - funcionalidade será implementada depois
    alert('Funcionalidade de download do CV será implementada em breve!');
  }

  private addStack() {
    if (this.stackInput.trim()) {
      this.stacks = [...this.stacks, this.stackInput.trim()];
      this.stackInput = '';
    }
  }

  private removeStack(index: number) {
    this.stacks = this.stacks.filter((_, i) => i !== index);
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.name || !this.currentRole) return;
    
    this.dispatchEvent(new CustomEvent('save-profile', {
      detail: {
        name: this.name,
        currentRole: this.currentRole,
        experience: this.experience,
        stacks: this.stacks
      }
    }));
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
      max-width: 1400px;
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

    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      margin-bottom: 60px;
    }

    .column {
      display: flex;
      flex-direction: column;
      gap: 50px;
    }

    .section {
      position: relative;
    }

    .section-title {
      color: #888888;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 24px;
      font-weight: 500;
    }

    .form-group {
      margin-bottom: 20px;
    }

    input[type="text"] {
      width: 100%;
      padding: 18px 0;
      background: transparent;
      border: none;
      border-bottom: 1px solid #333333;
      color: #ffffff;
      font-size: 16px;
      outline: none;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    input[type="text"]:focus {
      border-bottom-color: #888888;
    }

    input[type="text"]::placeholder {
      color: #333333;
    }

    .evaluations-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 20px;
    }

    .eval-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid #2a2a2a;
      border-radius: 12px;
      padding: 20px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .eval-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #4a9eff 0%, #7b68ee 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .eval-card:hover {
      border-color: #3a3a3a;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
      transform: translateY(-2px);
    }

    .eval-card:hover::before {
      opacity: 1;
    }

    .eval-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .eval-info {
      flex: 1;
    }

    .eval-position {
      font-size: 14px;
      color: #ffffff;
      font-weight: 500;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }

    .eval-date {
      font-size: 10px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .eval-score-badge {
      display: flex;
      align-items: baseline;
      gap: 2px;
      padding: 8px 12px;
      background: rgba(74, 158, 255, 0.1);
      border: 1px solid rgba(74, 158, 255, 0.3);
      border-radius: 8px;
    }

    .score-number {
      font-size: 24px;
      font-weight: 300;
      color: #4a9eff;
    }

    .score-label {
      font-size: 12px;
      color: #4a9eff;
      opacity: 0.7;
    }

    .eval-feedback {
      font-size: 12px;
      color: #999999;
      line-height: 1.6;
      margin-bottom: 12px;
      font-style: italic;
    }

    .eval-interviewer {
      font-size: 10px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .interviewer-label {
      color: #555555;
      margin-right: 6px;
    }

    /* Seção de melhorias dentro do card */
    .improvements-section {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #2a2a2a;
    }

    .improvements-title {
      font-size: 10px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 12px;
    }

    .improvements-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .improvement-item {
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid #2a2a2a;
      border-radius: 16px;
      transition: all 0.3s ease;
    }

    .improvement-item:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: #3a3a3a;
    }

    .improvement-details {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .improvement-area-name {
      font-size: 10px;
      color: #ffffff;
      font-weight: 500;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .improvement-desc {
      font-size: 10px;
      color: #666666;
      line-height: 1.5;
    }

    .improvement-desc::before {
      content: '·';
      margin: 0 4px;
      color: #444444;
    }

    .improvements-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 20px;
    }

    .stack-input-container {
      display: flex;
      gap: 12px;
      align-items: flex-end;
    }

    .stack-input-container input {
      flex: 1;
    }

    .add-stack-btn {
      padding: 12px 24px;
      background: transparent;
      border: 1px solid #333333;
      border-radius: 6px;
      color: #666666;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .add-stack-btn:hover {
      border-color: #666666;
      color: #888888;
    }

    .stacks-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 20px;
    }

    .stack-tag {
      padding: 10px 18px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid #333333;
      border-radius: 20px;
      color: #888888;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .remove-stack {
      background: none;
      border: none;
      color: #666666;
      cursor: pointer;
      font-size: 14px;
      padding: 0;
      line-height: 1;
    }

    .remove-stack:hover {
      color: #ffffff;
    }

    .experience-options {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .experience-option {
      padding: 20px 16px;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid #2a2a2a;
      border-radius: 8px;
      cursor: pointer;
      color: #666666;
      font-size: 11px;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      text-align: center;
    }

    .experience-option:hover {
      border-color: #444444;
      color: #888888;
    }

    .experience-option.selected {
      border-color: #ffffff;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.04);
    }

    .footer {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      border-top: 1px solid #1a1a1a;
    }

    .save-button {
      padding: 20px 64px;
      background: transparent;
      border: 1px solid #ffffff;
      border-radius: 40px;
      color: #ffffff;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 4px;
      cursor: pointer;
      transition: all 0.4s ease;
    }

    .save-button:hover:not(:disabled) {
      background: #ffffff;
      color: #000000;
    }

    .save-button:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }

    .download-cv-btn {
      padding: 16px 48px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid #666666;
      border-radius: 30px;
      color: #888888;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 3px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-right: 16px;
    }

    .download-cv-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: #888888;
      color: #aaaaaa;
    }

    @media (max-width: 1024px) {
      .content {
        grid-template-columns: 1fr;
      }

      .footer {
        flex-direction: column;
        gap: 12px;
      }

      .download-cv-btn {
        margin-right: 0;
      }
    }
  `;

  render() {
    const isValid = this.name && this.currentRole;
    return html`
      <div class="wrapper">
        <div class="header">
          <div class="title">PERFIL</div>
          <div class="subtitle">Informações do Usuário</div>
        </div>
        <form @submit=${this.handleSubmit}>
          <div class="content">
            <div class="column">
              <div class="section">
                <div class="section-title">Informações Básicas</div>
                <div class="form-group">
                  <input type="text" placeholder="NOME COMPLETO" .value=${this.name} 
                    @input=${(e: any) => this.name = e.target.value} />
                </div>
                <div class="form-group">
                  <input type="text" placeholder="CARGO ATUAL" .value=${this.currentRole} 
                    @input=${(e: any) => this.currentRole = e.target.value} />
                </div>
              </div>
              <div class="section">
                <div class="section-title">Anos de Experiência</div>
                <div class="experience-options">
                  <div class="experience-option ${this.experience === '0-2' ? 'selected' : ''}" 
                    @click=${() => this.experience = '0-2'}>0-2 Anos</div>
                  <div class="experience-option ${this.experience === '3-5' ? 'selected' : ''}" 
                    @click=${() => this.experience = '3-5'}>3-5 Anos</div>
                  <div class="experience-option ${this.experience === '6-10' ? 'selected' : ''}" 
                    @click=${() => this.experience = '6-10'}>6-10 Anos</div>
                  <div class="experience-option ${this.experience === '10+' ? 'selected' : ''}" 
                    @click=${() => this.experience = '10+'}>10+ Anos</div>
                </div>
              </div>
              <div class="section">
                <div class="section-title">Stack Tecnológica</div>
                <div class="stack-input-container">
                  <input type="text" placeholder="ADICIONAR TECNOLOGIA" .value=${this.stackInput} 
                    @input=${(e: any) => this.stackInput = e.target.value} 
                    @keypress=${(e: KeyboardEvent) => e.key === 'Enter' && (e.preventDefault(), this.addStack())} />
                  <button type="button" class="add-stack-btn" @click=${this.addStack}>Adicionar</button>
                </div>
                ${this.stacks.length > 0 ? html`
                  <div class="stacks-list">
                    ${this.stacks.map((stack, index) => html`
                      <div class="stack-tag">
                        ${stack}
                        <button type="button" class="remove-stack" @click=${() => this.removeStack(index)}>×</button>
                      </div>
                    `)}
                  </div>
                ` : ''}
              </div>
            </div>
            <div class="column">
              <!-- Últimas Avaliações -->
              <div class="section">
                <div class="section-title">Últimas Avaliações</div>
                <div class="evaluations-container">
                  ${this.recentInterviews.map(interview => html`
                    <div class="eval-card">
                      <div class="eval-header">
                        <div class="eval-info">
                          <div class="eval-position">${interview.position}</div>
                          <div class="eval-date">${interview.date}</div>
                        </div>
                        <div class="eval-score-badge">
                          <div class="score-number">${interview.score}</div>
                          <div class="score-label">/10</div>
                        </div>
                      </div>
                      <div class="eval-feedback">${interview.feedback}</div>
                      <div class="eval-interviewer">
                        <span class="interviewer-label">Entrevistador:</span>
                        ${interview.interviewer}
                      </div>
                      
                      ${interview.improvements.length > 0 ? html`
                        <div class="improvements-section">
                          <div class="improvements-title">Pontos de Melhoria</div>
                          <div class="improvements-list">
                            ${interview.improvements.map(item => html`
                              <div class="improvement-item">
                                <div class="improvement-details">
                                  <span class="improvement-area-name">${item.area}</span>
                                  <span class="improvement-desc">${item.description}</span>
                                </div>
                              </div>
                            `)}
                          </div>
                        </div>
                      ` : ''}
                    </div>
                  `)}
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <button type="button" class="download-cv-btn" @click=${this.downloadCV}>
              Baixar CV Atualizado
            </button>
            <button type="submit" class="save-button" ?disabled=${!isValid}>Salvar Perfil</button>
          </div>
        </form>
      </div>
    `;
  }
}
