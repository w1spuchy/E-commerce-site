import { filter } from "./filter.js";
import { addProductToCart } from "./cart-functions.js";

let cachedProducts = null;

export async function fillCardSection(sectionId, sortOrder, filterFunc)
{
    if (!cachedProducts) {
        const response = await fetch('../JSON data/products.json');
        const data = await response.json();
        cachedProducts = data;
    }
    
    if(sortOrder != undefined)
    {
        switch(sortOrder)
        {
            case 'sort-by-name':
                cachedProducts.products.sort((a,b) => a.name.localeCompare(b.name));
                break;
            case 'sort-by-price':
                cachedProducts.products.sort((a,b) => (a.price * (1 - (a.discount ? a.discount : 0))) - (b.price * (1 - (b.discount ? b.discount : 0))));
                break;
            case 'sort-by-price-rev':
                cachedProducts.products.sort((a,b) => (b.price * (1 - (b.discount ? b.discount : 0))) - (a.price * (1 - (a.discount ? a.discount : 0))));
                break;
            default:
                return
        }
    }

    let filteredProducts;
    if(filterFunc === undefined)
    {
        filteredProducts = filter(cachedProducts.products);
    }
    else
    {
        filteredProducts = filterFunc(cachedProducts.products)
    }

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
        section.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML=`
                <div class="product-card-container">
                    <a href="../pages/product-page.html?id=${product.id}&category=${product.category}" class="product-photo-container">
                        <img src="${product.images[0]}" alt="${product.name}">
                        <button class="cart-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        </button>
                    </a>
                    <div class="product-description-container">
                        <a href="../pages/product-page.html?id=${product.id}&category=${product.category}" class="product-name">${product.name}</a>
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
                <div class="price-discount-label">
                </div>
            `;

            productCard.querySelector(".cart-button").addEventListener("click", e=>{
                e.preventDefault();
                addProductToCart(product, 1);
            })

            const cardPriceSection = productCard.querySelector(".product-price-section");
            if(product.discount === null)
            {
                cardPriceSection.innerHTML = 
                `
                    <div class="product-price">$${product.price}</div>
                    <div class="product-category">${product.category}</div>
                `
            }
            else
            {
                cardPriceSection.innerHTML = 
                `
                    <div class="price-discount-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e7000b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-percent-icon lucide-badge-percent"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/></svg>
                        <div class="discount-price">$${(product.price * (1-product.discount)).toFixed(2)}</div>
                        <div class="old-price">$${product.price}</div>
                    </div>
                    <div class="product-category">${product.category}</div>
                `
                const discountLabel = productCard.querySelector('.price-discount-label');
                discountLabel.style.display = "flex";
                discountLabel.innerHTML = 
                `
                    Save ${product.discount * 100}%
                `
            }


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