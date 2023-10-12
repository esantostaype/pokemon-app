"use client"
import { PokemonCard } from "../components/pokemon-card";
import { getPokemonList } from '@/lib/pokemonApi'
import { motion } from "framer-motion";

const easing = [ .6, -.05, .01, 0.99 ]

const fadeInUp = {
	initial: {
		y: 60,
		opacity: 0
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: .6,
			ease: easing
		}
	},
	exit: {
		y: 60,
		opacity: 0
	}
}

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.05
		}
	}
}

export default async function HomePage() {
	const pokemonList = await getPokemonList();
	return (
		<motion.ul className="pokemon-app__list" variants={ stagger }>
			{ pokemonList.map(( pokemon : any ) => {
				return (
					<motion.li key={ pokemon.id + "Card" } variants={ fadeInUp } className={`pokemon-app__item ${pokemon.types[0].type.name}`}>
						<PokemonCard pokemon={ pokemon } />
					</motion.li>
				)
			})}
		</motion.ul>
	)
}