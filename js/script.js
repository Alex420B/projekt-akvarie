"use strict";


const fiskene = document.getElementsByClassName("fisk");

const popup = document.getElementById("popup");
const closePopup = document.getElementById("popup-close");
const fish = document.getElementById("popup-fish");
const foods = document.querySelectorAll(".food");
const status = document.getElementById("status");

Array.from(fiskene).forEach((fisk) => {
  fisk.addEventListener("click", () => {
    popup.hidden = !popup.hidden;
  });
});

closePopup.addEventListener("click", () => {
  popup.hidden = true;
});

fish.addEventListener("dragover", (e) => e.preventDefault());

fish.addEventListener("drop", (e) => {
  const foodType = e.dataTransfer.getData("food-type");

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
  food.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("food-type", food.dataset.type);
  });
});