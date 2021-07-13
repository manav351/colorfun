const getElementById = (id) => document.getElementById(id);
const getRandomNumber = () => Math.round(Math.random() * 256);

function getRandomColor() {
  const red = getRandomNumber();
  const green = getRandomNumber();
  const blue = getRandomNumber();
  return `rgb(${red}, ${green}, ${blue})`;
}

function getNewColorDiv() {
  const newElement = document.createElement("div");
  newElement.className = "pallete-color";
  return newElement;
}

function decreamentNumberOfColors() {
  const valueElement = document.getElementById("numberOfColors");
  const currentNumberOfColors = Number(valueElement.innerText);
  if (currentNumberOfColors > 3)
    valueElement.innerText = currentNumberOfColors - 1;
}

function increamentNumberOfColors() {
  const valueElement = document.getElementById("numberOfColors");
  const currentNumberOfColors = Number(valueElement.innerText);
  if (currentNumberOfColors < 7)
    valueElement.innerText = currentNumberOfColors + 1;
}
function generatePallete() {
  const valueElement = document.getElementById("numberOfColors");
  const currentNumberOfColors = Number(valueElement.innerText);
  const palleteDiv = document.getElementById("colorPallete");
  palleteDiv.innerHTML = "";
  palleteDiv.classList.add("has-color-pallete");
  document.documentElement.style.setProperty(
    "--current-number-of-colors",
    `${currentNumberOfColors}`
  );
  for (let i = 0; i < currentNumberOfColors; i++) {
    const newColorDiv = getNewColorDiv();
    newColorDiv.style.backgroundColor = getRandomColor();
    palleteDiv.appendChild(newColorDiv);
  }
}