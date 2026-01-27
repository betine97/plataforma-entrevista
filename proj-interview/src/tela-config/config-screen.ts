/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {analyzeJobDescription, type JobDetails} from './job-analyzer.js';

/**
 * Tela de configuração da entrevista
 */
@customElement('config-screen')
export class ConfigScreen extends LitElement {
  @state() private step = 1;
  @state() private interviewer: 'tech-lead' | 'product-manager' | 'rh' | '' = '';
  @state() private personality: 'calm' | 'balanced' | 'pressure' | '' = '';
  @state() private jobDescription = '';
  @state() private isProcessing = false;
  @state() private profileName = '';
  @state() private seniority = '';
  @state() private experienceYears = '';
  @state() private requiredSkills = '';
  @state() private mandatoryRequirements = '';
  @state() private desirableTools = '';

  private async nextStep() {
    // Se estiver na etapa 2 (descrição da vaga), processar e analisar
    if (this.step === 2 && this.jobDescription.trim()) {
      this.isProcessing = true;
      
      try {
        // Analisar a descrição da vaga
        const jobDetails: JobDetails = await analyzeJobDescription(this.jobDescription);
        
        // Preencher os campos automaticamente
        this.profileName = jobDetails.profileName;
        this.seniority = jobDetails.seniority;
        this.experienceYears = jobDetails.experienceYears;
        this.requiredSkills = jobDetails.requiredSkills;
        this.mandatoryRequirements = jobDetails.mandatoryRequirements;
        this.desirableTools = jobDetails.desirableTools;
      } catch (error) {
        console.error('Erro ao analisar descrição da vaga:', error);
        // Em caso de erro, deixar campos vazios para preenchimento manual
      } finally {
        this.isProcessing = false;
      }
    }
    
    this.step++;
  }

  private prevStep() {
    if (this.step > 1) this.step--;
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
      padding: 60px 40px;
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
      padding-left: 2px;
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

    textarea {
      width: 100%;
      min-height: 180px;
      padding: 18px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid #333333;
      border-radius: 8px;
      color: #ffffff;
      font-size: 14px;
      font-family: inherit;
      line-height: 1.7;
      outline: none;
      transition: all 0.3s ease;
      resize: vertical;
      box-sizing: border-box;
    }

    textarea:focus {
      border-color: #666666;
      background: rgba(255, 255, 255, 0.03);
    }

    textarea::placeholder {
      color: #444444;
    }

    .options-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .options-grid.two-cols {
      grid-template-columns: repeat(2, 1fr);
    }

    .option-card {
      padding: 24px 20px;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid #2a2a2a;
      border-radius: 10px;
      cursor: pointer;
      color: #666666;
      font-size: 11px;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      text-align: center;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }

    .option-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .option-card:hover::before {
      opacity: 1;
    }

    .option-card:hover {
      border-color: #444444;
      color: #888888;
      transform: translateY(-2px);
    }

    .option-card.selected {
      border-color: #ffffff;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.04);
    }

    .option-card.selected::before {
      opacity: 1;
    }

    .option-card.full-width {
      grid-column: 1 / -1;
      padding: 20px;
    }

    .option-label {
      font-size: 12px;
      margin-bottom: 4px;
    }

    .option-description {
      font-size: 9px;
      color: #555555;
      letter-spacing: 1px;
      margin-top: 6px;
      line-height: 1.4;
    }

    .option-card.selected .option-description {
      color: #999999;
    }

    .duration-toggle {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .duration-option {
      padding: 32px 24px;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid #2a2a2a;
      border-radius: 10px;
      cursor: pointer;
      color: #666666;
      transition: all 0.3s ease;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }

    .duration-option::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .duration-option:hover::before {
      opacity: 1;
    }

    .duration-option:hover {
      border-color: #444444;
      transform: translateY(-2px);
    }

    .duration-option.selected {
      border-color: #ffffff;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.04);
    }

    .duration-option.selected::before {
      opacity: 1;
    }

    .duration-time {
      font-size: 36px;
      font-weight: 300;
      margin-bottom: 8px;
    }

    .duration-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .footer {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      border-top: 1px solid #1a1a1a;
    }

    .start-button {
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
      position: relative;
      overflow: hidden;
    }

    .start-button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: #ffffff;
      transform: translate(-50%, -50%);
      transition: width 0.4s ease, height 0.4s ease;
    }

    .start-button:hover:not(:disabled)::before {
      width: 300px;
      height: 300px;
    }

    .start-button:hover:not(:disabled) {
      color: #000000;
    }

    .start-button span {
      position: relative;
      z-index: 1;
    }

    .start-button:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }

