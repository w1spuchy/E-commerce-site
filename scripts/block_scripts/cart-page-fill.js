import { getCartProductQuantity } from "./cart-product-quantity.js";
import { updateProductQuantityInCart } from "./cart-functions.js";
import { deleteProductFromCart } from "./cart-functions.js";
let discount = null;


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
        fillOrderSection();
    }
}

function fillOrderSection()
{
    const ordersContainer = document.getElementById("orders-container");
    ordersContainer.innerHTML = "";
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
                        <span class="quantity-count"></span>
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
        const unitPriceElement = priceContainer.querySelector('.price-for-unit');
        const totalOrderPriceElement = priceContainer.querySelector('.total-order-price');
        const priceCoeff = product.product.discount === null ? 1 : 1 - product.product.discount; 
        const unitPrice = (product.product.price * priceCoeff).toFixed(2);
        const totalOrderPrice = (unitPrice * product.quantity).toFixed(2);
        unitPriceElement.innerHTML = `$${unitPrice} each`;
        totalOrderPriceElement.innerHTML = `$${totalOrderPrice}`;
        window.addEventListener(`cartProductUpdated-${product.product.id}`, e=>{
            const newCartStorage = JSON.parse(localStorage.getItem('cartStorage'));
            const newProductInfo = Array.from(newCartStorage.products).find(prod => prod.product.id === product.product.id);
            totalOrderPriceElement.innerHTML = `$${(unitPrice * newProductInfo.quantity).toFixed(2)}`;       
        })


        let currentQuantityCount = product.quantity;
        const quantityButtonsSection = orderItem.querySelector(".quantity-buttons-section");
        const quantityCounter = quantityButtonsSection.querySelector(".quantity-count");
        quantityCounter.innerHTML = currentQuantityCount;
        const quantityButtons = quantityButtonsSection.querySelectorAll('.quantity-button');
        quantityButtons.forEach(button=>{
            if(button.classList.contains("increment"))
            {
                button.addEventListener('click', e=>
                {  
                    currentQuantityCount += 1;
                    quantityCounter.innerHTML = currentQuantityCount;
                    updateProductQuantityInCart(product, currentQuantityCount);
                });
            }
            else if(button.classList.contains("decrement"))
            {
                button.addEventListener('click', e=>
                {   
                    if(currentQuantityCount > 1)
                    {
                        currentQuantityCount -= 1;
                        quantityCounter.innerHTML = currentQuantityCount;
                        updateProductQuantityInCart(product, currentQuantityCount);
                    }
                });
            }
        })
        

        const deleteItemButton = orderItem.querySelector(".delete-item-button");
        deleteItemButton.addEventListener("click", e=>{
            deleteProductFromCart(product.product.id);
            fillCartPage();
        });


        ordersContainer.appendChild(orderItem);
    });

    updateOrderPrice();
    window.addEventListener('cartUpdated',e=>{
        updateOrderPrice();
    })

    const promoSection = document.getElementById('promo-code-section');
    const discountContainer = document.getElementById('discount-container');
    const discountTitle = discountContainer.querySelector('.price-title');
    const promoInput = document.getElementById('promo-input');
    const applyPromoButton = document.getElementById('apply-promo-button');

    applyPromoButton.addEventListener('click', e =>{
        if(promoInput.value === 'SAVE10')
        {
            discountContainer.style.display = 'flex';
            discountTitle.innerHTML = `Discount(${promoInput.value})`;
            discount = 0.1;
            promoInput.setAttribute('disabled', true);
            applyPromoButton.setAttribute('disabled', true);
            promoSection.querySelector('p').style = "color: #00a63e"
            promoSection.querySelector('p').innerHTML = "Promo code applied successfully!";
            updateOrderPrice();
        }
    })
}

function updateOrderPrice()
{
    const cartStorage = JSON.parse(localStorage.getItem('cartStorage'));
    const subtotalPriceElement = document.getElementById('subtotal-price');
    const taxValueElement = document.getElementById('tax-value');
    const discountValueElement = document.getElementById('discount-value');
    const totalPriceElement = document.getElementById('total-price');

    const subtotalPrice = Array.from(cartStorage.products).reduce((res,curr)=>{
        const priceCoeff = curr.product.discount === null ? 1 : 1 - curr.product.discount; 
        const unitPrice = (curr.product.price * priceCoeff).toFixed(2);
        const totalOrderPrice = unitPrice * curr.quantity;
        return res += totalOrderPrice;
    }, 0).toFixed(2);
    subtotalPriceElement.innerHTML = "$" + subtotalPrice;

    const taxValue = (subtotalPrice * 0.08).toFixed(2);
    taxValueElement.innerHTML = "$" + taxValue; 

    let totalPrice = (parseFloat(subtotalPrice) + parseFloat(taxValue));
    if(discount != undefined)
    {
        discountValueElement.innerHTML = `-${(subtotalPrice * discount).toFixed(2)}`;
        totalPrice -= (subtotalPrice * discount);
    }

    console.log(typeof(totalPrice));
    totalPriceElement.innerHTML = "$" + totalPrice.toFixed(2);
}