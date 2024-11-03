export default function initializeFlagCard(data) {
  const cardTemplate = `
    <div class="card" style="width: 30%;">
        <img src="${data.flags.png}" class="card-img-top" alt="..." style="width: 100%; height: 300px;">
        <div class="card-body">
            <h5 class="card-title">${data.name.common}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><i class="fa-solid fa-user"></i> Capital: ${data.capital}</li>
            <li class="list-group-item"><i class="fa-solid fa-user"></i> Timezone: ${data.timezones}</li>
            <li class="list-group-item"><i class="fa-solid fa-user"></i> Currency: ${data.currencies[Object.keys(data.currencies)[0]].name}</li>
        </ul>
    </div>
  `;
  return cardTemplate
}