const countryFlag = document.getElementById('country-flag');
const countryInfo = document.getElementById('country-info');
const neighborsContainer = document.getElementById('neighbors-container');

const fetchCountryData = async (country) => {
  const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await response.json();
  return data[0];
};

const displayCountryInfo = (country) => {
  countryFlag.src = country.flags.png;
  countryInfo.textContent = `${country.capital[0]} | ${Object.keys(country.currencies)[0]} | ${country.timezones}`;
  displayNeighbors(country.borders);
};

const displayNeighbors = (neighbors) => {
  neighborsContainer.innerHTML = '';
  if (!neighbors) return;
  neighbors.forEach(border => {
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
        fetchCountryData(neighborData.name.common).then(displayCountryInfo);
      });

      neighborsContainer.appendChild(flagImg);
    })
    .catch(error => console.error('Error fetching neighbor data:', error));

  });
};

fetchCountryData('Germany').then(displayCountryInfo);