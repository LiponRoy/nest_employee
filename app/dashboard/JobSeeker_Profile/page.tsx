"use client";
import { useGetProfileByLoginUserQuery } from "@/redux/rtk/profileApi";

export default function ProfilePage() {
  const { data: user, isLoading } = useGetProfileByLoginUserQuery();

  if (isLoading) return <p>Loading profile...</p>;

  if (!user?.data) return <p>No data inserted yet</p>;

  const { userId, generalInfo, education } = user.data;

  return (
    <main className="p-4 ">
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">User Info</h2>
        <ul className="space-y-1">
          <li><strong>Name:</strong> {userId?.name || "-"}</li>
          <li><strong>Phone:</strong> {generalInfo?.phone || "-"}</li>
          <li><strong>Gender:</strong> {generalInfo?.gender || "-"}</li>
          <li><strong>Age:</strong> {generalInfo?.age ?? "-"}</li>
          <li><strong>Address:</strong> {generalInfo?.address || "-"}</li>
          <li><strong>Role:</strong> {userId?.role || "-"}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Education Info</h2>
        {Array.isArray(education) && education.length > 0 ? (
          education.map((edu, i) => (
            <article key={i} className="mb-4 p-3 border rounded-md bg-gray-50">
              <p><strong>Institute Name:</strong> {edu.instituteName || "-"}</p>
              <p><strong>Degree:</strong> {edu.degree || "-"}</p>
              <p><strong>Passing Year:</strong> {edu.passingYear || "-"}</p>
              <p><strong>CGPA:</strong> {edu.cgpa || "-"}</p>
            </article>
          ))
        ) : (
          <p>No education information available.</p>
        )}
      </section>
    </main>
  );
}
