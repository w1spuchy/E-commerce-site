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
    })
    searchInput.addEventListener("input",()=>{
        searchResultSection.style.display = 'flex';
        const searchResults = searchTree.search(searchInput.value);
        searchResultList.innerHTML = "";
        if(searchResults.length != 0)
        {
            searchResults.forEach(res => {
                const productItem = document.createElement('li');
                productItem.classList.add('search-res-item');
                productItem.innerHTML = `
                    <div class='search-res-item-photo-section'>
                        <img src="${res.images[0]}" style="height: 48px; width: 48px;
                                                        border-radius: 8px;">
                    </div>
                    <div class='search-res-item-info-section'>
                        <div style="font-size: 16px; font-weight: 600;">
                            ${res.name}
                        </div>
                        <div style="display: flex; flex-direction:row; justify-content: space-between;">
                            <div style="font-weight: 600; color: #155dfc">
                                $${res.price}
                            </div>
                            <div style="color: #fdc700;">
                                ${renderRating(res.rating)}
                            </div>
                        </div>
                    </div>
                `
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