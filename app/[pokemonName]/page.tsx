'use client';
import { useRouter } from 'next/navigation';
import { Image, Button } from "@nextui-org/react";
import { getPokemon } from "@/lib/pokemonApi";
import { PokemonImage } from "@/components/pokemon-image";
import { Progress } from "@/components/ui/progress";
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
			duration: .3,
			ease: easing
		}
	},
	exit: {
		y: 60,
		opacity: 0
	}
}

const fadeIn = {
	initial: {
		opacity: 0
	},
	animate: {
		opacity: 1,
		transition: {
			duration: .3,
			ease: easing
		}
	},
	exit: {
		opacity: 0
	}
}

const fadeInRight = {
	initial: {
		x: -60,
		opacity: 0
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			duration: .3,
			ease: easing
		}
	},
	exit: {
		x: 60,
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

export default async function PokemonPage({ params } : { params: { pokemonName: string } }) {

    const router = useRouter();

    const onClick = () => {
		setTimeout(() => {			
			router.push("/");
		}, 200);
    }
    
    const { pokemonName } = params;

    const pokemon = await getPokemon( pokemonName );

    return (
        <motion.section variants={ stagger } className={`pokemon-app__detail ${pokemon.types[0].type.name}`} >
            <div className="pokemon-app__detail__sidebar">
                <motion.div variants={ fadeIn }>
                    <Button onClick={ onClick } radius="full" color="primary" variant="bordered">Back to All Pokemons</Button>
                </motion.div>
                <motion.h1 variants={ fadeInRight } className="pokemon-app__detail__title">{ pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) }</motion.h1>
                <ul className="pokemon-app__detail__types">
                    { pokemon.types.map( ( typeObject : any ) => {
                        return (
                            <motion.li variants={ fadeInRight } className="pokemon-app__item__types__item" key={ typeObject.slot }>
                                <Image
                                    src={`images/${ typeObject.type.name }.svg`}
                                    alt={ typeObject.type.name }
                                    width={ 32 }
                                    height={ 32 }
                                />
                                { typeObject.type.name }
                            </motion.li>
                        )
                    })}
                </ul>
                <motion.div variants={ fadeIn } className="pokemon-app__detail__info">
                    <motion.div variants={ fadeInRight } className="pokemon-app__detail__info__item">
                        <span>Height</span>
                        <span className="pokemon-app__item__info__value">{ pokemon.height / 10 } M</span>
                    </motion.div>
                    <motion.div variants={ fadeInRight } className="pokemon-app__detail__info__item">
                        <span>Weight</span>
                        <span className="pokemon-app__item__info__value">{ pokemon.weight / 10 } KG</span>
                    </motion.div>
                </motion.div>
                <ul className="pokemon-app__detail__stats">
                    { pokemon.stats.map( ( statObject : any ) => {
                        return (
                            <motion.li variants={ fadeInRight } className="pokemon-app__detail__stat" key={ statObject.stat.name }>
                                <h3 className="pokemon-app__detail__stat__label">{ statObject.stat.name }: { statObject.base_stat }</h3>
                                <Progress value={ statObject.base_stat } />
                            </motion.li>
                        )
                    })}
                </ul>
            </div>
            <motion.figure variants={ fadeInUp } className="pokemon-app__detail__image">
                <PokemonImage 
                    id = { pokemon.id }
                    name = { pokemonName }
                    width = { 512 }
                    height = { 512 }
                />
            </motion.figure>
            <div className="pokemon-app__detail__more-info">
                
            </div>
        </motion.section>
    )

}