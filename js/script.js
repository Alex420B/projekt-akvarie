"use strict";


const fiskene = document.getElementsByClassName("fisk");

const popup = document.getElementById("popup");
const closePopup = document.getElementById("popup-close");
const fish = document.getElementById("popup-fish");
const foods = document.querySelectorAll(".food");
const status = document.getElementById("statusMsg");

Array.from(fiskene).forEach((fisk) => {
  fisk.addEventListener("click", () => {
    popup.hidden = !popup.hidden;
  });
});

closePopup.addEventListener("click", () => {
  popup.hidden = true;
});

fish.addEventListener("dragover", (event) => event.preventDefault());

fish.addEventListener("drop", (event) => {
  const foodType = event.dataTransfer.getData("food-type");

  if (foodType === "correct") {
    status.textContent = "Glad fisk!";
    fish.style.filter = "brightness(1.2)";
  } else {
    status.textContent = "Sulten fisk!";
    fish.style.filter = "brightness(0.6)";
  }
});

// bruger drag data
foods.forEach(food => {
  food.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("food-type", food.dataset.type);
  });
});