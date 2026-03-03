import {initRangeSlider} from "../scripts/block_scripts/range_slider.js";
import {initDropdownSelect} from "../scripts/block_scripts/dropdown_select.js";
import {initSidebar} from "../scripts/block_scripts/side_bar.js";
import {fillCardSection} from "../scripts/block_scripts/cards-section-fill.js";

fillCardSection('all-products-section');
initRangeSlider();
initDropdownSelect();
initSidebar();