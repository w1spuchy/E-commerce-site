export function initSidebar(){
    const overlay = document.querySelector(".overlay");
    const sideBar = document.querySelector(".side-bar");
    const filterButton = document.querySelector("#filter-button");

    filterButton.addEventListener("click", ()=>{
        console.log("click");
        overlay.classList.toggle("active");        
        sideBar.classList.toggle("active");        
    })

    overlay.addEventListener("click", ()=>{
        overlay.classList.toggle("active");        
        sideBar.classList.toggle("active");        
    })
};