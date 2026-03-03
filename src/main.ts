import "./style.css";
import "./main.css";

const clips = [
  {start: 10, end: 20},
  {start: 0, end: 0},
  {start: 0, end: 0},
  {start: 0, end: 0},
  {start: 0, end: 0},
  {start: 0, end: 0},
  {start: 0, end: 0},
  {start: 0, end: 0},
  {start: 0, end: 0},
  {start: 0, end: 0},
  {start: 0, end: 0},
  {start: 0, end: 0},
]

const dom = {
  panel: document.querySelector(".j-mainContainer"),
  videoContainer: document.querySelector(".j-videoContainer"),
  video: document.querySelector(".j-video"),
  clipButtons: document.querySelectorAll(".j-clipButton"),
  backButton: document.querySelector(".j-backButton"),
};

const switcher = {
  active: false,
  press: function () {
    if (!this.active) {
      this.active = true;
      dom.panel.classList.remove("active");
      dom.videoContainer.classList.add("active");
      return;
    }
    this.active = false;
    dom.videoContainer.classList.remove("active");
    dom.panel.classList.add("active");
  },
};

const videoControl = {
  breakTimeHandler: false,
  prepare: function (start) {
    dom.video.currentTime = start;
  },
  play: function () {
    dom.video.play();
  },
  stop: function () {
    dom.video.pause();
  },
  timeHandler: function (end, callback) {
    const interval = setInterval(() => {
      if (dom.video.currentTime >= end || videoControl.breakTimeHandler) {
        videoControl.breakTimeHandler = false;
        clearInterval(interval);
        callback();
      }
    }, 250);
  },
  stopTimeHandler: function () {
    this.breakTimeHandler = true;
  },
};

const buttons = {
  clipBlocked: false,
  backBlocked: true,
  clipButtonHandler: function (event) {
    if (buttons.clipBlocked) {
      return;
    }
    manager.startClip(event.currentTarget.getAttribute("clip-index"));
  },
  backButtonHandler: function () {
    if (buttons.backBlocked) {
      return;
    }
    manager.forceCloseClip();
  },
};
dom.clipButtons.forEach((button) => {
  button.addEventListener("click", buttons.clipButtonHandler);
});
dom.backButton.addEventListener("click", buttons.backButtonHandler);

const manager = {
  actualClip: clips[0],
  startClip: function (clipIndex) {
    buttons.clipBlocked = true;
    this.actualClip = clips[clipIndex];
    videoControl.prepare(this.actualClip.start);
    dom.video.addEventListener("canplaythrough", this.playClip);
  },
  playClip: function () {
    dom.video.removeEventListener("canplaythrough", this.playClip);
    animation.play("fadeOff", 500, dom.panel, () => {
      switcher.press();
      animation.play("fadeIn", 300, dom.video);
      videoControl.play();
      videoControl.timeHandler(manager.actualClip.end, manager.closeClip);
      buttons.backBlocked = false;
    });
  },
  closeClip: function () {
    animation.play("fadeOff", 500, dom.video, () => {
      videoControl.stop();
      buttons.backBlocked = true;
      switcher.press();
      animation.play("fadeIn", 300, dom.panel);
      buttons.clipBlocked = false;
    });
  },
  forceCloseClip: function () {
    videoControl.stopTimeHandler();
  },
};

const animation = {
  play: function (name, duration, element, callback = () => {}) {
    element.classList.add(`animation-${name}`);
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      element.classList.remove(`animation-${name}`);
      callback();
    }, duration);
  },
};