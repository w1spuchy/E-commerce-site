import { initCartStorage } from "./block_scripts/cart-functions.js";
import { initSearch } from "./block_scripts/search.js";
import { initCartProductCounter } from "./block_scripts/cart-product-quantity.js";
import { fillCartPage } from "./block_scripts/cart-page-fill.js";

initCartStorage();
initSearch();
initCartProductCounter();
fillCartPage();