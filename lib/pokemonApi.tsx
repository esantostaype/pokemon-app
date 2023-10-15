import { useEffect, useState } from 'react';

const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList( offset: number ) {

    const response = await fetch( POKEMON_API + `pokemon?limit=20&offset=${offset}` );
    const prevPokemons = await response.json();

    const completePokemons = prevPokemons.results.map( async( pokemon: any ) => {
		const res = await fetch(pokemon.url);
        const data = await res.json();

        const finalPokemon = {
            id: data.id,
            name: data.name,
            types: data.types,
            height: data.height,
            weight: data.weight,
        }
        return finalPokemon;
	} )

    const results = await Promise.all( completePokemons );  

    return results;
}

export async function getPokemon( name: string ) {
    const response = await fetch( POKEMON_API + "pokemon/" + name );
    const completePokemon = await response.json();

    const pokemon = {
        id: completePokemon.id,
        name: completePokemon.name,
        types: completePokemon.types,
        height: completePokemon.height,
        weight: completePokemon.weight,
        stats: completePokemon.stats
    }

    return pokemon;
}

export async function getPokemonFavorite( id: number ) {
    const response = await fetch( POKEMON_API + "pokemon/" + id );
    const pokemonData = await response.json();

    const pokemonFavorite = {
        id: pokemonData.id,
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        types: pokemonData.types,
        stats: pokemonData.stats,
        type: pokemonData.types[0].type.name
    };

    return pokemonFavorite;
}

export async function getPokemonAbilities( id:number ) {
    const response = await fetch( POKEMON_API + "pokemon/" + id );
    const pokemon = await response.json();

    const abilitiesRes = pokemon.abilities.map( async( ability: any ) => {
		const res = await fetch( ability.ability.url );
        const data = await res.json();

        const abilities = {
            id: data.id,
            name: data.name,
            effect_entries: data.effect_entries,
        }
        return abilities;
	} )

    const results = await Promise.all( abilitiesRes );

    return results;
}

export async function getPokemonMoves( id:number ) {
    const response = await fetch( POKEMON_API + "pokemon/" + id );
    const pokemon = await response.json();

    const movesRes = pokemon.moves.map( async( move: any ) => {
		const res = await fetch( move.move.url );
        const data = await res.json();

        const moves = {
            id: data.id,
            name: data.name,
            accuracy: data.accuracy,
            power: data.power,
            pp: data.pp,
            priority: data.priority,
            type: data.type
        }

        return moves;
	} )

    const results = await Promise.all( movesRes );

    return results;
}