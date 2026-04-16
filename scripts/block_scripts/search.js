export function initSearch()
{
    const searchButton = document.getElementById('header-search-button');
    const searchBar = document.getElementById('header-search-bar');
    const searchInput = document.getElementById('header-search-input');
    searchButton.addEventListener("click",()=>{
        searchInput.value = "";
        searchBar.classList.toggle('show');
    })
}