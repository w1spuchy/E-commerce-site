export function initDropdownSelect(){
    const select = document.querySelector(".select");
    const selectBttn = select.querySelector(".select-button");
    const bttnText = select.querySelector(".select-button-text");
    const options = select.querySelectorAll(".option");

    selectBttn.addEventListener("click", ()=> select.classList.toggle("active"));

    options.forEach(option=>{
        option.addEventListener("click",()=>{
            let selectedOption = option.querySelector(".option-text").innerText;
            bttnText.innerText = selectedOption;
            select.classList.remove("active");
        })
    })
};