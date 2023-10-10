"use client"
import Image from "next/image";

export function PokemonImage({ image, name } : { image: string, name: string }) {

    return (
        <Image
            src={ image }
            alt={ "Picture of " + name }
            priority
            width={256}
            height={256}
        />
    )
}