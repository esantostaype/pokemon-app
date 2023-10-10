import Link from "next/link"
import { PokemonImage } from "./pokemon-image"

interface PokemonCardProps {
    name: string,
	image: string
}

export function PokemonCard({ name, image } : PokemonCardProps) {
	return (
		<Link href={ name } key={ name + "Card" } >
			<h2>{ name }</h2>
			<PokemonImage 
				image={ image }
				name={ name }
			/>
		</Link>
	)
}