"use strict";

const fishDetails = {
  dory: {
    name: "Dory",
    info: "Dory er en kirurgfisk. Den spiser alger og små dyr i vandet.",
    correctFood: "shrimp",
    foods: [
      { name: "Reje", type: "shrimp" },
      { name: "Alger", type: "algae" },
      { name: "Brød", type: "bread" },
    ],
  },
  puffer: {
    name: "Kuglefisk",
    info: "Kuglefisken spiser blandt andet små skaldyr og snegle.",
    background: 'img/puffer.png',
    correctFood: "snail",
    foods: [
      { name: "Snegl", type: "snail" },
      { name: "Alger", type: "algae" },
      { name: "Brød", type: "bread" },
    ],
  },
  shark: {
    name: "Haj",
    info: "Hajen er et rovdyr, der spiser fisk og andre havdyr.",
    correctFood: "fish",
    foods: [
      { name: "Fisk", type: "fish" },
      { name: "Alger", type: "algae" },
      { name: "Salat", type: "lettuce" },
    ],
  },
  seahorse: {
    name: "Søhest",
    info: "Søhesten suger små krebsdyr, som rejer, ind med sin snude.",
    correctFood: "shrimp",
    foods: [
      { name: "Små rejer", type: "shrimp" },
      { name: "Tang", type: "seaweed" },
      { name: "Brød", type: "bread" },
    ],
  },
  nemo: {
    name: "Klovnfisk",
    info: "Klovnfisken spiser små dyr i vandet og lidt alger.",
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
let selectedFish;

function showFish(clickedFish) {
  selectedFish = fishDetails[clickedFish.dataset.fish];

  if (!selectedFish) {
    console.error("Missing information for this fish.");
    return;
  }

  popupTitle.textContent = `Fodr ${selectedFish.name}`;
  fishInfo.textContent = selectedFish.info;
  popupFish.src = clickedFish.src;
  popupFish.alt = selectedFish.name;
  popupFish.style.filter = "";
  status.textContent = "";
  foodContainer.replaceChildren();

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
});

popupFish.addEventListener("dragover", (event) => {
  event.preventDefault();
});

popupFish.addEventListener("drop", (event) => {
  const droppedFood = event.dataTransfer.getData("food-type");

  if (selectedFish && droppedFood === selectedFish.correctFood) {
    status.textContent = "Glad fisk!";
    popupFish.style.filter = "brightness(1.2)";
  } else {
    status.textContent = "Sulten fisk!";
    popupFish.style.filter = "brightness(0.6)";
  }
});

// 1. Hent fiskene fra HTML
const getFish1 = document.getElementById("fish1");
const getFish2 = document.getElementById("fish2");
const getFish3 = document.getElementById("fish3");
const getFish4 = document.getElementById("fish4");

// 2. Opret lydobjekter til fiskene
const soundFish1 = new Audio("sound/fish1.wav");
const soundFish2 = new Audio("sound/fish2.wav");
const soundFish3 = new Audio("sound/fish3.wav");
const soundFish4 = new Audio("sound/fish4.wav");

// 3. Opret baggrundslyden
const backgroundSound = new Audio("sound/aquarium.wav");
backgroundSound.volume = 0.2;

// Baggrundslyden skal gentage sig selv
backgroundSound.loop = true; 

// 4. Afspil en fiskelyd, når man klikker på fisken
getFish1.addEventListener("click", () => {
    soundFish1.currentTime = 4;
    soundFish1.play();

    setTimeout(() => {
        soundFish1.pause();
        soundFish1.currentTime = 0;
    }, 4000);
});

getFish2.addEventListener("click", () => {
    soundFish2.currentTime = 15;
    soundFish2.play();

    setTimeout(() => {
        soundFish2.pause();
        soundFish2.currentTime = 0;
    }, 4000);
});

getFish3.addEventListener("click", () => {
    soundFish3.currentTime = 0;
    soundFish3.play();

    setTimeout(() => {
        soundFish3.pause();
        soundFish3.currentTime = 0;
    }, 4000);
});

getFish4.addEventListener("click", () => {
    soundFish4.currentTime = 5;
    soundFish4.play();

    setTimeout(() => {
        soundFish4.pause();
        soundFish4.currentTime = 0;
    }, 4000);
});

// 5. Start baggrundslyden efter brugerens første klik
document.addEventListener("click", () => {
    if (backgroundSound.paused) {
        backgroundSound.play();
    }
}, { once: true });
