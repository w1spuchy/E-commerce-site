import { fillCardSection } from "./cards-section-fill.js";

export function initProductSorting()
{
    const sortElements = document.querySelectorAll('li[class*=sort-by-]');
    sortElements.forEach(el=>{
        el.addEventListener("click", (e)=>{
            const sortOrder = Array.from(el.classList).find(cls=>{
                return cls.startsWith('sort-by-');
            });
            const sections = document.querySelectorAll('.product-cards-section'); 
            sections.forEach(section=>{
                fillCardSection(section.id, sortOrder);
            });
        });
    })
}