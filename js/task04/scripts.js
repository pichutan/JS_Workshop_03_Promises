/**
 * Event listener for DOMContentLoaded to fetch initial country data.
 */
document.addEventListener("DOMContentLoaded", () => {
  const startingCountry = 'Germany';
  fetchCountryData(startingCountry);
});

/**
 * Fetches data for a given country and updates the country card.
 * @param {string} countryName - The name of the country to fetch data for.
 * @returns {void}
 */
const fetchCountryData = (countryName) => {
  const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country ${countryName} not found`);
      }
      return response.json();
    })
    .then(data => {
      const countryData = data[0];
      updateCountryCard(countryData);
    })
    .catch(error => {
      console.error(error);
      showErrorModal(error.message);
    });
};

/**
 * Updates the country card with fetched country data.
 * @param {object} countryData - The data of the country to display.
 * @returns {void}
 */
const updateCountryCard = (countryData) => {
  const flagContainer = document.querySelector('.flag-container img');
  flagContainer.src = countryData.flags.png;

  document.querySelector('.country-capital').textContent = `Capital: ${countryData.capital ? countryData.capital[0] : 'N/A'}`;
  document.querySelector('.country-currency').textContent = `Currency: ${Object.values(countryData.currencies)[0].name}`;
  document.querySelector('.country-timezone').textContent = `Timezone: ${countryData.timezones[0]}`;

  updateNeighborFlags(countryData.borders);
};

/**
 * Updates the neighbor flags based on the borders of the country.
 * @param {string[]} borders - An array of border country codes.
 * @returns {void}
 */
const updateNeighborFlags = (borders) => {
  const neighborsContainer = document.querySelector('.neighbors-container');
  neighborsContainer.innerHTML = '';

  if (!borders || borders.length === 0) {
    neighborsContainer.innerHTML = '<p>No neighboring countries</p>';
    return;
  }

  borders.forEach(border => {
    const apiUrl = `https://restcountries.com/v3.1/alpha/${border}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const neighborData = data[0];

        const flagImg = document.createElement('img');
        flagImg.src = neighborData.flags.png;
        flagImg.classList.add('neighbor-flag');
        flagImg.alt = neighborData.name.common;
        flagImg.addEventListener('click', () => {
          fetchCountryData(neighborData.name.common); // Fetch data for clicked neighbor
        });

        neighborsContainer.appendChild(flagImg);
      })
      .catch(error => console.error('Error fetching neighbor data:', error));
  });
};

/**
 * Displays an error modal with the given message.
 * @param {string} message - The error message to display.
 * @returns {void}
 */
const showErrorModal = (message) => {
  alert(`Error: ${message}`);
};
