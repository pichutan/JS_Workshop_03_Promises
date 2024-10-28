import createCard from "./card_generator.js"

const CONUTRY_CODE = ["DEU","VNM"]
const cardContainer = document.getElementById(`card-container`);
const processData = async (code) => {
  const url = `https://restcountries.com/v3.1/alpha/${code}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    cardContainer.innerHTML += createCard(json[0]);
  } catch (error) {
    console.error(error.message);
  }
}

$(document).ready(() => {
  CONUTRY_CODE.forEach((code) => {
    processData(code)
  });
})