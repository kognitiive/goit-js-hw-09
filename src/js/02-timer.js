import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let deadline = 0;
let timerId = null;
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
        console.log(deadline)
        if (deadline <= date){
            window.alert("Please choose a date in the future")
            btnStart.disabled = true
            return
        };
        btnStart.disabled = false;
        const time = convertMs(deadline - date);
        console.log(time)
    }
});

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
