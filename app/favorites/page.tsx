"use client"
import React, { useState, useEffect } from 'react';
import { PokemonCard } from "../../components/pokemon-card";
import { getPokemonList } from '@/lib/pokemonApi'
import { motion } from "framer-motion";
import { localFavorites } from '@/utils';

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

export default function FavoritePage() {

    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons( localFavorites.pokemons() );
    }, [])

	return (
		<motion.ul className="pokemon-app__list" variants={ stagger }>
			{ favoritePokemons.map( id => {
				return (
					<motion.li key={ id } variants={ fadeInUp }>
						{id}
					</motion.li>
				)
			})}
		</motion.ul>
	)
}