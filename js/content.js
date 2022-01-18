// import sound from "sound/alarm.mp3";
let interval;
let total_quantity;
let sound_played = false;
const alarm = new Audio(chrome.runtime.getURL("sound/alarm.mp3"));
const beep = new Audio(
  chrome.runtime.getURL("sound/Barcode-scanner-beep-sound.mp3")
);
const table = document.querySelector("#purchase_item_scanner_table");
const lines = table.querySelectorAll("tr");
const inputs = table.querySelectorAll("[id^='quantity_scanned_']");
const navbar = document.querySelector(".navbar-default");

document.body.onload = calculate_total_quantity();
document.body.onload = addElement();

function addElement() {
  var banner = document.createElement("div");
  var title = document.createTextNode("Scan Analyzer activé");
  banner.appendChild(title);
  banner.style.cssText =
    "width:100%;z-index:100;background:#FF3737;text-align:center;font-size:24px;font-weight:700;color:white;padding:10px;";
}

function calculate_total_quantity() {
  total_quantity = 0;

  inputs.forEach((input) => {
    total_quantity += parseInt(input.value);
  });
}

function playGoodSound() {
  console.log("Je suis dans playGoodSound");
  calculate_total_quantity();
  if (total_quantity != precedent_quantity) {
    if (total_quantity != precedent_quantity + 1) {
      alarm.play();
      clearInterval(interval);
      sound_played = true;
    } else {
      beep.play();
      clearInterval(interval);
      sound_played = true;
    }
  }
}

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    sound_played = false;
    precedent_quantity = total_quantity;
    interval = setInterval(function () {
      playGoodSound();
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      sound_played ? null : alarm.play();
      sound_played = true;
    }, 1500);
  }
});
