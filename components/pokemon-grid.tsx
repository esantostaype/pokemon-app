"use client"
import { PokemonCard } from "./pokemon-card";
import { useState } from "react";

interface PokemonGridProps {
    pokemonList: any
}

export function PokemonGrid({ pokemonList } : PokemonGridProps) {
    const [ searchText, setSearchText ] = useState("");

    console.log(pokemonList);
    const searchFilter = (pokemonList: any) => {
        return pokemonList.filter(
            (pokemon: any) => pokemon.name.toLowerCase().includes(searchText.toLowerCase())
        )
    }
    
    const filteredPokemonList = searchFilter(pokemonList);
    
    return (
        <>
        <div>
            <h3>Search For Your Pokemon!</h3>
            <div>
                <input 
                    type="text" 
                    value={searchText} 
                    autoComplete="off"
                    id="pokemonName"
                    placeholder="Pokemon Name"
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <h3>Pokemon Collection</h3>
        </div>

        <div>
            {filteredPokemonList.map(( pokemon : any ) => {
                return (
                    <PokemonCard name={ pokemon.name } image={ pokemon.image } key={ pokemon.id + "Card" }/>
                )
            })}
        </div>
        </>
    )
}