const countryCard = document.getElementById('country-card');
const countryFlag = document.getElementById('country-flag');
const countryName = document.getElementById('country-name');
const countryInfo = document.getElementById('country-info');
const neighborsDiv = document.getElementById('neighbors');

const fetchCountryData = async (country) => {
  const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await response.json();
  return data[0];
};

const displayCountryInfo = (country) => {
  console.log(countryFlag);
  countryFlag.src = country.flags.png;
  countryName.textContent = country.name.common;
  countryInfo.textContent = `Capital: ${country.capital[0]}, Population: ${country.population}`;
  displayNeighbors(country.borders);
};

const displayNeighbors = (neighbors) => {
  const neighborsContainer = document.querySelector('.neighbors-container');
  neighborsContainer.innerHTML = '';
  if (!neighbors) return;
  console.log(neighbors);
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