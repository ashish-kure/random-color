// DOM Accessing
const generateButton = document.querySelector(".generate-button");

const displayColor = document.querySelector(".display-color");
const displayCode = document.querySelector(".display-code").firstElementChild;

const infoButton = document.querySelector(".info");
const copied = document.querySelector(".copied");

let rgb;
let hexCode;
let flag = false;

// Invocation of Function!
generateButton.onclick = generateRandomColor;

displayColor.addEventListener("click", generateRandomColor);

document.body.onkeyup = (event) => {
  if (event.keyCode === 32) {
    generateRandomColor();
  }
};

// Change hex code to rgb or vice versa...
infoButton.addEventListener("click", () => {
  if (!flag) {
    displayCode.textContent = rgb;
    infoButton.title = "Click to change into Hex Code";

    flag = true;
  } else {
    displayCode.textContent = hexCode;
    infoButton.title = "Click to change into RGB Format";

    flag = false;
  }
});

// Actual Logic!
function generateRandomColor() {
  const color = [];

  const hexCharacters = {
    10: "A",
    11: "B",
    12: "C",
    13: "D",
    14: "E",
    15: "F",
  };

  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * 16);
    color.push(random);
  }

  const finalColor = color.reduce((acc, ele) => {
    acc.push(ele > 9 ? hexCharacters[ele] : ele);
    return acc;
  }, []);

  // Hex Color Code
  hexCode = `#${finalColor.join("")}`;

  // RGB Color Code
  const red = parseInt(hexCode.slice(1, 3), 16);
  const green = parseInt(hexCode.slice(3, 5), 16);
  const blue = parseInt(hexCode.slice(5, 7), 16);
  rgb = `rgb(${red}, ${green}, ${blue})`;

  // Display color
  displayCode.textContent = flag ? `${rgb}` : `${hexCode}`;

  displayColor.style.background = `${rgb}`;
  document.body.style.background = `${hexCode}22`;

  infoButton.style.display = "flex";
}

// Copy Button
displayCode.addEventListener("click", () => {
  navigator.clipboard.writeText(displayCode.textContent);

  copied.style.display = "flex";
  copied.style.color = `${hexCode}`;

  setTimeout(() => {
    copied.style.display = "none";
  }, 500);
});
