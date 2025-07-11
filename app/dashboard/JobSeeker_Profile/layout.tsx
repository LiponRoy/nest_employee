'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Profile View', href: '/dashboard/JobSeeker_Profile' },
    { name: 'Update General Info', href: '/dashboard/JobSeeker_Profile/UpdateGeneralInfo' },
    { name: 'Update Education Info', href: '/dashboard/JobSeeker_Profile/UpdateEducationInfo' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Top Navbar */}
      <nav className="bg-white shadow p-4">
        <ul className="flex gap-6">
          {navItems.map(({ name, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:underline ${
                  pathname === href ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content below navbar */}
      <main className="p-4 bg-gray-50 rounded shadow">{children}</main>
    </div>
  );
}
