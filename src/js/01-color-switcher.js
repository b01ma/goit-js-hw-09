
const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);

let timerID = null;

function onClickStart (event) {
    // console.log(event.target);
    timerID = setInterval(changeBgColor, 500);

    refs.startBtn.disabled = true;
    // refs.stopBtn.disabled = false;
};
function onClickStop (event) {
    // console.log(event.target);
    clearInterval(timerID);
    // refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;

};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function changeBgColor() {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;

}
