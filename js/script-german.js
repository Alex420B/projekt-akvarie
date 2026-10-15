"use strict";

const fishDetails = {
  dory: {
    name: "Dory",
    info: "Dory ist ein Chirurgfisch. Sie isst Algen und kleine Tiere im Wasser.",
    correctFood: "shrimp",
    foods: [
      { name: "Reje", type: "shrimp" },
      { name: "Alger", type: "algae" },
      { name: "Brød", type: "bread" },
    ],
  },
  puffer: {
    name: "Kugelfisch",
    info: "Der Kugelfisch ernährt sich unter anderem von kleinen Schalentieren und Schnecken.",
    background: "url('img/puffer.png') no-repeat center/contain",
    correctFood: "snail",
    foods: [
      { name: "Schnecke", type: "snail" },
      { name: "Algen", type: "algae" },
      { name: "Brot", type: "bread" },
    ],
  },
  shark: {
    name: "Haj",
    info: "Hajen er et rovdyr, der spiser fisk og andre havdyr.",
    correctFood: "fish",
    foods: [
      { name: "Fisch", type: "fish" },
      { name: "Algen", type: "algae" },
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
    name: "Clownfische",
    info: "Clownfische ernähren sich von kleinen Wassertieren und einigen Algen..",
    correctFood: "shrimp",
    foods: [
      { name: "Garnele", type: "shrimp" },
      { name: "Algen", type: "algae" },
      { name: "Brot", type: "bread" },
    ],
  },
  "yellow-tang": {
    name: "Gelber Segelflossendoktor",
    info: "Der Gelbe Segelflossendoktor findet den größten Teil seiner Nahrung in Algen..",
    correctFood: "algae",
    foods: [
      { name: "Algen", type: "algae" },
      { name: "Fisch", type: "fish" },
      { name: "Brot", type: "bread" },
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
