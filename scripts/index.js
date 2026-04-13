import {initRangeSlider} from "../scripts/block_scripts/range_slider.js";
import {initDropdownSelect} from "../scripts/block_scripts/dropdown_select.js";
import {initSidebar} from "../scripts/block_scripts/side_bar.js";
import {fillCardSection} from "../scripts/block_scripts/cards-section-fill.js";
import { initCheckbox } from "./block_scripts/checkbox.js";
import { initClearFiltersButtons } from "./block_scripts/filter.js";
import { initProductSorting } from "./block_scripts/product_sort.js";

fillCardSection('all-products-section');
initRangeSlider();
initDropdownSelect();
initSidebar();
initCheckbox();
initClearFiltersButtons();
initProductSorting();