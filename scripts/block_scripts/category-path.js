export async function initCategoryPath()
{
    const response = await fetch('../JSON data/products.json');
    const data = await response.json();

    const params = new URLSearchParams(window.location.search);
    const categoryName = params.get('category');
    
    if(categoryName)
    {
        const topMainBar = document.getElementById('top-main-bar');
        if(topMainBar)
        {
            topMainBar.style.margin = "0px 0px 12px"
        }
        const categoryPathContainer = document.getElementById('products-category-path');
        categoryPathContainer.style.display = "flex";
        categoryPathContainer.innerHTML = `
            <a href="../pages/index.html">Products</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
            <a href="../pages/index.html?category=${categoryName}">${categoryName[0] + categoryName.slice(1).toLowerCase()}</a>
        `
        const productId = parseInt(params.get('id'));
        if(productId)
        {
            const productName = Array.from(data.products).find(product => 
            {
                if(product.id === productId)
                {
                    return product;
                }
            }).name;
            categoryPathContainer.innerHTML += 
            `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                <a href="../pages/product-page.html?id=${productId}&category=${categoryName}">${productName}</a>
            `
        }
    }
}