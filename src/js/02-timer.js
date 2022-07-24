import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let deadline = 0;
let timerId = null;
const refs = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}
const date = new Date().getTime();
const btnStart = document.querySelector('button[data-start]')
btnStart.disabled = true

const fr = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        deadline = selectedDates[0].getTime();
        chekDate(deadline, date)
    }
});

btnStart.addEventListener('click', startTimer)

function chekDate(data1, data2) { 
    if (data1 < data2) {
        btnStart.disabled = true
        Notify.warning("Please choose a date in the future")
        clearInterval(timerId)
        return
    } else { 
        btnStart.disabled = false;
    };
}

function addPadStartToObj(time) { 
    return {
        days: addLeadingZero(time.days.toString()),
        hours: addLeadingZero(time.hours.toString()),
        minutes: addLeadingZero(time.minutes.toString()),
        seconds: addLeadingZero(time.seconds.toString()),
    }
}

function updateMarkup({  days, hours, minutes, seconds }) { 
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

function startTimer() {
    timerId = setInterval(() => { 
        let time = convertMs(deadline - new Date().getTime());
        let padTime = addPadStartToObj(time)
        updateMarkup(padTime)
    }, 1000)
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

function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
}
