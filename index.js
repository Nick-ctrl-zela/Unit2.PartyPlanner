const COHORT = "2311-FSA-ET-WEB-PT-SF";
const API_URL = ` https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

document.addEventListener('DOMContentLoaded', function () {
  renderPage();

  document.getElementById('partyForm').addEventListener('submit', function (event) {
      event.preventDefault();
      addParty();
  });
});

function renderPage() {
  loadParties();
}
renderPage();

function loadParties() {
  const partyList = document.getElementById('partyList');

  // Placeholder for API request to retrieve parties
  fetch(`${API_URL}`)
      .then(response => response.json())
      .then(result => {
          console.log('Received data from API:', result); // Log the received data

          // Check if data is an array within the 'data' property
          if (result.success && Array.isArray(result.data)) {
              // Clear the existing party list
              partyList.innerHTML = '';

              // Render each party
              result.data.forEach(party => {
                  addPartyToList(party);
              });
          } else {
              console.error('Data from API does not contain an array:', result);
          }
      })
      .catch(error => console.error('Error fetching parties:', error));
}

function addPartyToList(party) {
  const partyList = document.getElementById('partyList');

  const li = document.createElement('li');
  li.innerHTML = `
      <span>${party.name} - ${party.date} at ${party.time}, ${party.location}</span>
      <button class="delete-btn" onclick="deleteParty('${party.date}')">Delete</button>
  `;

  partyList.appendChild(li);
}

document.addEventListener('DOMContentLoaded', function () {
  const partyForm = document.getElementById('partyForm');
  partyForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addParty();
  });

  renderPage();
});

function addParty() {
  const partyForm = document.getElementById('partyForm');
  const partyName = partyForm.elements['partyName'].value;
  const partyDate = new Date(document.getElementById('partyDate').value);
  //I couldn't get time to work and kept getting errors back
  // const partyTime = partyForm.elements['partyTime'].value;
  const partyLocation = partyForm.elements['partyLocation'].value;
  const partyDescription = partyForm.elements['partyDescription'].value;

  const party = {
      name: partyName,
      date: partyDate,
      //I couldn't get time to work and kept getting errors back
      // time: partyTime,
      location: partyLocation,
      description: partyDescription,
  };

  // Placeholder for API request to add a new party
  fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(party),
  })
  .then(response => response.json())
  .then(result => {
      console.log('Received result from API:', result); // Log the result

      // Check if the operation was successful
      if (result.success) {
          // Re-render the page with the updated list
          renderPage();
          // Clear the form fields
          partyForm.reset();
      } else {
          console.error('Error adding party:', result.error);
      }
  })
  .catch(error => console.error('Error adding party:', error));
}

function deleteParty(date) {
  // Placeholder for API request to delete a party
  fetch(`${API_URL}/${date}`, {
      method: 'DELETE',
  })
  .then(() => {
      // Re-render the page with the updated list
      renderPage();
  })
  .catch(error => console.error('Error deleting party:', error));
}
