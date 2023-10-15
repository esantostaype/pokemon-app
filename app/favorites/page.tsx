"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FavoritePokemonCard from '@/components/fav-pokemon-card';
import { getPokemonFavorite } from '@/lib/pokemonApi';

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

export default function FavoritesPage() {
	const [favoritePokemon, setFavoritePokemon] = useState<number[]>([]);

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		setFavoritePokemon(favorites);
	}, []);
	

	return (
		<>
		<motion.ul className="pokemon-app__list" title="Favorite Pokémon">
			{favoritePokemon.map((id) => (
				<motion.li key={id + 'Card'} variants={fadeInUp} className="pokemon-app__item">
					<FavoritePokemonCard id={id} />
				</motion.li>
			))}
		</motion.ul>
		</>
	);
}
