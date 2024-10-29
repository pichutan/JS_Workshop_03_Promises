const displayCountryInfo = (country) => {
  const countryCard = `
    <div class="card" style="width: 30%;">
      <img src="${country.flags.png}" class="card-img-top" style="height: 24rem;" alt="${country.flags.alt}">
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
  document.getElementById('country-cards').innerHTML += countryCard;
}
const renderCards = () => {
  const countries = ['Germany', 'Vietnam'];
  countries.forEach(country => {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(response => response.json())
      .then(data => {
        const countryData = data[0];
        displayCountryInfo(countryData);
      })
      .catch(error => console.error('Error fetching country data:', error));
  });
}
$(document).ready(() => {
  renderCards();
})
