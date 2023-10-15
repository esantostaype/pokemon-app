'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Image } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { PokemonImage } from './pokemon-image'
import { HeartIcon } from '@/components/icons/Icons';
import { localFavorites } from '@/utils';

interface PokemonCardProps {
    pokemon: any
}

export function PokemonCard({ pokemon } : PokemonCardProps) {

    const router = useRouter();

    const onClick = () => {		
		router.push(`/${ pokemon.name }`);
    }

	const [isInFavorites, setIsInFavorites] = useState(false);
 
	useEffect(() => {
		setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
	  }, [pokemon.id]);
	 
	const onToggleFavorite = () => {
		localFavorites.toggleFavorite(pokemon.id);
		setIsInFavorites(!isInFavorites);
	};

	return (
		<div className="pokemon-app__item__content">
			<Button
				isIconOnly
				className="pokemon-app__item__like"
				radius="full"
				variant="light"
				onClick={onToggleFavorite}
			>
				<HeartIcon className={ isInFavorites ? "pokemon-liked" : "" }/>
			</Button>
			<div className="pokemon-app__item__image" onClick={ onClick }>
				<PokemonImage id={ pokemon.id } name={ pokemon.name } width={ 200 } height={ 200 } />
			</div>
			<Card shadow="none" isPressable className="pokemon-app__item__link" onClick={ onClick }>
				<div className="pokemon-app__item__caption">
					<h2 className="pokemon-app__item__title">{ pokemon.name }</h2>
					<ul className="pokemon-app__item__types">
						{ pokemon.types.map( ( typeObject : any ) => {
							return (
								<li className="pokemon-app__item__types__item" key={ typeObject.slot }>
									<Image
										src={`images/${ typeObject.type.name }.svg`}
										alt={ typeObject.type.name }
										width={ 24 }
										height={ 24 }
									/>
									{ typeObject.type.name }
								</li>
							)
						})}
					</ul>
					<div className="pokemon-app__item__info">
						<div className="pokemon-app__item__info__item">
							<span>Height</span>
							<span className="pokemon-app__item__info__value">{ pokemon.height / 10 } M</span>
						</div>
						<div className="pokemon-app__item__info__item">
							<span>Weight</span>
							<span className="pokemon-app__item__info__value">{ pokemon.weight / 10 } KG</span>
						</div>
					</div>
				</div>
			</Card>
		</div>
	)
}