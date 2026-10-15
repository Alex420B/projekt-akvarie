"use strict";

const fishDetails = {
"dwarf-angelfish": {
  name: "Pufferfish",
    info: "The pufferfish eats small crustaceans and snails, among other things.",
    popupImage: "img/kugle-bg-2.png",
    size: "10-35 cm. (It can grow 2–3 times larger when it gets scared!)",
    habitat: "Coral reefs, rocks, and sandy seabed in the ocean",
    color: "White, brown, bluish, yellow, and greenish",
    lifespan: "2-15 years",
    specialAbility: "The pufferfish has almost no neck! That is why food goes straight down into its stomach when it swallows something.",
    audio: "sound/Puffer.mp3",
    clickSound: "sound/puffer carrot.mp3",

 
    correctFood: "algae",
    foods: [
      { name: "Reje", type: "shrimp" },
      { name: "Alger", type: "algae" },
      { name: "Brød", type: "bread" },
    ],
  },
  puffer: {
    name: "Pufferfish",
    info: "The pufferfish eats small crustaceans and snails, among other things.",
    popupImage: "img/kugle-bg-2.png",
    size: "10-35 cm. (It can grow 2–3 times larger when it gets scared!)",
    habitat: "Coral reefs, rocks, and sandy seabed in the ocean",
    color: "White, brown, bluish, yellow, and greenish",
    lifespan: "2-15 years",
    specialAbility: "The pufferfish has almost no neck! That is why food goes straight down into its stomach when it swallows something.",
    audio: "sound/Puffer.mp3",
    clickSound: "sound/puffer carrot.mp3",

    correctFood: "snail",
    foods: [
      { name: "Snail", type: "snail" },
      { name: "Algae", type: "algae" },
      { name: "Bread", type: "bread" },
    ],
  },
  "royal-gramma": {
  name: "Royal-gramma",
  info: "The purple fish loves eating small crustaceans, such as tiny shrimp.",
  popupImage: "img/konge-febars.png",
  size: "7-8 cm",
  habitat: "Coral reefs, rocks, and small crevices in the sea",
  color: "Purple and yellow",
  lifespan: "5-10 years",
  specialAbility: "The fish can change color if it becomes stressed. Its colors then become paler!",
  audio: "sound/Konge fehars.mp3",
  clickSound: "sound/Fish Splash.mp3",

  correctFood: "shrimp",
  foods: [
    { name: "Shrimp", type: "shrimp" },
    { name: "Algae", type: "algae" },
    { name: "Bread", type: "bread" }
  ]
  },
  nemo: {
    name: "Clownfish",
    info: "The clownfish eats small animals in the water and some algae.",
    popupImage: "img/klovn-bg.png",
    size: "8-16 cm",
    habitat: "It lives among sea anemones in coral reefs.",
    color: "Orange with white stribes",
    lifespan: "6-12 years",
    specialAbility: "The clownfish can tolerate the sea anemone's poison, which can otherwise harm other fish!",
    audio: "sound/Klovnkfisk.mp3",
    clickSound: "sound/nemo.mp3",

    correctFood: "shrimp",
    foods: [
      { name: "Shrimp", type: "shrimp" },
      { name: "Algae", type: "algae" },
      { name: "Bread", type: "bread" },
    
    ],
  },
  "yellow-tang": {
    name: "Yellow-tang",
    info: "The yellow tang finds most of its food among algae.",
    popupImage: "img/kirurg-bg.png",
    size: "Approximately. 15-20 cm",
    habitat: "Coral reef in warm sea",
    color: "Clear gul",
    lifespan: "Up to 30 years",
    specialAbility: "It has a small, sharp spine near its tail that it can use to defend itself!",
  audio: "sound/Gul kirug.mp3",
  clickSound: "sound/Fish sound.wav",

    correctFood: "algae",
    foods: [
      { name: "Algae", type: "algae" },
      { name: "Fish", type: "fish" },
      { name: "Bread", type: "bread" },
    ],
  },
};

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupFish = document.getElementById("popup-fish");
const fishInfo = document.getElementById("fish-info");
const foodContainer = document.getElementById("food-container");
const status = document.getElementById("statusMsg");
const fishFacts = document.getElementById("fish-facts");

