import { fillCardSection } from "./cards-section-fill.js";

export function filter(products)
{
    const filteredProducts = [];
    const checkboxes = document.querySelectorAll('input[class*="rating-"]:checked');
    let selectedRatings = Array.from(checkboxes).map(cb => parseInt(cb.value));
    selectedRatings = selectedRatings.filter((item, index)=>{
                                return selectedRatings.indexOf(item) === index;
                            });
    
    let minRating;
    if(selectedRatings.length == 0)
    {
        minRating = 0;
    }
    else
    {
        minRating = selectedRatings.reduce((min, curr)=>{
            return curr < min ? curr : min;
        });
    }          

    const priceMinDiv = document.querySelector('.price-min-value'); 
    const priceMaxDiv = document.querySelector('.price-max-value'); 
    const minPrice = parseInt(priceMinDiv.innerHTML.replace('$', ''));
    const maxPrice = parseInt(priceMaxDiv.innerHTML.replace('$', ''));

    Array.from(products).forEach(product=> {
        if(!(product.rating < minRating)) {
            if(((product.price >= minPrice) && (product.price <= maxPrice))){
                filteredProducts.push(product);
            }
        }
    });
    return filteredProducts;
}

export function initClearFiltersButtons()
{
    const clearFiltersButtons = document.querySelectorAll('.clear-filters-button');
    const cardSections = document.querySelectorAll('.product-cards-section')

    clearFiltersButtons.forEach(button=>{
        button.addEventListener("click", (e)=>{
            const checkedCheckboxes = document.querySelectorAll('input[class*="rating-"]:checked')
            const ranges = document.querySelectorAll('input[class*=range-]');
            const progresses = document.querySelectorAll('.progress');
            const maxPriceContainers = document.querySelectorAll('.price-max-value');
            const minPriceContainers = document.querySelectorAll('.price-min-value');

            checkedCheckboxes.forEach(check=>{
                check.checked = false
            });

            ranges.forEach(range=>{
                if(range.classList.contains('range-min'))
                {
                    range.value = range.min;
                }
                else
                {
                    range.value = range.max;
                }
            });
            progresses.forEach(progress=>{
                progress.style.left = '0%';
                progress.style.right = '0%';
            });
            
            minPriceContainers.forEach(min=>{
                min.innerHTML = `$${ranges[0].min}`;
            });
            maxPriceContainers.forEach(max=>{
                max.innerHTML = `$${ranges[0].max}`;
            });
            
            cardSections.forEach(section=>{
                fillCardSection(section.id);
            });
        });
    });
}