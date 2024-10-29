const APIURL = 'https://restcountries.com/v3.1';
const createCountryCard = (country) => {
  document.getElementById('country-card').innerHTML = `
    <div class="card mb-4">
      <img src="${country.flags.png}" class="card-img-top" style="height: 16rem;" alt="${country.flags.alt}">
      <div class="card-body">
        <h5 class="card-title">${country.name.common}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><i class="fa-solid fa-user"></i> Capital: ${country.capital[0]}</li>
        <li class="list-group-item"><i class="fa-solid fa-clock"></i> Timezone: ${country.timezones[0]}</li>
        <li class="list-group-item"><i class="fa-solid fa-money-bill"></i> Currency: ${Object.keys(country.currencies)[0]}</li>
      </ul>
    </div>
  `;
  document.getElementById('neighbors-container').innerHTML = "";
  const neighborsContainer = document.getElementById('neighbors-container');
  country.neighbors.forEach((neighbor, index) => {
    const neighborDiv = document.createElement('div');
    neighborDiv.classList.add('col-4', 'mb-3', 'text-center');
    const neighborFlag = document.createElement('img');
    neighborFlag.src = neighbor.flag;
    neighborFlag.style.height = '6rem';
    neighborFlag.style.width = '10rem';
    neighborFlag.alt = `Flag of ${neighbor.name}`;
    neighborFlag.onclick = () => fetchCountryData(neighbor.name);
    neighborDiv.appendChild(neighborFlag);
    neighborsContainer.appendChild(neighborDiv);
    if ((index + 1) % 3 === 0) {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('w-100');
      neighborsContainer.appendChild(rowDiv);
    }
  });
};

const fetchCountryData = (countryName) => {
  fetch(`${APIURL}/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      const countryData = data[0];
      const neighbors = countryData.borders || [];
      Promise.all(
        neighbors.map((code) =>
          fetch(`${APIURL}/alpha/${code}`).then((res) => res.json())
        )
      ).then((neighborsData) => {
        countryData.neighbors = neighborsData.map((neighbor) => ({
          name: neighbor[0].name.common,
          flag: neighbor[0].flags.png
        }));
        createCountryCard(countryData);
      });
    })
    .catch((error) => {
      console.error('Error fetching country data:', error);
    });
};

$(document).ready(() => {
  fetchCountryData('Germany');
});