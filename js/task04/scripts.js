import initializeFlagCard from "./card_generator.js";

const cardContainer = document.getElementById("card-container");
const flagContainer = document.getElementById("borders-countries");

const initializeData = async (code) => {
  cardContainer.innerHTML = "";
  flagContainer.innerHTML = "";
  const url = `https://restcountries.com/v3.1/alpha/${code}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    cardContainer.innerHTML += initializeFlagCard(data[0]);

    data[0].borders.forEach((borderCode) => {
      processFlag(borderCode);
    });
  } catch (error) {
    console.error(error.message);
  }
};

const processFlag = async (code) => {
  const url = `https://restcountries.com/v3.1/alpha/${code}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    
    // Create a div for the flag with a click event
    const flagContainerDiv = document.createElement("div");
    flagContainerDiv.classList.add("flag-item");

    const flagImage = document.createElement("img");
    flagImage.src = json[0].flags.png;
    flagImage.alt = `Flag of ${json[0].name.common}`;
    flagImage.style.width = "100%";
    flagImage.style.height = "100px";
    
    // Add the image to the div
    flagContainerDiv.appendChild(flagImage);
    
    // Add click event to fetch and display data for the clicked flag's country
    flagContainerDiv.addEventListener("click", () => {
      initializeData(code);
    });

    // Append the flag div to the main flag container
    flagContainer.appendChild(flagContainerDiv);
  } catch (error) {
    console.error(error.message);
  }
};

$(document).ready(() => {
  initializeData("DEU");
});