    .step-indicator {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 40px;
    }

    .step-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #333333;
      transition: all 0.3s ease;
    }

    .step-dot.active {
      background: #ffffff;
      width: 24px;
      border-radius: 4px;
    }

    .navigation-buttons {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 40px;
    }

    .nav-button {
      padding: 14px 32px;
      background: transparent;
      border: 1px solid #333333;
      border-radius: 30px;
      color: #666666;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 3px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .nav-button:hover:not(:disabled) {
      border-color: #666666;
      color: #888888;
    }

    .nav-button.primary {
      border-color: #ffffff;
      color: #ffffff;
    }

    .nav-button.primary:hover:not(:disabled) {
      background: #ffffff;
      color: #000000;
    }

    .nav-button:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }

    .step-content {
      min-height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 50px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30px;
      min-height: 400px;
    }

    .loading-spinner {
      width: 60px;
      height: 60px;
      border: 2px solid #1a1a1a;
      border-top: 2px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-text {
      font-size: 11px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 3px;
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }

    .loading-dots {
      display: flex;
      gap: 8px;
    }

    .loading-dot {
      width: 8px;
      height: 8px;
      background: #666666;
      border-radius: 50%;
      animation: bounce 1.4s ease-in-out infinite;
    }

    .loading-dot:nth-child(1) {
      animation-delay: 0s;
    }

    .loading-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .loading-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes bounce {
      0%, 80%, 100% { 
        transform: translateY(0);
        opacity: 0.4;
      }
      40% { 
        transform: translateY(-12px);
        opacity: 1;
      }
    }

    @media (max-width: 1024px) {
      .content {
        grid-template-columns: 1fr;
        gap: 50px;
      }

      .step-content {
        min-height: 300px;
      }
    }

    @media (max-width: 768px) {
      .wrapper {
        padding: 40px 24px;
      }

      .title {
        font-size: 36px;
        letter-spacing: 8px;
      }

      .options-grid {
        grid-template-columns: 1fr;
      }

      .duration-toggle {
        grid-template-columns: 1fr;
      }
    }
  `;

  private handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!this.interviewer || !this.personality || !this.profileName || !this.seniority) {
      return;
    }

    this.dispatchEvent(new CustomEvent('start-interview', {
      detail: {
        interviewer: this.interviewer,
        personality: this.personality,
        jobDescription: this.jobDescription,
        profileName: this.profileName,
        seniority: this.seniority,
        experienceYears: this.experienceYears,
        requiredSkills: this.requiredSkills,
        mandatoryRequirements: this.mandatoryRequirements,
        desirableTools: this.desirableTools
      }
    }));
  }

  private get canProceed(): boolean {
    switch(this.step) {
      case 1: return !!this.interviewer && !!this.personality;
      case 2: return true; // Descrição é opcional
      case 3: return !!this.profileName && !!this.seniority;
      default: return true;
    }
  }

  render() {
    const totalSteps = 3;
    
    return html`
      <div class="wrapper">
        <div class="header">
          <div class="title">ENTREVISTA</div>
          <div class="subtitle">Etapa ${this.step} de ${totalSteps}</div>
        </div>

        <div class="step-indicator">
          ${Array.from({length: totalSteps}, (_, i) => html`
            <div class="step-dot ${i + 1 === this.step ? 'active' : ''}"></div>
          `)}
        </div>

        <form @submit=${this.handleSubmit}>
          <div class="step-content">
            ${this.isProcessing ? html`
              <div class="loading-container">
                <div class="loading-spinner"></div>
                <div class="loading-text">Processando informações</div>
                <div class="loading-dots">
                  <div class="loading-dot"></div>
                  <div class="loading-dot"></div>
                  <div class="loading-dot"></div>
                </div>
              </div>
            ` : html`
              ${this.step === 1 ? html`
                <div class="section">
                  <div class="section-title">Tipo de Entrevistador</div>
                  <div class="options-grid">
                    <div class="option-card ${this.interviewer === 'tech-lead' ? 'selected' : ''}" 
                      @click=${() => this.interviewer = 'tech-lead'}>
                      <div class="option-label">Tech Lead</div>
                    </div>
                    <div class="option-card ${this.interviewer === 'product-manager' ? 'selected' : ''}" 
                      @click=${() => this.interviewer = 'product-manager'}>
                      <div class="option-label">Product Manager</div>
                    </div>
                    <div class="option-card ${this.interviewer === 'rh' ? 'selected' : ''}" 
                      @click=${() => this.interviewer = 'rh'}>
                      <div class="option-label">RH</div>
                    </div>
                  </div>
                </div>
                <div class="section">
                  <div class="section-title">Personalidade do Entrevistador</div>
                  <div class="options-grid">
                    <div class="option-card ${this.personality === 'calm' ? 'selected' : ''}" 
                      @click=${() => this.personality = 'calm'}>
                      <div class="option-label">Tranquilo</div>
                    </div>
                    <div class="option-card ${this.personality === 'balanced' ? 'selected' : ''}" 
                      @click=${() => this.personality = 'balanced'}>
                      <div class="option-label">Equilibrado</div>
                    </div>
                    <div class="option-card ${this.personality === 'pressure' ? 'selected' : ''}" 
                      @click=${() => this.personality = 'pressure'}>
                      <div class="option-label">Pressão</div>
                    </div>
                  </div>
                </div>
              ` : ''}

              ${this.step === 2 ? html`
                <div class="section">
                  <div class="section-title">Descrição da Vaga (Opcional)</div>
                  <textarea placeholder="Descreva a vaga, requisitos, tecnologias, responsabilidades..." 
                    .value=${this.jobDescription} 
                    @input=${(e: any) => this.jobDescription = e.target.value}></textarea>
                </div>
              ` : ''}

              ${this.step === 3 ? html`
                <div class="section">
                  <div class="section-title">Perfil Procurado</div>
                  <div class="form-group">
                    <input type="text" placeholder="Ex: Engenheiro de Software, Cientista de Dados" 
                      .value=${this.profileName} 
                      @input=${(e: any) => this.profileName = e.target.value} />
                  </div>
                </div>
                <div class="section">
                  <div class="section-title">Senioridade</div>
                  <div class="form-group">
                    <input type="text" placeholder="Ex: Pleno, Sênior, Tech Lead" 
                      .value=${this.seniority} 
                      @input=${(e: any) => this.seniority = e.target.value} />
                  </div>
                </div>
                <div class="section">
                  <div class="section-title">Tempo de Experiência</div>
                  <div class="form-group">
                    <input type="text" placeholder="Ex: 3+ anos, 5-7 anos" 
                      .value=${this.experienceYears} 
                      @input=${(e: any) => this.experienceYears = e.target.value} />
                  </div>
                </div>
                <div class="section">
                  <div class="section-title">Skills Obrigatórias</div>
                  <div class="form-group">
                    <input type="text" placeholder="Ex: JavaScript, React, Node.js, SQL" 
                      .value=${this.requiredSkills} 
                      @input=${(e: any) => this.requiredSkills = e.target.value} />
                  </div>
                </div>
                <div class="section">
                  <div class="section-title">Requisitos Obrigatórios</div>
                  <div class="form-group">
                    <input type="text" placeholder="Ex: Formação em TI, Inglês avançado" 
                      .value=${this.mandatoryRequirements} 
                      @input=${(e: any) => this.mandatoryRequirements = e.target.value} />
                  </div>
                </div>
                <div class="section">
                  <div class="section-title">Ferramentas Desejáveis</div>
                  <div class="form-group">
                    <input type="text" placeholder="Ex: Docker, AWS, TypeScript, Jest" 
                      .value=${this.desirableTools} 
                      @input=${(e: any) => this.desirableTools = e.target.value} />
                  </div>
                </div>
              ` : ''}
            `}
          </div>

          <div class="navigation-buttons">
            ${this.step > 1 && !this.isProcessing ? html`
              <button type="button" class="nav-button" @click=${this.prevStep}>Voltar</button>
            ` : ''}
            ${this.step < totalSteps && !this.isProcessing ? html`
              <button type="button" class="nav-button primary" ?disabled=${!this.canProceed} 
                @click=${this.nextStep}>Próximo</button>
            ` : !this.isProcessing ? html`
              <button type="submit" class="nav-button primary" ?disabled=${!this.canProceed}>
                Iniciar Entrevista
              </button>
            ` : ''}
          </div>
        </form>
      </div>
    `;
  }
}
