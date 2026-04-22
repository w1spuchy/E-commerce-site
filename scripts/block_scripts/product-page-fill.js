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
            <div id="product-rating-container">${renderRating(product.rating)}</div>
            <div id="products-reviews-count">Based on ${product.reviews_count} reviews</div>
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
                    <span id="quantity-count">1</span>
                    <button id="increment" class="quantity-button">+</button>
                </div>
            </div>
            <button id="add-to-cart-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span>Add to cart</span>
            </button>
            <div id="technical-specifications-section">
                <input id="show-trigger" type="checkbox" style="display: none">
                <label for="show-trigger">Technical Specifications</label>
                <ul id="technical-specifications-list"></ul>
            </div>
        `
    }
}

