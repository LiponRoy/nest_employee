"use client"
import { useAppDispatch } from "@/redux/hooks";
import { useGetProfileQuery } from "@/redux/rtk/auth";
import { openLoginModal } from "@/redux/slices/loginFormModalSlice";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetProfileQuery({});
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !data) {
            router.push("/");
            dispatch(openLoginModal())
        }
    }, [data, isLoading, router]);

    if (isLoading) return <p>Loading...</p>;
    return <>{children}</>;
}
