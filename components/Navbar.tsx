"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu} from "lucide-react";
import { navLinks } from "@/constant/Constant";
import { useAppDispatch } from "@/redux/hooks";
import { openLoginModal } from "@/redux/slices/loginFormModalSlice";
import { openRegisterModal } from "@/redux/slices/registerFormModalSlice";
import { useGetProfileQuery } from "@/redux/rtk/auth";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

//
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter, User } from "lucide-react";
import { openEmployerRegisterModal } from "@/redux/slices/employerRegisterFormModalSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: user, isLoading } = useGetProfileQuery({});

  // Role Based Access
  // const [isUserEmployer, setIsUserEmployer] = useState(false);
  // const [isUserAdmin, setIsUserAdmin] = useState(false);
  // useEffect(() => {
  //   if (user) {
  //     setIsUserEmployer(user.data.role === "employer");
  //     // setIsUserAdmin(user.data.role === "admin");
  //   }
  // }, [user]);
  // Role Based Access End

  // mobile sidebar
  const [open, setOpen] = useState(false);

  const handleNavigate = (path:string) => {
    router.push(path);
    setOpen(false); // Close sheet
  };

  return (
    <nav className="sticky top-0 z-50 container-custom flex items-center justify-between px-6 py-4 bg-bg-1 dark:bg-slate-900 bg-opacity-90 shadow-md">
      <Link
        href="/"
        className="text-2xl font-bold flex justify-center items-center gap-1"
      >
        <span className="text-secondary-1">Nest</span>
        <span className="text-primary-1">Employee</span>
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-primary-1 font-semibold hover:text-secondary-1 dark:text-gray-200 transition-colors duration-500 hover:text-orange-deep"
          >
            {link.label}
          </Link>
        ))}

        {
          user && <Link
           
            href="/dashboard"
            className="text-primary-1 font-semibold hover:text-secondary-1 dark:text-gray-200 transition-colors duration-500 hover:text-orange-deep"
          >
           Dashboard
          </Link>
        }

        <div className="flex items-center gap-4">
          {isLoading ? (
            <p className="text-primary-1">Loading...</p>
          ) : user ? (
            // Only for login user
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="w-7 h-7 flex justify-center items-center border border-slate-500">
                    {/* <AvatarImage src="/avatar.png" alt="User Avatar" /> */}
                    <User />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-24 mt-4">
                  {/* <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel> */}
                  <DropdownMenuSeparator />
                
                    <div>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <span
                          onClick={() => router.push("/dashboard")}
                          className="cursor-pointer w-full"
                        >
                          Dashboard
                        </span>
                      </DropdownMenuItem>
                     
                    
                    </div>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="
          flex items-center justify-end
          w-full md:w-auto py-3
          bg-white/10 text-primary-1
          hover:text-secondary-1
          rounded-xl 
          backdrop-blur-md
          hover:bg-white/20 transition duration-200
          font-medium cursor-pointer
        "
              >
                <span className=" mx-2">Login or Create Account</span>
                <ListFilter size={18} className="ml-2 text-primary-1" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="
          w-[220px]
          mt-4
          bg-slate-300 text-slate-800
          rounded-md 
          border border-slate-400
          overflow-hidden
          z-50
        "
              >
                {/* Job Seeker */}
                <DropdownMenuItem asChild>
                  <div
                    onClick={() => dispatch(openRegisterModal())}
                    className="
              px-2 py-4
              flex flex-col items-start gap-1
              hover:bg-white/20 transition-colors duration-150
              cursor-pointer
            "
                  >
                    <span className="text-lg font-semibold">Job Seeker</span>
                    <span className="text-sm opacity-80">
                      Find your dream job today
                    </span>
                    <span className="mt-2 text-sm font-medium bg-secondary-1 text-white px-4 py-1 rounded-md">
                      Register
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-white/20" />
                {/* Employer */}
                <DropdownMenuItem asChild>
                  <div
                    onClick={() => dispatch(openEmployerRegisterModal())}
                    className="
              px-2 py-5
              flex flex-col items-start gap-1
              hover:bg-white/20 transition-colors duration-150
              cursor-pointer
            "
                  >
                    <span className="text-lg font-semibold">Employer</span>
                    <span className="text-sm opacity-80">
                      Find the best candidates
                    </span>
                    <span className="mt-2 text-sm font-medium bg-secondary-1 text-white px-4 py-1 rounded-md">
                      Register
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-white/20" />
                {/* Login */}
                <DropdownMenuItem asChild>
                  <div
                    onClick={() => dispatch(openLoginModal())}
                    className="
              px-2 py-5
              flex flex-col items-start gap-1
              hover:bg-white/20 transition-colors duration-150
              cursor-pointer
            "
                  >
                    <span className="text-lg font-semibold">Login</span>
                    <span className="text-sm opacity-80">
                      If you are already registered
                    </span>
                    <span className="mt-2 text-sm font-medium bg-secondary-1 text-white px-4 py-1 rounded-md">
                      Login
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/*   For mobile sidebar view */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden bg-secondary-1 text-white"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-6 md:p-10">
          {user ? (
            <div className="flex flex-col justify-start items-start space-y-6 mt-4">
              {/* if user login */}

              <span
                onClick={() => handleNavigate("/jobs")} 
                className="cursor-pointer w-full"
              >
               Browse Jobs
              </span>
            
                <div className="flex flex-col justify-start items-start space-y-4">
                  
                  <span
                    onClick={() => handleNavigate("/dashboard")}
                    className="cursor-pointer w-full"
                  >
                    dashboard
                  </span>
                  
                </div>
             
              <div className="mt-2">
                <LogoutButton />
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-start items-start space-y-2 mt-6 ">
              <div
                onClick={() => {
                  dispatch(openRegisterModal());
                  setOpen(false);
                }}
                className="
               w-full px-2 py-4
              flex flex-col items-start gap-1
              hover:bg-slate-200 transition-colors duration-150
              cursor-pointer border-b border-slate-200
            "
              >
                <span className="text-lg font-semibold">Job Seeker</span>
                <span className="text-sm opacity-80">
                  Find your dream job today
                </span>
                <span className="mt-2 text-sm font-medium bg-secondary-1 text-white px-4 py-1 rounded-md">
                  Register
                </span>
              </div>
              <div
                onClick={() => {
                  dispatch(openEmployerRegisterModal());
                  setOpen(false);
                }}
                className="
               w-full px-2 py-5
              flex flex-col items-start gap-1
              hover:bg-white/20 transition-colors duration-150
              cursor-pointer border-b border-slate-200
            "
              >
                <span className="text-lg font-semibold">Employer</span>
                <span className="text-sm opacity-80">
                  Find the best candidates
                </span>
                <span className="mt-2 text-sm font-medium bg-secondary-1 text-white px-4 py-1 rounded-md">
                  Register
                </span>
              </div>
              <div
                onClick={() => {
                  dispatch(openLoginModal());
                  setOpen(false);
                }}
                className="
              w-full px-2 py-5
              flex flex-col items-start gap-1
              hover:bg-white/20 transition-colors duration-150
              cursor-pointer border-b border-slate-200
            "
              >
                <span className="text-lg font-semibold">Login</span>
                <span className="text-sm opacity-80">
                  If you are already registered
                </span>
                <span className="mt-2 text-sm font-medium bg-secondary-1 text-white px-4 py-1 rounded-md">
                  Login
                </span>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  );
}
