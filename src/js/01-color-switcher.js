const btnStart = document.querySelector('button[data-start]')
const btnStop = document.querySelector('button[data-stop]')
const body = document.querySelector('body')
let timerId = null

btnStart.addEventListener('click', changeColor)
btnStop.addEventListener('click', stopChangeColor)

function changeColor() { 
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
    disableBtn(this)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function disableBtn(btn) { 
    btn.disabled = true;
}

function stopChangeColor() { 
    clearInterval(timerId);
    enableBtn(btnStart)
}

function enableBtn(btn) { 
    btn.disabled = false
}


