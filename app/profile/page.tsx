
import LoginForm from "@/components/LoginForm";
// import Logout from "@/components/Logout";
import { auth } from "@/auth";

import { redirect } from "next/navigation";
import Image from "next/image";
import Logout from "@/components/LogOut";

const Profile = async () => {
    const session = await auth();

    if (!session?.user) redirect("/");

    return (
        <div className="flex flex-col items-center m-4">
            <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
            <Image
                src={session?.user?.image as string}
                alt={session?.user?.name as string}
                width={72}
                height={72}
                className="rounded-full"
            />
            <Logout />
        </div>
    );
};

export default Profile;