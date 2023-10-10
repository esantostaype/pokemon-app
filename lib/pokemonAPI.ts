
const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList() {

    const response = await fetch( POKEMON_API + "pokemon?limit=151&offset=0" );
    const prevPokemons = await response.json();

    const pokemons = prevPokemons.results.map( ( pokemon: any, i: number ) => ({
		...pokemon,
		id: i + 1,
		image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ i + 1 }.png`
	}) )

    return pokemons;
}

export async function getPokemon( name: string ) {
    const response = await fetch( POKEMON_API + "pokemon/" + name );
    const pokemon = await response.json();
    return pokemon;
}