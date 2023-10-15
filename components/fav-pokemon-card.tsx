'use client';
import React, { useState, useEffect } from 'react';
import { getPokemonFavorite } from '@/lib/pokemonApi';
import { useRouter } from 'next/navigation';
import { Card, Image } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { PokemonImage } from './pokemon-image'
import { HeartIcon } from '@/components/icons/Icons';
import { localFavorites } from '@/utils';

interface PokemonCardProps {
    id: number;
}

export default function FavoritePokemonCard({ id }: PokemonCardProps) {

    const [favPokemon, setFavPokemon] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const info = await getPokemonFavorite(id);
            setFavPokemon(info);
        };

        fetchData();
    }, [ id ]);

    const router = useRouter();

    const onClick = () => {		
		router.push(`/${ favPokemon.name }`);
    }

	const [isInFavorites, setIsInFavorites] = useState( false );
 
	useEffect(() => {
		setIsInFavorites(localFavorites.existInFavorites( id ));
	  }, [ id ]);
	 
	const onToggleFavorite = () => {
		localFavorites.toggleFavorite(id);
		setIsInFavorites(!isInFavorites);
	};

    if ( !favPokemon ) {
        return null;
    }

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
				<PokemonImage id={ favPokemon.id } name={ favPokemon.name } width={ 200 } height={ 200 } />
			</div>
			<Card shadow="none" isPressable className="pokemon-app__item__link" onClick={ onClick }>
				<div className="pokemon-app__item__caption">
					<h2 className="pokemon-app__item__title">{ favPokemon.name }</h2>
					<ul className="pokemon-app__item__types">
						{ favPokemon.types.map( ( typeObject : any ) => {
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
							<span className="pokemon-app__item__info__value">{ favPokemon.height / 10 } M</span>
						</div>
						<div className="pokemon-app__item__info__item">
							<span>Weight</span>
							<span className="pokemon-app__item__info__value">{ favPokemon.weight / 10 } KG</span>
						</div>
					</div>
				</div>
			</Card>
		</div>
    );
}
