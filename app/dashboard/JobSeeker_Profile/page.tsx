"use client";
import { useGetProfileByLoginUserQuery } from "@/redux/rtk/profileApi";

// app/dashboard/profile/page.tsx
export default function ProfilePage() {
  const { data: user, isLoading } = useGetProfileByLoginUserQuery({});
  console.log("user: ", user);
  return (
    <div>
      <div className=" flex flex-col justify-center items-start">
        <span>Name: {user?.data?.userId.name}</span>
        <span>Phone: {user?.data?.generalInfo.phone}</span>
        <span>Gender: {user?.data?.generalInfo.gender}</span>
        <span>Age: {user?.data?.generalInfo.age}</span>
        <span>Address: {user?.data?.generalInfo.address}</span>
        <span>Role: {user?.data?.userId.role}</span>
      </div>
    </div>
  );
}
