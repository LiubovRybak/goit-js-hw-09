import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timer = document.querySelector('.timer');
const field = document.querySelector('.field');
const days = document.querySelector('[data-days]')
const hours = document.querySelector('[data-hours]')
const minutes = document.querySelector('[data-minutes]')
const seconds = document.querySelector('[data-seconds]')
const label = document.querySelector('.label');
const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
let currentDate = null;
let selectedDate = null;
let timerId = null;

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    currentDate = new Date();
    if (selectedDate > currentDate) {
      btn.disabled = false;
    } else {
      Notify.warning("Please choose a date in the future");
    }
  },
}

flatpickr(input, options);

btn.addEventListener('click', startTimer);

function startTimer () {
  btn.disabled = true;
  timerId = setInterval(() => {
     currentDate = new Date();
  const differenceTime = selectedDate.getTime() - currentDate.getTime();

  if (differenceTime > 0) {
      const restTime = convertMs(differenceTime);
  days.innerHTML = addLeadingZero(restTime.days);
  hours.innerHTML = addLeadingZero(restTime.hours);
  minutes.innerHTML = addLeadingZero(restTime.minutes);
  seconds.innerHTML = addLeadingZero(restTime.seconds);
  } else {
    clearInterval(timerId);
  }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}