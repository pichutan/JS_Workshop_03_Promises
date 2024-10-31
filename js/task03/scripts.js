const fetchCountryData = (countryName) => {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Country "${countryName}" not found.`);
    }
    return response.json();
  })
  .then(data => {
    const country = data[0];
    const { name, flags, capital, timezones, currencies } = country;

    // Display data in the card
    document.getElementById("countryCard").style.display = "block";
    document.getElementById("countryFlag").src = flags.png;
    document.getElementById("countryName").textContent = name.common;
    document.getElementById("countryCapital").textContent = `Capital: ${capital}`;
    document.getElementById("countryTimezone").textContent = `Timezone: ${timezones[0]}`;
    document.getElementById("countryCurrency").textContent = `Currency: ${Object.values(currencies)[0].name}`;
  })
  .catch(error => {
    // Display error message in the modal
    document.getElementById("errorMessage").textContent = error.message;
    const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
  });
};

// Example usage
fetchCountryData('Vietnam'); // Call this with the desired country name