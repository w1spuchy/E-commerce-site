import { initSearch } from "./block_scripts/search.js";
import { initCartProductCounter } from "./block_scripts/cart-product-quantity.js";
import { initCartStorage } from "./block_scripts/cart-functions.js";

initCartStorage();
initSearch();
initCartProductCounter();