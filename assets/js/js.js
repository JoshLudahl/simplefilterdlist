//  grab the dom elements
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//  init
let states;

//  Get states
const getStates = async () => {
  const res = await fetch('../assets/data/data.json');
  states = await res.json();
};

//  Filter states
const searchStates = searchText => {
  //  Get matches to current text input
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return (
      state.name.match(regex) ||
      state.abbr.match(regex) ||
      state.capital.match(regex)
    );
  });

  //  Clear when input or matches are empty
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }
  outputHtml(matches);
};

//  Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match =>
          `<div class="card">
              <header class="card-header">
                  <p class="card-header-title">
                      ${match.abbr} - ${match.name}
                  </p>
      
              </header>
              <footer class="card-footer">
              <p class="card-footer-item">
                  
                      <a href="https://www.startpage.com/do/dsearch?query=State%20of%20${
                        match.name
                      }" target="_blank"><i class="fas fa-search"></i></a>
                  
              </p>
              <p class="card-footer-item is-size-4">
                  
                      <span class="tag is-light">Lat: ${match.lat}</span>
                  
              </p>
              <p class="card-footer-item">
                  
                      <span class="tag is-light">Long: ${match.long}</span>
                  
              </p>
              <p class="card-footer-item is-size-4">
                  
                      <a href="https://twitter.com/hashtag/${
                        match.name
                      }" target="_blank"><i
                              class="fab fa-twitter"></i></a>
                  
              </p>
          </footer>
          </div>`
      )
      .join('');
    matchList.innerHTML = html;
  }
};

//  Set the event listeners
window.addEventListener('DOMContentLoaded', getStates);
search.addEventListener('input', () => searchStates(search.value));
