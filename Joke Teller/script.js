const current = document.getElementById("current");
const newjoke = document.getElementById("newjoke");
const about = document.getElementById("about");
const loader = document.querySelector(".loader");
const buttonlist = document.querySelector(".buttonlist");
let speech = new SpeechSynthesisUtterance();
let currentjoke = "";
async function getCurrentjoke() {
  const response = await fetch(
    "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious&type=single"
  );
  const data = await response.json();
  currentjoke = data.joke;
  speech.text = data.joke;
  window.speechSynthesis.speak(speech);
  current.hidden = false;
}
function getjoke() {
  speech.text = currentjoke;
  window.speechSynthesis.speak(speech);
}

current.addEventListener("click", () => {
  getjoke();
});
newjoke.addEventListener("click", () => {
  getCurrentjoke();
});
