export function initRangeSlider(){
    const rangeInputs = document.querySelectorAll(".range-input input");
    const priceContainers = document.querySelectorAll(".price-values-container");
    let priceOutputs = [];
    priceContainers.forEach(container=>{
        priceOutputs = priceOutputs.concat(Array.from(container.querySelectorAll("div")));
    });
    const ranges = document.querySelectorAll(".slider .progress");
    ranges.forEach(progress => {
        progress.style.left = "0%";
        progress.style.right = "0%";
    });
    const minRanges = Array.from(rangeInputs).filter(input => input.classList.contains("range-min"));
    const maxRanges = Array.from(rangeInputs).filter(input => input.classList.contains("range-max"));
    const priceMinOutputs = priceOutputs.filter(out => out.classList.contains("price-min-value"));
    const priceMaxOutputs = priceOutputs.filter(out => out.classList.contains("price-max-value"));
    const priceGap = 2000;
    
    priceOutputs.forEach(output=>{
        if(output.className === "price-min-value"){
            output.innerHTML = "$" + parseInt(minRanges[0].min);
        }
        else
        {
            output.innerHTML = "$" + parseInt(minRanges[0].max);
        }
    })
    
    rangeInputs.forEach(input => {
        input.addEventListener("input", e=>{            

            let minVal;
            let maxVal;

            if(e.target.className === "range-min")
            {
                minVal = parseInt(e.target.value);
                maxVal = parseInt(maxRanges[0].value);
            }
            else
            {
                minVal = parseInt(minRanges[0].value);
                maxVal = parseInt(e.target.value);
            }

            if((maxVal-minVal) < priceGap)
            {
                if(e.target.className === "range-min")
                {
                    minRanges.forEach(minrange => minrange.value = maxVal - priceGap);
                }
                else
                {
                    maxRanges.forEach(maxrange => maxrange.value = minVal + priceGap);
                }
            }
            else
            {
                priceMinOutputs.forEach(min => min.innerHTML = "$" + minVal);
                priceMaxOutputs.forEach(max => max.innerHTML = "$" + maxVal);
                ranges.forEach(progress => {
                    progress.style.left = (minVal/minRanges[0].max) * 100 + "%";
                    progress.style.right = 100 - (maxVal/maxRanges[0].max) * 100 + "%";
                });
                if(e.target.className === "range-min")
                {
                    minRanges.forEach(minrange => minrange.value = e.target.value);
                }
                else
                {
                    maxRanges.forEach(maxrange => maxrange.value = e.target.value);
                }
            }
        });
    })
};