import { getCartProductQuantity } from "./cart-product-quantity.js";

export function fillCartPage()
{
    const mainContainer = document.getElementById('main-container');
    if(!getCartProductQuantity())
    {
        mainContainer.innerHTML = 
        `
            <div id="cart-empty-message">
                <h1>Your Cart is Empty</h1>
                <p>Add some amazing products to get started!</p>
                <a href="../pages/index.html">Continue Shopping</a>
            </div>
        `
    }
    else
    {
        const ordersContainer = document.getElementById("orders-container");
        const cartStorage = JSON.parse(localStorage.getItem('cartStorage'));
        Array.from(cartStorage.products).forEach(product=>{
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            orderItem.innerHTML = 
            `
                <div class="order-item-photo-container">
                    <img src="${product.product.images[0]}">
                </div>
                <div class="order-item-info-container">
                    <div class="top-card-section">
                        <div class="product-info">
                            <div class="product-name">${product.product.name}</div>
                            <div class="product-category">${product.product.category[0] + product.product.category.slice(1).toLowerCase()}</div>
                        </div>
                        <button class="delete-item-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#364153" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                    <div class="bot-card-section">
                        <div class="quantity-buttons-section">
                            <button class="decrement quantity-button">-</button>
                            <span class="quantity-count">${product.quantity}</span>
                            <button class="increment quantity-button">+</button>
                        </div>
                        <div class="order-item-price-container">
                            <div class="total-order-price"></div>
                            <div class="price-for-unit"></div>
                        </div>
                    </div>
                </div>
            `
            const priceContainer = orderItem.querySelector(".order-item-price-container");
            if(product.product.discount != null)
            {
                const priceForUnit = (product.product.price * (1 - product.product.discount)).toFixed(2);
                const totalPrice = priceForUnit * product.quantity;
                priceContainer.querySelector('.price-for-unit').innerHTML = `$${priceForUnit} each`;
                priceContainer.querySelector('.total-order-price').innerHTML = `$${totalPrice}`;
            }
            else
            {
                priceContainer.querySelector('.price-for-unit').innerHTML = `$${product.product.price} each`;
                priceContainer.querySelector('.total-order-price').innerHTML = `$${product.product.price * product.quantity}`;
            }

            ordersContainer.appendChild(orderItem);
        });
    }
}