import { Pokemon } from "./classe/pokemon.js";

const apiUrl = "https://pokeapi.co/api/v2/pokemon";

let search = document.querySelector("#search");
let submit = document.querySelector("#submit");
let capture = document.querySelector("#capture")

let nomP = document.querySelector("#nom");
let poidsP = document.querySelector("#poids");
let tailleP = document.querySelector("#taille");
let typeP = document.querySelector("#type");
let idP = document.querySelector("#id");
let capaciteP = document.querySelector("#capacite")
let imageP = document.querySelector("#image");

let prev = document.querySelector("#prev")
let next = document.querySelector("#next")

let currentId = 1



const getPokemonByName = async (recherche) => {
	if (recherche) {
		try {
			const response = await fetch(`${apiUrl}/${recherche}`);
			const data = await response.json();
			const monPokemon = assemblePokemon(data);
            affichePokemon(monPokemon);
            currentId = data.id
		} catch (error) {
			console.log(`Erreur lors de la récupération du Pokémon ${nom}`);
		}
	}
};

const assemblePokemon = (data) => {
	const nom = data.name;
	const poids = data.weight;
	const taille = data.height;
	const type = data.types.map((typeInfo) => typeInfo.type.name).join(", ");
	const capacite = data.abilities
		.map((abilityInfo) => abilityInfo.ability.name)
		.join(", ");
	const id = data.id;
    const image = data.sprites.front_default;
    

	return new Pokemon(nom, poids, taille, type, capacite, id, image);
};

const affichePokemon = (monPokemon) => {
    // console.log("on passe par l'affichage");
    
	nomP.textContent = `${monPokemon.nom}`;
	poidsP.textContent = `${monPokemon.poids} lbs`;
	tailleP.textContent = `${monPokemon.taille} "`;
    typeP.innerHTML = `${monPokemon.type
			.split(", ")
			.map((type) => `<span class="type">${type}</span>`)
			.join(" ")}`;
    // idP.textContent = `${monPokemon.id}`;
    capaciteP.innerHTML = `${monPokemon.capacite
			.split(", ")
			.map((capacity) => `<span class="capacite">${capacity}</span>`)
			.join(" ")}`;
    imageP.src = monPokemon.image;
    imageP.alt = `Image de ${monPokemon.nom}`;
    
};

window.addEventListener("load", () => {
	search.value = currentId; 
    getPokemonByName(currentId);
    afficherPokemonsCaptures()
});

submit.addEventListener("click", (e) => {
    e.preventDefault();
    let nom = search.value;
	getPokemonByName(nom);
});

prev.addEventListener("click", (e) => {
	e.preventDefault();
    if (currentId < 2) {
		} else {
			currentId--;
			search.value = currentId;
			getPokemonByName(currentId);
		}
});

next.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentId > 1024) {
    } else {
        currentId++;
        search.value = currentId; 
        getPokemonByName(currentId);
    }
});

capture.addEventListener("click", (e) => {
	e.preventDefault();

	let capturedPokemons =
		JSON.parse(localStorage.getItem("capturedPokemons")) || [];

	let currentPokemon = {
		nom: nomP.textContent,
		poids: poidsP.textContent,
		taille: tailleP.textContent,
		type: typeP.textContent,
		capacite: capaciteP.textContent,
		image: imageP.src,
	};

	capturedPokemons.push(currentPokemon);

	localStorage.setItem("capturedPokemons", JSON.stringify(capturedPokemons));

	afficherPokemonsCaptures();

	alert(`${currentPokemon.nom} a été capturé!`);
});

const afficherPokemonsCaptures = () => {
	let capturedPokemons =
		JSON.parse(localStorage.getItem("capturedPokemons")) || [];

	let tbody = document.querySelector("#pokemonCapture tbody");

	tbody.innerHTML = "";

	capturedPokemons.forEach((pokemon) => {
		let row = document.createElement("tr");

		row.innerHTML = `
            <td>${pokemon.nom}</td>
            <td>${pokemon.poids}</td>
            <td>${pokemon.taille}</td>
            <td>${pokemon.type}</td>
            <td>${pokemon.capacite}</td>
            <td><img src="${pokemon.image}" alt="Image de ${pokemon.nom}"></td>
        `;
		tbody.appendChild(row);
	});
};






