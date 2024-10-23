/**
 * Fetches data for a given country and displays it.
 * @param {string} countryName - The name of the country to fetch data for.
 * @returns {Promise<void>}
 */
const fetchCountryData = async (countryName) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

    if (!response.ok) {
      throw new Error(`Country "${countryName}" not found.`);
    }

    const countryData = await response.json();
    displayCountryData(countryData[0]);
  } catch (error) {
    showErrorModal(error.message);
  }
};

/**
 * Displays the fetched country data in the HTML elements.
 * @param {object} countryData - The data of the country to display.
 * @returns {void}
 */
const displayCountryData = (countryData) => {
  const { name, flags, capital, timezones, currencies } = countryData;
  const currency = Object.values(currencies)[0].name;

  document.getElementById('country-title').textContent = name.common;
  document.getElementById('country-flag').src = flags.png;
  document.getElementById('country-capital').textContent = capital[0];
  document.getElementById('country-timezone').textContent = timezones[0];
  document.getElementById('country-currency').textContent = currency;
};

/**
 * Displays an error modal with the given message.
 * @param {string} message - The error message to display.
 * @returns {void}
 */
const showErrorModal = (message) => {
  document.getElementById('error-message').textContent = message;
  const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  errorModal.show();
};

fetchCountryData('Germany');