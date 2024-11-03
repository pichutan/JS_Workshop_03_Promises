export default function initializeFlagCard(data,index) {
  const cardTemplate = `
    <div class="carousel-item ${index == 0 ? "active" : ""}">
      <img src="${data.flags.png}" class="d-block w-100" alt="..." style="width: 600px; height: 300px;">
      <div class="information-container">
        <div class="information-title">
          ${data.name.common}
        </div>
        <div class="information-list">
          <ul class="list-group">
            <li class="list-group"><i class="fa-solid fa-user"></i> Capital: ${data.capital}</li>
            <li class="list-group"><i class="fa-solid fa-user"></i> Timezone: ${data.timezones}</li>
            <li class="list-group"><i class="fa-solid fa-user"></i> Currency: ${data.currencies[Object.keys(data.currencies)[0]].name}</li>
          </ul>
        </div>
      </div>
    </div>
  `;
  return cardTemplate
}