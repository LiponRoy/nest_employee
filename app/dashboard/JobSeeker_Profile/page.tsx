"use client";
import { useGetProfileByLoginUserQuery } from "@/redux/rtk/profileApi";

export default function ProfilePage() {
const { data: user, isLoading} = useGetProfileByLoginUserQuery(undefined, {
  refetchOnMountOrArgChange: true, // refetch each time component mounts
  refetchOnFocus: true,            // refetch when window regains focus
  refetchOnReconnect: true,        // refetch when network reconnects
});

  if (isLoading)
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading profile...
        </p>
      </main>
    );

  if (!user?.data)
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">No data inserted yet</p>
      </main>
    );

  const { userId, generalInfo, education } = user.data;

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-8">
      {/* User Info */}
      <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          User Information
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <li>
            <span className="font-medium">Name:</span>{" "}
            {userId?.name || "-"}
          </li>
          <li>
            <span className="font-medium">Phone:</span>{" "}
            {generalInfo?.phone || "-"}
          </li>
          <li>
            <span className="font-medium">Gender:</span>{" "}
            {generalInfo?.gender || "-"}
          </li>
          <li>
            <span className="font-medium">Age:</span>{" "}
            {generalInfo?.age ?? "-"}
          </li>
          <li className="sm:col-span-2">
            <span className="font-medium">Address:</span>{" "}
            {generalInfo?.address || "-"}
          </li>
          <li>
            <span className="font-medium">Role:</span>{" "}
            {userId?.role || "-"}
          </li>
        </ul>
      </section>

      {/* Education Info */}
      <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Education Information
        </h2>
        {Array.isArray(education) && education.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((edu, i) => (
              <article
                key={i}
                className="p-4 border rounded-xl bg-gray-50 hover:shadow transition"
              >
                <p>
                  <span className="font-medium">Institute:</span>{" "}
                  {edu.instituteName || "-"}
                </p>
                <p>
                  <span className="font-medium">Degree:</span>{" "}
                  {edu.degree || "-"}
                </p>
                <p>
                  <span className="font-medium">Passing Year:</span>{" "}
                  {edu.passingYear || "-"}
                </p>
                <p>
                  <span className="font-medium">CGPA:</span>{" "}
                  {edu.cgpa || "-"}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No education information available.</p>
        )}
      </section>
    </main>
  );
}
