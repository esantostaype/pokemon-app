"use client"
import { PokeballIcon } from '@/components/icons/Icons';
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'

import { AnimatePresence, motion } from "framer-motion";
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { HeartIcon } from '@/components/icons/Icons';

export const metadata = {
	title: 'Pokémon App',
	description: '',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {

	const router = useRouter();
	
	const onClick = () => {
		router.push("/");
	}
	
	const onClickFavorites = () => {
		router.push("/favorites");
	}
	
	return (
		<html lang="en" className="purple-dark text-foreground bg-background">
			<body>
				<ThemeProvider>
            		<AnimatePresence mode='wait'>
						<main className='pokemon-app'>	
							<header className="pokemon-app__header">
								<div className='pokemon-app__logo'>									
									<Button
										isIconOnly
										radius="full"
										variant="light"
										onClick={ onClick }
									>
										<PokeballIcon/>
									</Button>
								</div>
								<nav className='pokemon-app__nav'>
									<h1 className='main-title'></h1>
									<Button onClick={ onClickFavorites } color="primary" variant="flat" startContent={<HeartIcon/>}>
										Favorites
									</Button>
								</nav>
								<div className='pokemon-app__links'></div>
							</header>
							<motion.section
								initial='initial'
								animate='animate'
								exit='exit'								
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
								className="pokemon-app__content"
							>
								{children}
							</motion.section>
						</main>
					</AnimatePresence>
				</ThemeProvider>
			</body>
		</html>	
	)
}