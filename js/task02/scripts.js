const loadCountries = async (countries) => {
  const countryDataPromises = countries.map(country =>
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => data[0]) // Get the first matching result
    .catch(error => console.error(`Failed to fetch data for ${country}:`, error))
  );

  const countryData = await Promise.all(countryDataPromises);

  const carouselInner = document.querySelector('.carousel-inner');
  carouselInner.innerHTML = '';

  countryData.forEach((data, index) => {
    const { name, flags, capital, timezones, currencies } = data;
    const currency = Object.values(currencies)[0].name;

    const carouselItem = document.createElement('div');
    carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    carouselItem.innerHTML = `
            <img src="${flags.png}" class="d-block w-100" alt="${name.common}">
            <div class="information-container">
                <div class="information-title">${name.common}</div>
                <div class="information-list">
                    <ul class="list-group">
                        <li class="list-group-item"><i class="fa-solid fa-user"></i> Capital: ${capital}</li>
                        <li class="list-group-item"><i class="fa-solid fa-user"></i> Timezone: ${timezones[0]}</li>
                        <li class="list-group-item"><i class="fa-solid fa-user"></i> Currency: ${currency}</li>
                    </ul>
                </div>
            </div>
        `;
    carouselInner.appendChild(carouselItem);
  });
};

// Example usage
loadCountries(['vietnam', 'germany', 'france', 'korea', 'japan']);