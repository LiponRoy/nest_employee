// import Hero from "@/components/Hero/Hero";
// import LatestJobs from "@/components/LatestJobs";

// export default function Home() {
//   return (
//     <div className="">
//       <Hero />
//       <LatestJobs />
//     </div>
//   );
// }

"use client"
import { useGetUsersQuery } from "@/redux/rtk/userApi";

const UsersList = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users!</p>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersList;

