const quoteDisplay = document.getElementById('quoteDisplay');
const quoteInput = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');

let timeLeft = 60;
let timer;
let started = false;
let correctChars = 0;
let totalWordsTyped = 0;
let currentQuote = "";

const sampleQuotes = [
  "Programming is the art of algorithm design and the craft of debugging errant code.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "First, solve the problem. Then, write the code.",
  "Typing fast is a skill every developer values.",
  "Keep calm and keep coding.",
  "JavaScript is the language of the web.",
  "You miss one semicolon and everything breaks.",
  "Fast fingers build faster futures."
];

// 👉 Load a random quote
function getRandomQuote() {
  return sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
}

// 👉 Start test
function startTest() {
  quoteInput.value = "";
  quoteInput.disabled = false;
  timeLeft = 60;
  correctChars = 0;
  totalWordsTyped = 0;
  started = false;

  timerElement.textContent = timeLeft;
  wpmElement.textContent = 0;
  accuracyElement.textContent = 100;

  loadNewQuote();
  quoteInput.focus();

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

// 👉 Load a new sentence
function loadNewQuote() {
  currentQuote = getRandomQuote();
  quoteDisplay.textContent = currentQuote;
  quoteInput.value = "";
  quoteInput.style.borderColor = "#ccc";
}

// 👉 Timer countdown
function updateTimer() {
  if (!started) started = true;
  timeLeft--;
  timerElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    quoteInput.disabled = true;
    quoteInput.style.borderColor = "#ccc";
  }
}

// 👉 Live stats update
function updateLiveStats() {
  const totalTypedChars = correctChars + 1; // +1 to avoid divide by 0
  const accuracy = Math.floor((correctChars / totalTypedChars) * 100);
  const wpm = Math.round((totalWordsTyped / (60 - timeLeft)) * 60) || 0;

  accuracyElement.textContent = accuracy;
  wpmElement.textContent = wpm;
}

// 👉 Typing input handler
quoteInput.addEventListener("input", () => {
  const input = quoteInput.value;
  const correctSoFar = currentQuote.startsWith(input);

  // Border color feedback
  quoteInput.style.borderColor = correctSoFar ? "#2e8b57" : "red";

  // If quote is typed correctly
  if (input === currentQuote) {
    correctChars += currentQuote.length;
    totalWordsTyped += currentQuote.split(" ").length;
    loadNewQuote();
  }

  updateLiveStats();
});
