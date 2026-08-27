

const states = [
  { name: "Alabama", abbr: "AL" },
  { name: "Alaska", abbr: "AK" },
  { name: "Arizona", abbr: "AZ" },
  { name: "Arkansas", abbr: "AR" },
  { name: "California", abbr: "CA" },
  { name: "Colorado", abbr: "CO" },
  { name: "Connecticut", abbr: "CT" },
  { name: "Delaware", abbr: "DE" },
  { name: "Florida", abbr: "FL" },
  { name: "Georgia", abbr: "GA" },
  { name: "Hawaii", abbr: "HI" },
  { name: "Idaho", abbr: "ID" },
  { name: "Illinois", abbr: "IL" },
  { name: "Indiana", abbr: "IN" },
  { name: "Iowa", abbr: "IA" },
  { name: "Kansas", abbr: "KS" },
  { name: "Kentucky", abbr: "KY" },
  { name: "Louisiana", abbr: "LA" },
  { name: "Maine", abbr: "ME" },
  { name: "Maryland", abbr: "MD" },
  { name: "Massachusetts", abbr: "MA" },
  { name: "Michigan", abbr: "MI" },
  { name: "Minnesota", abbr: "MN" },
  { name: "Mississippi", abbr: "MS" },
  { name: "Missouri", abbr: "MO" },
  { name: "Montana", abbr: "MT" },
  { name: "Nebraska", abbr: "NE" },
  { name: "Nevada", abbr: "NV" },
  { name: "New Hampshire", abbr: "NH" },
  { name: "New Jersey", abbr: "NJ" },
  { name: "New Mexico", abbr: "NM" },
  { name: "New York", abbr: "NY" },
  { name: "North Carolina", abbr: "NC" },
  { name: "North Dakota", abbr: "ND" },
  { name: "Ohio", abbr: "OH" },
  { name: "Oklahoma", abbr: "OK" },
  { name: "Oregon", abbr: "OR" },
  { name: "Pennsylvania", abbr: "PA" },
  { name: "Rhode Island", abbr: "RI" },
  { name: "South Carolina", abbr: "SC" },
  { name: "South Dakota", abbr: "SD" },
  { name: "Tennessee", abbr: "TN" },
  { name: "Texas", abbr: "TX" },
  { name: "Utah", abbr: "UT" },
  { name: "Vermont", abbr: "VT" },
  { name: "Virginia", abbr: "VA" },
  { name: "Washington", abbr: "WA" },
  { name: "West Virginia", abbr: "WV" },
  { name: "Wisconsin", abbr: "WI" },
  { name: "Wyoming", abbr: "WY" }
];

const statesGrid = document.getElementById("statesGrid");
const searchInput = document.getElementById("searchInput");

console.log("JS loaded, statesGrid:", statesGrid, "searchInput:", searchInput);

let clicks = 0;
let selectedState = null;

function renderStates(filter = "") {
  statesGrid.innerHTML = "";

  states
    .filter(s => 
      s.name.toLowerCase().includes(filter.toLowerCase()) || 
      s.abbr.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach(state => {
      statesGrid.innerHTML += `
        <div class="col-6 col-md-3 mb-2">
          <button type="button" class="btn btn-outline-primary w-100 state-btn" data-name="${state.name}" data-abbr="${state.abbr}">
            ${state.name} (${state.abbr})
          </button>
        </div>
      `;
    });
}

try {
  renderStates();
} catch (err) {
  console.error('Error rendering states:', err);
  if (statesGrid) {
    statesGrid.innerHTML = '<div class="col-12 text-danger">Could not load the state grid — check console for details.</div>';
  }
}

if (statesGrid) {
  statesGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.state-btn');
    if (!btn) return;

    const name = btn.dataset.name;
    selectedState = name;

    statesGrid.querySelectorAll('.state-btn').forEach(b => {
      b.classList.remove('btn-primary');
      b.classList.add('btn-outline-primary');
    });

    btn.classList.remove('btn-outline-primary');
    btn.classList.add('btn-primary');

    if (searchInput) {
      searchInput.value = name;
    }

    console.log('Selected state:', name);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", e => renderStates(e.target.value));
}
