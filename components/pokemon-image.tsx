"use client"
import Image from "next/image";

interface PokemonImageProps {
    id: number,
    name: string,
    width: number,
    height: number
}

export function PokemonImage({ id, name, width, height } : PokemonImageProps) {

    return (
        <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ id }.png`}
            alt={ "Picture of " + name }
            priority
            width={ width }
            height={ height }
        />
    )
}