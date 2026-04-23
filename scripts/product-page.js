import { initSearch } from "./block_scripts/search.js"
import { initCategoryPath } from "./block_scripts/category-path.js";
import { fillProductInformation } from "./block_scripts/product-page-fill.js";
import { initCartProductCounter } from "./block_scripts/cart-product-quantity.js";

initSearch();
initCartProductCounter();
initCategoryPath();
fillProductInformation();
