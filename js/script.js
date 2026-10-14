"use strict";

const fishDetails = {
  "dwarf-angelfish": {
    name: "Dværgkejser",
    info: "Dværgkejseren spiser blandt andet alger og små dyr i vandet.",
    size: "7-10 cm",
    habitat: "Koralrev i varme have",
    color: "Blå, orange og gul",
    lifespan: "Ca. 5-12 år",
    specialAbility: "Dværgkejseren hjælper med at holde koralrevet rent ved at spise alger.",
   audio: "sound/dvaergkejser.mp3",
 clickSound: "sound/fish!.mp3",

    
    correctFood: "algae",
    foods: [
      { name: "Reje", type: "shrimp" },
      { name: "Alger", type: "algae" },
      { name: "Brød", type: "bread" },
    ],
  },
  puffer: {
    name: "Kuglefisk",
    info: "Kuglefisken spiser blandt andet små skaldyr og snegle.",
    popupImage: "img/background.png",
    size: "10-35 cm. (Den kan blive 2-3 gange større, når den bliver bange!)",
    habitat: "Koralrev, klipper og sandbund i havet",
    color: "Hvid, brun, blålig, gul og grønlig",
    lifespan: "2-15 år",
    specialAbility: "Kuglefisken har næsten ingen hals! Derfor ryger maden direkte ned i maven, når den sluger noget.",
    audio: "sound/Puffer.mp3",
    clickSound: "sound/puffer carrot.mp3",


    background: "url('img/puffer.png') no-repeat center/contain",
    correctFood: "snail",
    foods: [
      { name: "Snegl", type: "snail" },
      { name: "Alger", type: "algae" },
      { name: "Brød", type: "bread" },
    ],
  },
  "royal-gramma": {
  name: "Konge fehars",
  info: "Den lilla fisk elsker at spise små krebsdyr, som for eksempel bittesmå rejer",
  size: "7-8 cm",
  habitat: "Koralrev, klipper og små sprækker i havet",
  color: "Lilla og gul",
  lifespan: "5-10 år",
  specialAbility: "Fisken kan skifte farve, hvis den bliver stresset. Så bliver dens farver mere blege!",
  audio: "sound/Konge fehars.mp3",
  clickSound: "sound/Fish Splash.mp3",

  correctFood: "shrimp",
  foods: [
    { name: "Små rejer", type: "shrimp" },
    { name: "Alger", type: "algae" },
    { name: "Brød", type: "bread" }
  ]
  },
  nemo: {
    name: "Klovnfisk",
    info: "Klovnfisken spiser små dyr i vandet og lidt alger.",
    size: "8-16 cm",
    habitat: "Den bor mellem søanemoner i koralrev.",
    color: "Orange med hvide striber",
    lifespan: "6-12 år",
    specialAbility: "Klovnfisken kan tåle søanemonens gift, som ellers kan skade andre fisk!",
    audio: "sound/Klovnkfisk.mp3",
    clickSound: "sound/nemo.mp3",

    correctFood: "shrimp",
    foods: [
      { name: "Reje", type: "shrimp" },
      { name: "Alger", type: "algae" },
      { name: "Brød", type: "bread" },
    
    ],
  },
  "yellow-tang": {
    name: "Gul kirurgfisk",
    info: "Den gule kirurgfisk finder det meste af sin føde blandt alger.",
    size: "Ca. 15-20 cm",
    habitat: "Koralrev i varme have",
    color: "Klar gul",
    lifespan: "Op til 30 år",
    specialAbility: "Den har en lille, skarp pig ved halen, som den kan bruge til at forsvare sig!",
  audio: "sound/Gul kirug.mp3",
  clickSound: "sound/Fish sound.wav",

    correctFood: "algae",
    foods: [
      { name: "Alger", type: "algae" },
      { name: "Fisk", type: "fish" },
      { name: "Brød", type: "bread" },
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

  popupTitle.textContent = `Fodr ${selectedFish.name}`;
  fishInfo.textContent = selectedFish.info;
  popupFish.src = clickedFish.src;
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

fishAudio.play().catch((error) => {
  console.error("Fejl ved afspilning:", error);
});
  


  } else {
    status.textContent = "Sulten fisk!";
    popupFish.style.filter = "brightness(0.6)";
    fishFacts.hidden = true;

    fishAudio.pause();
    fishAudio.currentTime = 0;

  }
});
