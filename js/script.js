"use strict";


const akvarie = document.getElementsByClassName("akvarie");
const fiskene = document.getElementsByClassName("fisk");




const fish = document.getElementById("fish");
const foods = document.querySelectorAll(".food");


const status = document.getElementById("status");

// dropper on fisk
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