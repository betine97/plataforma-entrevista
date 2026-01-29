/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import './tela-config/config-screen';
import './tela-interview/interview-screen';
import './tela-perfil/profile-screen';
import './tela-rh/rh-screen';

/**
 * App principal - gerencia navegação entre telas
 */
@customElement('interview-app')
export class InterviewApp extends LitElement {
  @state() private currentScreen: 'config' | 'interview' | 'profile' | 'rh' = 'config';
  @state() private interviewConfig: any = null;

  static styles = css`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      background: #000000;
      position: relative;
    }

    .nav-bar {
      position: fixed;
      top: 0;
      right: 0;
      padding: 30px 40px;
      z-index: 1000;
      display: flex;
      gap: 20px;
    }

    .nav-button {
      padding: 10px 20px;
      background: transparent;
      border: 1px solid #333333;
      border-radius: 20px;
      color: #666666;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .nav-button:hover {
      border-color: #666666;
      color: #888888;
    }

    .nav-button.active {
      border-color: #ffffff;
      color: #ffffff;
    }
  `;

  private handleStartInterview(e: CustomEvent) {
    this.interviewConfig = e.detail;
    this.currentScreen = 'interview';
  }

  private handleBackToConfig() {
    this.currentScreen = 'config';
    this.interviewConfig = null;
  }

  render() {
    return html`
      ${this.currentScreen !== 'interview' ? html`
        <div class="nav-bar">
          <button 
            class="nav-button ${this.currentScreen === 'config' ? 'active' : ''}"
            @click=${() => this.currentScreen = 'config'}>
            Configuração
          </button>
          <button 
            class="nav-button ${this.currentScreen === 'profile' ? 'active' : ''}"
            @click=${() => this.currentScreen = 'profile'}>
            Perfil
          </button>
          <button 
            class="nav-button ${this.currentScreen === 'rh' ? 'active' : ''}"
            @click=${() => this.currentScreen = 'rh'}>
            RH
          </button>
        </div>
      ` : ''}

      ${this.currentScreen === 'config' ? html`
        <config-screen 
          @start-interview=${this.handleStartInterview}>
        </config-screen>
      ` : ''}

      ${this.currentScreen === 'profile' ? html`
        <profile-screen></profile-screen>
      ` : ''}

      ${this.currentScreen === 'rh' ? html`
        <rh-screen></rh-screen>
      ` : ''}

      ${this.currentScreen === 'interview' ? html`
        <interview-screen 
          .config=${this.interviewConfig}
          .interviewerInstructions=${this.interviewConfig?.interviewerInstructions || ''}
          @back-to-config=${this.handleBackToConfig}>
        </interview-screen>
      ` : ''}
    `;
  }
}
