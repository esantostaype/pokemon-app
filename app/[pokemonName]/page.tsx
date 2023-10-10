import { getPokemon } from "@/lib/pokemonAPI";
import { PokemonImage } from "@/components/pokemon-image";
import { Progress } from "@/components/ui/progress";

export default async function PokemonPage({ params } : { params: { pokemonName: string } }) {
    
    const { pokemonName } = params;

    const pokemon = await getPokemon( pokemonName );

    return (
        <>
            <h1>{ pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) }</h1>
            <figure>
                <PokemonImage 
                    image = { `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ pokemon.id }.png` || '/no-image.png' }
                    name = { pokemonName }
                />
            </figure>
            <h3>Weight: { pokemon.weight }</h3>
            <div>
                { pokemon.stats.map( ( statObject : any ) => {
                    return (
                        <div key={ statObject.stat.name }>
                            <h3>{ statObject.stat.name }: { statObject.base_stat }</h3>
                            <Progress value={ statObject.base_stat } />
                        </div>
                    )
                })}
            </div>
        </>
    )

}