import getDomElement from "./utils/getDomElement";

/**
 * Classe responsável por todo o funcionamento
 * do totem: Armazena as referências do DOM, 
 * inicia e finaliza os clipes, além de controlar 
 * a exibição do vídeo no DOM
 */
export default class TotemHandler {
  /** Container do vídeo */
  private videoContainer = getDomElement<HTMLDivElement>("videoContainer");
  /** Tag do vídeo */
  private video = getDomElement<HTMLVideoElement>("video");
  /** Botão que fecha o vídeo */
  private closeVideoBtn = getDomElement<HTMLButtonElement>("closeVideoBtn");
  /** Botão que exibe o vídeo inteiro */
  private seeAllVideoBtn = getDomElement<HTMLButtonElement>("seeAllVideoBtn");
  /** Lista dos atalhos para os clipes */
  private timestampList = getDomElement<HTMLUListElement>("timestampList");

  /** Array de clipes que serão exibidos */
  private clips: TClip[];
  /** Referência do clipe atual */
  private currentClip: TClip | null = null;
  /** ID do intervalo que verifica se o clipe terminou */
  private timeTrackerIntervalId: number | null = null;

  /** Intervalo em milissegundos que verifica se o clipe terminou */
  private TIME_TRACKER_INTERVAL = 500;

  /**
   * Chama funções de preparação e adiciona os
   * eventListeners necessários
   * @param clips Array de clipes que serão exibidos
   */
  constructor(clips: TClip[]) {
    this.clips = clips;
    this.fillTimestampList();
    this.seeAllVideoBtn.addEventListener("click", () => {
      this.currentClip = null;
      this.startClip();
    });
    this.closeVideoBtn.addEventListener("click", this.stopClip.bind(this));
    this.video.addEventListener("ended", this.stopClip.bind(this));
  }

  /**
   * Preenche a lista de clipes no DOM
   */
  private fillTimestampList() {
    for (let i = 0; i < this.clips.length; i++) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      const title = document.createElement("span");
      const clipPos = document.createElement("div");
      title.className = "light-tx brf-orange-bg t-label";
      clipPos.className = "light-tx brf-red2-bg t-number";
      title.innerText = this.clips[i].name;
      clipPos.innerText = (i + 1).toString();
      button.addEventListener("click", () => {
        this.currentClip = this.clips[i];
        this.startClip();
      });
      button.appendChild(title);
      button.appendChild(clipPos);
      li.appendChild(button);
      this.timestampList.appendChild(li);
    }
  }

  /**
   * Exibe o clipe na interface e inicia a execução
   */
  private startClip() {
    const show = () => {
      this.video.currentTime =
        this.currentClip !== null ? this.currentClip.start : 0;
      this.videoContainer.dataset.show = "true";
      this.startTimeTracker();
      this.video.play();
    };
    if (!document.startViewTransition) {
      show();
      return;
    }
    document.startViewTransition(show);
  }

  /**
   * Esconde o clipe da interface e finaliza a execução
   */
  private stopClip() {
    this.stopTimeTracker();
    const hide = () => {
      this.videoContainer.dataset.show = "false";
      this.video.pause();
      this.video.currentTime = 0;
    };
    if (!document.startViewTransition) {
      hide();
      return;
    }
    document.startViewTransition(hide);
  }

  /**
   * Inicia o intervalo que verifica se o vídeo
   * já acabou
   */
  private startTimeTracker() {
    this.timeTrackerIntervalId = setInterval(() => {
      if (
        this.currentClip === null ||
        this.video.currentTime < this.currentClip.end
      )
        return;
      this.stopClip();
    }, this.TIME_TRACKER_INTERVAL);
  }

  /**
   * Finaliza o intervalo que verifica se o vídeo
   * já acabou
   */
  private stopTimeTracker() {
    if (this.timeTrackerIntervalId === null) return;
    clearInterval(this.timeTrackerIntervalId);
    this.timeTrackerIntervalId = null;
  }
}
