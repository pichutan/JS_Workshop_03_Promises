export default function openErrorModal(message) {
  const modal = document.getElementById("modal-body-id");
  modal.innerHTML = `
   <h2 class="text-danger">${message}</h1>
  `;
  const errorModal = new bootstrap.Modal(document.getElementById("errorModal"), {});
  errorModal.show();
}