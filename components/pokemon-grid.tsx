"use client"
import { PokemonCard } from "./pokemon-card";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

const animations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }    
}

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

interface PokemonGridProps {
    pokemonList: any
}

export function PokemonGrid({ pokemonList } : PokemonGridProps) {

    // const [ searchText, setSearchText ] = useState("");
    // const searchFilter = (pokemonList: any) => {
    //     return pokemonList.filter(
    //         (pokemon: any) => pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    //     )
    // }
    
    // const filteredPokemonList = searchFilter(pokemonList);
    
    return (
        <motion.div
            variants={ animations }
            initial='initial'
            animate='animate'
            exit='exit'
            className="pokemon-app__content"
        >
            {/* <div className="pokemon-app__header sticky top-0">
                <div className="pokemon-app__search">
                    <Input
                        variant="bordered"
                        value={ searchText } onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search Pokémon"
                        startContent={ 
                            <SearchIcon/>
                        }
                    />
                </div>
            </div> */}

            <motion.ul className="pokemon-app__list" variants={ stagger }>
                { pokemonList.map(( pokemon : any ) => {
                    return (
                        <motion.li key={ pokemon.id + "Card" } variants={ fadeInUp } className={`pokemon-app__item ${pokemon.types[0].type.name}`}>
                            <PokemonCard pokemon={ pokemon } />
                        </motion.li>
                    )
                })}
            </motion.ul>
        </motion.div>
    )
}