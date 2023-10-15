'use client';
import { getPokemon, getPokemonAbilities, getPokemonMoves } from "@/lib/pokemonApi";
import { PokemonDetail } from "@/components/pokemon-detail";
import { motion } from "framer-motion";
const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.05
		}
	}
}

export default async function PokemonPage({ params } : { params: { pokemonName: string } }) {
    
    const { pokemonName } = params  ;
    const pokemon = await getPokemon( pokemonName );
    const abilities = await getPokemonAbilities( pokemon.id );
    const moves = await getPokemonMoves( pokemon.id );

    return (
        <motion.section variants={ stagger } className={`pokemon-app__detail ${pokemon.types[0].type.name}`}>
            <PokemonDetail pokemon={ pokemon } abilities={ abilities } moves={ moves } />
        </motion.section>
    )

}