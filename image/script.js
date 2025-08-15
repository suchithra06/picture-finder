const UNSPLASH_ACCESS_KEY = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-grid");
const loadMoreBtn = document.getElementById("show-more-button");

let currentPage = 1;
let currentQuery = "";

async function fetchImages(query, page = 1) {
  const endpoint = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results;
}

function createImageCard({ urls, alt_description, links }) {
  const wrapper = document.createElement("div");
  wrapper.className = "search-result";

  const img = document.createElement("img");
  img.src = urls.small;
  img.alt = alt_description || "Unsplash Image";

  const anchor = document.createElement("a");
  anchor.href = links.html;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.textContent = alt_description || "View image";

  wrapper.appendChild(img);
  wrapper.appendChild(anchor);

  return wrapper;
}

async function handleSearch() {
  const query = input.value.trim();
  if (!query) return;

  if (currentPage === 1) {
    resultsContainer.innerHTML = "";
    currentQuery = query;
  }

  const results = await fetchImages(currentQuery, currentPage);

  results.forEach((item) => {
    const imageCard = createImageCard(item);
    resultsContainer.appendChild(imageCard);
  });

  currentPage++;
  loadMoreBtn.style.display = currentPage > 1 ? "block" : "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentPage = 1;
  handleSearch();
});

loadMoreBtn.addEventListener("click", () => {
  handleSearch();
});
