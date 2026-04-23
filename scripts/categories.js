import { initSearch} from "./block_scripts/search.js";
import { fillCategorySection } from "./block_scripts/category-section-fill.js";
import { initCartProductCounter } from "./block_scripts/cart-product-quantity.js";

initSearch();
initCartProductCounter();
fillCategorySection('categories-container');

