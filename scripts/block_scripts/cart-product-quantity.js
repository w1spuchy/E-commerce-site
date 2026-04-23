export function initCartProductCounter()
{
    updateProductCounter();

    window.addEventListener("cartUpdated",e=>
    {
        updateProductCounter();
    })
}


export function getCartProductQuantity(productId)
{
    const cartStorage = JSON.parse(localStorage.getItem('cartStorage'));
    if(productId === undefined)
    {
        const allProductsQuantity = Array.from(cartStorage.products).reduce((res,curr) => {
            return res + curr.quantity;
        }, 0);
        return allProductsQuantity;
    }
    else
    {
        const productToFind = Array.from(cartStorage.products).find(prod => prod.product.id === productId);
        if(productToFind)
        {
            return productToFind.quantity;
        }
    }
}


function updateProductCounter()
{
    const cartProductCounter = document.getElementById('cart-product-counter');
    const allProductsQuantity = getCartProductQuantity();
    
    if(allProductsQuantity > 0)
    {
        cartProductCounter.style.display = "flex";
        cartProductCounter.innerHTML = allProductsQuantity;
    }
    else
    {
        cartProductCounter.style.display = "none";
    }
}