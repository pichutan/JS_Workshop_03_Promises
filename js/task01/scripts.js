function fetchCountryData(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Country not found");
    }
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('card-container');

    data.forEach(country => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
                    <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common} flag">
                    <div class="card-body">
                        <h5 class="card-title">${country.name.common}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><i class="fa-solid fa-user"></i> Capital: ${country.capital ? country.capital[0] : 'N/A'}</li>
                        <li class="list-group-item"><i class="fa-solid fa-user"></i> Timezone: ${country.timezones ? country.timezones[0] : 'N/A'}</li>
                        <li class="list-group-item"><i class="fa-solid fa-user"></i> Currency: ${country.currencies ? Object.keys(country.currencies)[0] : 'N/A'}</li>
                    </ul>
                `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
}
fetchCountryData("vietnam");
fetchCountryData("germany");