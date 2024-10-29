const showErrorModal = (message) => {
  const modalHTML = `
    <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="errorModalLabel">Error</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${message}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  errorModal.show();
}

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
      .then(response => {
        if (!response.ok) {
          throw new Error(`Country ${country} not found`);
        }
        return response.json();
      })
      .then(data => {
        const countryData = data[0];
        displayCountryInfo(countryData);
      })
      .catch(error => {
        showErrorModal(error.message);
      });
  });
}

$(document).ready(() => {
  renderCards();
});
