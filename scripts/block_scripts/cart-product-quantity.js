export function initCartProductCounter()
{
    updateProductCounter();

    window.addEventListener("cartUpdated",e=>
    {
        updateProductCounter();
    })
}

function updateProductCounter()
{
    const cartProductCounter = document.getElementById('cart-product-counter');
    const cartStorage = JSON.parse(localStorage.getItem('cartStorage'));
    const allProductsQuantity = Array.from(cartStorage.products).reduce((res,curr) => {
        return res + curr.quantity;
    }, 0);
    
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