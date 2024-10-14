//TODO: Import all of the important data and modules
//TODO: Render all of the cards from given data
//TODO: Add a click function to each button, that will start the measurement
// and update the cards data with the new measurement

const getNewSortableArray = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i).sort((a, b) => 0.5 - Math.random());

$(document).ready(function(e) {
  const sortableArray = getNewSortableArray(1, 5000)
  console.log(sortableArray.length)
})