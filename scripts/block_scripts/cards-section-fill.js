export async function fillCardSection(sectionId, filter)
{
    const response = await fetch('../JSON data/products.json');
    const data = await response.json();
    const section = document.getElementById(sectionId);
    let filteredProducts
    if(filter != null){
        filteredProducts = filter(data.products);
    }
    else{
        filteredProducts = data.products;
    }

    filteredProducts.forEach(product => {
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

function renderRating(rating)
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