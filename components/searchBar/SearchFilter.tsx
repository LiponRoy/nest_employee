'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  onSearch: (value: string) => void;

};

export default function SearchFilter({ onSearch }: Props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeout);
  }, [value, onSearch]);

  return (
    <div className="w-full h-12 gradient-animation flex justify-center items-center rounded-md">
      <Search size={24} className="text-white font-bold mx-1"/>
      <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search..."
      className=" w-full  px-4 py-2 border border-primary-1 rounded-md m-1 outline-none"
       
    />
     </div>
  );
}
