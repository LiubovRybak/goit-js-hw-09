const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
let timerId = null
stop.disabled = true

function getRandomHexColor () {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

start.addEventListener('click', () => {
    start.disabled = true
    stop.disabled = false

    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
})

stop.addEventListener('click', () =>{
    clearInterval(timerId)
    stop.disabled = true
    start.disabled = false
})





