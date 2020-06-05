
function populateUfs() {
    const ufSelect = document.querySelector( "[name=uf]" );

    fetch( "https://servicodados.ibge.gov.br/api/v1/localidades/estados" )
    .then( res => res.json() )
    .then( states => {
        states.forEach(state => {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        });
    });
}

populateUfs();

function getCities( event ) {
    const citySelect = document.querySelector( "[name=city]" );
    const stateInput = document.querySelector( "[name=state]" );

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text;


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = `<option value="Selecione o Cidade">Selecione o Cidade</option>`;
    citySelect.disabled = true;

    fetch( url )
    .then( res => res.json() )
    .then( cities => {
        cities.forEach(city => {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        });

        citySelect.disabled = false;
    })
}

document.querySelector( "select[name=uf]" )
.addEventListener( "change", getCities );

// items de coleta

const itemsToCollect = document.querySelector( ".items-grid" );

const collectedItems = document.querySelector( "input[name=items]" )

let selectedItems = [];

itemsToCollect.addEventListener( "click" , event => {
    const itemLi = event.target;
    itemLi.classList.toggle( "selected" );

    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItems.findIndex( item => item === itemId );

    if ( alreadySelected >= 0 ) {
 
        const filteredItems = selectedItems.filter( item => {
            const itemsIsDifferent = item != itemId;
            return itemsIsDifferent;
        });

        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);  
    }

    collectedItems.value = selectedItems;
});
