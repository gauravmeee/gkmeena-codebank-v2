"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { ModeToggle } from './theme-btn';
import LoadingBar from 'react-top-loading-bar';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [progress, setProgress] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
      setProgress(20);

      setTimeout(() => {
        setProgress(40);
      }, 100);

      setTimeout(() => {
        setProgress(100);
      }, 400);

    }, [pathname]);

    useEffect(() => {
      setTimeout(() => {
       setProgress(0);
      }, 50);
    }, []);
    
    const getTitle = () => {
        if (pathname === "/") return "HELP⚭DESK";
        if (pathname === "/notes") return "NOT☰S";
        if (pathname === "/contests") return "C⊛NTESTS";
        if (pathname === "/jobs") return "JOB↜";
        return "HackDeck";
    };

    return (
        <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur border-b z-10">
            <LoadingBar
                color='#933ce6'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className="container mx-auto flex justify-between items-center">
                <Link href={"/"}>
                    <div className="flex items-center space-x-2">
                        <img 
                            src="/assets/gkmeena.png"
                            alt="Logo"
                            className="w-20 h-15"
                        />
                        <div className="text-2xl font-bold">
                            {getTitle()}
                        </div>
                    </div>
                </Link>
                
                <div className="hidden md:flex space-x-4 items-center">
                    <Link href="/" className="hover:scale-105 hover:font-semibold transition-transform duration-300"> 
                        Home
                    </Link>
                    <Link href="/notes" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
                        Notes
                    </Link>
                    <Link href="/contests" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
                        Contests
                    </Link>
                    <Link href="/jobs" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
                        Jobs
                    </Link>
                    <div className='flex items-center'>
                        <ModeToggle />
                    </div>
                </div>

                <div className="md:hidden">
                    <span className="mx-2"> 
                        <ModeToggle />
                    </span>
                    <Sheet>
                        <SheetTrigger>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="font-bold my-4">Menu</SheetTitle>
                                <SheetDescription>
                                    <div className="flex flex-col gap-6">
                                        <Link href="/"> Home </Link>
                                        <Link href="/notes"> Notes </Link>
                                        <Link href="/contests"> Contests </Link>
                                        <Link href="/jobs"> Jobs </Link>
                                        <div>
                                            <ModeToggle />
                                        </div>
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
