const displayCountriesInSlider = (countries) => {
  const countryPromises = countries.map(country =>
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(response => response.json())
      .then(data => data[0])
  );
  Promise.all(countryPromises)
    .then(countryDataArray => {
      let sliderContent = '';
      countryDataArray.forEach((countryData, index) => {
        const isActive = index === 0 ? 'active' : '';
        const countryName = countryData.name.common;
        const countryFlag = countryData.flags.png;
        const countryCapital = countryData.capital[0];
        const countryTimezone = countryData.timezones[0];
        const countryCurrency = Object.keys(countryData.currencies)[0];
        const alt = countryData.flags.alt;

        const carouselItem = `
          <div class="carousel-item ${isActive}">
            <img src="${countryFlag}" class="d-block w-100" style="height: 32rem;" alt="${alt}">
            <div class="information-container">
              <div class="information-title">
                ${countryName}
              </div>
              <div class="information-list">
                <ul class="list-group">
                  <li class="list-group-item"><i class="fa-solid fa-city"></i> Capital: ${countryCapital}</li>
                  <li class="list-group-item"><i class="fa-solid fa-clock"></i> Timezone: ${countryTimezone}</li>
                  <li class="list-group-item"><i class="fa-solid fa-money-bill"></i> Currency: ${countryCurrency}</li>
                </ul>
              </div>
            </div>
          </div>
        `;
        sliderContent += carouselItem;
      });
      document.getElementById('countrySlider').innerHTML = sliderContent;
    })
    .catch(error => console.error('Error fetching country data:', error));
};

$(document).ready(() => {
  const countries = ['Germany', 'Vietnam', 'Indonesia', 'Malaysia', 'Philippines'];
  displayCountriesInSlider(countries);
})