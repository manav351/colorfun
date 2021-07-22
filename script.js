const getElementById = (id) => document.getElementById(id);
const getColorNumberElement = () => getElementById("numberOfColors");
const getRandomNumber = (limit) => Math.floor(Math.random() * limit);
const getRandomHex = () => {
  let hex = Number(getRandomNumber(256)).toString(16);
  if (hex.length < 2) hex = "0" + hex;
  return hex;
};

function getRandomColor() {
  const red = getRandomHex();
  const green = getRandomHex();
  const blue = getRandomHex();
  return `#${red}${green}${blue}`;
}

function getNewColorDiv(bgColor) {
  const newElement = document.createElement("div");
  newElement.className = "pallete-color";
  newElement.style.backgroundColor = bgColor;
  return newElement;
}

class ColorsCounter {
  constructor() {
    let totalNumberOfColors = 5;
    this.incrementNumberOfColors = () => {
      if (totalNumberOfColors < 7)
        getColorNumberElement().innerText = ++totalNumberOfColors;
    };
    this.decrementNumberOfColors = () => {
      if (totalNumberOfColors > 3)
        getColorNumberElement().innerText = --totalNumberOfColors;
    };
    this.getNumberOfColors = () => totalNumberOfColors;
    this.setNumberOfColors = (numberOfColors) => {
      totalNumberOfColors = numberOfColors;
    };
  }
}
const colorCounter = new ColorsCounter();

class PalleteList {
  constructor() {
    let listOfPallete = new Array();
    let currentIndex = -1;
    const fixedLengthOfPalletes = 1000;
    this.incrementCurrentIndex = () => {
      if (currentIndex < listOfPallete.length - 1) currentIndex++;
    };
    this.decrementCurrentIndex = () => {
      if (currentIndex > 0) currentIndex--;
    };
    this.addNewPallate = () => {
      if (listOfPallete.length == fixedLengthOfPalletes) {
        listOfPallete.shift();
        currentIndex--;
      }
      let colorsList = new Array();
      for (let count = 0; count < colorCounter.getNumberOfColors(); count++) {
        colorsList.push(getRandomColor());
      }
      listOfPallete.splice(currentIndex + 1);
      listOfPallete.push(colorsList);
      currentIndex++;
    };
    this.getCurrentPallate = () => listOfPallete[currentIndex];
  }
}
const palleteListhandler = new PalleteList();

function changeTitleColors(currentColors) {
  let count = 1;
  for (let index = 0; count < 8; count++, index++) {
    if (index === currentColors.length) index = 0;
    document.documentElement.style.setProperty(
      `--title-color-${count}`,
      currentColors[index]
    );
  }
}
function generatePallete() {
  const palleteDiv = getElementById("colorPallete");
  palleteDiv.innerHTML = "";
  const colorsList = palleteListhandler.getCurrentPallate();
  changeTitleColors(colorsList);
  getColorNumberElement().innerText = colorsList.length;
  colorCounter.setNumberOfColors(colorsList.length);
  colorsList.forEach((currentColor) => {
    const newColorDiv = getNewColorDiv(currentColor);
    palleteDiv.appendChild(newColorDiv);
  });
}

function addEventListeners() {
  getElementById("decreaseColorNumber").addEventListener("click", () => {
    colorCounter.decrementNumberOfColors();
  });
  getElementById("increaseColorNumber").addEventListener("click", () => {
    colorCounter.incrementNumberOfColors();
  });
  getElementById("undoButton").addEventListener("click", () => {
    palleteListhandler.decrementCurrentIndex();
    generatePallete();
  });
  getElementById("redoButton").addEventListener("click", () => {
    palleteListhandler.incrementCurrentIndex();
    generatePallete();
  });
  getElementById("generateButton").addEventListener("click", () => {
    palleteListhandler.addNewPallate();
    generatePallete();
  });

  document.onkeyup = function (event) {
    if (event.key === "ctrlKey" && event.key == 90) {
      alert("Ctrl+z");
    }
  };

  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.code === "KeyZ" && !event.shiftKey)
      getElementById("undoButton").click();

    if (
      (event.ctrlKey && event.code === "KeyZ" && event.shiftKey) ||
      (event.ctrlKey && event.code === "KeyY")
    )
      getElementById("redoButton").click();
    if (event.code === "Space") getElementById("generateButton").click();
  });
}

function changeColor() {
  let collection = document.getElementsByClassName("pallete-color");
  for (let index = 0; index < collection.length; index++) {
    collection[index].style.backgroundColor = getRandomColor();
  }
}
function initiate() {
  addEventListeners();
  getElementById("generateButton").click();
}

window.onload = initiate;