const fishAudio = new Audio();
const clickAudio = new Audio();
const instructionAudio = new Audio("sound/fodr-fisken.mp3");
const successAudio = new Audio("sound/tillykke.mp3");

const aquariumSound = document.querySelector("audio");
aquariumSound.volume = 0.7;


let selectedFish;

function showFish(clickedFish) {
  selectedFish = fishDetails[clickedFish.dataset.fish];

  aquariumSound.volume = 0.1;

  if (!selectedFish) {
    console.error("Missing information for this fish.");
    return;
  }

clickAudio.pause();
instructionAudio.pause();
instructionAudio.currentTime = 0;

clickAudio.src = selectedFish.clickSound;
clickAudio.currentTime = 0;

console.log("Kliklyd:", selectedFish.clickSound);

clickAudio.onended = () => {
  setTimeout(() => {
    if (!popup.hidden) {
      instructionAudio.currentTime = 0;
      instructionAudio.play().catch(console.error);
    }
  }, 500);
};

clickAudio.play().catch((error) => {
  console.error("Kliklyden virker ikke:", error);
});

  popupTitle.textContent = `Feed ${selectedFish.name}`;
  fishInfo.textContent = selectedFish.info;
  popupFish.src = selectedFish.popupImage;
  popupFish.alt = selectedFish.name;
  popupFish.style.filter = "";
  status.textContent = "";
  foodContainer.replaceChildren();
  fishFacts.hidden = true;

  selectedFish.foods.forEach((foodDetails) => {
    const foodButton = document.createElement("button");
    foodButton.className = "food";
    foodButton.type = "button";
    foodButton.draggable = true;
    foodButton.dataset.type = foodDetails.type;
    foodButton.textContent = foodDetails.name;

    foodButton.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("food-type", foodDetails.type);
    });

    foodContainer.appendChild(foodButton);
  });

  popup.hidden = false;
}

document.querySelectorAll(".fisk").forEach((clickedFish) => {
  clickedFish.addEventListener("click", () => showFish(clickedFish));
});

document.getElementById("popup-close").addEventListener("click", () => {
  popup.hidden = true;
  aquariumSound.volume = 0.7;

});

popupFish.addEventListener("dragover", (event) => {
  event.preventDefault();
});

popupFish.addEventListener("drop", (event) => {
  const droppedFood = event.dataTransfer.getData("food-type");

  if (selectedFish && droppedFood === selectedFish.correctFood) {
    status.textContent = "Glad fisk!";
    popupFish.style.filter = "brightness(1.2)";
    fishFacts.hidden = false;

 fishFacts.innerHTML = `
  <h3 class="fact-intro"> Du har låst op for fiskens hemmeligheder!</h3>

 <div class="fact-grid">
  <div class="fact-item">
    <span class="fact-label">📏 Størrelse</span>
    <span class="fact-value">${selectedFish.size}</span>
  </div>

  <div class="fact-item">
    <span class="fact-label">🌊 Levested</span>
    <span class="fact-value">${selectedFish.habitat}</span>
  </div>

  <div class="fact-item">
    <span class="fact-label">🎨 Farve</span>
    <span class="fact-value">${selectedFish.color}</span>
  </div>

  <div class="fact-item">
    <span class="fact-label">⏳ Levetid</span>
    <span class="fact-value">${selectedFish.lifespan}</span>
  </div>
</div>

<div class="special-fact">
    <strong>⭐ Fiskens superkraft</strong>
    <p>${selectedFish.specialAbility}</p>
  </div> `
  ;

fishAudio.pause();
fishAudio.src = selectedFish.audio;
fishAudio.currentTime = 0;

console.log("Afspiller:", fishAudio.src);

successAudio.currentTime = 0;

successAudio.onended = () => {
  fishAudio.play().catch(console.error);
};

successAudio.play().catch(console.error);
  


  } else {
    status.textContent = "Sulten fisk!";
    popupFish.style.filter = "brightness(0.6)";
    fishFacts.hidden = true;

    fishAudio.pause();
    fishAudio.currentTime = 0;

  }
});
