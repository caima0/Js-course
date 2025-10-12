const timerDays = document.querySelector("#timerDays");
const timerTime = document.querySelector("#timerTime");
const timerPercentage = document.querySelector("#timerPercentage");

let oldDate = new Date("2025-01-01 00:00:00");
let futureDate = new Date("2026-01-01 00:00:00");

function updateTime() {
  const currentDate = new Date();

  const diffMs = futureDate - currentDate;
  const totalTime = futureDate - oldDate;
  const timeSpent = currentDate - oldDate;
  const percentage = Math.floor((timeSpent / totalTime) * 100);
  if (diffMs <= 0) {
    oldDate = new Date(`${currentDate.getFullYear()}-01-01 00:00:00`);
    futureDate = new Date(`${currentDate.getFullYear() + 1}-01-01 00:00:00`);
    diffMs = futureDate - currentDate;
    timeSpent = currentDate - oldDate;
    percentage = (timeSpent / 31556926) * 100;
  }

  const days = Math.floor(diffMs / 1000 / 60 / 60 / 24);
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);
  console.log(seconds);

  const formattedDays = days.toString().padStart(2, "0");
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedPercentage = percentage.toString().padStart(2, "0");

  timerTime.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  timerDays.textContent = `${formattedDays} days`;
  timerPercentage.textContent = `${formattedPercentage} %`;
}

setInterval(updateTime, 1000);
updateTime();
