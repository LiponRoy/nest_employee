"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { navLinks } from "@/constant/Constant";
import { useAppDispatch } from "@/redux/hooks";
import { openLoginModal } from "@/redux/slices/loginFormModalSlice";
import { openRegisterModal } from "@/redux/slices/registerFormModalSlice";
import { useGetProfileQuery } from "@/redux/rtk/auth";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { data: user, isLoading } = useGetProfileQuery({});

    // Role Based Access
    const [isUserEmployer, setIsUserEmployer] = useState(false);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    useEffect(() => {
        if (user) {
            setIsUserEmployer(user.data.role === 'employer');
            setIsUserAdmin(user.data.role === 'admin');
        }
    }, [user]);
    // Role Based Access End


    return (
        <nav className="sticky top-0 z-50 container-custom flex items-center justify-between px-6 py-4 bg-bg-1 dark:bg-slate-900 bg-opacity-90 shadow-md">
            <Link href="/" className="text-2xl font-bold flex justify-center items-center gap-1">
                <span className="text-secondary-1">Nest</span>
                <span className="text-primary-2">Employee</span>
            </Link>

            <div className="hidden md:flex gap-6 items-center">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-primary-2 font-semibold hover:text-secondary-1 dark:text-gray-200 transition-colors duration-500 hover:text-orange-deep"
                    >
                        {link.label}
                    </Link>
                ))}

                <div className="flex items-center gap-4">
                    {isLoading ? (
                        <p className="text-primary-2">Loading...</p>
                    ) : user ? (
                        <div className="flex items-center gap-4">
                            {isUserEmployer && (
                                <Button
                                    onClick={() => router.push('/addJob')}
                                    variant="outline"
                                    className="text-primary-2 hover:text-secondary-1"
                                >
                                    Add Job
                                </Button>
                            )}
                            <LogoutButton />
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Button
                                onClick={() => dispatch(openLoginModal())}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => dispatch(openRegisterModal())}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Register
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/*   For mobile view */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-6 md:p-10">
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
