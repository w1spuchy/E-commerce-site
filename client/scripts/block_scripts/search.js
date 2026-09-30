import { renderRating } from "./cards-section-fill.js";

class Node{
    constructor()
    {
        this.products = [];
        this.childs = {};
    }
}

class SearchTree
{
    constructor()
    {
        this.root = new Node();
    }

    insert(product)
    {
        const words = Array.from(product.name.toLowerCase().split(' '));
        words.forEach(word => {
            let currNode = this.root;
            for(const char of word)
            {
                if(!currNode.childs[char])
                {
                    currNode.childs[char] = new Node;
                }
                currNode = currNode.childs[char];

                if(!currNode.products.find(prod=> { return prod.id === product.id} ))
                {
                    currNode.products.push(product);
                }
            }
        });
    }

    search(str)
    {
        const quaryString = str.toLowerCase().trim();
        let currNode = this.root;
        for(const char of quaryString)
        {
            if(!currNode.childs[char])
            {
                return []
            }
            currNode = currNode.childs[char];
        }

        return currNode.products;
    }
}

export async function initSearch()
{
    const searchButton = document.getElementById('header-search-button');
    const searchBar = document.getElementById('header-search-bar');
    const searchInput = document.getElementById('header-search-input');
    const searchResultSection = document.getElementById('search-result-section');
    const searchResultList = document.getElementById('search-result-list');
    const data = await getProducts();    
    const searchTree = getSearchTree(data);

    searchButton.addEventListener("click",()=>{
        searchInput.value = "";
        searchResultSection.style.display = 'none'
        searchBar.classList.toggle('show');
        searchInput.focus();
    })
    searchInput.addEventListener("input",()=>{
        searchResultSection.style.display = 'flex';
        const searchResults = searchTree.search(searchInput.value);
        searchResultList.innerHTML = "";
        if(searchResults.length != 0)
        {
            searchResults.forEach(res => {
                const productItem = document.createElement('li');
                productItem.innerHTML = `
                    <a href="../pages/product-page.html?id=${res.id}&category=${res.category}" class="search-res-item">
                        <div class='search-res-item-photo-section'>
                            <img src="${res.images[0]}" style="height: 48px; width: 48px;
                                                            border-radius: 8px;">
                        </div>
                        <div class='search-res-item-info-section'>
                            <div class="top-info-section" style="font-size: 16px; font-weight: 600;">
                                ${res.name}
                            </div>
                            <div class="bot-info-section" style="display: flex; flex-direction:row; justify-content: space-between;">
                            </div>
                        </div>
                    </a>
                `
                if(res.discount === null)
                {
                    productItem.querySelector('.bot-info-section').innerHTML = 
                    `
                        <div style="font-weight: 600; color: #155dfc">
                            $${res.price}
                        </div>
                        <div style="color: #fdc700;">
                            ${renderRating(res.rating)}
                        </div>
                    `
                }
                else    
                {
                     productItem.querySelector('.bot-info-section').innerHTML =
                     `
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 4px">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e7000b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-percent-icon lucide-badge-percent"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/></svg>
                            <div style="font-weight: 600; color: #e7000b">
                                $${(res.price * (1 - res.discount)).toFixed(2)}
                            </div>
                        </div>
                        <div style="color: #fdc700;">
                            ${renderRating(res.rating)}
                        </div>
                     `
                }

                searchResultList.appendChild(productItem);
            })
        }
        else
        {
            const productItem = document.createElement('li');
                productItem.classList.add('no-search-res-mess');
                productItem.innerHTML = `
                    <div>No result</div>
                `
                searchResultList.appendChild(productItem);
        }
    })
}

function getSearchTree(data)
{
    const tree = new SearchTree();
    const products = data.products;
    products.forEach(p =>{
        tree.insert(p);
    })

    return tree;
}

async function getProducts()
{
    const response = await fetch('../JSON data/products.json');
    const data = await response.json();
    return data; 
}