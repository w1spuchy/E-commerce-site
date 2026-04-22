import { fillCardSection } from "./cards-section-fill.js";

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

    const reletiveProductsContainer = document.getElementById('relative-products-container');
    if(getProductsFromCategory(data.products).length != 0)
    {
        fillCardSection("relative-products-container", undefined, getProductsFromCategory);
        reletiveProductsContainer.style.display = "flex";
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
}
