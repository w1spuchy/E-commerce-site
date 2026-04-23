import { fillCardSection } from "./cards-section-fill.js";
import { renderRating } from "./cards-section-fill.js";

export async function fillProductInformation()
{
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const response = await fetch('../JSON data/products.json');
    const data = await response.json();
    const product = Array.from(data.products).find(prod=>
    {
        if(prod.id === productId){ return prod }
    }); 


    let currImageIndex = 0;
    const gallery = document.getElementById("gallery-container");
    const mainPhoto = document.getElementById("main-photo-container").querySelector('img');
    Array.from(product.images).forEach((img, index)=>{
        const photoSrc = img;
        const imageIndex = index;
        const galleryImage = document.createElement('div');
        galleryImage.classList.add('galleryImage');
        galleryImage.id = `galleryImage-${imageIndex}`
        if(currImageIndex === imageIndex)
        {
            galleryImage.classList.toggle('selected');
            mainPhoto.src = photoSrc;
        }
        galleryImage.innerHTML = 
        `
            <img src="${photoSrc}">
        `

        galleryImage.addEventListener('click', e=>
        {
            if(currImageIndex != imageIndex)
            {
                changeMainImage(()=>{
                    return imageIndex;
                })
            }
        });

        gallery.appendChild(galleryImage);
    });

    const prevImageButton = document.getElementById('prev-photo-button');
    prevImageButton.addEventListener("click", e=>{
        e.preventDefault();
        changeMainImage((index)=>{
            return index - 1 < 0 ? 2 : index - 1
        })
    });
    const nextImageButton = document.getElementById('next-photo-button');
    nextImageButton.addEventListener("click", e=>{
        e.preventDefault();
        changeMainImage((index)=>{
            return (index + 1) % 3
        })
    })

    fillDescriptionSection();

    const reletiveProductsSection = document.getElementById('relative-products-section');
    if(getProductsFromCategory(data.products).length != 0)
    {
        fillCardSection("relative-products-container", undefined, getProductsFromCategory);
        reletiveProductsSection.style.display = "flex";
    }

    function changeMainImage(changeMethod)
    {
        gallery.querySelector(`#galleryImage-${currImageIndex}`).classList.toggle('selected');
        currImageIndex = changeMethod(currImageIndex);
        gallery.querySelector(`#galleryImage-${currImageIndex}`).classList.toggle('selected');
        mainPhoto.classList.toggle('fade-out');
        setTimeout(() => {
            mainPhoto.src = product.images[currImageIndex];
            mainPhoto.classList.toggle('fade-out');
        }, 300);
    }

    function getProductsFromCategory(allProducts)
    {
        const res = [];
        Array.from(allProducts).forEach(prod=>{
            if(prod.category === params.get('category') 
               && prod.id != params.get('id'))
            {
                res.push(prod);
            }
        })
        return res;
    }

    function fillDescriptionSection()
    {
        const productDescriptionContainer = document.getElementById("product-description-container");
        productDescriptionContainer.innerHTML = 
        `
            <h1 id="product-name-label">${product.name}</h1>
            <div id="product-rating-container">
                <div id="product-star-rating">
                    ${renderRating(product.rating)}
                </div>
                <span id = product-digital-rating>(${product.rating})</span>
            </div>
            <div id="product-reviews-count">Based on ${product.reviews_count} reviews</div>
            <div id="product-price-container">
            </div>
            <div id="key-highlights-section">
                <h3>Key Highlights</h3>
                <ul id="highlights-list">
                </ul>
            </div>
            <div id="product-description-section">
                <h2>Description</h2>
                <p id="description-text">${product.description}</p>
            </div>
            <div id="quantity-section">
                <span>Quantity</span>
                <div id="quantity-buttons-section">
                    <button id="decrement" class="quantity-button">-</button>
                    <span id="quantity-count"></span>
                    <button id="increment" class="quantity-button">+</button>
                </div>
            </div>
            <button id="add-to-cart-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span>Add to cart</span>
            </button>
            <div id="technical-specifications-section">
                <input id="show-trigger" type="checkbox" style="display: none">
                <label id="specifications-button" for="show-trigger">
                    <span>Technical Specifications</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-icon lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
                </label>
                <ul id="technical-specifications-list"></ul>
            </div>
        `


        const productSpecifications = product.specifications;
        
        const productPriceContainer = document.getElementById('product-price-container');
        if(product.discount === null)
        {
            productPriceContainer.innerHTML = 
            `
                <div id="product-price">$${product.price}</div>
                <span>Free shipping</span>
            `
        }
        else
        {
            productPriceContainer.innerHTML = 
            `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e7000b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-percent-icon lucide-badge-percent"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/></svg>
                <div id="discount-price">$${(product.price * (1 - product.discount)).toFixed(2)}</div>
                <div id="old-price">$${product.price}</div>
            `
        }


        const highlightsList = document.getElementById('highlights-list');
        let highlightsCount = 0;
        for(let key in productSpecifications)
        {
            if(productSpecifications.hasOwnProperty(key))
            {   
                const highlightItem = document.createElement('li');
                highlightItem.classList.add('highlight-item');
                highlightItem.innerHTML = 
                `
                    ${key}: ${productSpecifications[key]}
                `
                highlightsList.appendChild(highlightItem);

                highlightsCount++;
                if(highlightsCount === 3)
                {
                    break;
                }
            }   
        }


        let currentQuantityCount = 1;
        const quantityButtonsSection = document.getElementById("quantity-buttons-section");
        const quantityCounter = quantityButtonsSection.querySelector("#quantity-count");
        quantityCounter.innerHTML = currentQuantityCount;
        const quantityButtons = quantityButtonsSection.querySelectorAll('.quantity-button');
        quantityButtons.forEach(button=>{
            if(button.id === "increment")
            {
                button.addEventListener('click', e=>
                {  
                    currentQuantityCount += 1;
                    quantityCounter.innerHTML = currentQuantityCount;
                });
            }
            else if(button.id === "decrement")
            {
                button.addEventListener('click', e=>
                {   
                    if(currentQuantityCount > 1)
                    {
                        currentQuantityCount -= 1;
                        quantityCounter.innerHTML = currentQuantityCount;
                    }
                });
            }
        })


        const addToCartButton = document.getElementById("add-to-cart-button");
        addToCartButton.addEventListener("click", e=>{
            const cartStorage = JSON.parse(localStorage.getItem('cartStorage'));
            const productIndex = cartStorage.products.findIndex(prod=> 
                {
                    return prod.product.id === product.id;
                });

            if(productIndex === -1)
            {
                const productInCartInfo = 
                {
                    product: product,
                    quantity: currentQuantityCount
                }
                cartStorage.products.push(productInCartInfo);
            }
            else
            {
                cartStorage.products[productIndex].quantity += currentQuantityCount;
            }

            localStorage.setItem('cartStorage', JSON.stringify(cartStorage));
            const event = new CustomEvent('cartUpdated');
            window.dispatchEvent(event);
        })


        const specificationList = document.getElementById('technical-specifications-list');
        for(let key in productSpecifications)
        {
            if(productSpecifications.hasOwnProperty(key))
            {   
                const specificationItem = document.createElement('li');
                specificationItem.classList.add('specification-item');
                specificationItem.innerHTML = 
                `
                    <span>${key}</span>
                    <span>${productSpecifications[key]}</span>
                `
                specificationList.appendChild(specificationItem);
            }   
        }
    }
}

