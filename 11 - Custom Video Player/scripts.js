// Elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggleBtn = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player__slider");

// Playback
const togglePlay = () => {
  video[video.paused ? "play" : "pause"]();
};

const updatePlayButton = () => {
  toggleBtn.textContent = video.paused ? "▶" : "❚❚";
};

// Controls
const skip = ({ currentTarget }) => {
  video.currentTime += Number(currentTarget.dataset.skip);
};

const updateSlider = ({ target }) => {
  video[target.name] = target.value;
};

// Progress Bar
const updateProgress = () => {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progressPercent}%`;
};

const seek = (event) => {
  const seekTime = (event.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = seekTime;
};

// Keyboard Shortcuts
const handleKeyboardShortcuts = (event) => {
  switch (event.code) {
    case "Space":
      event.preventDefault();
      togglePlay();
      break;

    case "ArrowRight":
      video.currentTime = Math.min(video.currentTime + 5, video.duration);
      break;

    case "ArrowLeft":
      video.currentTime = Math.max(video.currentTime - 5, 0);
      break;

    case "ArrowUp":
      event.preventDefault();
      video.volume = Math.min(video.volume + 0.1, 1);
      break;

    case "ArrowDown":
      event.preventDefault();
      video.volume = Math.max(video.volume - 0.1, 0);
      break;

    case "KeyM":
      video.muted = !video.muted;
      break;

    case "KeyF":
      player.requestFullscreen?.();
      break;
  }
};

// Event Listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("timeupdate", updateProgress);

toggleBtn.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));

sliders.forEach((slider) => {
  slider.addEventListener("input", updateSlider);
});

let isSeeking = false;

progress.addEventListener("click", seek);

progress.addEventListener("mousedown", () => {
  isSeeking = true;
});

progress.addEventListener("mouseup", () => {
  isSeeking = false;
});

progress.addEventListener("mousemove", (event) => {
  if (isSeeking) seek(event);
});

document.addEventListener("keydown", handleKeyboardShortcuts);
