const typeColor = {
    bug: "#6a994e",
    dragon: "#606c38",
    electric: "#457b9d",
    fairy: "#ffafcc",
    fighting: "#32317c",
    fire: "#dc2f02",
    flying: "#4cc9f0",
    grass: "#6a994e",
    ice: "#219ebc",
    normal: "#efc3e6",
    poison: "#772e25",
    psychic: "#34a0a4",
    rock: "#bc6c25",
    water: "#4361ee",
};
const url = " https://pokeapi.co/api/v2/pokemon/";
const container = document.querySelector(".container");
const btn = document.querySelector("button");

let getPokeData = () => {
    // Generating random numbers between 1 and 150
    let id = Math.floor(Math.random() * 150) + 1;
    console.log(id);
    // combine the pokeapi url with pokemon id
    const finalUrl = url + id;
    // fetch generated url 
    fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
        generateCard(data);
    });
    sound1();
};

// generate card

let generateCard = (data) => {
    // get neccessary data and assign it to variables
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgsrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name;
    const statAttack = data.stats[1].base_stat;
    const statdefense = data.stats[2].base_stat;
    const statspeed = data.stats[5].base_stat;

    // Setting theme color
    const themeColor = typeColor[data.types[0].type.name];
    console.log(themeColor);

    container.innerHTML = `
    <div class="semi-circle">
    <p class="hp">
        <span>HP</span>
         ${hp}
    </p>
    </div>
    <img src=${imgsrc} alt="Pokemon-image" />
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types">
    </div>
    <div class="stats">
        <div class="att">
            <h3>${statAttack}</h3>
            <p>Attack</p>
        </div>
        <div class="def">
            <h3>${statdefense}</h3>
            <p>Defense</p>
        </div>
        <div class="spe">
            <h3>${statspeed}</h3>
            <p>Speed</p>
        </div>
    </div>
    ` ;

    appendTypes(data.types);
    styleCard(themeColor);
};

    let appendTypes = (types) => {
        types.forEach((item) => {
            let span = document.createElement("SPAN");
            span.textContent = item.type.name;
            document.querySelector(".types").appendChild(span);
        });
    };

    let styleCard = (color) => {
        // container.style.background = (`radial-gradient(circle
        //     at 50% 0%), ${color} 36%, #fff 36%`);
        container.querySelectorAll(".semi-circle").forEach(
            (typeColor) => {
                typeColor.style.backgroundColor = color;
            }
        );
        container.querySelectorAll(".types span").forEach(
            (typeColor) => {
                typeColor.style.backgroundColor = color;
            }
        );
    };

    function sound1() {
        let audio1 = new Audio("Sound.mp3");
        audio1.play();
     }

btn.addEventListener("click", getPokeData);
window.addEventListener("load", generateCard);
