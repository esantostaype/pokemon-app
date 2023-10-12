"use client"
import { NextUIProvider } from '@nextui-org/react'
import { AnimatePresence } from "framer-motion";

export function ThemeProvider({children}: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            {children}            
        </NextUIProvider>
    )
  }