const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

const getDegrees = (value, max) => (value / max) * 360 + 90;

const setDate = function () {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  secondHand.style.transform = `rotate(${getDegrees(seconds, 60)}deg)`;

  minuteHand.style.transform = `rotate(${getDegrees(minutes, 60)}deg)`;

  hourHand.style.transform = `rotate(${
    getDegrees(hours % 12, 12) + (minutes / 60) * 30
  }deg)`;
};

setDate(); // initialize immediately
setInterval(setDate, 1000);
// Day 2 complete
