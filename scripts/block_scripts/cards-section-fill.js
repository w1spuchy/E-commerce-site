import { filter } from "./filter.js";

let cachedProducts = null;

export async function fillCardSection(sectionId, sortOrder)
{
    if (!cachedProducts) {
        const response = await fetch('../JSON data/products.json');
        const data = await response.json();
        cachedProducts = data;
    }
    
    if(sortOrder != null)
    {
        switch(sortOrder)
        {
            case 'sort-by-name':
                cachedProducts.products.sort((a,b) => a.name.localeCompare(b.name));
                break;
            case 'sort-by-price':
                cachedProducts.products.sort((a,b) => a.price - b. price);
                break;
            case 'sort-by-price-rev':
                cachedProducts.products.sort((a,b) => b.price - a. price);
                break;
            default:
                return
        }
    }
    let filteredProducts = filter(cachedProducts.products);
    if(filteredProducts == null){
        filteredProducts = cachedProducts.products;
    }

    const section = document.getElementById(sectionId);
    section.innerHTML = '';
    let currentPageIndex = 0;
    const pagesNumber = Math.ceil(filteredProducts.length / 6);
    const pagesContent = [];
    for(let i = 0; i < pagesNumber; i++)
    {
        const pageProducts = [];
        const productsOnPage = (filteredProducts.length - 6*i < 6) ? filteredProducts.length - 6*i : 6;
        for(let j = 0; j < productsOnPage; j++)
        {
            pageProducts[j] = filteredProducts[i*6 + j];
        }
        pagesContent.push(pageProducts);
    }

    if(pagesContent.length != 0)
    {
        insertCards(pagesContent[currentPageIndex]);
    }
    const paginationSection = document.querySelector(".pagination-section");
    paginationSection.innerHTML = "";

    if(pagesNumber > 1)
    {
        paginationSection.style = 'display: flex';

        const paginationButtonsSection = document.createElement('div');
        paginationButtonsSection.classList.add('pagination-buttons-section');
    
        const prevPageButton = document.createElement('button');
        prevPageButton.classList.add('pagination-button');
        prevPageButton.innerHTML = `
            <i class="fa-solid fa-arrow-left""></i>   
        `
        prevPageButton.disabled = true;
        prevPageButton.style.cursor = 'not-allowed';
        prevPageButton.addEventListener("click", e=> {
            if(currentPageIndex != 0)
            {
                paginationButtonsSection.querySelector(`#pagination-button-${currentPageIndex}`).classList.toggle('selected');
                currentPageIndex = currentPageIndex - 1;
                paginationButtonsSection.querySelector(`#pagination-button-${currentPageIndex}`).classList.toggle('selected');
                updateSwitchButtons();
                window.scrollTo({top: 0, behavior: "smooth"});
                insertCards(pagesContent[currentPageIndex]);   
            }
        });
        paginationButtonsSection.appendChild(prevPageButton);
    
        for(let i = 0; i < pagesNumber; i++)
        {
            const paginationButton = document.createElement('button');
            paginationButton.classList.add('pagination-button');
            paginationButton.id = `pagination-button-${i}`
            paginationButton.innerHTML = `
                ${i+1}
            `
    
            if(currentPageIndex === i)
            {
                paginationButton.classList.toggle('selected');
            }
    
            paginationButton.addEventListener('click', e=>{
                const buttonIndex = i;
                if(currentPageIndex != buttonIndex)
                {
                    paginationButtonsSection.querySelector(`#pagination-button-${currentPageIndex}`).classList.toggle('selected');
                    paginationButton.classList.toggle('selected');
                    currentPageIndex = buttonIndex;
    
                    updateSwitchButtons();
                    window.scrollTo({top: 0, behavior: "smooth"});
                    insertCards(pagesContent[currentPageIndex]);
                }
            });
    
            paginationButtonsSection.appendChild(paginationButton);
        }
    
    
        const nextPageButton = document.createElement('button');
        nextPageButton.classList.add('pagination-button');
        nextPageButton.innerHTML = `
            <i class="fa-solid fa-arrow-right"></i>
        `
        nextPageButton.addEventListener("click", e=> {
            if(currentPageIndex != pagesNumber - 1)
            {
                paginationButtonsSection.querySelector(`#pagination-button-${currentPageIndex}`).classList.toggle('selected');
                currentPageIndex = currentPageIndex + 1;
                paginationButtonsSection.querySelector(`#pagination-button-${currentPageIndex}`).classList.toggle('selected');
                updateSwitchButtons();
                window.scrollTo({top: 0, behavior: "smooth"});
                insertCards(pagesContent[currentPageIndex]);   
            }
        });
    
        paginationButtonsSection.appendChild(nextPageButton);
    
        paginationSection.appendChild(paginationButtonsSection);

        function updateSwitchButtons()
        {
            let prevButEnable = currentPageIndex === 0;
            prevPageButton.disabled = prevButEnable ? true : false;
            prevPageButton.style.cursor = prevButEnable ? 'not-allowed' : 'pointer';

            let nextButEnable = currentPageIndex === pagesNumber - 1;
            nextPageButton.disabled = nextButEnable ? true : false;
            nextPageButton.style.cursor = nextButEnable ? 'not-allowed' : 'pointer'; 
        }
    }
    else
    {
        paginationSection.style = 'display: none';
    }


    if(filteredProducts.length == 0)
    {
        const emptyListMessage = document.createElement('div');
        emptyListMessage.classList.add('empty-list-message');

        emptyListMessage.innerHTML = 
        `
            <div class="title-text" style="margin: 0px 0px 8px; font-size: 18px">No products found</div>
            <div class="description-text" style="font-size: 14px;">Try adjusting your filters</div>
        `;

        section.appendChild(emptyListMessage);
    }

    function insertCards(products)
    {
        products.forEach(product => {
            const productCard = document.createElement('a');
            productCard.classList.add('product-card');
            productCard.innerHTML=`
                <div class="product-card-container">
                    <div class="product-photo-container">
                        <img src="${product.images[0]}" alt="${product.name}">
                    </div>
                    <div class="product-description-container">
                        <div class="product-name">${product.name}</div>
                        <div class="product-rating">
                            <div class="star-rating">
                                ${renderRating(product.rating)}
                            </div>
                            <div class="digital-rating">(${product.rating})</div>
                        </div>
                        <div class="product-price-section">
                            <div class="product-price">$${product.price}</div>
                            <div class="product-category">${product.category}</div>
                        </div>
                    </div>
                </div>
            `;
            section.appendChild(productCard);
        });
    }
}

export function renderRating(rating)
{
    const ratingContainer = document.createElement('div');
    
    for(let i = 0; i < Math.floor(rating); i++){
        const fullStar = document.createElement('i');
        fullStar.classList = 'fas fa-star';
        ratingContainer.appendChild(fullStar);
    }
    if(rating % 1 != 0){
        const halfStar = document.createElement('i');
        halfStar.classList = 'fas fa-star-half-alt';
        ratingContainer.appendChild(halfStar);
    }
    for(let i = 0; i < (5-Math.ceil(rating)); i++){
        const emptyStar = document.createElement('i');
        emptyStar.classList = 'far fa-star';
        ratingContainer.appendChild(emptyStar);
    }

    return ratingContainer.innerHTML;
}