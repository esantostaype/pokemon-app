"use client"
import { useState, useEffect, useRef } from 'react';
import { PokemonCard } from "../components/pokemon-card";
import { getPokemonList } from '@/lib/pokemonApi'
import { motion } from "framer-motion";
import { Spinner } from '@nextui-org/react';

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

export default function HomePage() {
	const [pokemonList, setPokemonList] = useState([]);
	const [offset, setOffset] = useState(0);
	const isLoading = useRef(false);
	const loadMoreRef = useRef();

	const loadMore = async () => {
		if (!isLoading.current) {
		isLoading.current = true;
		const newPokemonList = await getPokemonList( offset );
		setPokemonList( ( prevPokemonList ) => [ ...prevPokemonList, ...newPokemonList ] );
		setOffset(offset + 20);
		isLoading.current = false;
		}
	};

	useEffect(() => {
		loadMore();
	}, []);

	useEffect(() => {
		
		const onScroll = () => {
		if ( window.innerHeight + window.scrollY >= loadMoreRef.current.offsetTop - 100 ) {
			loadMore();
		}
		};

		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [offset]);
	return (
		<>
			<motion.ul className="pokemon-app__list" variants={ stagger } title="All Pokémons">
				{ pokemonList.map(( pokemon : any ) => {
					return (
						<motion.li key={ pokemon.id + "Card" } variants={ fadeInUp } className={`pokemon-app__item ${pokemon.types[0].type.name}`}>
							<PokemonCard pokemon={ pokemon } />
						</motion.li>
					)
				})}
			</motion.ul>
			<div className='loading-more' ref={ loadMoreRef }>
				<Spinner label="Loading..." />
			</div>
		</>
	)
}