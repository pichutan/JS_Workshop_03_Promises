/**
 * Fetches and displays data for multiple countries.
 * @param {string[]} countries - An array of country names to fetch data for.
 * @returns {Promise<void>}
 */
const getCountriesData = async (countries) => {
  const promises = countries.map(country =>
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data for ${country}`);
        }
        return response.json();
      })
  );

  try {
    const allCountriesData = await Promise.all(promises);
    displayCountries(allCountriesData);
  } catch (error) {
    console.error('Error:', error);
  }
};

/**
 * Displays country data in a carousel format.
 * @param {object[]} countriesData - An array of country data objects.
 * @returns {void}
 */
const displayCountries = (countriesData) => {
  const carouselInner = document.querySelector('.carousel-inner');
  carouselInner.innerHTML = ''; // Clear any existing items

  countriesData.forEach((countryData, index) => {
    const { name, flags, capital, timezones, currencies } = countryData[0];
    const currency = Object.values(currencies)[0].name;

    const carouselItem = document.createElement('div');
    carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    carouselItem.innerHTML = `
            <img src="${flags.png}" class="d-block w-100" alt="${name.common} Flag">
            <div class="information-container">
                <div class="information-title">
                    ${name.common}
                </div>
                <div class="information-list">
                    <ul class="list-group">
                        <li class="list-group-item"><i class="fa-solid fa-landmark"></i> Capital: ${capital[0]}</li>
                        <li class="list-group-item"><i class="fa-solid fa-clock"></i> Timezone: ${timezones[0]}</li>
                        <li class="list-group-item"><i class="fa-solid fa-money-bill-wave"></i> Currency: ${currency}</li>
                    </ul>
                </div>
            </div>
        `;

    carouselInner.appendChild(carouselItem);
  });
};

const countries = ['Germany', 'Vietnam', 'France', 'Japan', 'Brazil'];
getCountriesData(countries);
