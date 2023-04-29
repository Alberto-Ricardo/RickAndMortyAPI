function buscarInfo () {
    let p = document.getElementById('personaje');
    personaje = p.value;
    n = personaje.charAt(0).toUpperCase() + personaje.slice(1);

// Thanks to:
// https://flexiple.com/javascript/javascript-capitalize-first-letter/
    
    async function GetCharacter () {
        const response = await fetch ("https://rickandmortyapi.com/api/character/?name=" + n);
        const data = await response.json();

        const characterInfo = data.results[0];
        let name = characterInfo.name;
        let species = characterInfo.species;
        let status = characterInfo.status;
        let gender = characterInfo.gender;
        let debut = characterInfo.episode;
        let apariciones = '';
            for(let i=0; i<debut.length; i++) {
                let episodio = debut[i].split('/').pop();
                apariciones += `<li>Episode: ${episodio}</li>`;
            }
        let imagen = characterInfo.image;
        

        //console.log(name)
        //console.log(species)
        //console.log(imagen)

        //const resultado = document.getElementById('resultado');
        //resultado.innerHTML = '<p>' + name + '</p><p style="text-align: right">' + imagen + '</p><div>'+ imagen + '</div>';

        let info = `
            <div class="informacion">
                
                <h3 class="name">Nombre: ${name}</h3>
                <h3 class="especies">Especie: ${species}</h3>
                <h3 class="status">Estado: ${status}</h3>
                <h3 class="type">Género: ${gender}</h3>

                <img class="imagen" src=${imagen}>

                <p>Apariciones:</p>
                <ul style="list-style-type: none;">
                    ${apariciones}                    
                </ul>
             


                    
            </div>
            `;
        //Hay que gestionar las apariciones al usuario de nada le sirven las urls mutilemos las cadenas limitandolas a episode/5 a: episode: 5
            
        
        document.getElementById('resultado').innerHTML= info;

    }

GetCharacter();

//Agregar espacio al div tal vez un div anidado
}

let url = "https://rickandmortyapi.com/api/character/?page=";
let page = 1;

async function GetCharacters () {
    let response = await fetch (url+page)
    let data = await response.json()
    console.log(data)

    let characters = "";
    let characterInfo = data.results;

    characterInfo.forEach(character => {
        //Tratamos el nombre de la función como el vector character.name character.image etcétera
        characters+= `

        <div class="paginacion">
        <p class="name">Nombre: ${character.name}</p>
        <p class="name">Estatus: ${character.status}</p>
        <p class="name">Especie: ${character.species}</p>
        <br>
        <img class="picture" src="${character.image}">
        </div>`;

        
    });

    document.getElementById('paginacion').innerHTML =characters;

}

function nextPage(){
    if(page <42){
        page++;
        GetCharacters();
    }
}

function prevPage(){
    if(page >1){
        page--;
        GetCharacters();
    }//else if(page ===1){
     //   let botonOff = document.getElementById('botonOff');
     //   botonOff.disabled = true;
    // Esto no fuciona}
}


GetCharacters();
