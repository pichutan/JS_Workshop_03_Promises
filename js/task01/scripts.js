/**
 * Fetches and displays country data for a given country name and card ID.
 * @param {string} countryName - The name of the country to fetch data for.
 * @param {string} cardId - The ID of the HTML element to display the country data.
 * @returns {void}
 */
const getCountryData = (countryName, cardId) => {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching data for ${countryName}`);
      }
      return response.json();
    })
    .then(countryData => {
      const { name, flags, capital, timezones, currencies } = countryData[0];
      const currency = Object.values(currencies)[0].name;

      document.getElementById(`${cardId}-name`).textContent = name.common;
      document.getElementById(`${cardId}-flag`).src = flags.png;
      document.getElementById(`${cardId}-capital`).textContent = capital[0];
      document.getElementById(`${cardId}-timezone`).textContent = timezones[0];
      document.getElementById(`${cardId}-currency`).textContent = currency;
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

getCountryData('germany', 'germany');
getCountryData('vietnam', 'vietnam');
