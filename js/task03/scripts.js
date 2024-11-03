import initializeFlagCard from "./card_generator.js"
import openErrorModal from "./error_modal.js";

const CONUTRY_CODE = ["DEU","VN","CasdN"]
const cardContainer = document.getElementById(`card-container`);
let errorCode = [];
const processData = async (code) => {
  const url = `https://restcountries.com/v3.1/alpha/${code}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    cardContainer.innerHTML += initializeFlagCard(json[0]);
  } catch {
    errorCode.push(code)
  }
}

$(document).ready(async () => {
  for (const code of CONUTRY_CODE) {
    await processData(code);
  }

  if (errorCode.length > 0) {
    openErrorModal(`Can't not found the country with this code: ${errorCode.join(", ")}`);
  }
});