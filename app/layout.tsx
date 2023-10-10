import './globals.css'
import {Button} from '@nextui-org/button'; 

import { ThemeProvider } from '@/components/theme-provider'
import Link from 'next/link'
import Image from "next/image";

export const metadata = {
	title: 'Pokémon App',
	description: '',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	return (
		<html lang="en" className='dark'>
			<body>
				<ThemeProvider>
					<main>
						<header className='app-header'>
							<div className='app-logo'>
								<Link href="/">
								<Image 
									src="/images/pokemon.svg"
									alt="Pokémon"
									width={180}
									height={64}
								/>	
								</Link>
								<Button>Click me</Button>
							</div>
						</header>
						{children}
					</main>
				</ThemeProvider>
			</body>
		</html>	
	)
}