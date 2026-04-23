import { initSearch } from "../scripts/block_scripts/search.js";
import { fillCardSection } from "./block_scripts/cards-section-fill.js";
import { initCartProductCounter } from "./block_scripts/cart-product-quantity.js";

initSearch();
initCartProductCounter();
fillCardSection('deals-cards-section', undefined, getDiscountedProduct);

function getDiscountedProduct(allProducts)
{
    const res = [];
    Array.from(allProducts).forEach(product =>{
        if(product.discount != null)
        {
            res.push(product);
        }
    })
    return res;
}