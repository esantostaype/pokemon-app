'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Image } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { PokemonImage } from './pokemon-image'
import { Progress,Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Height, Weight, HeartIcon } from '@/components/icons/Icons';
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

const fadeIn = {
	initial: {
		opacity: 0
	},
	animate: {
		opacity: 1,
		transition: {
			duration: .6,
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
			duration: .6,
			ease: easing
		}
	},
	exit: {
		x: 60,
		opacity: 0
	}
}

interface PokemonDetailProps {
    pokemon: any,
    abilities: any,
    moves: any
}

export function PokemonDetail({ pokemon, abilities, moves } : PokemonDetailProps) {

	const firstAbility = abilities[0].id.toString();

	const [isInFavorites, setIsInFavorites] = useState(false);
 
	useEffect(() => {
		setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
	  }, [pokemon.id]);
	 
	const onToggleFavorite = () => {
		localFavorites.toggleFavorite(pokemon.id);
		setIsInFavorites(!isInFavorites);
	};

	return (
		<>
			<div className='pokemon-app__detail__header'>
                <div className='pokemon-app__detail__header__main'>
                    <motion.h1 variants={ fadeInRight } className="pokemon-app__detail__title">{ pokemon.name }</motion.h1>					
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
                </div>
                <motion.div variants={ fadeIn } className="pokemon-app__detail__info">
                    <motion.div variants={ fadeInRight } className="pokemon-app__detail__info__item">
                        <Height/>
                        <span>Height</span>
                        <span className="pokemon-app__item__info__value">{ pokemon.height / 10 } M</span>
                    </motion.div>
                    <motion.div variants={ fadeInRight } className="pokemon-app__detail__info__item">
                        <Weight/>
                        <span>Weight</span>
                        <span className="pokemon-app__item__info__value">{ pokemon.weight / 10 } KG</span>
                    </motion.div>
                </motion.div>
            </div>
            <div className='pokemon-app__detail__body'>
                <div className="pokemon-app__detail__sidebar">
                    <motion.h4 className='pokemon-app__detail__subtitle' variants={ fadeInRight }>Stats</motion.h4>
                    <motion.ul className="pokemon-app__detail__stats" variants={ fadeIn }>
                        { pokemon.stats.map( ( statObject : any ) => {
                            return (
                                <li className="pokemon-app__detail__stat" key={ statObject.stat.name }>
                                    <h3 className="pokemon-app__detail__stat__label">{ statObject.stat.name }: { statObject.base_stat }</h3>
                                    <Progress value={ statObject.base_stat } className="pokemon-app__detail__stat__progress-bar"/>
                                </li>
                            )
                        })}
                    </motion.ul>

                    <motion.h4 className='pokemon-app__detail__subtitle' variants={ fadeInRight }>Abilities</motion.h4>
                    <motion.div className='pokemon-app__detail__abilities' variants={ fadeInRight }>
                        <Accordion defaultExpandedKeys={[`${firstAbility}`]}>
                            { abilities.map( ( abilityObject: any ) => {
                                return (
                                    <AccordionItem key={ abilityObject.id } aria-label={ abilityObject.name } title={ abilityObject.name }>
                                        { abilityObject.id }
                                        { abilityObject.effect_entries[0].effect }
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </motion.div>
                </div>
                <motion.figure variants={ fadeInUp } className="pokemon-app__detail__image">
                    <div className='pokemon-app__detail__decoration'></div>
                    <PokemonImage 
                        id = { pokemon.id }
                        name = { pokemon.name }
                        width = { 512 }
                        height = { 512 }
                    />
					<Button
						isIconOnly
						className="pokemon-app__detail__like"
						radius="full"
						variant="light"
						onClick={onToggleFavorite}
					>
						<HeartIcon className={ isInFavorites ? "pokemon-liked" : "" }/>
					</Button>
                </motion.figure>
                <motion.div variants={ fadeInRight } className="pokemon-app__detail__more-info">
                    <motion.h4 className='pokemon-app__detail__subtitle' variants={ fadeInRight }>Moves</motion.h4>
                    <Table className='pokemon-app__detail__more-info__list' isHeaderSticky removeWrapper>
                        <TableHeader>
                            <TableColumn>Name</TableColumn>
                            <TableColumn>Type</TableColumn>
                            <TableColumn className='text-center'>Acc</TableColumn>
                            <TableColumn className='text-center'>Power</TableColumn>
                            <TableColumn className='text-center'>PP</TableColumn>
                        </TableHeader>
                        <TableBody>
                            { moves.map( ( moveObject : any ) => {
                                return (
                                <TableRow key={ moveObject.id }>
                                    <TableCell>{ moveObject.name }</TableCell>
                                    <TableCell>
                                        <div className='pokemon-app__detail__more-info__list__type'>
                                            <span>
                                                <Image
                                                    src={`images/${ moveObject.type.name }.svg`}
                                                    alt={ moveObject.type.name }
                                                    width={ 16 }
                                                    height={ 16 }
                                                />
                                            </span>
                                            <span>
                                                { moveObject.type.name }
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className='text-center'>{ moveObject.accuracy }%</TableCell>
                                    <TableCell className='text-center'>{ moveObject.power }</TableCell>
                                    <TableCell className='text-center'>{ moveObject.pp }</TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </motion.div>
            </div>
		</>
	)
}