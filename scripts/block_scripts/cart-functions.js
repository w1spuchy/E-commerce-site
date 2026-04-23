export function initCartStorage()
{
    if(!localStorage.getItem('cartStorage'))
    {
        const cartStorage = {
            products: []
        }
        localStorage.setItem('cartStorage', JSON.stringify(cartStorage));
    }
}

export function addProductToCart(product, productQuantity)
{
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
            quantity: productQuantity
        }
        cartStorage.products.push(productInCartInfo);
    }
    else
    {
        cartStorage.products[productIndex].quantity += productQuantity;
    }

    localStorage.setItem('cartStorage', JSON.stringify(cartStorage));
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
}