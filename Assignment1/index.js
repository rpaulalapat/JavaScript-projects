// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $searchSelectionInput = document.querySelector("#searchSelection");
var $searchTxtInput = document.querySelector("#searchTxt");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredAddresses to addressData initially
var filteredUfoSightings = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredUfoSightings.length; i++) {
    // Get get the current ufo sighting object and its fields
    var ufoSighting = filteredUfoSightings[i];
    var fields = Object.keys(ufoSighting);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = ufoSighting[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var searchTxt = $searchTxtInput.value.trim().toLowerCase();
    var selectedElement = $searchSelectionInput.options[$searchSelectionInput.selectedIndex].text;

  // Set filter the original dataSet  to an array of all ufo signtings that match the seach selection and txt
  filteredUfoSightings = dataSet.filter(function(ufoSighting) {
    switch (selectedElement) {
    case 'Datetime':
        var ufoElementSelected = ufoSighting.datetime.toLowerCase();
        break;
    case 'State':
        var ufoElementSelected = ufoSighting.state.toLowerCase();
        break;
    case 'City':
        var ufoElementSelected = ufoSighting.city.toLowerCase();
        break;
    case 'Country':
        var ufoElementSelected = ufoSighting.country.toLowerCase();
        break;
    case 'Shape':
        var ufoElementSelected = ufoSighting.shape.toLowerCase();
        break;
    default:
        var ufoElementSelected = '';
        console.log($searchSelectionInput + " not valid");
    };

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return ufoElementSelected === searchTxt;
  });
  renderTable();
}
// Render the table for the first time on page load
renderTable();
