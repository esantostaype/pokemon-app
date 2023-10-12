"use client"
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'

import { AnimatePresence, motion } from "framer-motion";

export const metadata = {
	title: 'Pokémon App',
	description: '',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="purple-dark text-foreground bg-background">
			<body>
				<ThemeProvider>
            		<AnimatePresence mode='wait'>
						<main className='pokemon-app'>	
							<header className="pokemon-app__header">
								<div className='pokemon-app__logo'>
								</div>
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