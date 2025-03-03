"use client";
import Image from "next/image";
import { FaLinkedin, FaGithub } from "react-icons/fa";

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
    const [isOpen, setIsOpen] = useState(false); // State for controlling the menu
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
        if (pathname.startsWith("/notes")) return "Notes";
        if (pathname.startsWith("/contests")) return "Contests";
        if (pathname.startsWith("/jobs")) return "Jobs";
        return "CodeBank";
    };

    const getLogo = () => {
        const paths = ["/notes", "/contests", "/jobs"];
        return paths.some(path => pathname.startsWith(path)) ? "/assets/codebank.png" : "/assets/cb.png";
    };
    

    // Check if the link is active
    const isActive = (path) => {
        if (path === "/") {
            return pathname === "/" ? "text-blue-500 font-semibold" : "";
        }
        return pathname.startsWith(path) ? "text-blue-500 font-semibold" : "";
    };

    // Function to close the menu
    const handleLinkClick = () => {
        setIsOpen(false);
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
                        <Image 
                            src={getLogo()}
                            alt="Logo"
                            className="w-12 sm:w-14 md:w-18"
                        />
                        <div className="text-2xl font-bold">
                            {getTitle()}
                        </div>
                    </div>
                </Link>
                
                <div className="hidden md:flex space-x-4 items-center">
                <Link href="/" className={`hover:scale-105 hover:font-semibold transition-transform duration-300 ${isActive("/")}`}>
                        Home
                    </Link>
                    <Link href="/notes" className={`hover:scale-105 hover:font-semibold transition-transform duration-300 ${isActive("/notes")}`}>
                        Notes
                    </Link>
                    <Link href="/contests" className={`hover:scale-105 hover:font-semibold transition-transform duration-300 ${isActive("/contests")}`}>
                        Contests
                    </Link>
                    <Link href="/jobs" className={`hover:scale-105 hover:font-semibold transition-transform duration-300 ${isActive("/jobs")}`}>
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
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="font-bold my-4">Menu</SheetTitle>
                                <SheetDescription>
                                    <div className="flex flex-col gap-6 text-center">
                                        <Link href="/" onClick={handleLinkClick} className={isActive("/")}>Home</Link>
                                        <Link href="/notes" onClick={handleLinkClick} className={isActive("/notes")}>Notes</Link>
                                        <Link href="/contests" onClick={handleLinkClick} className={isActive("/contests")}>Contests</Link>
                                        <Link href="/jobs" onClick={handleLinkClick} className={isActive("/jobs")}>Jobs</Link>
                                        <div>
                                            <ModeToggle />
                                        </div>
                                        <div className="flex justify-center gap-2">
                                        <a href="https://www.linkedin.com/in/gauravmeee/" className="text-blue-600 dark:text-blue-400" ><FaLinkedin size={24} /></a>
                                        <a href="https://github.com/gauravmeee" className="text-gray-900 dark:text-gray-300"> <FaGithub size={24}/></a>
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
