import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    calendar: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    restartBtn: document.querySelector('[data-restart]'),
    dayDisplay: document.querySelector('[data-days]'),
    hoursDisplay: document.querySelector('[data-hours]'),
    minutesDisplay: document.querySelector('[data-minutes]'),
    secondsDisplay: document.querySelector('[data-seconds]'),
        
};

refs.startBtn.disabled = true;

let selectedDate = 0;
let currentDate = 0;
let timeToCountdown = 0;
let intervalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      selectedDate = selectedDates[0].getTime();
      currentDate = new Date().getTime();
      timeToCountdown = selectedDate - currentDate;

       if (timeToCountdown <= 0) {
        Notiflix.Notify.warning('Please choose a date in the future');
        return
    }

      refs.startBtn.disabled = false;
      
      countDown(timeToCountdown);

    console.log(convertMs(timeToCountdown));
  },
};

flatpickr(refs.calendar, options);

refs.startBtn.addEventListener('click', onClickStart);
refs.restartBtn.addEventListener('click', onClickRestart);


function onClickStart() {
    console.log(convertMs(timeToCountdown));

    intervalID = setInterval(() => {
        countDown(timeToCountdown-1000);
        timeToCountdown -= 1000;
    }, 1000);

    refs.startBtn.disabled = true;

};

function onClickRestart() {

    clearInterval(intervalID);

    refs.dayDisplay.innerHTML = 0;
    refs.hoursDisplay.innerHTML = 0;
    refs.minutesDisplay.innerHTML = 0;
    refs.secondsDisplay.innerHTML = 0;

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function countDown(time) {
    const countdownDate = convertMs(time);
    refs.dayDisplay.innerHTML = countdownDate.days;
    refs.hoursDisplay.innerHTML = countdownDate.hours;
    refs.minutesDisplay.innerHTML = countdownDate.minutes;
    refs.secondsDisplay.innerHTML = countdownDate.seconds;

};




