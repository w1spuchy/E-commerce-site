import { fillCardSection } from "./cards-section-fill.js";
export function initCheckbox()
{
    const cardsSections = document.querySelectorAll('product-cards-section');
    const checkboxItems = document.querySelectorAll('.checkbox-item');
    let checkboxInputs = [];
    checkboxItems.forEach(item => {
        checkboxInputs.push(item.querySelector('input'));
    });  
    checkboxInputs.forEach(input=>{
        input.addEventListener('change', (event) => {
            const isChecked = event.target.checked
            const ratingClass = Array.from(event.target.classList)
            .find( cls => cls.startsWith('rating-'));
            const checboxToChange = document.querySelectorAll(`.${ratingClass}`);
            checboxToChange.forEach(checkbox=>{
                checkbox.checked = isChecked;
            });
            cardsSections.forEach(section=>{
                fillCardSection(section.id);
            });
        });
    });   
}