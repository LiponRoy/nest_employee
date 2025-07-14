"use client";
import { useGetProfileByLoginUserQuery } from "@/redux/rtk/profileApi";

// app/dashboard/profile/page.tsx
export default function ProfilePage() {
    const { data: user, isLoading } = useGetProfileByLoginUserQuery({});
    console.log("user: ", user);
    return (
        <>
        {user?<div>
            <div className=" flex flex-col justify-center items-start">
                <span>Name: {user?.data?.userId?.name}</span>
                <span>Phone: {user?.data?.generalInfo?.phone}</span>
                <span>Gender: {user?.data?.generalInfo?.gender}</span>
                <span>Age: {user?.data?.generalInfo?.age}</span>
                <span>Address: {user?.data?.generalInfo?.address}</span>
                <span>Role: {user?.data?.userId?.role}</span>
            </div>
            <div>
              <span className="my-2 font-bold text-xl">Education Info</span>
                {user?.data?.education.map((val, i) => (
                    <div key={i} className="flex flex-col justify-start item-start my-2">
                        <span>Institute Name : {val?.instituteName}</span>
                        <span>Degree : {val?.degree}</span>
                        <span>Passing Year : {val?.passingYear}</span>
                        <span>CGPA : {val?.cgpa}</span>
                    </div>
                ))}
            </div>
            {/* <div className=" flex flex-col justify-center items-start">
        <span>Education Info:</span>
        {user?.data?.education(()=>(
          <div>
        ))}
        <span>Name: {user?.data?.userId.name}</span>
        <span>Phone: {user?.data?.generalInfo.phone}</span>
        <span>Gender: {user?.data?.generalInfo.gender}</span>
        <span>Age: {user?.data?.generalInfo.age}</span>
        <span>Address: {user?.data?.generalInfo.address}</span>
        <span>Role: {user?.data?.userId.role}</span>
      </div> */}
        </div>:"No data Insert Yet"}
        </>
    );
}
