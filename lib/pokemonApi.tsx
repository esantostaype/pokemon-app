import { useEffect, useState } from 'react';

const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList() {

    const response = await fetch( POKEMON_API + "pokemon?limit=15&offset=0" );
    const prevPokemons = await response.json();

    const pokemons = prevPokemons.results.map( async( pokemon: any ) => {
		const res = await fetch(pokemon.url);
        const data = await res.json();
        return data;
	} )

    const results = await Promise.all( pokemons );  

    return results;
}

export async function getPokemon( name: string ) {
    const response = await fetch( POKEMON_API + "pokemon/" + name );
    const pokemon = await response.json();
    return pokemon;
}