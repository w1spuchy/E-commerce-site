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

export function deleteProductFromCart(productId)
{
    const cartStorage = JSON.parse(localStorage.getItem('cartStorage'));
    const productIndex = cartStorage.products.findIndex(prod=> 
        {
            return prod.product.id === productId;
        });

    cartStorage.products.splice(productIndex, 1);
    localStorage.setItem('cartStorage', JSON.stringify(cartStorage));
    
    const cartUpdateEvent = new CustomEvent('cartUpdated');
    window.dispatchEvent(cartUpdateEvent);
    const cartProductDeleteEvent = new CustomEvent('cartProductDeleteEvent');
    window.dispatchEvent(cartProductDeleteEvent);
}

export function updateProductQuantityInCart(product, productQuantity)
{
    const cartStorage = JSON.parse(localStorage.getItem('cartStorage'));
    const productIndex = cartStorage.products.findIndex(prod=> 
    {
        return prod.product.id === product.product.id;
    });

    cartStorage.products[productIndex].quantity = productQuantity;
    localStorage.setItem('cartStorage', JSON.stringify(cartStorage));
    const cartUpdateEvent = new CustomEvent('cartUpdated');
    window.dispatchEvent(cartUpdateEvent);
    const cartProductUpdateEvent = new CustomEvent(`cartProductUpdated-${product.product.id}`);
    window.dispatchEvent(cartProductUpdateEvent);
}
