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
    background: "url('img/puffer.png') no-repeat center/contain",
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
