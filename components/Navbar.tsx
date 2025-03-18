"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { navLinks } from "@/constant/Constant";



export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 container-custom flex items-center justify-between px-6 py-4 bg-bg-1 dark:bg-slate-900 bg-opacity-90 shadow-md">

            {/* Logo */}
            {/* <Link href="/" className="text-2xl font-bold flex justify-center items-center gap-1">
                <span className="text-secondary-1">Nest</span>
                <span className="text-primary-2">Employee</span>

            </Link> */}

            {/* Desktop Links */}
            {/* <div className="hidden md:flex gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-primary-2 font-semibold hover:text-secondary-1 dark:text-gray-200 transition-colors duration-500 hover:text-orange-deep"

                    >
                        {link.label}
                    </Link>
                ))}
            </div> */}

            {/* Mobile Menu */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-10 ">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-lg font-medium text-gray-800 dark:text-gray-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
