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

//
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter , User } from "lucide-react";
import { openEmployerRegisterModal } from "@/redux/slices/employerRegisterFormModalSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: user, isLoading } = useGetProfileQuery({});

  // Role Based Access
  const [isUserEmployer, setIsUserEmployer] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  useEffect(() => {
    if (user) {
      setIsUserEmployer(user.data.role === "employer");
      setIsUserAdmin(user.data.role === "admin");
    }
  }, [user]);
  // Role Based Access End

  const [otherState, setOtherState] = useState(false);

  const otherController = () => {
    setOtherState(!otherState);
  };

  return (
    <nav className="sticky top-0 z-50 container-custom flex items-center justify-between px-6 py-4 bg-bg-1 dark:bg-slate-900 bg-opacity-90 shadow-md">
      <Link
        href="/"
        className="text-2xl font-bold flex justify-center items-center gap-1"
      >
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
                  <DropdownMenuItem>
                    <span
                      onClick={() => router.push("/profile")}
                      className="cursor-pointer w-full"
                    >
                      Profile
                    </span>
                  </DropdownMenuItem>
                  {isUserEmployer && (
                    <div>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <span
                          onClick={() => router.push("/getJobByCreator")}
                          className="cursor-pointer w-full"
                        >
                          Jobs
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span
                          onClick={() => router.push("/getCompanyByCreator")}
                          className="cursor-pointer w-full"
                        >
                          Companes
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span
                          onClick={() => router.push("/addJob")}
                          className="cursor-pointer w-full"
                        >
                          Add Job
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span
                          onClick={() => router.push("/addCompany")}
                          className="cursor-pointer w-full "
                        >
                          Add Company
                        </span>
                      </DropdownMenuItem>
                    </div>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="group cursor-pointer relative ">
              <div className=" flex justify-center items-center gap-x-1 ">
                <span
                  onClick={otherController}
                  className="cursor-pointer hover:text-teal_blue  py-1 "
                >
                  Login or Create Account
                </span>
                <ListFilter size={12} />
              </div>
              <div className="absolute left-0 top-8 hidden group-hover:block w-full  rounded-lg">
                <div className=" flex flex-col justify-start items-start space-y-1  text-white">
                  <span
                    onClick={() => dispatch(openRegisterModal())}
                    className=" cursor-pointer hover:border-b-[2px] hover:border-teal_blue hover:text-teal_blue w-[260px] h-32 bg-primary-2 hover:bg-primary-1 border border-slate-200 rounded-md flex flex-col justify-center items-center space-y-2"
                  >
                    <span className=" text-[20px] font-semibold">Job Seeker</span>
                    <span className=" text-[14px] font-light">Find your dream job today!</span>
                    <span className="text-[14px] font-light bg-secondary-1 px-6 py-1 rounded-md">Register</span>
                     {/* Register */}
                  </span>
                  <span
                   onClick={() => dispatch(openEmployerRegisterModal())}
                    className=" cursor-pointer hover:border-b-[2px] hover:border-teal_blue hover:text-teal_blue w-[260px] h-32 bg-primary-2 hover:bg-primary-1 border border-slate-200 rounded-md flex flex-col justify-center items-center space-y-2"
                  >
                    <span className=" text-[20px] font-semibold">Employer</span>
                    <span className=" text-[14px] font-light">Find the best candidates!</span>
                    <span className="text-[14px] font-light bg-secondary-1 px-6 py-1 rounded-md">Register</span>
                    
                  </span>
                  <span
                   onClick={() => dispatch(openLoginModal())}
                    className=" cursor-pointer hover:border-b-[2px] hover:border-teal_blue hover:text-teal_blue w-[260px] h-32 bg-primary-2 hover:bg-primary-1 border border-slate-200 rounded-md flex flex-col justify-center items-center space-y-2"
                  >
                    
                    <span className="text-[14px] font-light bg-secondary-1 px-6 py-1 rounded-md">Login</span>
                  </span>
                </div>
              </div>
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
