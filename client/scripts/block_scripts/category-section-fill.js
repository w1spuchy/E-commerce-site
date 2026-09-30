export async function fillCategorySection(sectionId)
{
    const response = await fetch("../JSON data/products.json");
    const data = await response.json();
    const filteredCategories = Array.from(data.products).reduce((res, product) => {
        const category = product.category;

        if(!res[category])
        {
            res[category] = 
            {
                count: 0,
                previewProduct: product
            }
        }

        res[category].count += 1;
        return res;
    }, {});

    const section = document.getElementById(sectionId);
    for (const [categoryName, data] of Object.entries(filteredCategories)){
        const categoryCard = document.createElement('a');
        categoryCard.classList.add('category-card');
        categoryCard.href = `../pages/index.html?category=${categoryName}`;
        
        categoryCard.innerHTML = 
        `
            <img src="${data.previewProduct.images[0]}" alt="${data.previewProduct.name}">
            <div class="card-blackout-layer">
                <div class="category-info-section">
                    <h3 class="category-info-text">${categoryName}</h3>
                    <div class="category-info-text">${data.count} product</div>
                </div>
            </div>
        `;

        section.appendChild(categoryCard);
    };
}