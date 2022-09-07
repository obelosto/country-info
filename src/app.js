import axios from 'axios';

async function getLand(land) {
    try {
        const uri = "https://restcountries.com/v2/name/" + land;
        const result = await axios.get(uri);
        console.log(result.data[0]);
        const {name, subregion, population, flag, capital, currencies} = result.data[0];



        let currenciesText = "";
        if (currencies.length > 1){
            for (let i = 0; i < currencies.length; i++) {
                if(i === currencies.length - 1){
                    currenciesText += currencies[i].name + " currencies";
                }
                else{
                    currenciesText += currencies[i].name + ", ";
                }
            }
        }else{
            currenciesText = currencies[0].name + " currency";
        }




        const landLine = document.createElement("p");

        landLine.innerHTML =
            `<article>
                <h2><img src= "${flag}" alt="flag-image"/> ${name}</h2>
                <p>${name} is situated in ${subregion}.It has a population of <span>${population}</span> people.</p>
                <p>The capital is <span>${capital}</span> and you can pay with ${currenciesText}.</p>
            </article>`;

        landLine.style.cssText = "padding: 2em; display: flex; flex-direction: column; align-items: center;";

        document.body.appendChild(landLine);


       // console.log(currenciesText);
        /*function countCurrencies(){

            for (let i = 0; i < currencies.length; i++) {
                currencies[i].name;
            }
        }
        const currenciesText = countCurrencies();
        console.log(currenciesText + " valuti");*/

    } catch(e) {
        console.error(e);
        passAlertBox.textContent = "Een land is niet gevonden.";
    }
}


document.getElementById('search').addEventListener('submit',(e)=>{
    e.preventDefault();
    inputCompleteCheck(e);
})

function inputCompleteCheck(e){

    if(e.target.country.value === '' || e.target.country.value.length >= 3){
        passAlertBox.textContent = "";
        getLand(e.target.country.value);
        e.target.country.value = "";
    }
    else{
        passAlertBox.textContent = "Het search-veld is te kort, gebruik minimaal 3 tekens!";
    }
}

const passAlertBox = document.getElementById('warning');
