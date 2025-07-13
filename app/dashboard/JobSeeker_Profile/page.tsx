"use client"
import { useGetProfileByLoginUserQuery } from "@/redux/rtk/profileApi";

// app/dashboard/profile/page.tsx
export default function ProfilePage() {
  const { data: user, isLoading } = useGetProfileByLoginUserQuery({});
  console.log("user: ",user);
  return <div>Welcome to your profile!</div>;
}
