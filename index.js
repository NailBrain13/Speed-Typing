const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayElem = document.getElementById('quoteDisplay');
const quoteInputElem = document.getElementById('quoteInput');
const timerElem = document.getElementById('timer');
const startBtn = document.querySelector('.start');

let correct = true;

quoteInputElem.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElem.querySelectorAll('span');
  const arrayValue = quoteInputElem.value.split('');
  arrayQuote.forEach((characterSpan, inddex) => {
    const character = arrayValue[inddex];
    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      correct = false;
    }
  });
  if (correct) renderNewQuote();
});

function getRandomeQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomeQuote();
  quoteDisplayElem.innerText = '';
  quote.split('').forEach((character) => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    quoteDisplayElem.appendChild(characterSpan);
  });
  quoteInputElem.value = null;
  startTimer();
}

let startTime;

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

function startTimer() {
  timerElem.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

startBtn.addEventListener('click', () => {
  quoteInputElem.focus();
  renderNewQuote();
});
