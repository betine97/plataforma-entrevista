/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {LitElement, css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {AudioConnector} from '../../../function-core/src/connectors/audio-connector';
import '../../../function-core/src/frontend/sphere/ai-sphere';

/**
 * Tela de entrevista com IA
 * Integra a esfera 3D e o sistema de áudio do function-core
 */
@customElement('interview-screen')
export class InterviewScreen extends LitElement {
  @property({type: Object}) config: any;
  @property({type: String}) interviewerInstructions = '';
  
  @state() private isRecording = false;
  @state() private error = '';
  @state() private timeRemaining = 0;
  @state() private timerStarted = false;

  private connector!: AudioConnector;
  private timerInterval?: number;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: #000000;
      position: relative;
      overflow: hidden;
    }

    /* Container da esfera - ocupa tela inteira, centralizado */
    .sphere-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      max-width: 1400px;
      height: 1400px;
      z-index: 1;
    }

    /* Info do candidato - canto superior esquerdo */
    .candidate-info {
      position: absolute;
      top: 32px;
      left: 48px;
      color: #666666;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      z-index: 10;
    }

    .candidate-name {
      color: #ffffff;
      font-size: 18px;
      font-weight: 300;
      margin-top: 4px;
    }

    /* Timer - canto superior direito */
    .timer {
      position: absolute;
      top: 32px;
      right: 48px;
      text-align: right;
      z-index: 10;
    }

    .timer-label {
      color: #666666;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .timer-value {
      color: #ffffff;
      font-size: 32px;
      font-weight: 300;
      margin-top: 4px;
      font-variant-numeric: tabular-nums;
    }

    .timer-value.warning {
      color: #ff6b6b;
    }

    /* Controles - posição fixa na parte inferior, camada superior */
    .controls {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 48px;
      z-index: 10;
    }

    /* Botão de controle (ícones apenas) */
    .control-button {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .control-button:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: scale(1.1);
    }

    /* Botão de Play/Stop */
    .play-button.recording {
      border-color: #ff6b6b;
      background: rgba(255, 107, 107, 0.1);
    }

    .play-button.recording::before {
      content: '';
      width: 20px;
      height: 20px;
      background: #ff6b6b;
      border-radius: 3px;
    }

    .play-button:not(.recording)::before {
      content: '';
      width: 0;
      height: 0;
      border-left: 18px solid #ffffff;
      border-top: 11px solid transparent;
      border-bottom: 11px solid transparent;
      margin-left: 3px;
    }

    /* Botão de Reset */
    .reset-button::before {
      content: '↻';
      font-size: 32px;
      color: #ffffff;
      line-height: 1;
    }

    .reset-button:hover::before {
      color: #999999;
    }

    /* Status message */
    .status-message {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #666666;
      font-size: 14px;
      text-align: center;
      max-width: 400px;
      padding: 24px;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 8px;
      pointer-events: none;
      z-index: 20;
    }

    .error-message {
      color: #ff6b6b;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.initializeInterview();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanup();
  }

  private async initializeInterview() {
    // Inicializa o conector de áudio
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.connector = new AudioConnector(apiKey);
    
    this.connector.setCallbacks({
      onStatusChange: () => {
        // Status change callback
      },
      onErrorChange: (error) => {
        this.error = error;
      },
    });
    
    // Passa as instruções do entrevistador para o conector
    await this.connector.initSession(this.interviewerInstructions);
    
    // Define o tempo inicial mas não inicia o timer ainda
    this.timeRemaining = 10 * 60; // 10 minutos em segundos
  }

  private startTimer() {
    this.timerInterval = window.setInterval(() => {
      this.timeRemaining--;
      
      if (this.timeRemaining <= 0) {
        this.endInterview();
      }
    }, 1000);
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  private async toggleRecording() {
    if (this.isRecording) {
      this.connector.stopRecording();
      this.isRecording = false;
    } else {
      const success = await this.connector.startRecording();
      if (success) {
        this.isRecording = true;
        
        // Inicia o timer apenas na primeira vez que começar a gravar
        if (!this.timerStarted) {
          this.startTimer();
          this.timerStarted = true;
        }
      }
    }
  }

  private async endInterview() {
    this.cleanup();
    this.dispatchEvent(new CustomEvent('back-to-config'));
  }

  private cleanup() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    if (this.connector) {
      this.connector.stopRecording();
    }
  }

  render() {
    const isWarning = this.timeRemaining < 300; // Últimos 5 minutos

    return html`
      <!-- Info do candidato - canto superior esquerdo -->
      <div class="candidate-info">
        <div class="candidate-name">Olá, Eron</div>
      </div>
      
      <!-- Timer - canto superior direito -->
      <div class="timer">
        <div class="timer-value ${isWarning ? 'warning' : ''}">
          ${this.formatTime(this.timeRemaining)}
        </div>
      </div>

      <!-- Status/Error messages -->
      ${this.error ? html`
        <div class="status-message error-message">${this.error}</div>
      ` : ''}

      <!-- Esfera 3D centralizada -->
      <div class="sphere-container">
        <gdm-ai-sphere
          .inputNode=${this.connector?.inputNode}
          .outputNode=${this.connector?.outputNode}>
        </gdm-ai-sphere>
      </div>

      <!-- Controles abaixo da esfera -->
      <div class="controls">
        <button 
          class="control-button play-button ${this.isRecording ? 'recording' : ''}"
          @click=${this.toggleRecording}
          title="${this.isRecording ? 'Stop' : 'Start'} Recording">
        </button>

        <button 
          class="control-button reset-button"
          @click=${() => this.connector?.reset()}
          title="Reset">
        </button>
      </div>
    `;
  }
}
