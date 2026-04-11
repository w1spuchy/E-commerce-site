export function filter(products)
{
    console.log(products);
    const filteredProducts = [];
    const checkboxes = document.querySelectorAll('input[class*="rating-"]:checked');
    let selectedRatings = Array.from(checkboxes).map(cb => parseInt(cb.value));
    selectedRatings = selectedRatings.filter((item, index)=>{
                                return selectedRatings.indexOf(item) === index;
                            });
    const minRating = selectedRatings === null ? 0 : Math.min(selectedRatings);                        
    

    const priceMinDiv = document.querySelector('div[class=price-min-value]'); 
    const priceMaxDiv = document.querySelector('div[class=price-max-value]'); 
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

